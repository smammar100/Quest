import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteHeader from '../../../../components/layout/SiteHeader';
import SiteFooter from '../../../../components/layout/SiteFooter';
import CtaSection from '../../../../components/sections/CtaSection';
import { Chip, Cover, PostCard, ReadTime } from '../../../../components/prototype/blog/shared';
import { PortableBody, tocFromBody } from '../../../../components/prototype/blog/PortableBody';
import { BLOG_POSTS } from '../../../../lib/data/blog-posts';
import { getBlogPost, getBlogPosts } from '../../../../sanity/queries';

/* Blog detail page — the Contree article template (Figma node 8024-34153)
   rebuilt in Quest branding. Left: article body (hero, then either the Sanity
   Portable Text body or a mock fallback). Right: sticky "In this article" TOC
   card with share links — beige fill instead of the design's white card +
   hairline border. Content comes from the "blog" schema; falls back to the
   local mock (body + sections) when the Studio is empty. */

export async function generateStaticParams() {
  const sanity = await getBlogPosts();
  const slugs = new Set([...sanity.map((p) => p.slug), ...BLOG_POSTS.map((p) => p.slug)]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getBlogPost(slug)) ?? BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Story not found — Quest' };
  return { title: `${post.title} — Quest`, description: post.excerpt };
}

// Mock article body shared by every post until real content exists.
// Section ids feed both the headings and the sticky TOC.
const SECTIONS = [
  {
    id: 'last-mile',
    title: 'Why the last mile belongs to people',
    paras: [
      'AI has eaten the plan. It writes the brief, schedules the route, and drafts the follow-up email before you have finished your coffee. What it cannot do is stand in a queue at the post office, photograph a shelf in a store two cities away, or assemble the bookshelf sitting flat-packed in your hallway.',
      'That gap — between what software can decide and what still has to physically happen — is where Quest lives. Every quest on the platform is a small proof that the real world still runs on people showing up.',
    ],
    points: [
      {
        title: 'The work is local by definition',
        body: 'A delivery in Jakarta cannot be done from Lisbon. Real-world tasks are pinned to a place, which means the person doing them has to already be nearby. Our matching starts with proximity and availability before anything else.',
      },
      {
        title: 'Trust is earned in public',
        body: 'Every Hero builds a track record one completed quest at a time — ratings, reviews, and background checks where the work is sensitive. You see all of it before you assign anyone.',
      },
    ],
  },
  {
    id: 'how-heroes-work',
    title: 'What a day of quests actually looks like',
    paras: [
      'We shadowed Heroes through a normal weekday: a parcel pickup before nine, a furniture build across town, a store audit with photo proof uploaded from the aisle. None of these tasks needed a company. They needed a person, a window of time, and a clear brief.',
      'The brief is the whole game. Task, location, deadline, budget — one sentence is enough. The clearer the ask, the faster the match and the cleaner the handoff.',
    ],
    points: [
      {
        title: 'Payment held until the work is done',
        body: 'Funds sit in escrow from the moment you assign a Hero and release only when you confirm the work. No cash, no chasing invoices, a receipt for every task.',
      },
      {
        title: 'Agents dispatch quests too',
        body: 'A fifth of tasks now arrive from AI agents through the Quest API — software deciding something needs to happen in the physical world, and hiring a human to make it so.',
      },
    ],
  },
  {
    id: 'where-this-goes',
    title: 'Where this goes next',
    paras: [
      'The next million jobs will not look like the last million. They will be smaller, faster, closer to home — a thousand kinds of work that AI creates rather than replaces, from field data collection for model training to on-location content no render farm can fake.',
      'We are building for that world: one where anyone nearby with skill and a free afternoon is one sentence away from useful, paid work. The plan is written. Someone still has to show up.',
    ],
    points: [],
  },
];

const INLINE_IMAGES = [
  {
    afterSection: 0,
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=70',
    alt: 'A team stacking hands together over a work table',
  },
  {
    afterSection: 1,
    src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=70',
    alt: 'A person carrying shopping bags through a store',
  },
];

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // One fetch drives everything: the post, its body, and the related pool.
  const sanityPosts = await getBlogPosts();
  const pool = sanityPosts.length ? sanityPosts : BLOG_POSTS;
  const post = pool.find((p) => p.slug === slug);
  if (!post) notFound();

  const shareUrl = `https://hireahuman.quest/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  // Sanity posts carry a Portable Text body; local mock posts don't, so those
  // fall back to the SECTIONS below. The TOC comes from whichever is used.
  const hasBody = Array.isArray(post.body) && post.body.length > 0;
  const toc = hasBody
    ? tocFromBody(post.body)
    : SECTIONS.map((s) => ({ id: s.id, title: s.title }));

  // related: same category first, topped up with the most recent others
  const related = [
    ...pool.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...pool.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen w-full bg-white pb-24 font-sans">
        {/* ---- Content: hero + article body (left) + sticky TOC (right) ---- */}
        <div className="grid w-full gap-12 px-[var(--page-pad)] pt-[clamp(96px,11vw,132px)] lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Left: hero + article */}
          <article className="flex min-w-0 flex-col gap-12">
            {/* Hero: chip, meta, title, lede */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Chip post={post} />
                <span className="font-sans text-xs text-midgrey">{post.date}</span>
                <ReadTime post={post} />
              </div>
              <h1 className="w-full font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
                {post.title}
              </h1>
              <p className="font-sans text-lg leading-relaxed text-midgrey">
                {post.excerpt}
              </p>
            </div>

            <Cover post={post} className="h-[450px] w-full rounded-quest" />

            {hasBody ? (
              // Sanity Portable Text body (headings become the TOC above)
              <PortableBody value={post.body as unknown[]} />
            ) : (
              // Local mock fallback: numbered-point sections + inline images
              SECTIONS.map((section, si) => (
                <div key={section.id} className="contents">
                  {/* div, not <section> — the global `section{min-height:100dvh}` base
                      rule would blow each block up to full viewport height */}
                  <div id={section.id} className="flex w-full max-w-3xl flex-col gap-5">
                    <h2 className="w-full scroll-mt-24 font-display text-3xl font-extrabold tracking-tight text-ink">
                      {section.title}
                    </h2>
                    {section.paras.map((p, i) => (
                      <p key={i} className="font-sans text-lg leading-relaxed text-midgrey">
                        {p}
                      </p>
                    ))}
                    {section.points.map((point, i) => (
                      <div key={point.title} className="flex flex-col gap-3">
                        <h3 className="font-display text-xl font-bold text-ink">
                          <span className="mr-2 text-coral">{i + 1}.</span>
                          {point.title}
                        </h3>
                        <p className="font-sans text-lg leading-relaxed text-midgrey">
                          {point.body}
                        </p>
                      </div>
                    ))}
                  </div>

                  {INLINE_IMAGES.filter((img) => img.afterSection === si).map((img) => (
                    <img
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      width={1400}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      className="h-[450px] w-full rounded-quest bg-[#f2ecdf] object-cover"
                    />
                  ))}
                </div>
              ))
            )}
          </article>

          {/* Right: sticky TOC + share (beige fill, no strokes) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-4 rounded-quest bg-[#f2ecdf] p-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-midgrey">
                In this article
              </p>
              {toc.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="font-sans text-base leading-snug text-ink transition-colors hover:text-coral"
                >
                  {s.title}
                </a>
              ))}
              <div className="mt-2 flex items-center gap-3 rounded-quest bg-white px-4 py-3">
                <span className="flex-1 font-sans text-sm text-midgrey">Share:</span>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="text-ink transition-colors hover:text-coral"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                  </svg>
                </a>
                <a
                  href={`https://x.com/intent/post?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                  className="text-ink transition-colors hover:text-coral"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.59l5.25 6.93zM17.61 20.64h2.04L6.49 3.24H4.3z" />
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="text-ink transition-colors hover:text-coral"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z" />
                  </svg>
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* ---- Related resources ---- */}
        <div className="mt-24 w-full px-[var(--page-pad)] sm:mt-32">
          <div className="mb-8 flex items-baseline justify-between gap-4">
            <h2 className="w-full max-w-none font-display text-3xl font-extrabold tracking-tight text-ink sm:w-auto sm:text-4xl">
              Related resources
            </h2>
            <a href="/blog" className="shrink-0 font-sans text-sm font-semibold text-coral hover:underline">
              All stories →
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </main>

      {/* main CTA (shared .ft-cta section) */}
      <CtaSection />

      <SiteFooter />
    </>
  );
}
