import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { QUEST_CATEGORIES } from '@/lib/data/quests-data';
import { BLOG_POSTS } from '@/lib/data/blog-posts';

// Auto-generated at build time. Rules:
// - only canonical, indexable pages (nothing disallowed in robots.ts)
// - lastModified only where an honest source exists (blog post dates);
//   synthetic build-time dates are a known spam signal, so static pages omit it
// - no <priority>/<changefreq>: Google ignores both

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '/',
    '/agents',
    '/business',
    '/earn',
    '/manifesto',
    '/blog',
    '/browse-quest',
    '/terms',
    '/privacy',
    '/login',
    '/signup',
  ].map((path) => ({ url: path === '/' ? SITE_URL : `${SITE_URL}${path}` }));

  const categoryPages = QUEST_CATEGORIES.flatMap((c) => [
    { url: `${SITE_URL}/quests/${c.slug}` },
    { url: `${SITE_URL}/quests/${c.slug}/hire` },
  ]);

  const blogPosts = BLOG_POSTS.map((post) => {
    // post.date is a display string like "Jun 28, 2026". Emit it as a plain
    // YYYY-MM-DD lastmod; serializing the Date directly would shift it a day
    // depending on the build machine's timezone.
    const d = new Date(post.date);
    const iso = [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, '0'),
      String(d.getDate()).padStart(2, '0'),
    ].join('-');
    return { url: `${SITE_URL}/blog/${post.slug}`, lastModified: iso };
  });

  return [...staticPages, ...categoryPages, ...blogPosts];
}
