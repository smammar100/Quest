import { NextResponse } from 'next/server';

const FALLBACK_BACKEND_URL =
  'https://quest-backend-container-dev-840826949824.asia-southeast1.run.app';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const questID = searchParams.get('questID')?.trim();
  if (!questID) {
    return NextResponse.json({ error: 'Missing questID' }, { status: 400 });
  }

  const userID =
    searchParams.get('userID') ??
    process.env.QUEST_BROWSE_USER_ID ??
    process.env.NEXT_PUBLIC_QUEST_BROWSE_USER_ID ??
    'web_guest';

  const backendURL = (
    process.env.QUEST_BACKEND_URL ??
    process.env.NEXT_PUBLIC_QUEST_BACKEND_URL ??
    FALLBACK_BACKEND_URL
  ).replace(/\/$/, '');

  const upstreamParams = new URLSearchParams({
    questID,
    userID,
  });

  const upstreamURL = `${backendURL}/quest/view-quest/?${upstreamParams.toString()}`;

  try {
    const response = await fetch(upstreamURL, {
      method: 'GET',
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: 'Quest details upstream error',
          status: response.status,
        },
        { status: 502 }
      );
    }

    const data: unknown = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error: 'Unable to reach quest details service',
      },
      {
        status: 502,
      }
    );
  }
}
