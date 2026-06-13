'use client';

import { useState } from 'react';

type Props = {
  onSubmit: (prompt: string) => void;
};

// Mirrors the quest-prompt component on the home page — uses the same CSS
// classes so the two entry points feel visually identical.
export default function PromptInput({ onSubmit }: Props) {
  const [value, setValue] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  }

  return (
    <form className="quest-prompt" onSubmit={handleSubmit}>
      <input
        className="quest-prompt__input"
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="What do you need a human to do?"
        autoFocus
      />
      <div className="quest-prompt__toolbar">
        <div className="quest-prompt__actions">
          <button
            type="submit"
            className="quest-prompt__submit"
            disabled={!value.trim()}
          >
            Post a quest
          </button>
        </div>
      </div>
    </form>
  );
}
