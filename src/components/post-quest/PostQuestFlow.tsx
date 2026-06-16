'use client';

import { usePostQuest } from '@/controllers/usePostQuest';
import PromptInput from '@/components/post-quest/PromptInput';
import QuestChat from '@/components/post-quest/QuestChat';

// Rendered only for authenticated users — PostQuestPageContent handles the gate.
export default function PostQuestFlow() {
  const { phase, messages, agentTyping, submitInitialPrompt, sendMessage } = usePostQuest();

  if (phase === 'chat') {
    return (
      <div className="pq-fullscreen">
        <QuestChat
          messages={messages}
          agentTyping={agentTyping}
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
        <button className="pq-outcome__retry" onClick={() => window.location.reload()}>
          Try again
        </button>
      </div>
    );
  }

  // 'prompt' phase — auth user lands here first, types their quest, then chat begins.
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
