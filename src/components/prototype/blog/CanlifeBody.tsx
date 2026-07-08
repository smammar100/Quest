'use client';

import { useState } from 'react';
import { BLOG_POSTS, CATEGORIES, type BlogCategory } from '../../../lib/data/blog-posts';
import { Cover } from './shared';

/* V7 — the Canlife "Blog Body" (Figma node 4375-5230) in Quest branding.
   Structure is faithful to the design: centered display headline, pill search
   field, "Trending topic" pill row, 3×2 card grid (big-radius cover, title,
   "Read more" pill), centered "See more". Quest twists: Bricolage headline,
   beige fills instead of hairline strokes, coral accents — and the search box
   and trending pills actually filter the grid. */

const INITIAL_COUNT = 6;

export default function CanlifeBody() {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState<BlogCategory | null>(null);
  const [showAll, setShowAll] = useState(false);

  const q = query.trim().toLowerCase();
  const matches = BLOG_POSTS.filter(
    (p) =>
      (!topic || p.category === topic) &&
      (!q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)),
  );
  const posts = showAll ? matches : matches.slice(0, INITIAL_COUNT);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-16 px-6 py-20">
      {/* ---- Header: headline + search + trending topics ---- */}
      <div className="flex w-full flex-col items-center gap-6">
        <h1 className="w-full max-w-3xl text-center font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-6xl">
          Discover the latest stories from the real world.
        </h1>

        {/* pill search field — coral icon button, beige fill (no strokes) */}
        <div className="flex h-12 w-full max-w-md items-center gap-2 rounded-full bg-[#f2ecdf] py-2 pl-5 pr-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories"
            className="min-w-0 flex-1 bg-transparent font-sans text-sm text-ink outline-none placeholder:text-midgrey"
          />
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-coral">
            <span className="material-symbols-outlined !text-[16px] text-white" aria-hidden="true">
              search
            </span>
          </span>
        </div>

        {/* trending topic pills — click to filter, click again to clear */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="font-sans text-sm font-semibold text-ink">Trending topic</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setTopic(topic === cat ? null : cat)}
              className={`h-10 rounded-full px-4 font-sans text-sm font-semibold transition-colors ${
                topic === cat
                  ? 'bg-ink text-white'
                  : 'bg-[#f2ecdf] text-ink/70 hover:bg-coral-tint hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ---- Article card grid (3×2 like the design) ---- */}
      <div className="grid w-full grid-cols-1 gap-x-5 gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="flex flex-col items-start gap-6">
            <a href="#" className="group w-full">
              <Cover
                post={post}
                className="h-64 w-full rounded-[32px] transition-transform duration-200 group-hover:-translate-y-1"
              />
            </a>
            <div className="flex flex-col items-start gap-3">
              <a href="#">
                <h2 className="font-display text-2xl font-bold leading-snug tracking-tight text-ink hover:text-coral">
                  {post.title}
                </h2>
              </a>
              <a
                href="#"
                className="flex h-11 items-center rounded-full bg-[#f2ecdf] px-5 font-sans text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
              >
                Read more
              </a>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="font-sans text-midgrey">No stories match — try another search.</p>
      )}

      {/* ---- See more ---- */}
      {!showAll && matches.length > INITIAL_COUNT && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="h-11 rounded-full bg-[#f2ecdf] px-6 font-sans text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
        >
          See more
        </button>
      )}
    </div>
  );
}
