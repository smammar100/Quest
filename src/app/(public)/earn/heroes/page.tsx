import SiteHeader from '@/components/layout/SiteHeader';

/* Verified Unsplash — humans doing real-world errands */
const IMG = {
  checkout: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1100&q=80&auto=format&fit=crop',
  cleaning: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1100&q=80&auto=format&fit=crop',
  moving:   'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1400&q=80&auto=format&fit=crop',
  grocery:  'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=1100&q=80&auto=format&fit=crop',
  shopping: 'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=1400&q=80&auto=format&fit=crop',
};

const AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces&auto=format&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces&auto=format&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces&auto=format&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces&auto=format&q=80',
];

const LOGOS = [
  { src: '/images/logos/meta.webp', alt: 'Meta', w: 360, h: 97 },
  { src: '/images/logos/google.webp', alt: 'Google', w: 360, h: 132 },
  { src: '/images/logos/gojek.webp', alt: 'Gojek', w: 300, h: 85 },
  { src: '/images/logos/antler.webp', alt: 'Antler', w: 360, h: 116 },
];

function Trust() {
  return (
    <div className="bh-trust">
      <div className="bh-avatars" aria-hidden="true">
        {AVATARS.map((a, i) => <img key={i} src={a} alt="" width={30} height={30} loading="lazy" />)}
      </div>
      <p className="bh-trust__text">Trusted by <strong>750k+</strong> Heroes</p>
    </div>
  );
}

function Logos() {
  return (
    <div className="bh-logos">
      <p className="bh-logos__label">Heroes work with teams at</p>
      <ul className="bh-logos__row" aria-hidden="true">
        {LOGOS.map((l) => (
          <li key={l.alt}><img className="bh-logo" src={l.src} alt={l.alt} width={l.w} height={l.h} loading="lazy" /></li>
        ))}
      </ul>
    </div>
  );
}

export const metadata = {
  title: 'Earn — Hero concepts',
  description: 'Five For-Humans hero directions in the business style guide.',
};

export default function EarnHeroConcepts() {
  return (
    <>
      <SiteHeader />

      {/* ── Variation 1 — Editorial split ── */}
      <span className="heroeslabel">Variation 1 — Editorial split</span>
      <section className="bh bh-split">
        <div className="bh-col">
          <p className="bh-eyebrow"><span className="bh-dot" aria-hidden="true" />For humans · Become a Hero</p>
          <h1 className="bh-title">Earn by doing what AI can&apos;t.</h1>
          <p className="bh-body">
            Become a Quest Hero and get paid for real-world tasks — errands, events, delivery,
            content and field work.
          </p>
          <div className="bh-ctas">
            <a href="/signup" className="bh-btn bh-btn--dark">Become a Hero</a>
            <a href="/browse-quest" className="bh-btn bh-btn--ghost">See available tasks
              <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
            </a>
          </div>
          <Trust />
        </div>
        <div className="bh-media bh-media--square">
          <img src={IMG.checkout} alt="A Quest Hero on a local job" />
        </div>
      </section>

      {/* ── Variation 2 — Split with floating cards + logos ── */}
      <span className="heroeslabel">Variation 2 — Floating cards + trust logos</span>
      <section className="bh bh-split">
        <div className="bh-col">
          <p className="bh-eyebrow"><span className="bh-dot" aria-hidden="true" />Become a Hero</p>
          <h1 className="bh-title">A real way to earn, on your terms.</h1>
          <p className="bh-body">
            Pick quests that fit your skills, schedule and location. Trusted humans, real work,
            paid the same day.
          </p>
          <div className="bh-ctas">
            <a href="/signup" className="bh-btn bh-btn--dark">Become a Hero</a>
            <a href="/browse-quest" className="bh-btn bh-btn--ghost">See available tasks
              <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
            </a>
          </div>
          <Logos />
        </div>
        <div className="bh-media bh-media--square">
          <img src={IMG.cleaning} alt="A Quest Hero completing a task" />
          <div className="bh-fcard bh-fcard--rating">
            <span className="material-symbols-outlined" aria-hidden="true">star</span>
            <span><b>4.9</b> · Top Hero</span>
          </div>
          <div className="bh-fcard bh-fcard--earn">
            <span className="bh-fcard__label">Earned this week</span>
            <b className="bh-fcard__big">$740</b>
          </div>
        </div>
      </section>

      {/* ── Variation 3 — Editorial top + full-width photo ── */}
      <span className="heroeslabel">Variation 3 — Editorial top, wide photo</span>
      <section className="bh">
        <div className="bh3-head">
          <h1 className="bh-title bh-title--lg">Work that fits your life,<br />not the other way round.</h1>
          <div className="bh3-aside">
            <p className="bh-body">
              Choose quests by skill, schedule and location. Real-world work for people and
              businesses near you — paid securely.
            </p>
            <a href="/signup" className="bh-btn bh-btn--dark">Become a Hero</a>
          </div>
        </div>
        <div className="bh-media bh-media--wide">
          <img src={IMG.moving} alt="Quest Heroes moving and setting up" />
          <div className="bh-fcard bh-fcard--earn bh-fcard--onwide">
            <span className="bh-fcard__label">Paid this month</span>
            <b className="bh-fcard__big">$3,120</b>
          </div>
        </div>
      </section>

      {/* ── Variation 4 — Be your own boss (bullets) ── */}
      <span className="heroeslabel">Variation 4 — Be your own boss</span>
      <section className="bh bh-split">
        <div className="bh-col">
          <p className="bh-eyebrow"><span className="bh-dot" aria-hidden="true" />For humans</p>
          <h1 className="bh-title">Be your own boss.<br />Get paid to help.</h1>
          <ul className="bh-bullets">
            <li><span className="material-symbols-outlined" aria-hidden="true">check</span>Flexible quests around your week</li>
            <li><span className="material-symbols-outlined" aria-hidden="true">check</span>No joining fee, no subscription</li>
            <li><span className="material-symbols-outlined" aria-hidden="true">check</span>Same-day, secure payments</li>
            <li><span className="material-symbols-outlined" aria-hidden="true">check</span>Build ratings that unlock better pay</li>
          </ul>
          <a href="/signup" className="bh-btn bh-btn--dark">Become a Hero</a>
        </div>
        <div className="bh-media bh-media--square">
          <img src={IMG.grocery} alt="A Quest Hero running an errand" />
          <div className="bh-fcard bh-fcard--pay">
            <span className="bh-fcard__label">Payment received</span>
            <span className="bh-fcard__row"><b>$179.00</b><span className="bh-fcard__badge">Paid</span></span>
          </div>
          <div className="bh-fcard bh-fcard--alert">
            <span className="material-symbols-outlined" aria-hidden="true">notifications_active</span>
            New quest nearby
          </div>
        </div>
      </section>

      {/* ── Variation 5 — Centered + wide band ── */}
      <span className="heroeslabel">Variation 5 — Centered + wide band</span>
      <section className="bh">
        <div className="bh5-head">
          <p className="bh-eyebrow"><span className="bh-dot" aria-hidden="true" />For humans · Become a Hero</p>
          <h1 className="bh-title bh-title--center">Earn by doing what AI can&apos;t.</h1>
          <p className="bh-body bh-body--center">
            Get paid for real-world tasks — from errands and events to content, delivery and field work.
          </p>
          <div className="bh-ctas bh-ctas--center">
            <a href="/signup" className="bh-btn bh-btn--dark">Become a Hero</a>
            <a href="/browse-quest" className="bh-btn bh-btn--ghost">See available tasks
              <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
            </a>
          </div>
          <div className="bh-trust bh-trust--center"><div className="bh-avatars" aria-hidden="true">
            {AVATARS.map((a, i) => <img key={i} src={a} alt="" width={30} height={30} loading="lazy" />)}
          </div><p className="bh-trust__text">Trusted by <strong>750k+</strong> Heroes</p></div>
        </div>
        <div className="bh-media bh-media--band">
          <img src={IMG.shopping} alt="A Quest Hero out on a quest" />
        </div>
      </section>

      <div style={{ height: '80px' }} />
    </>
  );
}
