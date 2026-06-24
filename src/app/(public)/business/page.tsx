import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import ScrollFX from '@/components/sections/ScrollFX';
import BentoSection from '@/components/sections/BentoSection';
import RoughUnderline from '@/components/sections/RoughUnderline';
import BizTaskShowcase from '@/components/sections/BizTaskShowcase';
import HowItWorks from '@/components/sections/HowItWorks';
import CtaSection from '@/components/sections/CtaSection';

const WHY_BULLETS = [
  { icon: 'add_task',   text: 'Post one-off or recurring tasks', desc: 'Spin up a single job or a standing crew in minutes.' },
  { icon: 'pin_drop',   text: 'Find people by location and skill', desc: 'Match to vetted people exactly where you need them.' },
  { icon: 'lock',       text: 'Pay securely through Quest', desc: 'Escrow-backed payments, released when the work is done.' },
  { icon: 'task_alt',   text: 'Track work to completion', desc: 'Live status and photo proof from start to finish.' },
  { icon: 'public',     text: 'Scale across cities and markets', desc: 'Go from one location to many without rehiring.' },
];

const TRUST = [
  { icon: 'verified_user',     text: 'Verified profiles',     desc: 'Choose to hire only identity-verified humans before they take work.' },
  { icon: 'star',              text: 'Ratings and reviews',   desc: 'Pick the right person from real ratings left by other businesses.' },
  { icon: 'lock',              text: 'Secure payments',       desc: 'Funds sit in escrow and release only when the work is done.' },
  { icon: 'history',           text: 'Task history',          desc: 'A full record of completed work, outcomes, and proof.' },
  { icon: 'support_agent',     text: 'Support for disputes',  desc: 'Our team steps in to resolve any issue, quickly and fairly.' },
  { icon: 'workspace_premium', text: 'Preferred Heroes',      desc: 'You can choose to hire only the best with completion ratings.' },
];

export const metadata = {
  title: 'Quest for Business — Hire humans for the work your business needs done',
  description:
    'Quest helps businesses find trusted people for events, field tasks, local operations, content distribution, deliveries, store checks, and last-minute support.',
};

export default function BusinessPage() {
  return (
    <>
      <SiteHeader />

      {/* ── Hero (Figma node 4888:34637) ── */}
      <section id="biz-hero">
        <div className="biz-hero">
          <div className="biz-hero__content">
            <div className="biz-hero__header">
              <h1 className="biz-hero__title">
                Hire humans for the work your business needs done.
              </h1>
              <p className="biz-hero__body">
                Quest helps businesses find trusted people for events, field tasks, local
                operations, content distribution, deliveries, store checks, and last-minute support.
              </p>
              <div className="biz-hero__ctas">
                <a href="/signup" className="biz-btn biz-btn--figdark">
                  Hire humans for business
                </a>
              </div>
            </div>

            <div className="biz-hero__partners">
              <p className="biz-hero__partners-label">Trusted by teams at 1,000+ businesses</p>
              <ul className="biz-hero__partners-row" aria-hidden="true">
                <li><img className="biz-hero__partner" src="/images/logos/meta.webp" alt="Meta" width={360} height={97} loading="lazy" /></li>
                <li><img className="biz-hero__partner" src="/images/logos/google.webp" alt="Google" width={360} height={132} loading="lazy" /></li>
                <li><img className="biz-hero__partner" src="/images/logos/gojek.webp" alt="Gojek" width={300} height={85} loading="lazy" /></li>
                <li><img className="biz-hero__partner" src="/images/logos/antler.webp" alt="Antler" width={360} height={116} loading="lazy" /></li>
              </ul>
            </div>
          </div>

          {/* Right: photo from the Figma design */}
          <div className="biz-hero__media">
            <img
              className="biz-hero__photo"
              src="/images/business/hero.webp"
              alt="Two colleagues collaborating over a laptop"
            />
          </div>
        </div>
      </section>

      {/* ── Use cases — landing-page bento carousel, business copy ── */}
      <BentoSection
        title={<>Whatever you need,<br />a human gets it done.</>}
        lede="From events and store checks to deliveries and content — hire people for the local, physical work AI can't finish."
      />

      {/* ── Why businesses use Quest (accent-line columns) ── */}
      <section id="biz-why">
        <div className="biz-why">
          <div className="biz-why__head">
            <h2 className="biz-h2">Flexible humans,<br />on demand.</h2>
            <p className="biz-why__body">
              Your team should not need to hire full-time, message random freelancers, or call
              agencies for every small task. Quest gives you flexible humans on demand for work
              that is too urgent, too local, or too specific for traditional hiring.
            </p>
          </div>
          <div className="biz-why__grid">
            {WHY_BULLETS.map((b) => (
              <div key={b.text} className="biz-why__col">
                <span className="biz-why__icon">
                  <span className="material-symbols-outlined" aria-hidden="true">{b.icon}</span>
                </span>
                <h3 className="biz-why__title">{b.text}</h3>
                <p className="biz-why__desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Example tasks (feature-grid: categories + items) ── */}
      <section id="biz-tasks">
        <div className="biz-fg__head">
          <div className="biz-fg__intro">
            <h2 className="biz-h2">
              Real requests from{' '}
              <RoughUnderline className="biz-fg__mark">real businesses</RoughUnderline>.
            </h2>
            <p className="biz-fg__sub">
              From events to AI data, here&apos;s what teams actually post on Quest — and the
              kind of human you&apos;ll be matched with.
            </p>
          </div>
        </div>

        <BizTaskShowcase />
      </section>

      {/* ── How it works (landing-page Mews accordion) ── */}
      <HowItWorks />

      {/* ── Trust (cz-trust section from /quests hire pages, 6 items = 2 rows) ── */}
      <section className="cz-trust">
        <h2 className="cz-trust__title">Built so you can hire with confidence.</h2>
        <div className="cz-trust__grid">
          {TRUST.map((t) => (
            <div className="cz-trust__item" key={t.text}>
              <span className="cz-trust__icon" aria-hidden="true">
                <span className="material-symbols-outlined">{t.icon}</span>
              </span>
              <h3 className="cz-trust__item-title">{t.text}</h3>
              <p className="cz-trust__item-body">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA (landing-page CtaSection, business copy) ── */}
      <CtaSection
        title="Need humans for your business?"
        sub="Tell us the task. We'll help you get it done."
        ctaText="Hire humans now"
        ctaHref="/post-quest"
      />

      <SiteFooter />
      <ScrollFX />
    </>
  );
}
