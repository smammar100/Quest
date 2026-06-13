export type QuestCategory =
  | 'delivery'
  | 'errands'
  | 'cleaning'
  | 'assembly'
  | 'photography'
  | 'other';

// ── Form draft (manual post flow, kept for future use) ────────────────────────

export type PostQuestDraft = {
  title: string;
  description: string;
  category: QuestCategory | '';
  budget: number;
  currency: string;
  location: string;
};

// ── API payload (sent to the Node.js backend) ─────────────────────────────────

export type PostQuestPayload = {
  posterId: string;
  title: string;
  description: string;
  category: QuestCategory;
  budget: number;
  currency: string;
  location: string;
};

// ── Conversational agent types ────────────────────────────────────────────────

export type ChatMessage = {
  role: 'user' | 'agent';
  content: string;
};

// Shape returned by the conversational agent API on each turn.
// When readyToPost is true, the agent has elicited enough information and
// questData contains the structured payload ready to send to the backend.
export type AgentTurnResponse = {
  message: string;
  readyToPost: boolean;
  questData?: PostQuestPayload;
};

// ── Serializer (manual flow) ──────────────────────────────────────────────────

export function toPostQuestPayload(
  draft: PostQuestDraft,
  posterId: string,
): PostQuestPayload {
  if (!draft.category) throw new Error('Category is required');

  return {
    posterId,
    title: draft.title.trim(),
    description: draft.description.trim(),
    category: draft.category,
    budget: draft.budget,
    currency: draft.currency,
    location: draft.location.trim(),
  };
}
