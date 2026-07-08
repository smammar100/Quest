import type { Metadata } from 'next';
import SiteHeader from '../../../../../components/layout/SiteHeader';
import SiteFooter from '../../../../../components/layout/SiteFooter';
import {
  BLOG_POSTS,
  Chip,
  Cover,
  NewsletterBlock,
  ReadTime,
  VariantSwitcher,
} from '../../../../../components/prototype/blog/shared';
import { CATEGORIES } from '../../../../../lib/data/blog-posts';

export const metadata: Metadata = {
  title: 'Blog · V3 Editorial split',
  robots: { index: false, follow: false },
};

/* V3 — V2 plus: editorial front page (Substack/WSJ). Featured story with a
   "Most popular" rail beside it, then category-sectioned rows and a newsletter. */
export default function BlogV3() {
  const featured = BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0];
  const popular = BLOG_POSTS.filter((p) => p.popular && p.slug !== featured.slug).slice(0, 4);
  const sections = CATEGORIES.map((cat) => ({
    cat,
    posts: BLOG_POSTS.filter((p) => p.category === cat && p.slug !== featured.slug).slice(0, 3),
  })).filter((s) => s.posts.length > 0).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen w-full bg-white pb-24 font-sans">
        <div className="mx-auto w-full max-w-6xl px-6 pb-10 pt-16">
          <p className="font-sans text-sm font-semibold uppercase tracking-widest text-coral">
            Blog &amp; News
          </p>
          <h1 className="mt-3 w-full font-display text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">
            The Quest Journal
          </h1>
        </div>

        {/* Front page: featured + popular rail */}
        <div className="mx-auto mb-20 grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-3">
          <a href="#" className="group lg:col-span-2">
            <Cover post={featured} className="aspect-[16/9] w-full rounded-quest-lg" />
            <div className="mt-5 flex items-center gap-3">
              <Chip post={featured} />
              <span className="font-sans text-xs text-midgrey">{featured.date}</span>
              <span className="ml-auto">
                <ReadTime post={featured} />
              </span>
            </div>
            <h2 className="mt-3 w-full font-display text-3xl font-extrabold leading-tight text-ink group-hover:text-coral sm:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-3 max-w-2xl font-sans text-base text-midgrey">{featured.excerpt}</p>
          </a>

          <aside>
            <h3 className="mb-2 font-display text-lg font-bold text-ink">Most popular</h3>
            <div className="flex flex-col">
              {popular.map((post, i) => (
                <a
                  key={post.slug}
                  href="#"
                  className={`group flex items-start gap-4 rounded-quest px-4 py-5 ${
                    i % 2 === 0 ? 'bg-[#f2ecdf]' : 'bg-white'
                  }`}
                >
                  <span className="font-display text-xl font-extrabold text-coral">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-wide text-midgrey">
                      {post.category}
                    </span>
                    <h4 className="mt-0.5 font-display text-base font-bold leading-snug text-ink group-hover:text-coral">
                      {post.title}
                    </h4>
                  </div>
                </a>
              ))}
            </div>
          </aside>
        </div>

        {/* Category sections */}
        {sections.map(({ cat, posts }) => (
          <div key={cat} className="mx-auto mb-16 w-full max-w-6xl px-6">
            <div className="mb-6 flex items-baseline justify-between">
              <h3 className="font-display text-2xl font-extrabold text-ink">{cat}</h3>
              <a href="#" className="font-sans text-sm font-semibold text-coral hover:underline">
                More {cat.toLowerCase()} →
              </a>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {posts.map((post) => (
                <a key={post.slug} href="#" className="group">
                  <Cover post={post} className="aspect-[3/2] w-full rounded-quest" />
                  <div className="mt-3 flex items-center gap-3">
                    <span className="font-sans text-xs text-midgrey">{post.date}</span>
                    <span className="ml-auto">
                      <ReadTime post={post} />
                    </span>
                  </div>
                  <h4 className="mt-2 font-display text-lg font-bold leading-snug text-ink group-hover:text-coral">
                    {post.title}
                  </h4>
                </a>
              ))}
            </div>
          </div>
        ))}

        <div className="mx-auto w-full max-w-6xl px-6">
          <NewsletterBlock />
        </div>
      </main>
      <SiteFooter />
      <VariantSwitcher active={3} />
    </>
  );
}
