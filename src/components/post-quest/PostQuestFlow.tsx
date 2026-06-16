'use client';

import { useState } from 'react';
import { usePostQuest } from '@/controllers/usePostQuest';
import PromptInput from '@/components/post-quest/PromptInput';
import QuestChat from '@/components/post-quest/QuestChat';
import AuthScreen, { type AuthMode } from '@/components/auth/AuthScreen';

export default function PostQuestFlow() {
  const { phase, messages, agentTyping, submitInitialPrompt, sendMessage } = usePostQuest();
  const [authMode, setAuthMode] = useState<AuthMode>('signup');

  // Full-screen chat phase — occupies the whole viewport.
  if (phase === 'chat' || phase === 'posting') {
    return (
      <div className="pq-fullscreen">
        <QuestChat
          messages={messages}
          agentTyping={agentTyping || phase === 'posting'}
          onSend={sendMessage}
        />
      </div>
    );
  }

  if (phase === 'done') {
    return (
      <div className="pq-outcome">
        <span className="material-symbols-outlined pq-outcome__icon">check_circle</span>
        <h2 className="pq-outcome__title">Quest posted!</h2>
        <p className="pq-outcome__body">
          We&apos;re matching you with a human. You&apos;ll hear from us soon.
        </p>
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div className="pq-outcome pq-outcome--error">
        <span className="material-symbols-outlined pq-outcome__icon">error</span>
        <h2 className="pq-outcome__title">Something went wrong</h2>
        <p className="pq-outcome__body">Please try again.</p>
        <button
          className="pq-outcome__retry"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    );
  }

  // Auth gate: render the auth screen in-place so the prompt stays in memory.
  // Once the user signs in, AuthContext fires → usePostQuest auto-advances to 'chat'.
  if (phase === 'auth') {
    return (
      <AuthScreen
        mode={authMode}
        layout="centered"
        onSwitch={() => setAuthMode(m => m === 'signup' ? 'login' : 'signup')}
      />
    );
  }

  // 'prompt' phase: public landing with the initial prompt input.
  return (
    <div className="pq-landing">
      <section className="pq-landing__hero">
        <h1 className="pq-landing__title">Post a quest</h1>
        <p className="pq-landing__subtitle">
          Tell us what you need. A trusted human will take it from there.
        </p>
        <PromptInput onSubmit={submitInitialPrompt} />
      </section>
    </div>
  );
}
