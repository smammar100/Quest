'use client';

import { useState } from 'react';
import PostQuestAntigravity from './PostQuestAntigravity';

type Props = {
  onSubmit: (prompt: string) => void;
  // Unauth public landing shows the "Already have an account?" note.
  authNote?: boolean;
};

const SUGGESTIONS = [
  'Pick up a parcel in New York',
  'Shoot a UGC video',
  'Check an apartment & take photos',
  'Assemble furniture',
];

// Post-quest landing hero — mirrors the homepage #welcome hero: the same chat
// box (global .quest-prompt) and the antigravity ring-particles field. Used by
// both the authed flow (start chat) and the unauth public landing (→ signup).
export default function PostQuestPrompt({ onSubmit, authNote }: Props) {
  const [value, setValue] = useState('');

  function submit(text: string) {
    const trimmed = text.trim();
    if (trimmed) onSubmit(trimmed);
  }

  return (
    <section id="welcome" className="center post-quest-welcome">
      <h1>
        <span className="sr-only">Post a quest. Hire trusted humans for real-world work.</span>
      </h1>

      <div className="quest-hero">
        <h2 className="quest-hero__title">Post a quest</h2>
        <p className="quest-hero__subtitle">
          Tell us what you need. A trusted human will take it from there.
        </p>

        <form
          className="quest-prompt"
          onSubmit={e => {
            e.preventDefault();
            submit(value);
          }}
        >
          <input
            className="quest-prompt__input"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Pick up a parcel in New York for $40"
            aria-label="Describe what you need"
            autoFocus
          />
          <div className="quest-prompt__toolbar">
            <button type="submit" className="quest-prompt__submit">
              Post a quest
            </button>
          </div>
        </form>

        <div className="quest-suggest">
          <p className="quest-suggest__label">What do you need a human to do?</p>
          <div className="quest-suggest__pills">
            {SUGGESTIONS.map(s => (
              <button key={s} type="button" className="quest-pill" onClick={() => submit(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {authNote && (
          <p className="post-quest-welcome__auth-note">
            Already have an account?{' '}
            <a href="/login" className="post-quest-welcome__auth-link">Log in</a>
          </p>
        )}
      </div>

      <PostQuestAntigravity />
    </section>
  );
}
