import { Suspense } from 'react';
import '@/styles/post-quest.css';
import PostQuestPageContent from '@/components/post-quest/PostQuestPageContent';
import FullscreenLoader from '@/components/ui/FullscreenLoader';

export default function PostQuestPage() {
  return (
    <Suspense fallback={<FullscreenLoader />}>
      <PostQuestPageContent />
    </Suspense>
  );
}
