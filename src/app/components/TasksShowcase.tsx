'use client';

import { useState } from 'react';

// 30 distinct, verified portrait IDs — one per task so faces never repeat within a tab,
// and the two marquee rows are offset (see `shift`) so they never share a face either.
const AV = [
  'photo-1494790108377-be9c29b29330',
  'photo-1500648767791-00dcc994a43e',
  'photo-1438761681033-6461ffad8d80',
  'photo-1472099645785-5658abf4ff4e',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1517841905240-472988babdf9',
  'photo-1534528741775-53994a69daeb',
  'photo-1506794778202-cad84cf45f1d',
  'photo-1599566150163-29194dcaad36',
  'photo-1568602471122-7832951cc4c5',
  'photo-1633332755192-727a05c4013d',
  'photo-1544005313-94ddf0286df2',
  'photo-1546961329-78bef0414d7c',
  'photo-1463453091185-61582044d556',
  'photo-1487412720507-e7ab37603c6f',
  'photo-1531123897727-8f129e1688ce',
  'photo-1502685104226-ee32379fefbe',
  'photo-1524504388940-b1c1722653e1',
  'photo-1500917293891-ef795e70e1f6',
  'photo-1492562080023-ab3db95bfbce',
  'photo-1530268729831-4b0b9e170218',
  'photo-1554151228-14d9def656e4',
  'photo-1573497019940-1c28c88b4f3e',
  'photo-1580489944761-15a19d654956',
  'photo-1570295999919-56ceb5ecca61',
  'photo-1535713875002-d1d0cf377fde',
  'photo-1557862921-37829c790f19',
  'photo-1556157382-97eda2d62296',
  'photo-1489424731084-a5d8b219a5bb',
  'photo-1499996860823-5214fcc65f8f',
];
const avatar = (i: number) =>
  `https://images.unsplash.com/${AV[i % AV.length]}?w=88&h=88&fit=crop&crop=faces&auto=format&q=80`;

type Task = { cat: string; title: string; price: string; a: number };

const TABS: { key: string; label: string; icon: string }[] = [
  { key: 'field', label: 'Field data', icon: 'pin_drop' },
  { key: 'errands', label: 'Errands', icon: 'bolt' },
  { key: 'content', label: 'Content', icon: 'videocam' },
  { key: 'events', label: 'Events', icon: 'celebration' },
  { key: 'home', label: 'Home', icon: 'home' },
];

const DATA: Record<string, Task[]> = {
  errands: [
    { cat: 'Delivery', title: 'Same-day grocery run', price: '$40', a: 0 },
    { cat: 'Errands', title: 'Pick up & deliver a parcel', price: '$35', a: 1 },
    { cat: 'Pets', title: 'Daily dog walking', price: '$30', a: 2 },
    { cat: 'Errands', title: 'Pick up dry cleaning', price: '$25', a: 3 },
    { cat: 'Delivery', title: 'Airport drop-off ride', price: '$60', a: 4 },
    { cat: 'Errands', title: 'Queue for a sneaker drop', price: '$50', a: 5 },
  ],
  content: [
    { cat: 'Content', title: 'Film a UGC video', price: '$250', a: 6 },
    { cat: 'Photo', title: 'Product photoshoot on location', price: '$400', a: 7 },
    { cat: 'Social', title: 'Shoot 10 Reels on location', price: '$500', a: 8 },
    { cat: 'Photo', title: 'Real-estate listing photos', price: '$220', a: 9 },
    { cat: 'Photo', title: 'Restaurant menu shoot', price: '$300', a: 10 },
    { cat: 'Content', title: 'Event highlight video', price: '$650', a: 11 },
  ],
  events: [
    { cat: 'Events', title: 'Birthday party photographer', price: '$300', a: 12 },
    { cat: 'Events', title: 'Wedding videographer', price: '$1,200', a: 13 },
    { cat: 'Catering', title: 'Canapés for 30 guests', price: '$600', a: 14 },
    { cat: 'Events', title: 'Set up & pack down a party', price: '$220', a: 15 },
    { cat: 'Music', title: 'DJ for a house party', price: '$400', a: 16 },
    { cat: 'Events', title: 'Balloon & decor styling', price: '$180', a: 17 },
  ],
  field: [
    { cat: 'Data capture', title: 'Record street video for AI training', price: '$120', a: 18 },
    { cat: 'Survey', title: 'Run a 50-person field survey', price: '$200', a: 19 },
    { cat: 'Site visit', title: 'Site visit & inspection report', price: '$150', a: 20 },
    { cat: 'Mystery shop', title: 'Mystery shop a retail store', price: '$70', a: 21 },
    { cat: 'Photo capture', title: 'Photograph 30 store shelves', price: '$90', a: 22 },
    { cat: 'Verification', title: 'Verify a business address on-site', price: '$45', a: 23 },
  ],
  home: [
    { cat: 'Cleaning', title: 'End of lease clean', price: '$450', a: 24 },
    { cat: 'Handyman', title: 'Assemble flat-pack furniture', price: '$120', a: 25 },
    { cat: 'Yard work', title: 'Mow & tidy the lawn', price: '$100', a: 26 },
    { cat: 'Cleaning', title: 'Deep kitchen clean', price: '$180', a: 27 },
    { cat: 'Gardening', title: 'Trim hedges & weed the beds', price: '$140', a: 28 },
    { cat: 'Handyman', title: 'Mount a TV on the wall', price: '$90', a: 29 },
  ],
};

function Card({ t, hidden, shift = 0 }: { t: Task; hidden?: boolean; shift?: number }) {
  return (
    <article className="task-card" aria-hidden={hidden || undefined}>
      <div className="task-card__head">
        <img className="task-card__avatar" src={avatar(t.a + shift)} alt="" width={88} height={88} loading="lazy" decoding="async" />
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

function Row({ items, dir, shift = 0 }: { items: Task[]; dir: 'ltr' | 'rtl'; shift?: number }) {
  // Render the set twice so the CSS marquee (translateX -50%) loops seamlessly.
  const loop = [...items, ...items];
  return (
    <div className={`tasks-row tasks-row--${dir}`}>
      {loop.map((t, i) => (
        <Card key={i} t={t} hidden={i >= items.length} shift={shift} />
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
        <h2 className="tasks-title">Real tasks. Real humans.<br />Real work done.</h2>
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
        <Row items={cards} dir="ltr" shift={0} />
        <Row items={row2} dir="rtl" shift={15} />
      </div>
    </section>
  );
}
