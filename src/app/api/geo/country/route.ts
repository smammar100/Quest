import { NextResponse } from "next/server";
import {
  USD_COUNTRY_CODE,
  isSupportedCountryCode,
} from "@/lib/constants/country-pricing";

type DetectionSource =
  | "header"
  | "ipapi"
  | "ipinfo"
  | "country.is"
  | "fallback";

type DetectionResult = {
  countryCode: string;
  source: DetectionSource;
};

const COUNTRY_HEADER_KEYS = [
  "x-vercel-ip-country",
  "cloudfront-viewer-country",
  "cf-ipcountry",
  "x-country-code",
] as const;

const REQUEST_TIMEOUT_MS = 4000;

const isIsoCountryCode = (value?: string | null): value is string => {
  if (!value) {
    return false;
  }

  return /^[A-Z]{2}$/.test(value.trim().toUpperCase());
};

const normalizeCountryCode = (value?: string | null): string | null => {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toUpperCase();
  return isIsoCountryCode(normalized) ? normalized : null;
};

const withTimeout = async (url: string): Promise<Response> => {
  return fetch(url, {
    method: "GET",
    cache: "no-store",
    headers: {
      Accept: "application/json, text/plain;q=0.9",
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
};

const parseJSON = async (response: Response): Promise<Record<string, unknown>> => {
  const data = (await response.json()) as unknown;
  if (!data || typeof data !== "object") {
    return {};
  }

  return data as Record<string, unknown>;
};

const detectFromHeaders = (request: Request): DetectionResult | null => {
  for (const header of COUNTRY_HEADER_KEYS) {
    const value = normalizeCountryCode(request.headers.get(header));
    if (value) {
      return {
        countryCode: value,
        source: "header",
      };
    }
  }

  return null;
};

const detectFromProviders = async (): Promise<DetectionResult | null> => {
  try {
    const ipapi = await withTimeout("https://ipapi.co/country");
    if (ipapi.ok) {
      const value = normalizeCountryCode(await ipapi.text());
      if (value) {
        return {
          countryCode: value,
          source: "ipapi",
        };
      }
    }
  } catch {
    // Intentionally no-op. We cascade to the next provider.
  }

  try {
    const ipinfo = await withTimeout("https://ipinfo.io/json");
    if (ipinfo.ok) {
      const data = await parseJSON(ipinfo);
      const value = normalizeCountryCode(
        typeof data.country === "string" ? data.country : null
      );
      if (value) {
        return {
          countryCode: value,
          source: "ipinfo",
        };
      }
    }
  } catch {
    // Intentionally no-op. We cascade to the next provider.
  }

  try {
    const countryIs = await withTimeout("https://api.country.is/");
    if (countryIs.ok) {
      const data = await parseJSON(countryIs);
      const value = normalizeCountryCode(
        typeof data.country === "string" ? data.country : null
      );
      if (value) {
        return {
          countryCode: value,
          source: "country.is",
        };
      }
    }
  } catch {
    // Intentionally no-op. Final fallback happens in the route handler.
  }

  return null;
};

export async function GET(request: Request) {
  const fromHeaders = detectFromHeaders(request);
  const fromProviders = fromHeaders ? null : await detectFromProviders();
  const detected = fromHeaders ?? fromProviders;

  if (!detected) {
    return NextResponse.json(
      {
        countryCode: USD_COUNTRY_CODE,
        source: "fallback",
        detected: false,
        supported: false,
        message:
          "We could not reliably detect your country. Please try again on a stable connection.",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  const supported = isSupportedCountryCode(detected.countryCode);

  return NextResponse.json(
    {
      countryCode: detected.countryCode,
      source: detected.source,
      detected: true,
      supported,
      message: supported
        ? null
        : "Quest signup is not available in your country yet.",
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
