import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken } from '@/lib/firebase/admin';
import { getAgentAuthHeader } from '@/lib/gcp/oidc';

const AGENT_URL = process.env.POSTING_AGENT_URL ?? process.env.NEXT_PUBLIC_POSTING_AGENT_URL;
const APP_NAME = 'my_agent';

// POST /api/agent/sessions
// Body: { userId: string, state: SessionState }
// Proxies to the ADK agent session creation endpoint (server-side, no CORS).
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('Authorization') ?? '';
  let uid: string;
  try {
    const decoded = await verifyIdToken(authHeader);
    uid = decoded.uid;
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { userId, state } = await req.json();

  if (uid !== userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Encode userId to prevent path traversal (e.g. ../../admin).
  const agentAuth = await getAgentAuthHeader(AGENT_URL!);

  const res = await fetch(
    `${AGENT_URL}/apps/${APP_NAME}/users/${encodeURIComponent(userId)}/sessions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(agentAuth && { Authorization: agentAuth }),
      },
      body: JSON.stringify({ state }),
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
