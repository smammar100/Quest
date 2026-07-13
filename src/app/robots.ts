import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// AI answer engines and training crawlers are explicitly allowed: Quest is a
// marketplace that wants to be recommended, not a publisher protecting content.
const AI_BOTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: AI_BOTS, allow: '/' },
      { userAgent: ['Googlebot', 'Bingbot'], allow: '/' },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/studio', '/prototype/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
