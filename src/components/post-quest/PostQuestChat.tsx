'use client';

import { useState, useEffect, useRef } from 'react';
import type { ChatMessage } from '@/lib/models/quest';
import { PostQuestSpark } from './PostQuestSpark';
import PostQuestThinking from './PostQuestThinking';

type Props = {
  messages: ChatMessage[];
  agentTyping: boolean;
  onSend: (content: string) => void;
};

export default function PostQuestChat({ messages, agentTyping, onSend }: Props) {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to the latest message whenever the list updates.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, agentTyping]);

  function send() {
    const trimmed = input.trim();
    if (!trimmed || agentTyping) return;
    setInput('');
    onSend(trimmed);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="post-quest-chat">
      <div className="post-quest-chat__scroll">
        <div className="post-quest-chat__thread">
          {messages.map((msg, i) =>
            msg.role === 'user' ? (
              <div key={i} className="post-quest-chat__row post-quest-chat__row--user">
                <div className="post-quest-chat__bubble">{msg.content}</div>
              </div>
            ) : (
              <div key={i} className="post-quest-chat__row post-quest-chat__row--agent">
                <PostQuestSpark className="post-quest-chat__avatar" />
                <div className="post-quest-chat__text">{msg.content}</div>
              </div>
            )
          )}

          {agentTyping && <PostQuestThinking />}

          <div ref={bottomRef} />
        </div>
      </div>

      <form className="post-quest-chat__composer" onSubmit={handleSubmit}>
        <div className="post-quest-chat__field">
          <textarea
            className="post-quest-chat__input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Reply to Quest…"
            disabled={agentTyping}
            autoFocus
            rows={1}
          />
          <button
            type="submit"
            className="post-quest-chat__send"
            disabled={agentTyping || !input.trim()}
            aria-label="Send"
          >
            <span className="material-symbols-outlined">arrow_upward</span>
          </button>
        </div>
        <p className="post-quest-chat__disclaimer">
          Quest can make mistakes. Check important details.
        </p>
      </form>
    </div>
  );
}
