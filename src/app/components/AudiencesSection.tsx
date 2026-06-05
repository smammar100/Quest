'use client';

import { useState } from 'react';

const img = (id: string) =>
  `https://images.unsplash.com/${id}?w=600&h=760&fit=crop&crop=faces&auto=format&q=80`;

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
  cta: string;
};

const AUDS: Aud[] = [
  {
    key: 'business',
    icon: 'storefront',
    title: 'Flexible human help for your business.',
    body: "Scale your team for a day or a season — vetted people for the real-world work software can't touch, no headcount, no hassle.",
    image: img('photo-1517841905240-472988babdf9'),
    tint: 'var(--coral-tint)',
    card: { label: 'Event crew booked', value: '$1,200', badge: '+18%' },
    asideText: 'Flexible, vetted help that scales up and down with you.',
    link: 'Set your team up in minutes',
    cta: 'Hire for your business',
  },
  {
    key: 'hero',
    icon: 'bolt',
    title: 'Become a Hero.',
    body: 'Pick up real-world tasks that fit your skills and schedule. Get paid fast and build your rating as you go.',
    image: img('photo-1500648767791-00dcc994a43e'),
    tint: '#DCEAFF',
    card: { label: 'Earned this week', value: '$740', badge: '★ 4.9' },
    asideText: 'Work as much or as little as you want, on your own terms.',
    link: 'Start earning as a Hero',
    cta: 'Become a Hero',
  },
  {
    key: 'agent',
    icon: 'smart_toy',
    title: 'Let your AI agent hire humans.',
    body: 'Give your agent hands in the real world. It searches, hires, and coordinates trusted people through our API.',
    image: img('photo-1599566150163-29194dcaad36'),
    tint: '#E7E0FF',
    card: { label: 'Tasks dispatched', value: '128', badge: 'live' },
    asideText: 'It only pays when the work is verified done — built for trust.',
    link: 'Join the developer preview',
    cta: 'Join the developer preview',
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
        </div>

        <div className="aud-aside">
          <p className="aud-aside__text">{a.asideText}</p>
          <a href="#welcome" className="aud-aside__link">
            {a.link}
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </div>

      <a href="#welcome" className="aud-cta">{a.cta}</a>
    </section>
  );
}
