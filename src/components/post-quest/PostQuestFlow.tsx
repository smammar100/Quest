'use client';

import { usePostQuest } from '@/controllers/usePostQuest';
import PromptInput from '@/components/post-quest/PromptInput';
import QuestChat from '@/components/post-quest/QuestChat';
import DownloadAppModal from '@/components/layout/DownloadAppModal';

type Props = { initialPrompt?: string };

const SPARKLE_COLOURS = ['#FF5A47', '#FFB347', '#4CAF50', '#4A90E2', '#FF5A47', '#FFB347', '#4A90E2', '#4CAF50'];
const SPARKLE_OFFSETS = [
  '0px, -58px', '41px, -41px', '58px, 0px', '41px, 41px',
  '0px, 58px', '-41px, 41px', '-58px, 0px', '-41px, -41px',
];

function SuccessAnimation() {
  return (
    <div className="pq-anim">
      {SPARKLE_COLOURS.map((color, i) => (
        <div
          key={i}
          className="pq-sparkle"
          style={{
            background: color,
            '--tx': SPARKLE_OFFSETS[i].split(', ')[0],
            '--ty': SPARKLE_OFFSETS[i].split(', ')[1],
            '--delay': `${0.48 + i * 0.04}s`,
          } as React.CSSProperties}
        />
      ))}
      <svg viewBox="0 0 80 80" width="96" height="96" aria-hidden="true">
        <circle cx="40" cy="40" r="36" fill="#fff5f3" />
        <circle
          cx="40" cy="40" r="36"
          fill="none"
          stroke="#FF5A47"
          strokeWidth="3.5"
          className="pq-circle"
          transform="rotate(-90 40 40)"
        />
        <path
          d="M21 41 L32 53 L59 25"
          fill="none"
          stroke="#FF5A47"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pq-check"
        />
      </svg>
    </div>
  );
}

// Rendered only for authenticated users — PostQuestPageContent handles the gate.
export default function PostQuestFlow({ initialPrompt }: Props) {
  const { phase, messages, agentTyping, submitInitialPrompt, sendMessage, reset } = usePostQuest(initialPrompt);

  if (phase === 'chat') {
    return (
      <div className="post-quest-fullscreen">
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
      <div className="post-quest-outcome">
        <SuccessAnimation />
        <h2 className="post-quest-outcome__title">Quest posted!</h2>
        <p className="post-quest-outcome__body">
          We&apos;re matching you with the perfect human. Download the Quest app to compare offers and accept the right one.
        </p>
        <DownloadAppModal className="post-quest-outcome__btn">
          Download the app
        </DownloadAppModal>
        <button className="post-quest-outcome__btn post-quest-outcome__btn--secondary" onClick={reset}>
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
  return <PromptInput onSubmit={submitInitialPrompt} />;
}
