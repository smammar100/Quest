'use client';

import { useState } from 'react';

type Aud = {
  key: string;
  icon: string;
  title: string;
  body: string;
  image: string;
  tint: string;
  card: { label: string; value: string; badge: string };
  asideText: string;
  link: string;
  chip: { icon: string; text: string };
};

const AUDS: Aud[] = [
  {
    key: 'business',
    icon: 'storefront',
    title: 'Flexible humans for your business.',
    body: 'Hire people for events, content, deliveries, field work, local operations, and last-minute support.',
    image: '/images/cards/for-business.jpg',
    tint: 'var(--coral-tint)',
    card: { label: 'Event crew booked', value: '$1,200', badge: '+18%' },
    chip: { icon: 'verified_user', text: 'Vetted & insured' },
    asideText: 'Vetted, reliable people you can book in minutes and trust on the job.',
    link: 'Hire for business',
  },
  {
    key: 'agent',
    icon: 'smart_toy',
    title: 'Let your AI agent hire humans.',
    body: 'Connect agents to trusted humans who can complete real-world tasks.',
    image: '/images/cards/for-ai.jpg',
    tint: '#E7E0FF',
    card: { label: 'Tasks dispatched', value: '128', badge: 'live' },
    chip: { icon: 'sync', text: 'Auto-coordinated' },
    asideText: 'It only pays once the work is verified done — built for trust.',
    link: 'Connect via MCP',
  },
  {
    key: 'hero',
    icon: 'bolt',
    title: "Earn by doing what AI can't.",
    body: 'Choose flexible tasks, help people and businesses, and get paid for real-world work.',
    image: '/images/cards/for-people.jpg',
    tint: '#DCEAFF',
    card: { label: 'Earned this week', value: '$740', badge: '★ 4.9' },
    chip: { icon: 'bolt', text: 'Same-day pay' },
    asideText: 'Get paid fast for work that fits your life.',
    link: 'Become a Hero',
  },
];

export default function AudiencesSection() {
  const [active, setActive] = useState(0);
  const a = AUDS[active];

  return (
    <section id="audiences">
      <h2 className="aud-title">Built for everyone who gets things done.</h2>

      <div className="aud-content">
        <div className="aud-list">
          {AUDS.map((it, i) => {
            const on = i === active;
            return (
              <div
                key={it.key}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                className={`aud-item${on ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
              >
                <div className="aud-item__row">
                  <span className="aud-item__icon material-symbols-outlined">{it.icon}</span>
                  <span className="aud-item__title">{it.title}</span>
                </div>
                {on && <p className="aud-item__body">{it.body}</p>}
              </div>
            );
          })}
        </div>

        <div className="aud-media" style={{ background: a.tint }}>
          <img className="aud-media__img" src={a.image} alt="" />
          <div className="aud-media__card">
            <span className="aud-media__label">{a.card.label}</span>
            <span className="aud-media__price">
              <b>{a.card.value}</b>
              <span className="aud-media__badge">{a.card.badge}</span>
            </span>
          </div>
          <div className="aud-media__chip">
            <span className="material-symbols-outlined">{a.chip.icon}</span>
            {a.chip.text}
          </div>
        </div>

        <div className="aud-aside">
          <p className="aud-aside__text">{a.asideText}</p>
          <a href="#welcome" className="aud-aside__link">
            {a.link}
          </a>
        </div>
      </div>
    </section>
  );
}
