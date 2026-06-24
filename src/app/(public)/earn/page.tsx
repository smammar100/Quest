import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import ScrollFX from '@/components/sections/ScrollFX';
import CtaSection from '@/components/sections/CtaSection';
import EarnHowItWorks from '@/components/sections/EarnHowItWorks';
import EarnTaskShowcase from '@/components/sections/EarnTaskShowcase';

// Why humans choose Quest — 4 cards
const WHY_HERO = [
  { icon: 'event_available', text: 'All on your terms',  desc: 'Pick the quests that fit your week. Work when you want, where you want, for what you want.' },
  { icon: 'rocket_launch',   text: 'Get going for free',  desc: 'No joining fee, no subscription. Set up a profile and start earning the same day.' },
  { icon: 'verified_user',   text: 'Secure payments',     desc: 'Funds are held safely the moment a quest is posted, and released the moment your work is accepted.' },
  { icon: 'workspace_premium', text: 'Skills that pay',   desc: 'Turn what you’re already good at into real-world income, no degree, no gatekeepers.' },
];

// Trust and safety — supporting points (cz-trust style: title + body)
const SAFETY = [
  { icon: 'description',    text: 'Clear task details',     desc: 'Every quest spells out the work, location, timing, and pay up front.' },
  { icon: 'lock',           text: 'Secure payments',        desc: 'Funds are held safely and released as soon as your work is done.' },
  { icon: 'reviews',        text: 'Ratings and reviews',    desc: 'Build a track record that unlocks more, better-paid quests.' },
  { icon: 'verified_user',  text: 'Verified customers',     desc: 'Take quests from identity-verified people and businesses.' },
  { icon: 'support_agent',  text: 'Support when you need it', desc: 'Our team steps in to resolve any issue, quickly and fairly.' },
  { icon: 'gavel',          text: 'Rules that protect you', desc: 'Clear community guidelines keep every quest safe and fair.' },
];

export const metadata = {
  title: 'Earn on Quest: Become a Hero and get paid for real-world work',
  description:
    'Become a Quest Hero and get paid for real-world tasks, from errands and events to content, delivery, field work, and local support. Flexible work, secure pay.',
};

export default function EarnPage() {
  return (
    <>
      <SiteHeader />

      {/* ── Hero (Figma: Fintech template "Earn" frame) ── */}
      <section id="earn-hero" className="fh">
        <div className="fh-col">
          <span className="fh-pill">
            <span className="fh-avatars" aria-hidden="true">
              {[1, 2, 3].map((n) => (
                <span key={n} className="fh-avatar"><img src={`/images/earn/avatar-${n}.webp`} alt="" width={40} height={40} /></span>
              ))}
            </span>
            <span className="fh-pill__text">Trusted by 750k+ humans</span>
          </span>

          <div className="fh-head">
            <h1 className="fh-title">Earn by doing what AI can&apos;t.</h1>
            <p className="fh-body">
              Become a Quest Hero and get paid for real-world tasks, from errands and events to
              content, delivery, field work, and local support.
            </p>
          </div>

          <a href="/signup" className="fh-btn fh-btn--primary">Earn as a human</a>
        </div>

        <div className="fh-media">
          <img src="/images/earn/hero.webp" alt="A human on the job for Quest" />
        </div>
      </section>

      {/* ── 1. What Heroes do (Figma tabbed-card grid) ── */}
      <section id="earn-tasks">
        <EarnTaskShowcase />
      </section>

      {/* ── 2. Why humans choose Quest ── */}
      <section id="earn-why">
        <div className="earn-why__head">
          <span className="earn-label">
            <span className="material-symbols-outlined" aria-hidden="true">workspace_premium</span>
            Why humans choose Quest
          </span>
          <h2 className="earn-h2">Built around your<br />time, not ours.</h2>
        </div>
        <div className="earn-why__grid">
          {WHY_HERO.map((b) => (
            <div key={b.text} className="earn-why__card">
              <span className="earn-why__icon">
                <span className="material-symbols-outlined" aria-hidden="true">{b.icon}</span>
              </span>
              <h3 className="earn-why__title">{b.text}</h3>
              <p className="earn-why__desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. How it works (Mews accordion, Hero-side) ── */}
      <EarnHowItWorks />

      {/* ── 4. Trust and safety (cz-trust centered grid) ── */}
      <section id="earn-safety" className="cz-trust">
        <h2 className="cz-trust__title">Backed every step of the way.</h2>
        <div className="cz-trust__grid">
          {SAFETY.map((s) => (
            <div className="cz-trust__item" key={s.text}>
              <span className="cz-trust__icon" aria-hidden="true">
                <span className="material-symbols-outlined">{s.icon}</span>
              </span>
              <h3 className="cz-trust__item-title">{s.text}</h3>
              <p className="cz-trust__item-body">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Final CTA ── */}
      <CtaSection
        title="Start earning as a Human."
        sub="Create your profile and pick up your first real-world quest today."
        ctaText="Earn as a human"
        ctaHref="/signup"
      />

      <SiteFooter />
      <ScrollFX />
    </>
  );
}
