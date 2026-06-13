'use client';

import { usePostQuest } from '@/controllers/usePostQuest';
import type { QuestCategory } from '@/lib/models/quest';

const CATEGORIES: { value: QuestCategory; label: string }[] = [
  { value: 'delivery', label: 'Delivery' },
  { value: 'errands', label: 'Errands' },
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'assembly', label: 'Assembly' },
  { value: 'photography', label: 'Photography' },
  { value: 'other', label: 'Other' },
];

export default function PostQuestForm() {
  const { draft, updateField, submit, status, isAuthenticated } = usePostQuest();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        submit();
      }}
    >
      <div>
        <label htmlFor="pq-title">What do you need done?</label>
        <input
          id="pq-title"
          type="text"
          value={draft.title}
          onChange={e => updateField('title', e.target.value)}
          placeholder="e.g. Pick up a parcel in New York"
          required
        />
      </div>

      <div>
        <label htmlFor="pq-description">Describe the task</label>
        <textarea
          id="pq-description"
          value={draft.description}
          onChange={e => updateField('description', e.target.value)}
          placeholder="Include any important details, requirements, or deadlines."
          required
        />
      </div>

      <div>
        <label htmlFor="pq-category">Category</label>
        <select
          id="pq-category"
          value={draft.category}
          onChange={e => updateField('category', e.target.value as QuestCategory)}
          required
        >
          <option value="" disabled>Select a category</option>
          {CATEGORIES.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="pq-location">Location</label>
        <input
          id="pq-location"
          type="text"
          value={draft.location}
          onChange={e => updateField('location', e.target.value)}
          placeholder="City, neighbourhood, or address"
          required
        />
      </div>

      <div>
        <label htmlFor="pq-budget">Budget (USD)</label>
        <input
          id="pq-budget"
          type="number"
          min={1}
          value={draft.budget || ''}
          onChange={e => updateField('budget', Number(e.target.value))}
          placeholder="40"
          required
        />
      </div>

      {isAuthenticated ? (
        <>
          <button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Posting…' : 'Post quest'}
          </button>
          {status === 'success' && <p>Quest posted! We&apos;re finding you a human.</p>}
          {status === 'error' && <p>Something went wrong. Please try again.</p>}
        </>
      ) : (
        <div>
          <p>Sign in to post your quest.</p>
          {/* TODO: update href once /login page exists */}
          <a href="/login">Sign in</a>
        </div>
      )}
    </form>
  );
}
