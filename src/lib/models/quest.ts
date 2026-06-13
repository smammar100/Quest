export type QuestCategory =
  | 'delivery'
  | 'errands'
  | 'cleaning'
  | 'assembly'
  | 'photography'
  | 'other';

export type PostQuestDraft = {
  title: string;
  description: string;
  category: QuestCategory | '';
  budget: number;
  currency: string;
  location: string;
};

export type PostQuestPayload = {
  posterId: string;
  title: string;
  description: string;
  category: QuestCategory;
  budget: number;
  currency: string;
  location: string;
};

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
