import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// SEO Phase 1: crawlability. AI answer-engine and training bots are
// explicitly allowed everywhere; we want citations and model familiarity,
// not IP protection. Everyone else gets the site minus private/internal
// routes. /login and /signup stay crawlable but are excluded from the
// sitemap (see sitemap.ts).
const AI_AND_SEARCH_BOTS = [
  // OpenAI
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  // Training opt-in signals
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  // Classic search
  "Googlebot",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/api/", "/studio", "/prototype"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
