import { NextRequest, NextResponse } from 'next/server';

const AGENT_URL = process.env.NEXT_PUBLIC_POSTING_AGENT_URL;
const APP_NAME = 'my_agent';

// POST /api/agent/run
// Body: { userId: string, sessionId: string, text: string }
// Proxies to the ADK /run endpoint (server-side, no CORS).
export async function POST(req: NextRequest) {
  const { userId, sessionId, text } = await req.json();

  const res = await fetch(`${AGENT_URL}/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      app_name: APP_NAME,
      user_id: userId,
      session_id: sessionId,
      new_message: { role: 'user', parts: [{ text }] },
    }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
