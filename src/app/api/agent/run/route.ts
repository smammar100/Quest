import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken } from '@/lib/firebase/admin';
import { getAgentAuthHeader } from '@/lib/gcp/oidc';

// Prefer the server-only var; fall back to the NEXT_PUBLIC_ name during
// migration. Rename to POSTING_AGENT_URL in all deployment configs to stop
// the URL from being baked into the client bundle.
const AGENT_URL = process.env.POSTING_AGENT_URL ?? process.env.NEXT_PUBLIC_POSTING_AGENT_URL;
const APP_NAME = 'my_agent';

// POST /api/agent/run
// Body: { userId: string, sessionId: string, text: string }
// Proxies to the ADK /run endpoint (server-side, no CORS).
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('Authorization') ?? '';
  let uid: string;
  try {
    const decoded = await verifyIdToken(authHeader);
    uid = decoded.uid;
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { userId, sessionId, text } = await req.json();

  if (uid !== userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const agentAuth = await getAgentAuthHeader(AGENT_URL!);

  const res = await fetch(`${AGENT_URL}/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(agentAuth && { Authorization: agentAuth }),
    },
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
