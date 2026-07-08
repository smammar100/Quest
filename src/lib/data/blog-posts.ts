// Mock posts shared by every /prototype/blog variation (and the homepage #blog section).
// Swap for Sanity/CMS content when the blog ships.

export type BlogPost = {
  slug: string;
  // Local posts use the fixed union; Sanity-authored posts may use any
  // category title (accent then comes from `accent` below, not CATEGORY_ACCENT).
  category: BlogCategory | string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  author: string;
  img: string;
  alt: string;
  featured?: boolean;
  popular?: boolean;
  // Set by Sanity posts: the resolved palette accent + Portable Text body.
  accent?: { bg: string; text: string };
  body?: unknown[];
};

export type BlogCategory =
  | 'Manifesto'
  | 'Product'
  | 'Community'
  | 'Field data'
  | 'News'
  | 'Guides';

export const CATEGORIES: BlogCategory[] = [
  'Manifesto',
  'Product',
  'Community',
  'Field data',
  'News',
  'Guides',
];

// Quest palette accent per category — used for chips and color-block art
export const CATEGORY_ACCENT: Record<BlogCategory, { bg: string; text: string }> = {
  Manifesto: { bg: 'bg-coral', text: 'text-white' },
  Product: { bg: 'bg-electric', text: 'text-white' },
  Community: { bg: 'bg-marigold', text: 'text-ink' },
  'Field data': { bg: 'bg-violet', text: 'text-white' },
  News: { bg: 'bg-lime', text: 'text-ink' },
  Guides: { bg: 'bg-sky', text: 'text-ink' },
};

// Resolve a post's chip/cover accent: prefer a CMS-provided accent, else the
// fixed local map, else fall back to coral so an unknown category never crashes.
export function accentFor(post: BlogPost): { bg: string; text: string } {
  return (
    post.accent ??
    CATEGORY_ACCENT[post.category as BlogCategory] ?? {
      bg: 'bg-coral',
      text: 'text-white',
    }
  );
}

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'why-humans-still-matter',
    category: 'Manifesto',
    title: 'Why humans still matter in the age of AI',
    excerpt:
      'AI can write the plan, but someone still has to show up. Our founding manifesto on the work software will never finish.',
    date: 'Jun 28, 2026',
    read: '6 min read',
    author: 'The Quest Team',
    img: u('photo-1521737604893-d14cc237f11d'),
    alt: 'A team stacking hands together over a work table',
    featured: true,
    popular: true,
  },
  {
    slug: 'quest-api-for-agents',
    category: 'Product',
    title: 'Let your AI agent hire a human: the Quest API',
    excerpt:
      'Your agent can now post tasks, compare matched Heroes, and dispatch real-world work — all without leaving its loop.',
    date: 'Jun 21, 2026',
    read: '4 min read',
    author: 'Dev Rel',
    img: u('photo-1485827404703-89b55fcc595e'),
    alt: 'A white robot looking up',
    popular: true,
  },
  {
    slug: 'heroes-jakarta-10000',
    category: 'Community',
    title: 'Meet the Heroes: 10,000 tasks in Jakarta',
    excerpt:
      'From parcel runs to event crews — how our first city hit five figures of completed quests in under a year.',
    date: 'Jun 14, 2026',
    read: '5 min read',
    author: 'Community Team',
    img: u('photo-1449824913935-59a10b8d2000'),
    alt: 'A city street with tall buildings and taxis',
    popular: true,
  },
  {
    slug: 'ground-truth-field-data',
    category: 'Field data',
    title: 'Ground truth: why AI labs pay for real-world data',
    excerpt:
      'Store shelves, street signs, spoken dialects. The datasets AI needs most can only be collected by people on the ground.',
    date: 'Jun 7, 2026',
    read: '7 min read',
    author: 'Research',
    img: u('photo-1504384308090-c894fdcc538d'),
    alt: 'A person taking notes in front of a laptop',
    popular: true,
  },
  {
    slug: 'series-a-announcement',
    category: 'News',
    title: 'Quest raises Series A to scale human work',
    excerpt:
      'New funding to grow the marketplace where AI agents and businesses hire trusted people for physical work.',
    date: 'May 30, 2026',
    read: '3 min read',
    author: 'The Quest Team',
    img: u('photo-1556761175-5973dc0f32e7'),
    alt: 'Colleagues talking around a laptop in an office',
  },
  {
    slug: 'brief-a-human',
    category: 'Guides',
    title: 'How to brief a human like you brief an AI',
    excerpt:
      'Clear task, location, deadline, budget. A short guide to getting great results from real people, every time.',
    date: 'May 22, 2026',
    read: '4 min read',
    author: 'Ops Team',
    img: u('photo-1454165804606-c3d57bc86b40'),
    alt: 'Hands planning work on paper next to a laptop',
  },
  {
    slug: 'errand-economy',
    category: 'Community',
    title: 'The errand economy: a day with three Heroes',
    excerpt:
      'We shadowed three Heroes through parcel pickups, furniture builds, and a mystery shop. Here is what a day of quests looks like.',
    date: 'May 15, 2026',
    read: '8 min read',
    author: 'Community Team',
    img: u('photo-1441986300917-64674bd600d8'),
    alt: 'A person carrying shopping bags through a store',
  },
  {
    slug: 'escrow-trust-design',
    category: 'Product',
    title: 'Designing trust: how escrow keeps both sides safe',
    excerpt:
      'Funds held until the work is done, ratings on both sides, and background checks where it matters. Trust is a product feature.',
    date: 'May 8, 2026',
    read: '5 min read',
    author: 'Product Team',
    img: u('photo-1554224155-6726b3ff858f'),
    alt: 'A calculator and financial documents on a desk',
  },
  {
    slug: 'store-audit-playbook',
    category: 'Field data',
    title: 'The store-audit playbook: photos AI can learn from',
    excerpt:
      'Angles, lighting, labeling. How we teach Heroes to capture retail shelves so the data is actually usable downstream.',
    date: 'Apr 30, 2026',
    read: '6 min read',
    author: 'Research',
    img: u('photo-1441984904996-e0b6ba687e04'),
    alt: 'Clothing rails inside a retail store',
  },
  {
    slug: 'ugc-on-location',
    category: 'Guides',
    title: 'On-location UGC that converts: a field guide',
    excerpt:
      'Real places beat green screens. What to put in the brief when you hire a human to shoot where it actually happens.',
    date: 'Apr 22, 2026',
    read: '5 min read',
    author: 'Content Team',
    img: u('photo-1492691527719-9d1e07e534b4'),
    alt: 'A person filming with a phone on a stabilizer outdoors',
  },
  {
    slug: 'agents-hire-humans-report',
    category: 'News',
    title: 'Report: AI agents now dispatch 1 in 5 quests',
    excerpt:
      'Six months after the agent API launch, a fifth of all tasks arrive from software, not people. The numbers inside.',
    date: 'Apr 15, 2026',
    read: '4 min read',
    author: 'The Quest Team',
    img: u('photo-1551288049-bebda4e38f71'),
    alt: 'Charts and analytics on a laptop screen',
  },
  {
    slug: 'work-ai-cant-finish',
    category: 'Manifesto',
    title: 'The last mile belongs to people',
    excerpt:
      'Software eats the plan; people finish the job. Notes on the physical, local, urgent work at the edge of automation.',
    date: 'Apr 8, 2026',
    read: '5 min read',
    author: 'The Quest Team',
    img: u('photo-1529156069898-49953e39b3ac'),
    alt: 'People walking across a city crosswalk',
  },
];
