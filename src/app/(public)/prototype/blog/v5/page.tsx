import type { Metadata } from 'next';
import SiteHeader from '../../../../../components/layout/SiteHeader';
import SiteFooter from '../../../../../components/layout/SiteFooter';
import FilterableGrid from '../../../../../components/prototype/blog/FilterableGrid';
import {
  BLOG_POSTS,
  Chip,
  Cover,
  NewsletterBlock,
  ReadTime,
  VariantSwitcher,
} from '../../../../../components/prototype/blog/shared';

export const metadata: Metadata = {
  title: 'Blog · V5 The newsroom',
  robots: { index: false, follow: false },
};

/* V5 — the newsroom: everything that worked in V1–V4 in one page.
   Color-block hero feature (V4) + most-popular rail (V3) + working
   filters over the full archive (V2) on the V1 card grid, closed by
   the newsletter block. The definitive candidate. */
export default function BlogV5() {
  const featured = BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0];
  const popular = BLOG_POSTS.filter((p) => p.popular && p.slug !== featured.slug).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen w-full bg-white pb-24 font-sans">
        {/* Masthead */}
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-end justify-between gap-4 px-6 pb-10 pt-16">
          <div>
            <p className="font-sans text-sm font-semibold uppercase tracking-widest text-coral">
              Blog &amp; News
            </p>
            <h1 className="mt-3 w-full font-display text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">
              The Quest Journal
            </h1>
          </div>
          <p className="max-w-xs pb-2 font-sans text-sm leading-relaxed text-midgrey">
            Dispatches from the edge of automation — by the humans who finish the job.
          </p>
        </div>

        {/* Feature block: coral color-block hero + popular rail */}
        <div className="mx-auto mb-20 grid w-full max-w-6xl gap-5 px-6 lg:grid-cols-3">
          <a
            href="#"
            className="group relative flex min-h-96 flex-col justify-end overflow-hidden rounded-quest-lg bg-coral lg:col-span-2"
          >
            <Cover
              post={featured}
              className="absolute inset-0 opacity-90 transition-opacity duration-200 group-hover:opacity-75"
            />
            <div className="relative bg-gradient-to-t from-ink/80 via-ink/30 to-transparent p-8 pt-24 sm:p-10 sm:pt-28">
              <div className="flex items-center gap-3">
                <Chip post={featured} />
                <span className="font-sans text-xs text-white/80">{featured.date}</span>
                <ReadTime post={featured} className="text-white/80" />
              </div>
              <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-2 max-w-xl font-sans text-sm text-white/85 sm:text-base">
                {featured.excerpt}
              </p>
            </div>
          </a>

          <aside className="flex flex-col rounded-quest-lg bg-[#f2ecdf] p-6">
            <h3 className="mb-4 font-display text-lg font-bold text-ink">Most popular</h3>
            <div className="flex flex-1 flex-col justify-between gap-4">
              {popular.map((post, i) => (
                <a key={post.slug} href="#" className="group flex items-start gap-4">
                  <span className="font-display text-xl font-extrabold text-coral">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <Chip post={post} small />
                      <ReadTime post={post} />
                    </div>
                    <h4 className="mt-1.5 font-display text-base font-bold leading-snug text-ink group-hover:text-coral">
                      {post.title}
                    </h4>
                  </div>
                </a>
              ))}
              <a href="#" className="font-sans text-sm font-semibold text-coral hover:underline">
                All popular stories →
              </a>
            </div>
          </aside>
        </div>

        {/* The archive: working filters over every post */}
        <div className="mx-auto w-full max-w-6xl px-6">
          <h3 className="mb-6 text-center font-display text-2xl font-extrabold text-ink">
            All stories
          </h3>
          <FilterableGrid skipSlugs={[featured.slug]} />
        </div>

        <div className="mx-auto mt-20 w-full max-w-6xl px-6">
          <NewsletterBlock dark />
        </div>
      </main>
      <SiteFooter />
      <VariantSwitcher active={5} />
    </>
  );
}
