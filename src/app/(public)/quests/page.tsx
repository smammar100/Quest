import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/sections/SiteHeader';
import SiteFooter from '@/components/sections/SiteFooter';
import ScrollFX from '@/components/sections/ScrollFX';
import { QUEST_CATEGORIES } from '@/app/lib/quests-data';

export const metadata: Metadata = {
  title: 'Browse quests — real-world work for real humans | Quest',
  description: 'Explore open quests across field data, errands, content, events, and home. Pick a category and get paid for real-world work.',
};

// Color-blocked tiles per category (Quest palette, no strokes)
const TILE_COLORS = ['coral', 'electric', 'marigold', 'violet', 'lime'] as const;

export default function QuestsIndexPage() {
  return (
    <>
      <SiteHeader />

      <section className="qp-hero">
        <h1 className="qp-hero__title">Browse quests.</h1>
        <p className="qp-hero__proof">Real tasks posted by real people — pick a category and get to work.</p>
        <a href="/#cta" className="qp-hero__cta">Become a Hero</a>
      </section>

      <section className="qx">
        <div className="qx-grid">
          {QUEST_CATEGORIES.map((c, i) => (
            <Link href={`/quests/${c.slug}`} className={`qx-card qx-card--${TILE_COLORS[i % TILE_COLORS.length]}`} key={c.slug}>
              <span className="material-symbols-outlined qx-card__icon" aria-hidden="true">{c.icon}</span>
              <h2 className="qx-card__title">{c.label}</h2>
              <p className="qx-card__sub">{c.tagline}</p>
              <p className="qx-card__count">{c.count} open quests</p>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
      <ScrollFX />
    </>
  );
}
