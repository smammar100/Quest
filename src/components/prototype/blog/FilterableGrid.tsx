'use client';

import { useState } from 'react';
import { BLOG_POSTS, CATEGORIES, type BlogPost } from '../../../lib/data/blog-posts';
import { PostCard } from './shared';

/* Working category filter pills + grid. `skipSlugs` lets a page exclude posts
   it already renders elsewhere (e.g. the featured hero). `allPosts`/`categories`
   default to the local mock data but a page can pass Sanity-backed lists. */
export default function FilterableGrid({
  skipSlugs = [],
  allPosts = BLOG_POSTS,
  categories = CATEGORIES,
}: {
  skipSlugs?: string[];
  allPosts?: BlogPost[];
  categories?: string[];
}) {
  const [active, setActive] = useState<string>('All');
  const posts = allPosts.filter(
    (p) => !skipSlugs.includes(p.slug) && (active === 'All' || p.category === active),
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {['All', ...categories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-2 font-sans text-sm font-semibold transition-colors ${
              active === cat
                ? 'bg-ink text-white'
                : 'bg-[#f2ecdf] text-ink hover:bg-coral-tint'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="py-16 text-center font-sans text-midgrey">Nothing here yet.</p>
      )}
    </div>
  );
}
