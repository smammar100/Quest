'use client';

import { useAuth } from '@/controllers/useAuth';
import { useRouter } from 'next/navigation';
import PostQuestFlow from '@/components/post-quest/PostQuestFlow';
import SiteHeader from '@/components/layout/SiteHeader';
import PromptInput from '@/components/post-quest/PromptInput';
import ScrollFX from '@/components/sections/ScrollFX';

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
      <div className="pq-landing">
        <section className="pq-landing__hero">
          <h1 className="pq-landing__title">Post a quest</h1>
          <p className="pq-landing__subtitle">
            Tell us what you need. A trusted human will take it from there.
          </p>
          <PromptInput onSubmit={handlePublicSubmit} />
          <p className="pq-landing__auth-note">
            Already have an account?{' '}
            <a href="/login" className="pq-landing__auth-link">Log in</a>
          </p>
        </section>
      </div>
      <ScrollFX />
    </>
  );
}
