import type { AgentTurnResponse } from '@/lib/models/quest';

const APP_NAME = 'my_agent';

// ── Types ─────────────────────────────────────────────────────────────────────

export type SessionState = {
  citizen_id: string;
  country_code?: string;
  timezone?: string;
  country_name?: string;
};

export type QuestPostResult = { status: 'success' | 'error'; questID?: string };

export type AgentSession = {
  id: string;
  appName: string;
  userId: string;
  state: SessionState;
  events: AgentEvent[];
  lastUpdateTime: number;
};

type EventPart =
  | { text: string }
  | { functionCall: { name: string; args: Record<string, unknown> } }
  | { functionResponse: { name: string; response: unknown } };

export type AgentEvent = {
  author: string;
  content: { role: string; parts: EventPart[] };
  actions?: { stateDelta?: Record<string, unknown> };
  invocationId: string;
  id: string;
  timestamp: number;
};

// ── Event parser ──────────────────────────────────────────────────────────────

export function parseAgentEvents(events: AgentEvent[]): AgentTurnResponse {
  // Show only text parts emitted by the final output agent; ignore internal
  // functionCall / functionResponse parts even if they come from QP_Final.
  const message = events
    .filter(e => e.author === 'QP_Final')
    .flatMap(e => e.content.parts)
    .filter((p): p is { text: string } => 'text' in p && typeof p.text === 'string')
    .map(p => p.text)
    .join('');

  // The agent calls post_quest_to_backend itself — detect it in the event stream
  // to know when the quest has been posted and the flow should advance to 'done'.
  const readyToPost = events.some(e =>
    e.content.parts.some(
      p => 'functionCall' in p &&
           (p as { functionCall: { name: string } }).functionCall.name === 'post_quest_to_backend'
    )
  );

  return { message, readyToPost };
}

export async function createAgentSession(
  userId: string,
  state: SessionState,
  _idToken: string,
): Promise<AgentSession> {
  const res = await fetch('/api/agent/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, state }),
  });
  if (!res.ok) throw new Error(`Session error: ${res.status}`);
  return res.json();
}

export async function sendAgentMessage(
  userId: string,
  sessionId: string,
  text: string,
  _idToken: string,
): Promise<AgentTurnResponse> {
  const res = await fetch('/api/agent/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, sessionId, text }),
  });
  if (!res.ok) throw new Error(`Agent error: ${res.status}`);
  const events: AgentEvent[] = await res.json();
  return parseAgentEvents(events);
}

export async function getAgentSession(
  userId: string,
  sessionId: string,
  _idToken: string,
): Promise<QuestPostResult | null> {
  const res = await fetch(`/api/agent/sessions/result?userId=${userId}&sessionId=${sessionId}`);
  if (!res.ok) throw new Error(`Session GET error: ${res.status}`);
  return res.json();
}
