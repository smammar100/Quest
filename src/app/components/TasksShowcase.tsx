'use client';

import { useState } from 'react';

const AV = [
  'photo-1494790108377-be9c29b29330',
  'photo-1506794778202-cad84cf45f1d',
  'photo-1534528741775-53994a69daeb',
  'photo-1500648767791-00dcc994a43e',
  'photo-1633332755192-727a05c4013d',
  'photo-1438761681033-6461ffad8d80',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1517841905240-472988babdf9',
  'photo-1599566150163-29194dcaad36',
  'photo-1568602471122-7832951cc4c5',
];
const avatar = (i: number) =>
  `https://images.unsplash.com/${AV[i % AV.length]}?w=88&h=88&fit=crop&crop=faces&auto=format&q=80`;

type Task = { cat: string; title: string; price: string; a: number };

const TABS: { key: string; label: string; icon: string }[] = [
  { key: 'moving', label: 'Moving in', icon: 'local_shipping' },
  { key: 'home', label: 'Home & garden', icon: 'yard' },
  { key: 'events', label: 'Events', icon: 'celebration' },
  { key: 'content', label: 'Content', icon: 'videocam' },
  { key: 'errands', label: 'Errands', icon: 'bolt' },
];

const DATA: Record<string, Task[]> = {
  moving: [
    { cat: 'Removals', title: 'Help moving house', price: '$500', a: 2 },
    { cat: 'Delivery', title: 'King mattress pickup & delivery', price: '$85', a: 0 },
    { cat: 'Removals', title: '2-bed apartment move', price: '$420', a: 4 },
    { cat: 'Delivery', title: 'Sofa delivery', price: '$95', a: 1 },
    { cat: 'Removals', title: 'Pack & load a moving truck', price: '$260', a: 6 },
    { cat: 'Delivery', title: 'Fridge pickup & drop-off', price: '$110', a: 9 },
  ],
  home: [
    { cat: 'Cleaning', title: 'End of lease clean', price: '$450', a: 1 },
    { cat: 'Yard work', title: 'Mow lawn in Dallas', price: '$100', a: 4 },
    { cat: 'Handyman', title: 'Assemble flat-pack furniture', price: '$120', a: 5 },
    { cat: 'Cleaning', title: 'Deep kitchen clean', price: '$180', a: 7 },
    { cat: 'Gardening', title: 'Trim hedges & weed the beds', price: '$140', a: 3 },
    { cat: 'Handyman', title: 'Mount a TV on the wall', price: '$90', a: 8 },
  ],
  events: [
    { cat: 'Events', title: 'Birthday party photographer', price: '$300', a: 3 },
    { cat: 'Events', title: 'Wedding videographer', price: '$1,200', a: 1 },
    { cat: 'Catering', title: 'Canapés for 30 guests', price: '$600', a: 5 },
    { cat: 'Events', title: 'Set up & pack down a party', price: '$220', a: 0 },
    { cat: 'Music', title: 'DJ for a house party', price: '$400', a: 4 },
    { cat: 'Events', title: 'Balloon & decor styling', price: '$180', a: 7 },
  ],
  content: [
    { cat: 'Content', title: 'Create a UGC video', price: '$250', a: 4 },
    { cat: 'Web', title: 'Build a landing page', price: '$900', a: 8 },
    { cat: 'Design', title: 'Design a brand logo', price: '$350', a: 6 },
    { cat: 'Content', title: 'Product photoshoot', price: '$400', a: 0 },
    { cat: 'Web', title: 'Fix my Shopify store', price: '$300', a: 2 },
    { cat: 'Social', title: '10 Reels for Instagram', price: '$500', a: 5 },
  ],
  errands: [
    { cat: 'Delivery', title: 'Same-day grocery run', price: '$40', a: 9 },
    { cat: 'Pets', title: 'Daily dog walking', price: '$30', a: 6 },
    { cat: 'Errands', title: 'Pick up dry cleaning', price: '$25', a: 2 },
    { cat: 'Delivery', title: 'Airport drop-off ride', price: '$60', a: 1 },
    { cat: 'Pets', title: 'Cat sitting for a weekend', price: '$120', a: 3 },
    { cat: 'Errands', title: 'Queue for a sneaker drop', price: '$50', a: 7 },
  ],
};

function Card({ t, hidden }: { t: Task; hidden?: boolean }) {
  return (
    <article className="task-card" aria-hidden={hidden || undefined}>
      <div className="task-card__head">
        <img className="task-card__avatar" src={avatar(t.a)} alt="" />
        <div className="task-card__meta">
          <span className="task-card__cat">{t.cat}</span>
          <h3 className="task-card__title">{t.title}</h3>
        </div>
      </div>
      <div className="task-card__foot">
        <span className="task-card__rating"><span className="task-card__star">★</span>5 Stars</span>
        <span className="task-card__price">{t.price}</span>
      </div>
    </article>
  );
}

function Row({ items, dir }: { items: Task[]; dir: 'ltr' | 'rtl' }) {
  // Render the set twice so the CSS marquee (translateX -50%) loops seamlessly.
  return (
    <div className={`tasks-row tasks-row--${dir}`}>
      {items.map((t, i) => <Card key={`a${i}`} t={t} />)}
      {items.map((t, i) => <Card key={`b${i}`} t={t} hidden />)}
    </div>
  );
}

export default function TasksShowcase() {
  const [active, setActive] = useState('moving');
  const cards = DATA[active];
  const row2 = [...cards].reverse();

  return (
    <section id="tasks">
      <div className="tasks-head">
        <h2 className="tasks-title">See what others are getting done</h2>
        <a href="#welcome" className="tasks-post">Post your task for free</a>
      </div>
      <div className="tasks-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`tasks-tab${active === tab.key ? ' is-active' : ''}`}
            onClick={() => setActive(tab.key)}
          >
            <span className="material-symbols-outlined">{tab.icon}</span>{tab.label}
          </button>
        ))}
      </div>
      <div className="tasks-rows">
        <Row items={cards} dir="ltr" />
        <Row items={row2} dir="rtl" />
      </div>
    </section>
  );
}
