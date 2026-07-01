import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken } from '@/lib/firebase/admin';
import { getAgentAuthHeader } from '@/lib/gcp/oidc';

const AGENT_URL = process.env.POSTING_AGENT_URL ?? process.env.NEXT_PUBLIC_POSTING_AGENT_URL;
const APP_NAME = 'my_agent';

// GET /api/agent/sessions/result?userId=...&sessionId=...
// Proxies to the ADK session GET endpoint and extracts quest_post_result.
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization') ?? '';
  let uid: string;
  try {
    const decoded = await verifyIdToken(authHeader);
    uid = decoded.uid;
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const userId = searchParams.get('userId');
  const sessionId = searchParams.get('sessionId');

  if (!userId || !sessionId) {
    return NextResponse.json({ error: 'Missing userId or sessionId' }, { status: 400 });
  }

  if (uid !== userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const agentAuth = await getAgentAuthHeader(AGENT_URL!);

  const res = await fetch(
    `${AGENT_URL}/apps/${APP_NAME}/users/${encodeURIComponent(userId)}/sessions/${encodeURIComponent(sessionId)}`,
    {
      headers: {
        'Content-Type': 'application/json',
        ...(agentAuth && { Authorization: agentAuth }),
      },
    }
  );

  const session = await res.json();
  const result = session?.state?.quest_post_result ?? null;
  return NextResponse.json(result, { status: res.status });
}
