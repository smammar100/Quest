import type { AgentTurnResponse } from '@/lib/models/quest';

const APP_NAME = 'my_agent';

// ── Types ─────────────────────────────────────────────────────────────────────

export type SessionState = {
  citizen_id: string;
  country_code?: string;
  timezone?: string;
  country_name?: string;
};

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

// ── Mock ──────────────────────────────────────────────────────────────────────
// Simulates a multi-turn agent conversation. Turn index is tracked per session
// so the mock behaves like the real server-side session state.
// Replace both functions below with the real implementations when the agent is ready.

const mockTurnIndex = new Map<string, number>();

const MOCK_TURNS: AgentTurnResponse[] = [
  { message: "What pokemon would you like to use in this run through?", readyToPost: false },
  { message: "Which region would you like to simulate the experience to be in?", readyToPost: false },
  { message: "Got it! Where do you need this done, roughly what city or area?", readyToPost: false },
  { message: "And what's your budget, ballpark is fine. Also, does this need to happen by a specific date?", readyToPost: false },
  { message: "Perfect, I have everything I need. Posting your quest now!", readyToPost: true },
];

export async function createAgentSession(
  userId: string,
  sessionId: string,
  state: SessionState,
  _idToken: string,
): Promise<AgentSession> {
  await new Promise(r => setTimeout(r, 200));
  mockTurnIndex.set(sessionId, 0);
  return {
    id: sessionId,
    appName: APP_NAME,
    userId,
    state,
    events: [],
    lastUpdateTime: Date.now(),
  };
}

export async function sendAgentMessage(
  userId: string,
  sessionId: string,
  _text: string,
  _idToken: string,
): Promise<AgentTurnResponse> {
  void userId;
  await new Promise(r => setTimeout(r, 900));
  const turn = mockTurnIndex.get(sessionId) ?? 0;
  mockTurnIndex.set(sessionId, turn + 1);
  return MOCK_TURNS[Math.min(turn, MOCK_TURNS.length - 1)];
}

// ── Real implementation (swap in when the agent server is ready) ──────────────
//
// const API_BASE = process.env.NEXT_PUBLIC_API_URL; // set in .env.local
//
// export async function createAgentSession(
//   userId: string,
//   sessionId: string,
//   state: SessionState,
//   idToken: string,
// ): Promise<AgentSession> {
//   const res = await fetch(
//     `${API_BASE}/apps/${APP_NAME}/users/${userId}/sessions/${sessionId}`,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
//       body: JSON.stringify(state),
//     }
//   );
//   if (!res.ok) throw new Error(`Session error: ${res.status}`);
//   return res.json();
// }
//
// export async function sendAgentMessage(
//   userId: string,
//   sessionId: string,
//   text: string,
//   idToken: string,
// ): Promise<AgentTurnResponse> {
//   const res = await fetch(`${API_BASE}/run`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
//     body: JSON.stringify({
//       app_name: APP_NAME,
//       user_id: userId,
//       session_id: sessionId,
//       new_message: { role: 'user', parts: [{ text }] },
//     }),
//   });
//   if (!res.ok) throw new Error(`Agent error: ${res.status}`);
//   const events: AgentEvent[] = await res.json();
//   return parseAgentEvents(events);
// }
