/**
 * One-shot, idempotent Sanity migration.
 *
 * Pushes all five mega-menu verticals into Sanity for BOTH page types:
 *   • As a Hero  → `category` schema  → /quests/<slug>
 *   • As a human → `citizen`  schema  → /quests/<slug>/hire
 *
 * It uploads each vertical's hero image to the Sanity asset store, writes the
 * fully-populated documents with slugs that match the site routes
 * (field-data, errands, content, events, home), and deletes the old
 * mismatched documents/drafts so nothing is duplicated.
 *
 * The Sanity MCP cannot upload image binaries, so this runs as a script with a
 * write token.
 *
 * Run:
 *   SANITY_API_WRITE_TOKEN=<token> npx tsx scripts/sanity-migrate.ts
 *
 * Optional env (sensible defaults shown):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=2pg6mq7a
 *   NEXT_PUBLIC_SANITY_DATASET=production
 *
 * Create a write token at: https://sanity.io/manage → project 2pg6mq7a →
 * API → Tokens → "Editor" role.
 */

import { createClient } from '@sanity/client';
import { QUEST_CATEGORIES } from '../src/lib/data/quests-data';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2pg6mq7a';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error('✗ Missing SANITY_API_WRITE_TOKEN. Create an Editor token at sanity.io/manage and re-run.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-06-16',
  token,
  useCdn: false,
});

// Existing document ids in the dataset (queried Jun 2026). Reusing them updates
// each doc in place — fixing the mismatched slugs — instead of creating dupes.
const HERO_IDS: Record<string, string> = {
  'field-data': 'db9450a0-bc13-4be5-957a-757161aa5583',
  errands: 'daa9aa33-4838-46d4-84d9-b9e39062aee4',
  content: '971c3a4d-903a-45cb-8e16-311c9853b22c',
  events: '93313216-d6d7-4592-99f2-83fd32531b66',
  home: '43d3b653-937f-4ee6-845e-524378f3082d', // slug currently "home-services" → "home"
};
const CITIZEN_IDS: Record<string, string> = {
  'field-data': 'de86b251-6133-4964-995f-dafeb999ebf0',
  errands: '39d2b6e8-823c-4dcf-9c28-d4945a7e21bc',
  content: 'dc8cb8f3-ca32-479d-8ab9-9875e95f3320', // "content-creation" → "content"
  events: '7efd4256-12cc-4145-b1dd-ac87f37e124a', // "event-staff" → "events"
  home: 'b386cad2-a497-4d7e-b1c6-00634d00b11e', // "home-services" → "home"
};

const key = (p: string, i: number) => `${p}-${i}`;

// A plausible bell-ish earnings distribution (relative bar heights 0–100).
const BARS = [26, 52, 78, 100, 84, 58, 32];
const MEDIAN_INDEX = 3;

// Upload an Unsplash hero image to Sanity and return an image field value.
async function uploadImage(url: string, filename: string, alt: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload('image', buf, { filename });
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt,
  };
}

function heroDoc(c: (typeof QUEST_CATEGORIES)[number], image: unknown) {
  const low = c.label.toLowerCase();
  return {
    _id: HERO_IDS[c.slug],
    _type: 'category',
    title: c.label,
    slug: { _type: 'slug', current: c.slug },
    icon: c.icon,
    heroHeading: `${c.label} quests near you.`,
    heroSubtext: `Browse over ${c.count} open ${low} quests near you.`,
    heroImage: image,
    count: c.count,
    earnings: {
      eyebrow: 'The numbers',
      heading: `What ${low} Heroes earn.`,
      description: c.seo.intro,
      bandMin: c.earn.min,
      bandMax: c.earn.max,
      bars: BARS,
      medianIndex: MEDIAN_INDEX,
      axisLabel: 'Hourly rate (USD)',
    },
    quests: c.listings.slice(0, 12).map((l, i) => ({
      _key: key('q', i),
      _type: 'quest',
      title: l.title,
      pay: l.pay,
      payType: l.payType,
      posted: l.posted,
      time: l.time,
      teaser: l.teaser,
    })),
    faqs: c.seo.sections.map((s, i) => ({
      _key: key('faq', i),
      _type: 'faq',
      question: s.h,
      answer: s.body,
    })),
    subcategories: c.subcategories.map((s, i) => ({
      _key: key('sub', i),
      _type: 'subcategory',
      title: s.label,
      slug: { _type: 'slug', current: s.slug },
      blurb: s.blurb,
    })),
  };
}

function citizenDoc(c: (typeof QUEST_CATEGORIES)[number], image: unknown) {
  const low = c.label.toLowerCase();
  return {
    _id: CITIZEN_IDS[c.slug],
    _type: 'citizen',
    title: c.label,
    slug: { _type: 'slug', current: c.slug },
    icon: c.icon,
    heroHeading: `Hire a trusted ${low} human near you.`,
    heroSubtext: `${c.tagline} Describe the quest, a vetted human gets it done.`,
    heroImage: image,
    capabilitiesEyebrow: 'What you can hire for',
    capabilitiesHeading: `Every kind of ${low} quest.`,
    capabilities: c.subcategories.slice(0, 4).map((s, i) => ({
      _key: key('cap', i),
      _type: 'capability',
      title: s.label,
      blurb: s.blurb,
      // image left empty — the page falls back to the category hero image.
    })),
    questsEyebrow: 'Example quests',
    questsHeading: 'What people post.',
    questsSubtext: `Real ${low} quests posted by people on Quest.`,
    quests: c.listings.slice(0, 6).map((l, i) => ({
      _key: key('q', i),
      _type: 'quest',
      title: l.title,
      pay: l.pay,
      posted: l.posted,
      time: l.time,
      teaser: l.teaser,
    })),
    faqHeading: `Hiring ${low} help, questions.`,
    faqSubtext: 'Everything you need to know about hiring on Quest.',
    faqs: [
      {
        _key: 'faq-0',
        _type: 'faq',
        question: `How fast can I hire a ${low} human?`,
        answer: `Describe your quest in a sentence and trusted Heroes nearby can pick it up within minutes. Most ${low} quests are matched the same day.`,
      },
      {
        _key: 'faq-1',
        _type: 'faq',
        question: 'How do payments work?',
        answer: 'You fund the quest when you post it and the money is held safely by Quest. It only releases to the Hero once the work is done and you are happy.',
      },
      {
        _key: 'faq-2',
        _type: 'faq',
        question: 'Are the people vetted?',
        answer: 'Every Hero has a verified profile with ratings and reviews from past quests, so you can see their track record before you hire.',
      },
    ],
  };
}

async function main() {
  console.log(`→ Sanity ${projectId}/${dataset}`);

  // 1. Upload one hero image per vertical (shared by hero + citizen docs).
  const images: Record<string, unknown> = {};
  for (const c of QUEST_CATEGORIES) {
    process.stdout.write(`  uploading image for ${c.slug}… `);
    images[c.slug] = await uploadImage(c.image, `${c.slug}-hero.jpg`, `${c.label} quests`);
    console.log('done');
  }

  // 2. Build the target documents (existing ids reused, route-matching slugs).
  const targets = [
    ...QUEST_CATEGORIES.map((c) => heroDoc(c, images[c.slug])),
    ...QUEST_CATEGORIES.map((c) => citizenDoc(c, images[c.slug])),
  ];

  // 3. Overwrite each doc in place, and discard any lingering drafts so Studio
  //    shows a clean published state (no "unpublished changes").
  const tx = client.transaction();
  for (const doc of targets) {
    tx.createOrReplace(doc as never);
    tx.delete(`drafts.${doc._id}`); // no-op if there is no draft
  }
  await tx.commit();

  console.log(`✓ Wrote ${targets.length} docs in place (5 hero + 5 citizen).`);
  console.log('  Slugs: field-data, errands, content, events, home — for both /quests/<slug> and /quests/<slug>/hire.');
}

main().catch((err) => {
  console.error('✗ Migration failed:', err);
  process.exit(1);
});
