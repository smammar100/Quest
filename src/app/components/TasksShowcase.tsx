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
  { key: 'field', label: 'Field data', icon: 'pin_drop' },
  { key: 'errands', label: 'Errands', icon: 'bolt' },
  { key: 'content', label: 'Content', icon: 'videocam' },
  { key: 'events', label: 'Events', icon: 'celebration' },
  { key: 'home', label: 'Home', icon: 'home_repair_service' },
];

const DATA: Record<string, Task[]> = {
  errands: [
    { cat: 'Delivery', title: 'Same-day grocery run', price: '$40', a: 9 },
    { cat: 'Errands', title: 'Pick up & deliver a parcel', price: '$35', a: 2 },
    { cat: 'Pets', title: 'Daily dog walking', price: '$30', a: 6 },
    { cat: 'Errands', title: 'Pick up dry cleaning', price: '$25', a: 1 },
    { cat: 'Delivery', title: 'Airport drop-off ride', price: '$60', a: 3 },
    { cat: 'Errands', title: 'Queue for a sneaker drop', price: '$50', a: 7 },
  ],
  content: [
    { cat: 'Content', title: 'Film a UGC video', price: '$250', a: 4 },
    { cat: 'Photo', title: 'Product photoshoot on location', price: '$400', a: 0 },
    { cat: 'Social', title: 'Shoot 10 Reels on location', price: '$500', a: 5 },
    { cat: 'Photo', title: 'Real-estate listing photos', price: '$220', a: 8 },
    { cat: 'Photo', title: 'Restaurant menu shoot', price: '$300', a: 6 },
    { cat: 'Content', title: 'Event highlight video', price: '$650', a: 2 },
  ],
  events: [
    { cat: 'Events', title: 'Birthday party photographer', price: '$300', a: 3 },
    { cat: 'Events', title: 'Wedding videographer', price: '$1,200', a: 1 },
    { cat: 'Catering', title: 'Canapés for 30 guests', price: '$600', a: 5 },
    { cat: 'Events', title: 'Set up & pack down a party', price: '$220', a: 0 },
    { cat: 'Music', title: 'DJ for a house party', price: '$400', a: 4 },
    { cat: 'Events', title: 'Balloon & decor styling', price: '$180', a: 7 },
  ],
  field: [
    { cat: 'Data capture', title: 'Record street video for AI training', price: '$120', a: 4 },
    { cat: 'Survey', title: 'Run a 50-person field survey', price: '$200', a: 3 },
    { cat: 'Site visit', title: 'Site visit & inspection report', price: '$150', a: 8 },
    { cat: 'Mystery shop', title: 'Mystery shop a retail store', price: '$70', a: 1 },
    { cat: 'Photo capture', title: 'Photograph 30 store shelves', price: '$90', a: 0 },
    { cat: 'Verification', title: 'Verify a business address on-site', price: '$45', a: 6 },
  ],
  home: [
    { cat: 'Cleaning', title: 'End of lease clean', price: '$450', a: 1 },
    { cat: 'Handyman', title: 'Assemble flat-pack furniture', price: '$120', a: 5 },
    { cat: 'Yard work', title: 'Mow & tidy the lawn', price: '$100', a: 4 },
    { cat: 'Cleaning', title: 'Deep kitchen clean', price: '$180', a: 7 },
    { cat: 'Gardening', title: 'Trim hedges & weed the beds', price: '$140', a: 3 },
    { cat: 'Handyman', title: 'Mount a TV on the wall', price: '$90', a: 8 },
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
  const loop = [...items, ...items];
  return (
    <div className={`tasks-row tasks-row--${dir}`}>
      {loop.map((t, i) => (
        <Card key={i} t={t} hidden={i >= items.length} />
      ))}
    </div>
  );
}

export default function TasksShowcase() {
  const [active, setActive] = useState('field');
  const cards = DATA[active];
  const row2 = [...cards].reverse();

  return (
    <section id="tasks">
      <div className="tasks-head">
        <h2 className="tasks-title">Real tasks. Real humans. Real work done.</h2>
        <a href="#welcome" className="tasks-post">Describe a task, free</a>
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
