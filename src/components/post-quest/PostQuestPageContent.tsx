'use client';

import { useAuth } from '@/controllers/useAuth';
import { useRouter } from 'next/navigation';
import PostQuestFlow from '@/components/post-quest/PostQuestFlow';
import SiteHeader from '@/components/layout/SiteHeader';
import PromptInput from '@/components/post-quest/PromptInput';

// Auth users go straight to the agent chat flow.
// Unauth users see a public landing; submitting the prompt redirects to signup
// with the prompt preserved as a query param so it can be recovered post-auth.
export default function PostQuestPageContent() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  if (loading) return null;

  if (isAuthenticated) {
    return <PostQuestFlow />;
  }

  function handlePublicSubmit(prompt: string) {
    router.push(`/signup?prompt=${encodeURIComponent(prompt)}`);
  }

  return (
    <>
      <SiteHeader />
      <PromptInput onSubmit={handlePublicSubmit} authNote />
    </>
  );
}
