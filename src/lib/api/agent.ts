import type { ChatMessage, AgentTurnResponse } from '@/lib/models/quest';

// Base URL for the Node.js API. Set NEXT_PUBLIC_API_URL in .env.local.
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// Sends the full conversation history to the conversational agent and returns
// its next message. When the agent has gathered enough information it sets
// readyToPost: true and includes the structured questData in the response —
// the Next.js app should post the quest immediately on receiving that signal.
export async function sendAgentMessage(
  messages: ChatMessage[],
  idToken: string,
): Promise<AgentTurnResponse> {
  const res = await fetch(`${API_BASE}/agent/post-quest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) throw new Error(`Agent error: ${res.status}`);
  return res.json();
}
