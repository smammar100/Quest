import { NextRequest, NextResponse } from 'next/server';

const AGENT_URL = process.env.NEXT_PUBLIC_POSTING_AGENT_URL;
const APP_NAME = 'my_agent';

// GET /api/agent/sessions/result?userId=...&sessionId=...
// Proxies to the ADK session GET endpoint and extracts quest_post_result.
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get('userId');
  const sessionId = searchParams.get('sessionId');

  if (!userId || !sessionId) {
    return NextResponse.json({ error: 'Missing userId or sessionId' }, { status: 400 });
  }

  const res = await fetch(
    `${AGENT_URL}/apps/${APP_NAME}/users/${userId}/sessions/${sessionId}`,
    { headers: { 'Content-Type': 'application/json' } }
  );

  const session = await res.json();
  const result = session?.state?.quest_post_result ?? null;
  return NextResponse.json(result, { status: res.status });
}
