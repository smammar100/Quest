import type { PostQuestPayload } from '@/lib/models/quest';

// Base URL for the Node.js API. Set NEXT_PUBLIC_API_URL in .env.local.
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export type PostQuestResponse = {
  id: string;
};

export async function postQuest(
  payload: PostQuestPayload,
  idToken: string,
): Promise<PostQuestResponse> {
  const res = await fetch(`${API_BASE}/quests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Failed to post quest: ${res.status}`);
  }

  return res.json();
}
