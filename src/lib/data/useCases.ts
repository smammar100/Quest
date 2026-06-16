export type UseCase = {
  key: string;
  color: string;
  title: string;
  desc: string;
  img: string;
  fit: string;
};

export const useCases: UseCase[] = [
  { key: 'errands',  color: 'coral',    title: 'Run errands',               desc: 'Groceries, returns, pickups, and the small jobs that eat your day.',   img: '/images/cards/for-everyday-tasks.webp',  fit: 'auto 115%' },
  { key: 'events',   color: 'marigold', title: 'Staff events',              desc: 'Vetted hands for setup, hosting, and teardown, booked in minutes.',    img: '/images/cards/for-onsite-crew.webp',     fit: 'cover'     },
  { key: 'move',     color: 'electric', title: 'Move and set up',           desc: 'Lift, assemble, mount, and install, with muscle and know-how on tap.', img: '/images/cards/for-heavy-lifting.webp',   fit: '110%'      },
  { key: 'deliver',  color: 'lime',     title: 'Deliver locally',           desc: 'Hand-delivered drop-offs across town by a real person nearby.',        img: '/images/cards/for-same-day-delivery.webp', fit: 'auto 115%' },
  { key: 'content',  color: 'violet',   title: 'Create real-world content', desc: 'Photo, video, and UGC shot where it actually happens.',                img: '/images/cards/for-onlocation-ugc.webp',  fit: 'auto 115%' },
  { key: 'check',    color: 'sky',      title: 'Check places in person',    desc: 'Store audits, site visits, and mystery checks with photo proof.',      img: '/images/cards/for-boots-on-grounds.webp', fit: '110%'      },
  { key: 'business', color: 'ink',      title: 'Help your business',        desc: 'Scale a flexible, on-demand crew for ops, field, and retail.',         img: '/images/cards/for-teams.webp',           fit: '110%'      },
  { key: 'anything', color: 'blush',    title: "Do anything AI can't",      desc: 'If it takes a human in the real world, someone here will do it.',      img: '/images/cards/for-anything-else.webp',   fit: 'cover'     },
];
