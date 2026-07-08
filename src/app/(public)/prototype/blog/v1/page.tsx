import type { Metadata } from 'next';
import SiteHeader from '../../../../../components/layout/SiteHeader';
import SiteFooter from '../../../../../components/layout/SiteFooter';
import { BLOG_POSTS, PageHero, PostCard, VariantSwitcher } from '../../../../../components/prototype/blog/shared';

export const metadata: Metadata = {
  title: 'Blog · V1 Clean grid',
  robots: { index: false, follow: false },
};

/* V1 — the baseline: page hero + clean 3-up card grid (Contra-style).
   Same card DNA as the homepage #blog section, scaled to a full index. */
export default function BlogV1() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen w-full bg-white pb-24 font-sans">
        <PageHero
          title="Stories from the real world"
          lede="Hero stories, product updates, and field notes from the humans getting work done."
        />
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
      <VariantSwitcher active={1} />
    </>
  );
}
