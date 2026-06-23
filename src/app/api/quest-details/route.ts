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

  const detailsURL = `${backendURL}/quest/view-quest/?${upstreamParams.toString()}`;
  const proposalCountURL = `${backendURL}/proposal/count-by-quest?${new URLSearchParams({ questID }).toString()}`;

  try {
    const [detailsResponse, proposalCountResponse] = await Promise.all([
      fetch(detailsURL, {
        method: 'GET',
        cache: 'no-store',
        signal: AbortSignal.timeout(15000),
        headers: {
          Accept: 'application/json',
        },
      }),
      fetch(proposalCountURL, {
        method: 'GET',
        cache: 'no-store',
        signal: AbortSignal.timeout(15000),
        headers: {
          Accept: 'application/json',
        },
      }),
    ]);

    if (!detailsResponse.ok) {
      return NextResponse.json(
        {
          error: 'Quest details upstream error',
          status: detailsResponse.status,
        },
        { status: 502 }
      );
    }

    const detailsData: unknown = await detailsResponse.json();

    let offersReceived = 0;
    if (proposalCountResponse.ok) {
      try {
        const proposalCountData = (await proposalCountResponse.json()) as {
          count?: string | number;
        };
        const parsedCount = Number(proposalCountData.count);
        if (Number.isFinite(parsedCount)) offersReceived = parsedCount;
      } catch {
        // keep 0
      }
    }

    return NextResponse.json(
      { quest: detailsData, offersReceived },
      { status: 200 }
    );
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
