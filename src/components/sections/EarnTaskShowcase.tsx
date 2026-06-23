// "Real work, in the real world" — Figma (Fintech template) tabbed-card grid.
// Heading occupies the first grid cell; the rest are light cards with a
// folder-tab, icon, title and description. Same content as before, icons not images.

const ITEMS = [
  { icon: 'directions_run', tone: 'coral',    title: 'Run errands',            desc: 'Shopping, pickups and to-dos people don’t have time for.' },
  { icon: 'celebration',    tone: 'violet',   title: 'Help at events',         desc: 'Set up, staff and tear down, on-site when it counts.' },
  { icon: 'local_shipping', tone: 'sky',      title: 'Deliver items',          desc: 'Same-day local pickups and drop-offs across town.' },
  { icon: 'photo_camera',   tone: 'lime',     title: 'Create content',         desc: 'Shoot photos and video on location for brands.' },
  { icon: 'pin_drop',       tone: 'marigold', title: 'Check places in person', desc: 'Store audits and shelf checks with photo proof.' },
  { icon: 'storefront',     tone: 'electric', title: 'Help businesses',        desc: 'Hands-on support for shops, teams and pop-ups.' },
  { icon: 'inventory_2',    tone: 'peach',    title: 'Move and set up',        desc: 'Lift, move and assemble for homes and events.' },
  { icon: 'insights',       tone: 'mint',     title: 'Record real-world data', desc: 'On-the-ground capture for real-world datasets.' },
];

export default function EarnTaskShowcase() {
  return (
    <div className="mw-grid">
      <div className="mw-head">
        <h2 className="mw-title">Real work,<br />in the real world.</h2>
        <p className="mw-sub">
          From errands and events to content and field work. Here&apos;s what people and
          businesses actually post on Quest, and the kind of work you&apos;ll pick up.
        </p>
      </div>

      {ITEMS.map((it) => (
        <div className={`mw-card mw-card--${it.tone}`} key={it.title}>
          <span className="mw-card__icon">
            <span className="material-symbols-outlined" aria-hidden="true">{it.icon}</span>
          </span>
          <h3 className="mw-card__title">{it.title}</h3>
          <p className="mw-card__desc">{it.desc}</p>
        </div>
      ))}
    </div>
  );
}
