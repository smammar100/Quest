import type { CSSProperties } from 'react';

const CARDS = [
  { key: 'people', tint: 'coral',    num: '750k+',  unit: 'humans',     icon: 'groups',     desc: 'From weekend helpers to seasoned pros, ready to work.' },
  { key: 'income', tint: 'teal',     num: '$2M+',   unit: 'earned',     icon: 'payments',   desc: 'Flexible income, earned by humans doing real-world work.' },
  { key: 'quests', tint: 'violet',   num: '3,500+', unit: 'quests',     icon: 'task_alt',   desc: 'Thousands of real-world tasks done every week.' },
  { key: 'biz',    tint: 'lime',     num: '1,000+', unit: 'brands',     icon: 'store',      desc: 'From corner shops to global brands, all on Quest.' },
  { key: 'geo',    tint: 'sky',      num: '10+',    unit: 'countries',  icon: 'public',     desc: 'Live across 10+ markets in Asia, the US, and beyond.' },
  { key: 'cat',    tint: 'marigold', num: '100+',   unit: 'categories', icon: 'category',   desc: 'Moving, events, cleaning, content, and plenty more.' },
];

export default function SocialProof() {
  return (
    <section id="proof">
      <div className="proof-layout">
        <aside className="proof-aside">
          <div className="proof-aside__sticky">
            <h2 className="proof-title">5 years of<br />real-world work.</h2>
            <p className="proof-lede">Five years of real tasks, done by real humans.</p>
          </div>
        </aside>

        <div className="proof-stack">
          {CARDS.map((c, i) => (
            <article
              key={c.key}
              className={`proof-card proof-card--${c.tint}`}
              style={{ '--i': i } as CSSProperties}
            >
              <span className="proof-card__icon material-symbols-outlined" aria-hidden="true">{c.icon}</span>
              <div className="proof-card__stat">
                <span className="proof-card__num">{c.num}</span>
                <span className="proof-card__unit">{c.unit}</span>
              </div>
              <p className="proof-card__desc">{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
