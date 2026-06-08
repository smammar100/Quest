import type { CSSProperties } from 'react';

// #proof stat cards — a sticky stacked "numbers" deck (MindMarket-style):
// big number, accent icon badge top-right, description at the bottom.
const CARDS = [
  { key: 'people', tint: 'coral',    num: '750k+',  icon: 'groups',     desc: 'From weekend helpers to seasoned pros, hundreds of thousands are ready to work.' },
  { key: 'quests', tint: 'violet',   num: '3,500+', icon: 'task_alt',   desc: 'Every week, thousands of real-world tasks get done through real people.' },
  { key: 'biz',    tint: 'lime',     num: '600+',   icon: 'store',      desc: 'From corner shops to global brands, hundreds of businesses rely on Quest.' },
  { key: 'geo',    tint: 'sky',      num: '5',      icon: 'public',     desc: 'Live across Singapore, the Philippines, Indonesia, Malaysia, and the US.' },
  { key: 'cat',    tint: 'marigold', num: '10+',    icon: 'category',   desc: 'Moving, events, cleaning, content, errands, and plenty more on demand.' },
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
              <span className="proof-card__num">{c.num}</span>
              <p className="proof-card__desc">{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
