// Canonical site origin. Used by robots.ts, sitemap.ts, and metadataBase so
// every absolute URL the site emits agrees on one host.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hireahuman.quest';
