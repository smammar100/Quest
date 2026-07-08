import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lab · Blog & News section variations',
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/*  Mock content — shared across all five variations                   */
/* ------------------------------------------------------------------ */

type Post = {
  category: string;
  categoryColor: string; // tailwind bg class for the chip / art block
  chipText: string; // text color class for chip
  title: string;
  excerpt: string;
  date: string;
  read: string;
  emoji: string;
};

const POSTS: Post[] = [
  {
    category: 'Manifesto',
    categoryColor: 'bg-coral',
    chipText: 'text-white',
    title: 'Why humans still matter in the age of AI',
    excerpt:
      'AI can write the plan, but someone still has to show up. Our founding manifesto on the work software will never finish.',
    date: 'Jun 28, 2026',
    read: '6 min read',
    emoji: '🦸',
  },
  {
    category: 'Product',
    categoryColor: 'bg-electric',
    chipText: 'text-white',
    title: 'Let your AI agent hire a human: the Quest API',
    excerpt:
      'Your agent can now post tasks, compare matched Heroes, and dispatch real-world work — all without leaving its loop.',
    date: 'Jun 21, 2026',
    read: '4 min read',
    emoji: '🤖',
  },
  {
    category: 'Community',
    categoryColor: 'bg-marigold',
    chipText: 'text-ink',
    title: 'Meet the Heroes: 10,000 tasks in Jakarta',
    excerpt:
      'From parcel runs to event crews — how our first city hit five figures of completed quests in under a year.',
    date: 'Jun 14, 2026',
    read: '5 min read',
    emoji: '🏙️',
  },
  {
    category: 'Field data',
    categoryColor: 'bg-violet',
    chipText: 'text-white',
    title: 'Ground truth: why AI labs pay for real-world data',
    excerpt:
      'Store shelves, street signs, spoken dialects. The datasets AI needs most can only be collected by people on the ground.',
    date: 'Jun 7, 2026',
    read: '7 min read',
    emoji: '📍',
  },
  {
    category: 'News',
    categoryColor: 'bg-lime',
    chipText: 'text-ink',
    title: 'Quest raises Series A to scale human work',
    excerpt:
      'New funding to grow the marketplace where AI agents and businesses hire trusted people for physical work.',
    date: 'May 30, 2026',
    read: '3 min read',
    emoji: '🚀',
  },
  {
    category: 'Guides',
    categoryColor: 'bg-sky',
    chipText: 'text-ink',
    title: 'How to brief a human like you brief an AI',
    excerpt:
      'Clear task, location, deadline, budget. A short guide to getting great results from real people, every time.',
    date: 'May 22, 2026',
    read: '4 min read',
    emoji: '📝',
  },
];

/* ------------------------------------------------------------------ */
/*  Small shared pieces                                                */
/* ------------------------------------------------------------------ */

function LabLabel({ n, name, note }: { n: number; name: string; note: string }) {
  return (
    <div className="mx-auto mb-10 flex w-full max-w-6xl items-baseline gap-4 px-6">
      <span className="rounded-full bg-ink px-4 py-1.5 font-sans text-sm font-semibold text-white">
        V{n}
      </span>
      <span className="font-display text-xl font-bold text-ink">{name}</span>
      <span className="hidden font-sans text-sm text-midgrey sm:inline">{note}</span>
    </div>
  );
}

function Chip({ post }: { post: Post }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 font-sans text-xs font-semibold ${post.categoryColor} ${post.chipText}`}
    >
      {post.category}
    </span>
  );
}

/* Flat color-block "art" — Quest style, no images needed */
function Art({ post, className = '' }: { post: Post; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center ${post.categoryColor} ${className}`}
      aria-hidden="true"
    >
      <span className="text-6xl drop-shadow-sm">{post.emoji}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  V1 · Editorial grid (Monarch-style)                                */
/* ------------------------------------------------------------------ */

function V1Grid() {
  return (
    <section className="w-full py-16">
      <LabLabel n={1} name="Editorial grid" note="3-up cards, flat color art, category chips" />
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mx-auto w-full font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Blog &amp; News
          </h2>
          <p className="mt-3 font-sans text-lg text-midgrey">
            Stories from the humans getting real work done.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.slice(0, 6).map((post) => (
            <a
              key={post.title}
              href="#"
              className="group flex flex-col overflow-hidden rounded-quest-lg bg-offwhite transition-transform duration-200 hover:-translate-y-1"
            >
              <Art post={post} className="h-44 w-full" />
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center gap-3">
                  <Chip post={post} />
                  <span className="font-sans text-xs text-midgrey">{post.date}</span>
                </div>
                <h3 className="font-display text-xl font-bold leading-snug text-ink group-hover:text-coral">
                  {post.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-midgrey">{post.excerpt}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-block rounded-full bg-coral-cta px-7 py-3 font-sans font-semibold text-white transition-colors hover:bg-coral-cta-hover"
          >
            Read all stories
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  V2 · Featured + headlines rail (Mural / Vimeo-style)               */
/* ------------------------------------------------------------------ */

function V2Featured() {
  const featured = POSTS[0];
  const rail = POSTS.slice(1, 5);
  return (
    <section className="w-full py-16">
      <LabLabel n={2} name="Featured + rail" note="one hero post, latest headlines beside it" />
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="w-full max-w-none font-display text-4xl font-extrabold tracking-tight text-ink sm:w-auto sm:text-5xl">
            From the blog
          </h2>
          <a href="#" className="font-sans text-sm font-semibold text-coral hover:underline">
            All posts →
          </a>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Featured */}
          <a href="#" className="group lg:col-span-3">
            <Art post={featured} className="h-72 w-full rounded-quest-lg sm:h-96" />
            <div className="mt-5 flex items-center gap-3">
              <Chip post={featured} />
              <span className="font-sans text-xs text-midgrey">
                {featured.date} · {featured.read}
              </span>
            </div>
            <h3 className="mt-3 font-display text-3xl font-extrabold leading-tight text-ink group-hover:text-coral">
              {featured.title}
            </h3>
            <p className="mt-3 max-w-xl font-sans text-base text-midgrey">{featured.excerpt}</p>
          </a>

          {/* Headlines rail */}
          <div className="flex flex-col lg:col-span-2">
            <p className="mb-2 font-display text-lg font-bold text-ink">Latest</p>
            {rail.map((post, i) => (
              <a
                key={post.title}
                href="#"
                className={`group flex items-start gap-4 rounded-quest px-4 py-5 ${
                  i % 2 === 0 ? 'bg-offwhite' : 'bg-white'
                }`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-quest ${post.categoryColor}`}
                  aria-hidden="true"
                >
                  <span className="text-xl">{post.emoji}</span>
                </div>
                <div>
                  <span className="font-sans text-xs font-semibold uppercase tracking-wide text-midgrey">
                    {post.category}
                  </span>
                  <h4 className="mt-1 font-display text-base font-bold leading-snug text-ink group-hover:text-coral">
                    {post.title}
                  </h4>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  V3 · The Quest Journal — numbered editorial rows (Front / Garden)  */
/* ------------------------------------------------------------------ */

function V3Journal() {
  return (
    <section className="w-full bg-offwhite py-16">
      <LabLabel n={3} name="The Quest Journal" note="numbered editorial rows, fills not strokes" />
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="mb-12">
          <p className="font-sans text-sm font-semibold uppercase tracking-widest text-coral">
            Blog &amp; News
          </p>
          <h2 className="mt-2 w-full font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            The Quest Journal
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {POSTS.slice(0, 5).map((post, i) => (
            <a
              key={post.title}
              href="#"
              className="group grid grid-cols-[auto_1fr] items-center gap-6 rounded-quest-lg bg-white p-6 transition-transform duration-200 hover:-translate-y-0.5 sm:grid-cols-[auto_1fr_auto_auto]"
            >
              <span className="font-display text-2xl font-extrabold text-coral">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold leading-snug text-ink group-hover:text-coral sm:text-2xl">
                  {post.title}
                </h3>
                <p className="mt-1 hidden font-sans text-sm text-midgrey sm:block">
                  {post.excerpt}
                </p>
              </div>
              <span className="hidden sm:block">
                <Chip post={post} />
              </span>
              <span className="hidden font-sans text-sm text-midgrey sm:block">{post.date}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  V4 · Color-block bento (Canva-style, matches homepage #bento)      */
/* ------------------------------------------------------------------ */

function V4Bento() {
  const [big, ...rest] = POSTS;
  return (
    <section className="w-full py-16">
      <LabLabel n={4} name="Color-block bento" note="mixed-size saturated tiles, Quest palette" />
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mx-auto w-full font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            News from the field
          </h2>
          <p className="mt-3 font-sans text-lg text-midgrey">
            Real stories. Real humans. Really recent.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Big featured tile */}
          <a
            href="#"
            className="group relative flex min-h-72 flex-col justify-end overflow-hidden rounded-quest-lg bg-coral p-7 transition-transform duration-200 hover:-translate-y-1 sm:col-span-2 sm:row-span-2"
          >
            <span className="absolute right-6 top-6 text-7xl" aria-hidden="true">
              {big.emoji}
            </span>
            <span className="mb-3 inline-block w-fit rounded-full bg-white/90 px-3 py-1 font-sans text-xs font-semibold text-coral">
              {big.category}
            </span>
            <h3 className="font-display text-3xl font-extrabold leading-tight text-white">
              {big.title}
            </h3>
            <p className="mt-2 font-sans text-sm text-white/85">{big.date} · {big.read}</p>
          </a>

          {rest.slice(0, 4).map((post) => (
            <a
              key={post.title}
              href="#"
              className={`group relative flex min-h-56 flex-col justify-end overflow-hidden rounded-quest-lg p-6 transition-transform duration-200 hover:-translate-y-1 ${post.categoryColor}`}
            >
              <span className="absolute right-5 top-5 text-4xl" aria-hidden="true">
                {post.emoji}
              </span>
              <span
                className={`mb-2 font-sans text-xs font-semibold uppercase tracking-wide ${
                  post.chipText === 'text-ink' ? 'text-ink/70' : 'text-white/80'
                }`}
              >
                {post.category}
              </span>
              <h3
                className={`font-display text-lg font-extrabold leading-snug ${post.chipText}`}
              >
                {post.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  V5 · Ink press-room (Linear / Rox-style) with news ticker          */
/* ------------------------------------------------------------------ */

function V5Press() {
  const items = POSTS.slice(0, 3);
  return (
    <section className="w-full bg-ink py-16">
      <div className="mx-auto mb-10 flex w-full max-w-6xl items-baseline gap-4 px-6">
        <span className="rounded-full bg-white px-4 py-1.5 font-sans text-sm font-semibold text-ink">
          V5
        </span>
        <span className="font-display text-xl font-bold text-white">Ink press-room</span>
        <span className="hidden font-sans text-sm text-white/50 sm:inline">
          dark section, ticker + minimal cards
        </span>
      </div>

      {/* Ticker */}
      <div className="mb-12 overflow-hidden bg-coral py-3">
        <div className="flex whitespace-nowrap font-sans text-sm font-semibold text-white [animation:blog-ticker_30s_linear_infinite]">
          {[...POSTS, ...POSTS].map((post, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-2">
              <span aria-hidden="true">{post.emoji}</span> {post.title}
              <span className="ml-6 opacity-60" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="w-full max-w-none font-display text-4xl font-extrabold tracking-tight text-white sm:w-auto sm:text-5xl">
            Press &amp; updates
          </h2>
          <a href="#" className="font-sans text-sm font-semibold text-lime hover:underline">
            Newsroom →
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((post) => (
            <a
              key={post.title}
              href="#"
              className="group flex flex-col gap-4 rounded-quest-lg bg-white/5 p-6 transition-colors hover:bg-white/10"
            >
              <Art post={post} className="h-36 w-full rounded-quest" />
              <div className="flex items-center gap-3">
                <span className="font-sans text-xs font-semibold uppercase tracking-wide text-lime">
                  {post.category}
                </span>
                <span className="font-sans text-xs text-white/50">{post.date}</span>
              </div>
              <h3 className="font-display text-xl font-bold leading-snug text-white group-hover:text-lime">
                {post.title}
              </h3>
            </a>
          ))}
        </div>
      </div>

      {/* keyframes for the ticker, scoped to this lab page */}
      <style>{`@keyframes blog-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Lab page                                                           */
/* ------------------------------------------------------------------ */

export default function BlogNewsLab() {
  return (
    <main className="min-h-screen w-full bg-white font-sans">
      <div className="mx-auto w-full max-w-6xl px-6 pb-4 pt-16">
        <p className="font-sans text-sm font-semibold uppercase tracking-widest text-coral">
          Lab / Prototype
        </p>
        <h1 className="mt-2 w-full font-display text-4xl font-extrabold tracking-tight text-ink sm:text-6xl">
          Blog &amp; News section
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-lg text-midgrey">
          Five variations for the section that sits below Questions &amp; Answers on the
          homepage. Same mock content across all five so the layouts compare fairly.
        </p>
      </div>

      <V1Grid />
      <V2Featured />
      <V3Journal />
      <V4Bento />
      <V5Press />

      <footer className="py-16 text-center font-sans text-sm text-midgrey">
        Lab page · not linked from navigation · blog/manifesto-page-update-ft-smammar
      </footer>
    </main>
  );
}
