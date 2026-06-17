import { PostQuestSpark } from './PostQuestSpark';

// Thinking-state indicator for the post-quest AI chat: a pulsing Quest spark
// next to a shimmering "Thinking" label (Claude / DeepSeek style).
export default function PostQuestThinking() {
  return (
    <div className="post-quest-thinking" role="status" aria-live="polite">
      <PostQuestSpark className="post-quest-thinking__spark" />
      <span className="post-quest-thinking__label">Thinking</span>
    </div>
  );
}
