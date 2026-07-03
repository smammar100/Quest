import type { Metadata } from 'next';
import SiteHeader from '../../../../../components/layout/SiteHeader';
import SiteFooter from '../../../../../components/layout/SiteFooter';
import {
  BLOG_POSTS,
  Cover,
  NewsletterBlock,
  ReadTime,
  VariantSwitcher,
} from '../../../../../components/prototype/blog/shared';
import { accentFor } from '../../../../../lib/data/blog-posts';

export const metadata: Metadata = {
  title: 'Blog · V4 Color-block magazine',
  robots: { index: false, follow: false },
};

/* V4 — the most Quest-native take (Kickstarter's Creative Independent × the
   homepage #bento): typographic color-block tiles across the full palette,
   photos only where they earn their place. Flat, saturated, no strokes. */

// deterministic tile treatment: every 3rd tile carries the photo, others are pure type-on-color
const isPhotoTile = (i: number) => i % 3 === 1;

export default function BlogV4() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen w-full bg-white pb-24 font-sans">
        <div className="mx-auto w-full max-w-6xl px-6 pb-12 pt-16">
          <h1 className="w-full font-display text-5xl font-extrabold tracking-tight text-ink sm:text-7xl">
            Real stories.
            <br />
            Real <span className="text-coral">humans</span>.
          </h1>
          <p className="mt-4 max-w-xl font-sans text-lg text-midgrey">
            The Quest magazine — dispatches from the edge of automation.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, i) => {
            const accent = accentFor(post);
            const dark = accent.text === 'text-white';
            return (
              <a
                key={post.slug}
                href="#"
                className={`group relative flex min-h-80 flex-col overflow-hidden rounded-quest-lg transition-transform duration-200 hover:-translate-y-1 ${
                  isPhotoTile(i) ? 'bg-[#f2ecdf]' : accent.bg
                }`}
              >
                {isPhotoTile(i) ? (
                  <>
                    <Cover post={post} className="aspect-[3/2] w-full" />
                    <div className="flex flex-1 flex-col justify-between gap-3 p-6">
                      <h3 className="font-display text-xl font-bold leading-snug text-ink group-hover:text-coral">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="font-sans text-xs font-semibold uppercase tracking-wide text-midgrey">
                          {post.category}
                        </span>
                        <span className="font-sans text-xs text-midgrey">{post.date}</span>
                        <span className="ml-auto">
                          <ReadTime post={post} />
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-1 flex-col justify-between gap-8 p-7">
                    <div>
                      <span
                        className={`font-sans text-xs font-semibold uppercase tracking-widest ${
                          dark ? 'text-white/70' : 'text-ink/60'
                        }`}
                      >
                        {post.category}
                      </span>
                      <h3
                        className={`mt-3 font-display text-2xl font-extrabold leading-tight ${accent.text}`}
                      >
                        {post.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-sans text-xs ${dark ? 'text-white/70' : 'text-ink/60'}`}
                      >
                        {post.date}
                      </span>
                      <span className="ml-auto">
                        <ReadTime post={post} className={dark ? 'text-white/70' : 'text-ink/60'} />
                      </span>
                    </div>
                  </div>
                )}
              </a>
            );
          })}
        </div>

        <div className="mx-auto mt-16 w-full max-w-6xl px-6">
          <NewsletterBlock dark />
        </div>
      </main>
      <SiteFooter />
      <VariantSwitcher active={4} />
    </>
  );
}
