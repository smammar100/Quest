import { NextRequest, NextResponse } from 'next/server';

const AGENT_URL = process.env.NEXT_PUBLIC_POSTING_AGENT_URL;
const APP_NAME = 'my_agent';

// POST /api/agent/sessions
// Body: { userId: string, state: SessionState }
// Proxies to the ADK agent session creation endpoint (server-side, no CORS).
export async function POST(req: NextRequest) {
  const { userId, state } = await req.json();

  const res = await fetch(
    `${AGENT_URL}/apps/${APP_NAME}/users/${userId}/sessions`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state }),
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
