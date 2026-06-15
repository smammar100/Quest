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
import s from './v2.module.css';

export const metadata = {
  title: 'Bold Color-Block Poster — Quest Hero page prototype',
};

const cat = getCategory('home')!;

// Bell-curve hourly-rate ticks for the earnings viz axis.
const CURVE_TICKS = ['$10', '$20', '$30', '$45', '$60'];

export default function HeroCategoryV2() {
  const quests = cat.listings.slice(0, 6);

  return (
    <>
      <SiteHeader />

      <main className={s.page}>
        {/* ───────────────────── HERO ───────────────────── */}
        <section className={s.heroSection}>
          <div className={s.heroPanel}>
            <div className={s.heroInner}>
              <div className={s.heroCopy}>
                <span className={s.eyebrow}>
                  <span className="material-symbols-outlined" aria-hidden="true">
                    bolt
                  </span>
                  {HERO_COPY.eyebrow}
                </span>
                <h1 className={s.heroTitle}>{HERO_COPY.titlePattern(cat.label)}</h1>
                <p className={s.heroSub}>{HERO_COPY.subPattern(cat.label)}</p>

                <div className={s.heroCtas}>
                  <a href="/#cta" className={s.btnPrimary}>
                    {HERO_COPY.cta}
                    <span className="material-symbols-outlined" aria-hidden="true">
                      arrow_forward
                    </span>
                  </a>
                  <a href="#quests" className={s.btnOutline}>
                    {HERO_COPY.ctaSecondary}
                  </a>
                </div>

                <ul className={s.heroChips}>
                  {cat.subcategories.slice(0, 4).map((sc) => (
                    <li key={sc.slug} className={s.heroChip}>
                      {sc.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* floating earnings card overlapping the panel edge */}
              <div className={s.earnFloat}>
                <span className={s.earnFloatLabel}>{HERO_COPY.earnWidget.label}</span>
                <div className={s.earnFloatAmount}>
                  {HERO_COPY.earnWidget.amount}
                  <span className={s.earnFloatPeriod}>{HERO_COPY.earnWidget.period}</span>
                </div>
                <div className={s.earnFloatMeta}>
                  <span className="material-symbols-outlined" aria-hidden="true">
                    event_available
                  </span>
                  {HERO_COPY.earnWidget.cadence}
                </div>
                <div className={s.earnFloatBars}>
                  {EARN_CURVE.bars.map((b, i) => (
                    <span
                      key={i}
                      className={`${s.earnFloatBar} ${
                        i === EARN_CURVE.medianIndex ? s.earnFloatBarPeak : ''
                      }`}
                      style={{ height: `${Math.max(14, b)}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STAT ROW (just below the panel) */}
          <div className={s.statRow}>
            <div className={s.stat}>
              <span className={s.statNum}>{cat.count}</span>
              <span className={s.statLabel}>open Home quests right now</span>
            </div>
            <div className={s.stat}>
              <span className={s.statNum}>
                ${cat.earn.min}–${cat.earn.max}
                <span className={s.statUnit}>/hr</span>
              </span>
              <span className={s.statLabel}>typical Home pay</span>
            </div>
            <div className={s.stat}>
              <span className={s.statNum}>24 hrs</span>
              <span className={s.statLabel}>to get paid after approval</span>
            </div>
          </div>
        </section>

        {/* ───────────────── WHY JOIN QUEST ───────────────── */}
        <section className={s.whySection}>
          <div className={s.sectionHead}>
            <span className={s.kicker}>Why join Quest</span>
            <h2 className={s.whyHeading}>Built for people who&nbsp;just want to get paid.</h2>
          </div>
          <ul className={s.whyGrid}>
            {HERO_REASONS.map((r, i) => (
              <li key={r.title} className={`${s.whyCard} ${s[`why${i}`]}`}>
                <span className={s.whyIcon}>
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {r.icon}
                  </span>
                </span>
                <h3 className={s.whyTitle}>{r.title}</h3>
                <p className={s.whyBody}>{r.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ───────────────── OPEN QUESTS ───────────────── */}
        <section id="quests" className={s.questsSection}>
          <div className={s.sectionHead}>
            <span className={s.kicker}>Open right now</span>
            <h2 className={s.questsHeading}>{cat.count} Home quests waiting on a Hero.</h2>
            <p className={s.questsSub}>{cat.tagline}</p>
          </div>

          <ul className={s.questGrid}>
            {quests.map((q) => (
              <li key={q.title} className={s.questCard}>
                <div className={s.questTop}>
                  <span
                    className={`${s.payTag} ${
                      q.payType === 'Hourly' ? s.payTagHourly : ''
                    }`}
                  >
                    {q.pay}
                  </span>
                  <span className={s.questMeta}>
                    {q.payType} · {q.posted}
                  </span>
                </div>

                <h3 className={s.questTitle}>{q.title}</h3>
                <p className={s.questTeaser}>{q.teaser}</p>

                <div className={s.questFacts}>
                  <span className={s.questFact}>
                    <span className="material-symbols-outlined" aria-hidden="true">
                      schedule
                    </span>
                    {q.time}
                  </span>
                  <span className={s.questFact}>
                    <span className="material-symbols-outlined" aria-hidden="true">
                      workspace_premium
                    </span>
                    {q.level}
                  </span>
                </div>

                <div className={s.questTags}>
                  {q.tags.map((t) => (
                    <span key={t} className={s.questTagPill}>
                      {t}
                    </span>
                  ))}
                </div>

                <a href="/#welcome" className={s.questAction}>
                  Take this quest
                  <span className="material-symbols-outlined" aria-hidden="true">
                    arrow_forward
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className={s.questsFootRow}>
            <a href="/quests/home" className={s.browseLink}>
              Browse all Home quests
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_forward
              </span>
            </a>
          </div>
        </section>

        {/* ───────────── NEAR-BLACK POSTER DIVIDER ───────────── */}
        <section className={s.posterSection}>
          <p className={s.posterKicker}>No boss. No commute. No catch.</p>
          <h2 className={s.posterHeadline}>
            Do what you&apos;re good at. <span className={s.posterAccent}>Get paid for it.</span>
          </h2>
          <a href="/#cta" className={s.posterBtn}>
            {HERO_COPY.cta}
            <span className="material-symbols-outlined" aria-hidden="true">
              rocket_launch
            </span>
          </a>
        </section>

        {/* ───────────────── EARNINGS ───────────────── */}
        <section className={s.earnSection}>
          <div className={s.earnGrid}>
            <div className={s.earnCopy}>
              <span className={s.kicker}>The money</span>
              <h2 className={s.earnHeading}>What Home Heroes earn.</h2>
              <p className={s.earnLede}>
                Most Home quests pay between{' '}
                <strong className={s.earnStrong}>
                  ${cat.earn.min} and ${cat.earn.max}/hr
                </strong>
                . Stack a couple a week and it adds up fast — recurring cleans and
                regular yard work turn into steady income.
              </p>
              <div className={s.earnBigNum}>
                {HERO_COPY.earnWidget.amount}
                <span className={s.earnBigPeriod}>
                  typical {HERO_COPY.earnWidget.period.replace('per ', '/')}
                </span>
              </div>
              <a href="/#cta" className={s.btnPrimary}>
                {HERO_COPY.cta}
                <span className="material-symbols-outlined" aria-hidden="true">
                  arrow_forward
                </span>
              </a>
            </div>

            <div className={s.earnVizCard}>
              <span className={s.earnVizTitle}>How Home pay spreads out</span>
              <div className={s.earnVizBars}>
                {EARN_CURVE.bars.map((b, i) => (
                  <div key={i} className={s.earnVizCol}>
                    <div
                      className={`${s.earnVizBar} ${
                        i === EARN_CURVE.medianIndex ? s.earnVizBarMedian : ''
                      }`}
                      style={{ height: `${Math.max(8, b)}%` }}
                    >
                      {i === EARN_CURVE.medianIndex && (
                        <span className={s.earnVizFlag}>median</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className={s.earnVizAxis}>
                {CURVE_TICKS.map((t) => (
                  <span key={t} className={s.earnVizTick}>
                    {t}
                  </span>
                ))}
              </div>
              <span className={s.earnVizAxisLabel}>{EARN_CURVE.axisLabel}</span>
            </div>
          </div>
        </section>

        {/* ───────────────── HOW TO EARN ───────────────── */}
        <section className={s.howSection}>
          <div className={s.sectionHead}>
            <span className={s.kicker}>How it works</span>
            <h2 className={s.howHeading}>Three steps to your first payout.</h2>
          </div>
          <ul className={s.howGrid}>
            {HOW_STEPS.map((step, i) => (
              <li key={step.n} className={`${s.howCard} ${s[`how_${step.accent}`]}`}>
                <div className={s.howCardTop}>
                  <span className={s.howPill}>Step {step.n}</span>
                  <span className={s.howIcon}>
                    <span className="material-symbols-outlined" aria-hidden="true">
                      {step.icon}
                    </span>
                  </span>
                </div>
                <h3 className={s.howTitle}>{step.title}</h3>
                <p className={s.howBody}>{step.body}</p>
                {i < HOW_STEPS.length - 1 && (
                  <span className={s.howArrow} aria-hidden="true">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* ───────────────── TOP HEROES ───────────────── */}
        <section className={s.heroesSection}>
          <div className={s.sectionHead}>
            <span className={s.kicker}>Meet the Heroes</span>
            <h2 className={s.heroesHeading}>Real people, getting it done.</h2>
          </div>
          <ul className={s.heroesGrid}>
            {TOP_HEROES.map((h) => (
              <li key={h.name} className={s.heroCard}>
                <div className={s.heroCardHead}>
                  <img
                    className={s.heroAvatar}
                    src={h.avatar}
                    alt={h.name}
                    width={64}
                    height={64}
                    loading="lazy"
                  />
                  <div className={s.heroIdent}>
                    <span className={s.heroName}>{h.name}</span>
                    <span className={s.heroLoc}>
                      <span className="material-symbols-outlined" aria-hidden="true">
                        location_on
                      </span>
                      {h.location}
                    </span>
                  </div>
                </div>

                <p className={s.heroQuote}>&ldquo;{h.blurb}&rdquo;</p>

                <div className={s.heroStats}>
                  <span className={s.heroStat}>
                    <span className={s.heroStatStar}>
                      <span className="material-symbols-outlined" aria-hidden="true">
                        star
                      </span>
                      {h.rating}
                    </span>
                    <span className={s.heroStatLabel}>{h.reviews}</span>
                  </span>
                  <span className={s.heroStat}>
                    <span className={s.heroStatNum}>{h.completion}</span>
                    <span className={s.heroStatLabel}>completion</span>
                  </span>
                  <span className={s.heroStat}>
                    <span className={s.heroStatNum}>{h.years.split(' ')[0]}</span>
                    <span className={s.heroStatLabel}>years on Quest</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className={s.heroesCtaRow}>
            <a href="/#cta" className={s.btnPrimary}>
              {HERO_COPY.cta}
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_forward
              </span>
            </a>
          </div>
        </section>

        {/* ───────────────── FAQ ───────────────── */}
        <section className={s.faqSection}>
          <div className={s.sectionHead}>
            <span className={s.kicker}>Good to know</span>
            <h2 className={s.faqHeading}>Questions, answered.</h2>
          </div>
          <div className={s.faqList}>
            {HERO_FAQS.map((f) => (
              <details key={f.q} className={s.faqItem}>
                <summary className={s.faqQ}>
                  <span>{f.q}</span>
                  <span className={s.faqChevron} aria-hidden="true">
                    <span className="material-symbols-outlined">add</span>
                  </span>
                </summary>
                <p className={s.faqA}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
