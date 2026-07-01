'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/controllers/useAuth';
import posthog from 'posthog-js';

const SUGGESTIONS = [
  'Pick up a parcel in New York',
  'Shoot a UGC video',
  'Check an apartment & take photos',
  'Assemble furniture',
];

export default function HireHumanPrompt() {
  const [value, setValue] = useState('');
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  function submit(text: string, isSuggestion = false) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const encoded = encodeURIComponent(trimmed);
    if (isSuggestion) {
      posthog.capture('home_suggestion_clicked', { suggestion: trimmed });
    } else {
      posthog.capture('home_prompt_submitted', { prompt: trimmed });
    }
    if (!loading && isAuthenticated) {
      router.push(`/post-quest?prompt=${encoded}`);
    } else {
      router.push(`/login?prompt=${encoded}`);
    }
  }

  return (
    <>
      <form className="quest-prompt" onSubmit={e => { e.preventDefault(); submit(value); }}>
        <input
          className="quest-prompt__input"
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Pick up a parcel in New York for $40"
          aria-label="Describe what you need"
        />
        <div className="quest-prompt__toolbar">
          <div className="quest-prompt__actions">
            <button type="submit" className="quest-prompt__submit">Hire a human</button>
          </div>
        </div>
      </form>

      <div className="quest-suggest">
        <p className="quest-suggest__label">What do you need a human to do?</p>
        <div className="quest-suggest__pills">
          {SUGGESTIONS.map(s => (
            <button key={s} type="button" className="quest-pill" onClick={() => submit(s, true)}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
