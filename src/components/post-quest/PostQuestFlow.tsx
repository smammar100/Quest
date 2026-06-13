'use client';

import { usePostQuest } from '@/controllers/usePostQuest';
import PromptInput from '@/components/post-quest/PromptInput';
import QuestChat from '@/components/post-quest/QuestChat';

export default function PostQuestFlow() {
  const { phase, messages, agentTyping, submitInitialPrompt, sendMessage } = usePostQuest();

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

  // 'prompt' and 'auth' phases share the same public page shell.
  return (
    <div className="pq-landing">
      <section className="pq-landing__hero">
        <h1 className="pq-landing__title">Post a quest</h1>
        <p className="pq-landing__subtitle">
          Tell us what you need. A trusted human will take it from there.
        </p>
        <PromptInput onSubmit={submitInitialPrompt} />
      </section>

      {phase === 'auth' && (
        <div className="pq-auth" role="dialog" aria-modal="true" aria-label="Sign in to continue">
          <div className="pq-auth__card">
            <h2 className="pq-auth__title">Sign in to post your quest</h2>
            <p className="pq-auth__body">
              Create an account or sign in — your message is saved and the
              conversation will pick up right where you left off.
            </p>
            {/* TODO: update href once /login page exists. After successful
                sign-in, AuthContext fires onAuthStateChanged → usePostQuest
                detects isAuthenticated and advances automatically. */}
            <a className="pq-auth__cta" href="/login">Sign in</a>
            <a className="pq-auth__secondary" href="/signup">Create account</a>
          </div>
        </div>
      )}
    </div>
  );
}
