'use client';

import { useMemo, useState } from 'react';
import type { QuestCategory } from '../../app/lib/quests-data';
import { INITIAL_VISIBLE } from '../../app/lib/quests-data';

// Upwork-style sample list: subcategory filter chips, 2-col card grid showing
// the first 12 listings, and a "Load more" that appends the rest client-side
// and then unmounts (mirrors upwork.com/freelance-jobs/* exactly).
export default function QuestList({
  category,
  initialSub,
}: {
  category: QuestCategory;
  initialSub?: string;
}) {
  const validSub = category.subcategories.some((s) => s.slug === initialSub) ? initialSub : undefined;
  const [sub, setSub] = useState<string | undefined>(validSub);
  const [visible, setVisible] = useState(INITIAL_VISIBLE);

  const listings = useMemo(
    () => (sub ? category.listings.filter((l) => l.sub === sub) : category.listings),
    [category, sub]
  );
  const shown = listings.slice(0, visible);
  const hasMore = listings.length > visible;

  const pickSub = (next?: string) => {
    setSub(next);
    setVisible(INITIAL_VISIBLE);
    const url = next ? `?sub=${next}` : window.location.pathname;
    window.history.replaceState(null, '', url);
  };

  return (
    <div className="qp-list">
      <div className="qp-chips" role="group" aria-label="Filter by subcategory">
        <button
          type="button"
          className={`qp-chip${!sub ? ' is-active' : ''}`}
          onClick={() => pickSub(undefined)}
        >
          All {category.label.toLowerCase()}
        </button>
        {category.subcategories.map((s) => (
          <button
            key={s.slug}
            type="button"
            className={`qp-chip${sub === s.slug ? ' is-active' : ''}`}
            onClick={() => pickSub(s.slug)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="qp-grid">
        {shown.map((l) => (
          <article className="qp-card" key={l.title}>
            <h2 className="qp-card__title">{l.title}</h2>
            <p className="qp-card__meta">
              {l.payType} ‐ Posted {l.posted}
            </p>
            <div className="qp-card__attrs">
              <div className="qp-attr">
                <span className="qp-attr__value">{l.pay}</span>
                <span className="qp-attr__label">Payout</span>
              </div>
              <div className="qp-attr">
                <span className="qp-attr__value">{l.time}</span>
                <span className="qp-attr__label">Time needed</span>
              </div>
              <div className="qp-attr">
                <span className="qp-attr__value">{l.commitment}</span>
                <span className="qp-attr__label">Commitment</span>
              </div>
              <div className="qp-attr">
                <span className="qp-attr__value">{l.level}</span>
                <span className="qp-attr__label">Hero level</span>
              </div>
            </div>
            <p className="qp-card__teaser">{l.teaser}</p>
            <div className="qp-card__foot">
              <div className="qp-card__tags">
                {l.tags.map((t) => (
                  <span className="qp-tag" key={t}>{t}</span>
                ))}
              </div>
              <a href="/#welcome" className="qp-card__more">See more</a>
            </div>
          </article>
        ))}
      </div>

      {hasMore && (
        <div className="qp-loadmore">
          <button type="button" className="qp-loadmore__btn" onClick={() => setVisible(listings.length)}>
            Load more quests
          </button>
        </div>
      )}
    </div>
  );
}