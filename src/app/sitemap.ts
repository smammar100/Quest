import type { MetadataRoute } from "next";
import { QUEST_CATEGORIES } from "@/lib/data/quests-data";
import { sanityClient } from "@/sanity/client";
import { SITE_URL } from "@/lib/site";

// SEO Phase 1: sitemap. Rules (see phase-1-crawlability ticket):
// - Only canonical, indexable marketing pages. No /studio, /prototype,
//   /dashboard, /login, /signup.
// - lastModified only where we have an honest source (Sanity _updatedAt).
//   Static pages omit it; a missing date beats a synthetic one, which
//   Google detects and then ignores site-wide.
// - No priority/changefreq: Google ignores both.

type CategoryStamp = { slug: string; _updatedAt: string };

const CATEGORY_STAMPS = /* groq */ `
*[_type == "category" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Honest lastmod for category pages that have an authored Sanity doc.
  // Resilient: if Sanity is unreachable, entries just omit lastModified.
  let stamps = new Map<string, string>();
  try {
    const docs = await sanityClient.fetch<CategoryStamp[]>(CATEGORY_STAMPS);
    stamps = new Map(docs.map((d) => [d.slug, d._updatedAt]));
  } catch (err) {
    console.error("[sitemap] Sanity category fetch failed:", err);
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/quests` },
    { url: `${SITE_URL}/browse-quest` },
  ];

  // Valid category routes come from QUEST_CATEGORIES (same source as
  // generateStaticParams in quests/[category]/page.tsx).
  const categoryPages: MetadataRoute.Sitemap = QUEST_CATEGORIES.map((c) => {
    const lastMod = stamps.get(c.slug);
    return {
      url: `${SITE_URL}/quests/${c.slug}`,
      ...(lastMod ? { lastModified: lastMod } : {}),
    };
  });

  return [...staticPages, ...categoryPages];
}
