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

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const trimmed = value.trim();
      if (trimmed) onSubmit(trimmed);
    }
  }

  return (
    <form className="quest-prompt" onSubmit={handleSubmit}>
      <textarea
        className="quest-prompt__input"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What do you need a human to do?"
        autoFocus
        rows={1}
      />
      <button
        type="submit"
        className="quest-prompt__submit"
        disabled={!value.trim()}
      >
        Post a quest
      </button>
    </form>
  );
}
