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

// ── Browse mega-menu lists ──────────────────────────────────────────────────

// One entry in the Browse mega-menu. `sub` only applies to the hero list
// (it deep-links to a subcategory filter); the poster list links to /hire.
export type MenuItem = { label: string; category: string; sub?: string };
export type MenuLists = { poster: MenuItem[]; hero: MenuItem[] };

// Includes BOTH the 5 vertical docs and the flat menu-category docs. Verticals
// have no `vertical` field, so coalesce falls back to their own slug (links to
// /quests/<slug>); menu categories use their parent vertical (+ sub for hero).
const MENU_LISTS = /* groq */ `{
  "hero": *[_type == "category"]{
    "label": title,
    "category": coalesce(vertical, slug.current),
    "sub": subSlug
  },
  "poster": *[_type == "citizen"]{
    "label": title,
    "category": coalesce(vertical, slug.current)
  }
}`;

// Drives the two Browse-menu tabs from Sanity: the "Hire humans" (poster) tab
// from each citizen doc's capabilities, the "Get hired" (Hero) tab from each
// category doc's subcategories. Returns null on failure so the header can fall
// back to the static list in lib/data/quests-data.ts.
export async function getMenuLists(): Promise<MenuLists | null> {
  try {
    const raw = await sanityClient.fetch<{
      hero: { label: string; category: string; sub?: string }[];
      poster: { label: string; category: string }[];
    }>(MENU_LISTS, {}, { cache: "no-store" });

    const byLabel = (a: MenuItem, b: MenuItem) => a.label.localeCompare(b.label);

    // Both tabs now read standalone "menu category" docs (flat lists):
    // hero = category docs (isMenuCategory), poster = citizen docs (isMenuCategory).
    const hero = (raw.hero ?? [])
      .map((i) => ({ label: i.label, category: i.category, sub: i.sub }))
      .filter((i) => i.label && i.category)
      .sort(byLabel);
    const poster = (raw.poster ?? [])
      .map((i) => ({ label: i.label, category: i.category }))
      .filter((i) => i.label && i.category)
      .sort(byLabel);

    if (!hero.length && !poster.length) return null;
    return { poster, hero };
  } catch (err) {
    console.error("[sanity] getMenuLists failed:", err);
    return null;
  }
}

// ── Citizen (demand-side /quests/[slug]/hire page) ──────────────────────────

// Shape returned by the citizen-by-slug query. All sections optional so the
// /hire template falls back to local data where a field isn't authored yet.
export type SanityCitizen = {
  title: string;
  slug: string;
  icon?: string;
  heroHeading?: string;
  heroSubtext?: string;
  heroImage?: { asset?: SanityImageSource; alt?: string } | null;
  capabilitiesEyebrow?: string;
  capabilitiesHeading?: string;
  capabilities?:
    | {
        title: string;
        blurb?: string;
        image?: { asset?: SanityImageSource; alt?: string } | null;
      }[]
    | null;
  questsEyebrow?: string;
  questsHeading?: string;
  questsSubtext?: string;
  quests?:
    | { title: string; pay?: string; posted?: string; time?: string; teaser?: string }[]
    | null;
  faqHeading?: string;
  faqSubtext?: string;
  faqs?: { question: string; answer: string }[] | null;
};

const CITIZEN_BY_SLUG = /* groq */ `
*[_type == "citizen" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  icon,
  heroHeading,
  heroSubtext,
  heroImage{asset, alt},
  capabilitiesEyebrow,
  capabilitiesHeading,
  capabilities[]{title, blurb, image{asset, alt}},
  questsEyebrow,
  questsHeading,
  questsSubtext,
  quests[]{title, pay, posted, time, teaser},
  faqHeading,
  faqSubtext,
  faqs[]{question, answer}
}`;

// Fetch a single citizen page's CMS content by slug. Returns null if no
// document exists yet (the /hire page then renders entirely from local data).
export async function getSanityCitizen(
  slug: string
): Promise<SanityCitizen | null> {
  try {
    return await sanityClient.fetch(
      CITIZEN_BY_SLUG,
      { slug },
      { cache: "no-store" }
    );
  } catch (err) {
    console.error(`[sanity] getSanityCitizen("${slug}") failed:`, err);
    return null;
  }
}
