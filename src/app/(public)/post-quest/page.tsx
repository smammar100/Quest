import { Suspense } from 'react';
import '@/styles/post-quest.css';
import PostQuestPageContent from '@/components/post-quest/PostQuestPageContent';

export default function PostQuestPage() {
  return (
    <Suspense fallback={null}>
      <PostQuestPageContent />
    </Suspense>
  );
}
