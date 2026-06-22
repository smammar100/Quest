'use client';

import { useState } from 'react';

// Figma "Website Section Collection" 2828:2197 — hover-preview list.
// Left: category list (icon + title + description). Right: large image that
// swaps to match the hovered/focused item. Content + imagery from #biz-tasks.
const ITEMS = [
  {
    icon: 'groups',
    color: 'coral',
    title: '“Need 4 booth staff this Saturday”',
    desc: 'Vetted event crew for setup, hosting, and teardown.',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1100&q=80&auto=format&fit=crop',
  },
  {
    icon: 'photo_camera',
    color: 'electric',
    title: '“Check 20 retail stores and take photos”',
    desc: 'Field reps for store audits and shelf checks with photo proof.',
    img: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1100&q=80&auto=format&fit=crop',
  },
  {
    icon: 'videocam',
    color: 'violet',
    title: '“Film 5 product demo videos”',
    desc: 'Creators and videographers to shoot on location.',
    img: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1100&q=80&auto=format&fit=crop',
  },
  {
    icon: 'share',
    color: 'marigold',
    title: '“100 individuals to post our promo video on Instagram”',
    desc: 'Real people to amplify your campaign across feeds.',
    img: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=1100&q=80&auto=format&fit=crop',
  },
  {
    icon: 'local_shipping',
    color: 'lime',
    title: '“Pick up and deliver event materials”',
    desc: 'Same-day couriers for local pickups and drop-offs.',
    img: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1100&q=80&auto=format&fit=crop',
  },
  {
    icon: 'smart_toy',
    color: 'sky',
    title: '“Record first-person footage for AI training”',
    desc: 'On-the-ground capture for real-world AI datasets.',
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1100&q=80&auto=format&fit=crop',
  },
];

export default function BizTaskShowcase() {
  const [active, setActive] = useState(0);

  return (
    <div className="biz-fg2">
      <ul className="biz-fg2__list">
        {ITEMS.map((it, i) => (
          <li
            key={it.title}
            className={`biz-fg2__item biz-fg2__item--${it.color}${i === active ? ' is-active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            tabIndex={0}
          >
            <span className="biz-fg2__icon">
              <span className="material-symbols-outlined" aria-hidden="true">{it.icon}</span>
            </span>
            <div className="biz-fg2__text">
              <h3 className="biz-fg2__title">{it.title}</h3>
              <p className="biz-fg2__desc">{it.desc}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="biz-fg2__media" aria-hidden="true">
        {ITEMS.map((it, i) => (
          <img
            key={it.title}
            src={it.img}
            alt=""
            className={`biz-fg2__img${i === active ? ' is-active' : ''}`}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
