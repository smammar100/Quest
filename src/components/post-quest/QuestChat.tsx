'use client';

import { useState, useEffect, useRef } from 'react';
import type { ChatMessage } from '@/lib/models/quest';

type Props = {
  messages: ChatMessage[];
  agentTyping: boolean;
  onSend: (content: string) => void;
};

export default function QuestChat({ messages, agentTyping, onSend }: Props) {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to the latest message whenever the list updates.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, agentTyping]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || agentTyping) return;
    setInput('');
    onSend(trimmed);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed && !agentTyping) {
        setInput('');
        onSend(trimmed);
      }
    }
  }

  return (
    <div className="pq-chat">
      <ul className="pq-chat__messages">
        {messages.map((msg, i) => (
          <li key={i} className={`pq-chat__message pq-chat__message--${msg.role}`}>
            {msg.content}
          </li>
        ))}

        {agentTyping && (
          <li className="pq-chat__message pq-chat__message--agent pq-chat__message--typing">
            <span className="pq-chat__typing-dot" />
            <span className="pq-chat__typing-dot" />
            <span className="pq-chat__typing-dot" />
          </li>
        )}

        <div ref={bottomRef} />
      </ul>

      <form className="pq-chat__input-row" onSubmit={handleSubmit}>
        <textarea
          className="pq-chat__input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Reply…"
          disabled={agentTyping}
          autoFocus
          rows={1}
        />
        <button
          type="submit"
          className="pq-chat__send"
          disabled={agentTyping || !input.trim()}
          aria-label="Send"
        >
          <span className="material-symbols-outlined">arrow_upward</span>
        </button>
      </form>
    </div>
  );
}
