import { NextResponse } from "next/server";
import { getPostHogClient } from "@/lib/posthog-server";

const FALLBACK_BACKEND_URL =
  "https://quest-backend-container-dev-840826949824.asia-southeast1.run.app";

type SignupRequestBody = {
  user_info: Record<string, unknown>;
  private_info: Record<string, unknown>;
  skills: Array<Record<string, string>>;
  businessDetails?: Record<string, unknown>;
};

export async function POST(request: Request) {
  let body: SignupRequestBody;

  try {
    body = (await request.json()) as SignupRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  if (!body?.user_info || !body?.private_info || !Array.isArray(body?.skills)) {
    return NextResponse.json(
      { error: "Missing required signup payload" },
      { status: 400 }
    );
  }

  const backendURL = (
    process.env.QUEST_BACKEND_URL ??
    process.env.NEXT_PUBLIC_QUEST_BACKEND_URL ??
    FALLBACK_BACKEND_URL
  ).replace(/\/$/, "");

  try {
    const response = await fetch(`${backendURL}/sign-up`, {
      method: "POST",
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const raw = await response.text();
      return NextResponse.json(
        {
          error: "Signup upstream error",
          status: response.status,
          details: raw || null,
        },
        { status: 502 }
      );
    }

    const distinctId =
      String((body.user_info as Record<string, unknown>)?.uid ?? "") ||
      String((body.private_info as Record<string, unknown>)?.email ?? "anonymous");
    const posthog = getPostHogClient();
    posthog.capture({
      distinctId,
      event: "server_user_signup",
      properties: {
        country_code: (body.user_info as Record<string, unknown>)?.countryCode ?? null,
      },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach signup service" },
      { status: 502 }
    );
  }
}
