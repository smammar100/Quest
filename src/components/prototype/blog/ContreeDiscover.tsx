'use client';

import { useState } from 'react';
import { BLOG_POSTS, CATEGORIES, type BlogCategory } from '../../../lib/data/blog-posts';
import { Chip, Cover, ReadTime } from './shared';

/* "Discover The Latest In..." — Contree's tabbed archive, Quest-ified.
   The design's hairline-bordered tab row becomes a beige fill bar (no strokes),
   and the tabs actually filter. Compact cards: cover, chip + read time, title. */

export default function ContreeDiscover() {
  const [active, setActive] = useState<BlogCategory | 'All'>('All');
  const posts = BLOG_POSTS.filter((p) => active === 'All' || p.category === active).slice(0, 9);

  return (
    <section className="mx-auto mt-24 w-full max-w-6xl px-6 sm:mt-32">
      <h2 className="mb-10 w-full text-center font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Discover the latest in&hellip;
      </h2>

      {/* Tab bar — beige band instead of the design's top/bottom hairlines */}
      <div className="mb-10 flex items-center gap-3 overflow-x-auto rounded-full bg-[#f2ecdf] p-2">
        <div className="flex flex-1 items-center gap-1">
          {(['All', ...CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`whitespace-nowrap rounded-full px-4 py-2 font-sans text-sm font-semibold transition-colors ${
                active === cat ? 'bg-ink text-white' : 'bg-transparent text-ink hover:bg-coral-tint'
              }`}
            >
              {cat === 'All' ? "What's new" : cat}
            </button>
          ))}
        </div>
        <span
          className="material-symbols-outlined shrink-0 pr-2 !text-[20px] text-ink/60"
          aria-hidden="true"
        >
          search
        </span>
      </div>

      {/* Compact card grid — cover, colored kicker, title. */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
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

      {posts.length === 0 && (
        <p className="py-16 text-center font-sans text-midgrey">Nothing here yet.</p>
      )}
    </section>
  );
}
