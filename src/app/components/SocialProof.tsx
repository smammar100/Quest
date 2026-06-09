import type { CSSProperties } from 'react';

// #proof stat cards — a sticky stacked "numbers" deck (MindMarket-style):
// big number, accent icon badge top-right, description at the bottom.
const CARDS = [
  { key: 'people', tint: 'coral',    num: '750k+',  unit: 'humans',     icon: 'groups',     desc: 'From weekend helpers to seasoned pros, hundreds of thousands are ready to work.' },
  { key: 'income', tint: 'teal',     num: '$2M+',   unit: 'earned',     icon: 'payments',   desc: 'Flexible income that adds up, earned by humans doing real-world work.' },
  { key: 'quests', tint: 'violet',   num: '3,500+', unit: 'quests',     icon: 'task_alt',   desc: 'Every week, thousands of real-world tasks get done through real people.' },
  { key: 'biz',    tint: 'lime',     num: '1,000+', unit: 'brands',     icon: 'store',      desc: 'From corner shops to global brands, over a thousand businesses rely on Quest.' },
  { key: 'geo',    tint: 'sky',      num: '10+',    unit: 'countries',  icon: 'public',     desc: 'Live across Singapore, the Philippines, Indonesia, Malaysia, the US, Canada, Pakistan, Australia, Korea, Japan, and Thailand.' },
  { key: 'cat',    tint: 'marigold', num: '100+',   unit: 'categories', icon: 'category',   desc: 'Moving, events, cleaning, content, errands, and plenty more on demand.' },
];

export default function SocialProof() {
  return (
    <section id="proof">
      <div className="proof-layout">
        <aside className="proof-aside">
          <div className="proof-aside__sticky">
            <h2 className="proof-title">5 years of<br />real-world work.</h2>
            <p className="proof-lede">
              For the past 5 years, Quest has helped people and businesses get real tasks done
              through real humans. Now we&apos;re making that mission clearer than ever.
            </p>
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
