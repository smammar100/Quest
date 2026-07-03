import type { Metadata } from 'next';
import SiteHeader from '../../../../../components/layout/SiteHeader';
import SiteFooter from '../../../../../components/layout/SiteFooter';
import ContreeDiscover from '../../../../../components/prototype/blog/ContreeDiscover';
import {
  BLOG_POSTS,
  Chip,
  Cover,
  ReadTime,
  VariantSwitcher,
} from '../../../../../components/prototype/blog/shared';

export const metadata: Metadata = {
  title: 'Blog · V6 Contree remix',
  robots: { index: false, follow: false },
};

/* V6 — the Contree (UI8 / Unpixel) blog template rebuilt in Quest branding.
   Layout follows the Figma node 7759-213 faithfully:
   1. "Most Recent Posts": featured card + 2-card rail
   2. "Discover the latest in...": category tab bar + compact 9-card grid
   3. Full-width gradient CTA banner
   Restyled: Bricolage/Inter Tight, coral kickers, beige fills instead of
   hairlines, palette color-blocks behind covers, Quest CTA copy. */
export default function BlogV6() {
  const featured = BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0];
  const rail = BLOG_POSTS.filter((p) => p.slug !== featured.slug).slice(0, 2);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen w-full bg-white pb-24 font-sans">
        {/* ---- Most recent stories (featured + rail) ---- */}
        <section className="mx-auto w-full max-w-6xl px-6 pt-16">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h1 className="w-full max-w-none font-display text-3xl font-extrabold tracking-tight text-ink sm:w-auto sm:text-4xl">
              Most recent stories
            </h1>
            <a
              href="/prototype/blog/v2"
              className="inline-flex shrink-0 items-center gap-1 font-sans text-sm font-semibold text-coral hover:underline"
            >
              View all stories
              <span className="material-symbols-outlined !text-[18px]" aria-hidden="true">
                chevron_right
              </span>
            </a>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            {/* Featured card */}
            <a href="#" className="group flex flex-col gap-6">
              <Cover post={featured} className="aspect-[16/9] w-full rounded-quest lg:h-[450px]" />
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Chip post={featured} />
                  <span className="font-sans text-xs text-midgrey">{featured.date}</span>
                  <span className="ml-auto">
                    <ReadTime post={featured} />
                  </span>
                </div>
                <h2 className="w-full font-display text-2xl font-bold leading-snug tracking-tight text-ink group-hover:text-coral sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="max-w-2xl font-sans text-base leading-relaxed text-midgrey">
                  {featured.excerpt}
                </p>
              </div>
            </a>

            {/* 2-card rail */}
            <div className="flex flex-col gap-8">
              {rail.map((post) => (
                <a key={post.slug} href="#" className="group flex flex-col gap-5">
                  <Cover post={post} className="aspect-[2/1] w-full rounded-quest" />
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <Chip post={post} />
                      <span className="ml-auto">
                        <ReadTime post={post} />
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold leading-snug tracking-tight text-ink group-hover:text-coral">
                      {post.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Discover the latest in... (tabs + compact grid) ---- */}
        <ContreeDiscover />

        {/* ---- CTA banner (Contree's gradient card, Quest palette) ---- */}
        <section className="mx-auto mt-24 w-full max-w-6xl px-6 sm:mt-32">
          <div className="relative flex min-h-[420px] flex-col items-center justify-center gap-10 overflow-hidden rounded-quest-lg bg-[radial-gradient(120%_160%_at_50%_120%,#7b5cff_0%,#ff5a47_55%,#f0402c_100%)] px-8 py-16 text-center">
            <div className="flex flex-col items-center gap-4">
              <h2 className="w-full max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                Ready to hire a human for the work AI can&apos;t finish?
              </h2>
              <p className="max-w-xl font-sans text-lg text-white/80">
                Describe the task in a sentence. We match you with trusted people nearby who
                get it done — payment held safely until it is.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/post-quest"
                className="rounded-full bg-white px-7 py-3.5 font-sans text-base font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                Hire a human
              </a>
              <a
                href="/#how"
                className="rounded-full border border-white/40 bg-white/15 px-7 py-3.5 font-sans text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                How it works
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <VariantSwitcher active={6} />
    </>
  );
}
