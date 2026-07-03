import type { Metadata } from 'next';
import SiteHeader from '../../../../../components/layout/SiteHeader';
import SiteFooter from '../../../../../components/layout/SiteFooter';
import FilterableGrid from '../../../../../components/prototype/blog/FilterableGrid';
import { BLOG_POSTS, Chip, Cover, PageHero, ReadTime, VariantSwitcher } from '../../../../../components/prototype/blog/shared';

export const metadata: Metadata = {
  title: 'Blog · V2 Featured + filters',
  robots: { index: false, follow: false },
};

/* V2 — V1 plus: a featured hero story and WORKING category filter pills. */
export default function BlogV2() {
  const featured = BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0];
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen w-full bg-white pb-24 font-sans">
        <PageHero
          title="Stories from the real world"
          lede="Hero stories, product updates, and field notes from the humans getting work done."
        />

        {/* Featured story — split card */}
        <div className="mx-auto mb-16 w-full max-w-6xl px-6">
          <a
            href="#"
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
        <div className="mx-auto w-full max-w-6xl px-6">
          <FilterableGrid skipSlugs={[featured.slug]} />
        </div>
      </main>
      <SiteFooter />
      <VariantSwitcher active={2} />
    </>
  );
}
