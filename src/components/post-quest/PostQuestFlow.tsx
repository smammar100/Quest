'use client';

import { usePostQuest } from '@/controllers/usePostQuest';
import PostQuestPrompt from '@/components/post-quest/PostQuestPrompt';
import PostQuestChat from '@/components/post-quest/PostQuestChat';

// Rendered only for authenticated users — PostQuestPageContent handles the gate.
export default function PostQuestFlow() {
  const { phase, messages, agentTyping, submitInitialPrompt, sendMessage, reset } = usePostQuest();

  if (phase === 'chat') {
    return (
      <div className="post-quest-fullscreen">
        <PostQuestChat
          messages={messages}
          agentTyping={agentTyping}
          onSend={sendMessage}
        />
      </div>
    );
  }

  if (phase === 'done') {
    return (
      <div className="post-quest-outcome">
        <span className="material-symbols-outlined post-quest-outcome__icon">check_circle</span>
        <h2 className="post-quest-outcome__title">Quest posted!</h2>
        <p className="post-quest-outcome__body">
          We&apos;re matching you with a human. You&apos;ll hear from us soon.
        </p>
        <button className="post-quest-outcome__btn" onClick={reset}>
          Post another quest
        </button>
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div className="post-quest-outcome post-quest-outcome--error">
        <span className="material-symbols-outlined post-quest-outcome__icon">error</span>
        <h2 className="post-quest-outcome__title">Something went wrong</h2>
        <p className="post-quest-outcome__body">
          We couldn&apos;t post your quest. Please try again.
        </p>
        <button className="post-quest-outcome__btn" onClick={reset}>
          Try again
        </button>
      </div>
    );
  }

  // 'prompt' phase — auth user lands here first, types their quest, then chat begins.
  return <PostQuestPrompt onSubmit={submitInitialPrompt} />;
}
