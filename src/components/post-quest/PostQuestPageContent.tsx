'use client';

import { useAuth } from '@/controllers/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import PostQuestFlow from '@/components/post-quest/PostQuestFlow';
import SiteHeader from '@/components/layout/SiteHeader';
import PromptInput from '@/components/post-quest/PromptInput';

// Auth users go straight to the agent chat flow.
// Unauth users see a public landing; submitting the prompt redirects to login
// with the prompt preserved as a query param so it can be recovered post-auth.
export default function PostQuestPageContent() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get('prompt') ?? undefined;

  if (loading) return null;

  if (isAuthenticated) {
    return <PostQuestFlow initialPrompt={initialPrompt} />;
  }

  function handlePublicSubmit(prompt: string) {
    router.push(`/login?prompt=${encodeURIComponent(prompt)}`);
  }

  return (
    <>
      <SiteHeader />
      <PromptInput onSubmit={handlePublicSubmit} authNote />
    </>
  );
}
