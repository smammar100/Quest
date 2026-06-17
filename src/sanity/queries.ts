import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";

// Shape returned by the category-by-slug query. All sections are optional
// so the template can fall back to lib/data/quests-data.ts where a field
// hasn't been authored in the Studio yet.
export type SanityCategory = {
  title: string;
  slug: string;
  icon?: string;
  heroHeading?: string;
  heroSubtext?: string;
  heroImage?: { asset?: SanityImageSource; alt?: string } | null;
  count?: string;
  earnings?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    bandMin?: number;
    bandMax?: number;
    bars?: number[];
    medianIndex?: number;
    axisLabel?: string;
  } | null;
  faqs?: { question: string; answer: string }[] | null;
  subcategories?: { title: string; slug?: string; blurb?: string }[] | null;
  quests?:
    | {
        title: string;
        pay?: string;
        payType?: string;
        posted?: string;
        time?: string;
        teaser?: string;
      }[]
    | null;
};

const CATEGORY_BY_SLUG = /* groq */ `
*[_type == "category" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  icon,
  heroHeading,
  heroSubtext,
  heroImage{asset, alt},
  count,
  earnings,
  faqs[]{question, answer},
  subcategories[]{title, "slug": slug.current, blurb},
  quests[]{title, pay, payType, posted, time, teaser}
}`;

// Fetch a single category's CMS content by slug. Returns null if no
// document exists yet (the page then renders entirely from local data).
export async function getSanityCategory(
  slug: string
): Promise<SanityCategory | null> {
  // No-store so Studio edits appear on the next reload (dynamic). Swap to
  // `{ next: { tags: ["category"] } }` + revalidateTag for cached production.
  // Resilient: if Sanity is unreachable (network blip / outage), return null
  // so the page falls back to local data instead of crashing.
  try {
    return await sanityClient.fetch(
      CATEGORY_BY_SLUG,
      { slug },
      { cache: "no-store" }
    );
  } catch (err) {
    console.error(`[sanity] getSanityCategory("${slug}") failed:`, err);
    return null;
  }
}
