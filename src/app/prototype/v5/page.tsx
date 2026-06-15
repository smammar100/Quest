import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { getCategory } from '../../lib/quests-data';
import {
  HERO_COPY,
  HERO_REASONS,
  HOW_STEPS,
  TOP_HEROES,
  HERO_FAQS,
  EARN_CURVE,
} from '../../lib/hero-page-data';
import s from './v5.module.css';

export const metadata = { title: 'Split Sticky / Narrative — Quest Hero page prototype' };

const cat = getCategory('home')!;

const STAT_ROW = [
  { icon: 'home', figure: cat.count, label: `open ${cat.label} quests right now` },
  { icon: 'payments', figure: `$${cat.earn.min}–$${cat.earn.max}`, label: 'typical hourly range' },
  { icon: 'bolt', figure: '24 hrs', label: 'from accepted proof to paid' },
];

// Three peeking "live feed" cards for the hero stack.
const FEED = cat.listings.slice(0, 3);
const PREVIEW = cat.listings.slice(0, 6);

const accentClass: Record<string, string> = {
  electric: s.accentElectric,
  marigold: s.accentMarigold,
  lime: s.accentLime,
  violet: s.accentViolet,
};

export default function V5Page() {
  const curve = EARN_CURVE;

  return (
    <>
      <SiteHeader />

      <main className={s.page}>
        {/* ───────────── HERO — split: big number left, live feed right ───────────── */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroLeft}>
              <span className={s.eyebrow}>
                <span className="material-symbols-outlined" aria-hidden="true">workspace_premium</span>
                {HERO_COPY.eyebrow} · {cat.label}
              </span>

              <h1 className={s.heroTitle}>
                Earn <span className={s.heroAmount}>{HERO_COPY.earnWidget.amount}</span> a month
                doing <span className={s.heroWord}>{cat.label}</span> quests.
              </h1>

              <p className={s.heroSub}>{HERO_COPY.subPattern(cat.label)}</p>

              {/* faux earnings slider */}
              <div className={s.slider}>
                <div className={s.sliderHead}>
                  <span className={s.sliderLabel}>{HERO_COPY.earnWidget.label}</span>
                  <span className={s.sliderCadence}>{HERO_COPY.earnWidget.cadence}</span>
                </div>
                <div className={s.sliderTrack} aria-hidden="true">
                  <div className={s.sliderFill} />
                  <div className={s.sliderThumb} />
                </div>
                <div className={s.sliderScale} aria-hidden="true">
                  <span>1 / wk</span>
                  <span>3 / wk</span>
                  <span>5 / wk</span>
                </div>
                <div className={s.sliderResult}>
                  <span className={s.sliderResultAmount}>{HERO_COPY.earnWidget.amount}</span>
                  <span className={s.sliderResultPeriod}>{HERO_COPY.earnWidget.period}</span>
                </div>
              </div>

              <div className={s.heroCtas}>
                <a href="/#cta" className={s.btnPrimary}>
                  {HERO_COPY.cta}
                  <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </a>
                <a href="#quests" className={s.btnGhost}>{HERO_COPY.ctaSecondary}</a>
              </div>
            </div>

            {/* overlapping live quest-feed stack */}
            <div className={s.heroRight} aria-label="Quests near you">
              <div className={s.feedTag}>
                <span className={s.feedDot} />
                Live · quests near you
              </div>
              <ul className={s.feedStack}>
                {FEED.map((q, i) => (
                  <li key={q.title} className={`${s.feedCard} ${s[`feedCard${i}` as keyof typeof s] as string}`}>
                    <div className={s.feedCardTop}>
                      <span className={s.feedPay}>{q.pay}</span>
                      <span className={s.feedPosted}>{q.posted}</span>
                    </div>
                    <p className={s.feedTitle}>{q.title}</p>
                    <div className={s.feedMeta}>
                      <span className={s.feedChip}>{q.payType}</span>
                      <span className={s.feedChip}>{q.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────────── STAT ROW ───────────── */}
        <section className={s.stats}>
          <ul className={s.statRow}>
            {STAT_ROW.map((stat) => (
              <li key={stat.label} className={s.statItem}>
                <span className={`material-symbols-outlined ${s.statIcon}`} aria-hidden="true">{stat.icon}</span>
                <span className={s.statFigure}>{stat.figure}</span>
                <span className={s.statLabel}>{stat.label}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ───────────── WHY JOIN QUEST ───────────── */}
        <section className={s.why}>
          <div className={s.sectionHead}>
            <span className={s.kicker}>Why Heroes choose Quest</span>
            <h2 className={s.h2}>Built around your time, not ours.</h2>
          </div>
          <ul className={s.whyGrid}>
            {HERO_REASONS.map((r, i) => (
              <li key={r.title} className={s.whyCard}>
                <span className={s.whyNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={`material-symbols-outlined ${s.whyIcon}`} aria-hidden="true">{r.icon}</span>
                <h3 className={s.whyTitle}>{r.title}</h3>
                <p className={s.whyBody}>{r.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ───────────── OPEN QUESTS ───────────── */}
        <section className={s.quests} id="quests">
          <div className={s.sectionHead}>
            <span className={s.kicker}>Open right now</span>
            <h2 className={s.h2}>{HERO_COPY.titlePattern(cat.label)}</h2>
            <p className={s.sectionLede}>{cat.tagline}</p>
          </div>

          <ul className={s.questGrid}>
            {PREVIEW.map((q) => (
              <li key={q.title} className={s.questCard}>
                <div className={s.questTop}>
                  <span className={s.questPay}>{q.pay}</span>
                  <span className={s.questPayType}>{q.payType} · {q.posted}</span>
                </div>
                <h3 className={s.questTitle}>{q.title}</h3>
                <p className={s.questTeaser}>{q.teaser}</p>
                <ul className={s.questTags}>
                  {q.tags.map((t) => (
                    <li key={t} className={s.questTag}>{t}</li>
                  ))}
                </ul>
                <div className={s.questFoot}>
                  <span className={s.questMeta}>
                    <span className="material-symbols-outlined" aria-hidden="true">schedule</span>
                    {q.time}
                  </span>
                  <span className={s.questMeta}>
                    <span className="material-symbols-outlined" aria-hidden="true">military_tech</span>
                    {q.level}
                  </span>
                  <a href="/#welcome" className={s.questAction} aria-label={`View quest: ${q.title}`}>
                    View
                    <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <a href="/quests/home" className={s.browseAll}>
            Browse all {cat.label} quests
            <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
          </a>
        </section>

        {/* ───────────── EARNINGS — bell-curve viz ───────────── */}
        <section className={s.earn}>
          <div className={s.earnInner}>
            <div className={s.earnCopy}>
              <span className={s.kickerLight}>The numbers</span>
              <h2 className={s.h2Light}>What {cat.label} Heroes earn.</h2>
              <p className={s.earnLede}>
                Most {cat.label.toLowerCase()} Heroes settle in the{' '}
                <strong className={s.earnStrong}>${cat.earn.min}–${cat.earn.max}/hr</strong> band. Take on
                recurring quests and the curve shifts right — fast.
              </p>
              <a href="/#cta" className={s.btnLime}>
                {HERO_COPY.cta}
                <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
              </a>
            </div>

            <div className={s.curveWrap}>
              <div className={s.curve} role="img" aria-label={`Distribution of Hero hourly rates, median around $${Math.round((cat.earn.min + cat.earn.max) / 2)} per hour`}>
                {curve.bars.map((h, i) => (
                  <div
                    key={i}
                    className={`${s.curveBar} ${i === curve.medianIndex ? s.curveBarMedian : ''}`}
                    style={{ height: `${h}%` }}
                  >
                    {i === curve.medianIndex && <span className={s.curveFlag}>Median</span>}
                  </div>
                ))}
              </div>
              <div className={s.curveAxis}>
                <span>${cat.earn.min}/hr</span>
                <span className={s.curveAxisLabel}>{curve.axisLabel}</span>
                <span>${cat.earn.max}+/hr</span>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── HOW TO EARN — sticky narrative ───────────── */}
        <section className={s.how}>
          <div className={s.howInner}>
            <div className={s.howSticky}>
              <span className={s.kicker}>How it works</span>
              <h2 className={s.h2}>Three steps to your first payout.</h2>
              <p className={s.sectionLede}>
                No applications, no waiting around. Quests come to you — you pick, you price, you get paid.
              </p>
              <a href="/#cta" className={s.btnPrimary}>
                {HERO_COPY.cta}
                <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
              </a>
            </div>

            <ol className={s.howSteps}>
              {HOW_STEPS.map((step) => (
                <li key={step.n} className={`${s.howStep} ${accentClass[step.accent]}`}>
                  <span className={s.howN}>{step.n}</span>
                  <span className={`material-symbols-outlined ${s.howIcon}`} aria-hidden="true">{step.icon}</span>
                  <h3 className={s.howTitle}>{step.title}</h3>
                  <p className={s.howBody}>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────────── TOP HEROES — horizontal rail ───────────── */}
        <section className={s.heroes}>
          <div className={s.sectionHead}>
            <span className={s.kicker}>Heroes already earning</span>
            <h2 className={s.h2}>Real Heroes. Real reviews.</h2>
          </div>

          <ul className={s.rail}>
            {TOP_HEROES.map((h) => (
              <li key={h.name} className={s.profileCard}>
                <div className={s.profileTop}>
                  <img
                    className={s.profileAvatar}
                    src={h.avatar}
                    alt={h.name}
                    width={64}
                    height={64}
                    loading="lazy"
                  />
                  <div className={s.profileId}>
                    <span className={s.profileName}>{h.name}</span>
                    <span className={s.profileLoc}>{h.location}</span>
                    <span className={s.profileYears}>{h.years}</span>
                  </div>
                </div>

                <p className={s.profileQuote}>“{h.blurb}”</p>

                <div className={s.profileStats}>
                  <span className={s.profileStat}>
                    <span className={`material-symbols-outlined ${s.starIcon}`} aria-hidden="true">star</span>
                    <strong>{h.rating}</strong> {h.reviews}
                  </span>
                  <span className={s.profileStat}>
                    <strong>{h.completion}</strong> completion
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <a href="/#cta" className={s.btnPrimaryCenter}>
            {HERO_COPY.cta}
            <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
          </a>
        </section>

        {/* ───────────── FAQ ───────────── */}
        <section className={s.faq}>
          <div className={s.sectionHead}>
            <span className={s.kicker}>Good to know</span>
            <h2 className={s.h2}>Questions, answered.</h2>
          </div>

          <div className={s.faqList}>
            {HERO_FAQS.map((f, i) => (
              <details key={f.q} className={s.faqItem} {...(i === 0 ? { open: true } : {})}>
                <summary className={s.faqSummary}>
                  <span>{f.q}</span>
                  <span className={`material-symbols-outlined ${s.faqChev}`} aria-hidden="true">add</span>
                </summary>
                <p className={s.faqAnswer}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
