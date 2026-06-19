import { NextResponse } from "next/server";

const FALLBACK_BACKEND_URL =
  "https://quest-backend-container-dev-840826949824.asia-southeast1.run.app";

const getBackendURL = () =>
  (
    process.env.QUEST_BACKEND_URL ??
    process.env.NEXT_PUBLIC_QUEST_BACKEND_URL ??
    FALLBACK_BACKEND_URL
  ).replace(/\/$/, "");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userID = searchParams.get("userID")?.trim();

  if (!userID) {
    return NextResponse.json(
      { error: "Missing required userID query parameter" },
      { status: 400 }
    );
  }

  const backendURL = getBackendURL();
  const upstreamURL = `${backendURL}/user/self?${new URLSearchParams({ userID }).toString()}`;

  try {
    const response = await fetch(upstreamURL, {
      method: "GET",
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
      headers: {
        Accept: "application/json",
      },
    });

    if (response.status === 204) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "User self upstream error",
          status: response.status,
        },
        { status: 502 }
      );
    }

    const data: unknown = await response.json();
    const user =
      Array.isArray(data) && data.length > 0 && typeof data[0] === "object" && data[0] !== null
        ? (data[0] as Record<string, unknown>)
        : null;

    return NextResponse.json({ user }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error: "Unable to reach user self service",
      },
      {
        status: 502,
      }
    );
  }
}