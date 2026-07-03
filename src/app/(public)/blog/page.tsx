import type { Metadata } from 'next';
import SiteHeader from '../../../components/layout/SiteHeader';
import SiteFooter from '../../../components/layout/SiteFooter';
import FilterableGrid from '../../../components/prototype/blog/FilterableGrid';
import { Chip, Cover, PageHero, ReadTime } from '../../../components/prototype/blog/shared';
import { BLOG_POSTS, CATEGORIES } from '../../../lib/data/blog-posts';
import { getBlogPosts, getBlogCategories } from '../../../sanity/queries';

export const metadata: Metadata = {
  title: 'Blog & News — Quest',
  description:
    'Hero stories, product updates, and field notes from the humans getting real-world work done.',
};

/* The real blog index — promoted from lab variation V2 (featured + filters).
   Posts come from Sanity ("blog" schema); falls back to local mock data when
   the Studio is empty or unreachable. */
export default async function BlogPage() {
  const [sanityPosts, sanityCats] = await Promise.all([
    getBlogPosts(),
    getBlogCategories(),
  ]);
  const posts = sanityPosts.length ? sanityPosts : BLOG_POSTS;
  const categories = sanityCats.length ? sanityCats : CATEGORIES;

  const featured = posts.find((p) => p.featured) ?? posts[0];
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen w-full bg-white pb-24 font-sans">
        <PageHero
          kicker=""
          title="Stories from the real world"
          lede="Hero stories, product updates, and field notes from the humans getting work done."
        />

        {/* Featured story — split card */}
        <div className="mb-16 w-full px-[var(--page-pad)]">
          <a
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-quest-lg bg-[#f2ecdf] transition-transform duration-200 hover:-translate-y-1 lg:grid-cols-2"
          >
            <Cover post={featured} className="aspect-[3/2] w-full lg:aspect-auto lg:h-full" />
            <div className="flex flex-col justify-center gap-4 p-8 sm:p-12">
              <div className="flex items-center gap-3">
                <Chip post={featured} />
                <span className="font-sans text-xs text-midgrey">{featured.date}</span>
                <span className="ml-auto">
                  <ReadTime post={featured} />
                </span>
              </div>
              <h2 className="w-full font-display text-3xl font-extrabold leading-tight text-ink group-hover:text-coral sm:text-4xl">
                {featured.title}
              </h2>
              <p className="font-sans text-base leading-relaxed text-midgrey">
                {featured.excerpt}
              </p>
              <span className="font-sans text-sm font-semibold text-coral">
                Read the story →
              </span>
            </div>
          </a>
        </div>

        {/* Filterable grid (featured post excluded — it's already above) */}
        <div className="w-full px-[var(--page-pad)]">
          <FilterableGrid
            allPosts={posts}
            categories={categories}
            skipSlugs={[featured.slug]}
          />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
