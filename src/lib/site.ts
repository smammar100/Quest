// Single source of truth for the site's canonical base URL.
// Overridable per-environment via NEXT_PUBLIC_SITE_URL (e.g. preview deploys);
// falls back to the confirmed production apex domain.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hireahuman.quest";
