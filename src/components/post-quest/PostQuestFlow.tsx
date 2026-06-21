'use client';

import { usePostQuest } from '@/controllers/usePostQuest';
import PromptInput from '@/components/post-quest/PromptInput';
import QuestChat from '@/components/post-quest/QuestChat';
import { APP_STORE_URL, PLAY_STORE_URL, AppleLogo, GooglePlayLogo } from '@/components/layout/DownloadAppModal';

type Props = { initialPrompt?: string };

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
        <span className="material-symbols-outlined post-quest-outcome__icon">check_circle</span>
        <h2 className="post-quest-outcome__title">Quest posted!</h2>
        <p className="post-quest-outcome__body">
          To see your quest, check it out on our app!
        </p>
        <div className="dlapp-stores">
          <a href={APP_STORE_URL} target="_blank" rel="noopener" className="dlapp-store">
            <AppleLogo />
            App Store
          </a>
          <a href={PLAY_STORE_URL} target="_blank" rel="noopener" className="dlapp-store">
            <GooglePlayLogo />
            Google Play
          </a>
        </div>
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
