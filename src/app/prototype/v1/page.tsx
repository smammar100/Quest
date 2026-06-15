import Link from 'next/link';
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
import s from './v1.module.css';

export const metadata = { title: 'Earnings-first — Quest Hero page prototype' };

const cat = getCategory('home')!;

// Earnings-first direction: calm, premium, white base with coral accents.
// The numbers do the selling — a centered hero earnings module, an Airbnb-style
// three-stat row, and a soft coral bell-curve. CSS-module classes carry every
// section/heading/paragraph so the global bleed rules never apply.

export default function HeroEarningsPrototypeV1() {
  const quests = cat.listings.slice(0, 6);
  const { earnWidget } = HERO_COPY;

  return (
    <>
      <SiteHeader />

      <main className={s.page}>
        {/* 1 — HERO : centered value prop + earnings module + stat trio */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <span className={s.eyebrow}>
              <span className="material-symbols-outlined" aria-hidden="true">
                bolt
              </span>
              {HERO_COPY.eyebrow}
            </span>

            <h1 className={s.heroTitle}>{HERO_COPY.titlePattern(cat.label)}</h1>
            <p className={s.heroSub}>{HERO_COPY.subPattern(cat.label)}</p>

            {/* the earnings module — the centerpiece */}
            <div className={s.earnModule}>
              <p className={s.earnLabel}>{earnWidget.label}</p>
              <div className={s.earnAmountRow}>
                <span className={s.earnAmount}>{earnWidget.amount}</span>
                <span className={s.earnPeriod}>{earnWidget.period}</span>
              </div>
              <p className={s.earnCadence}>
                <span className="material-symbols-outlined" aria-hidden="true">
                  event_available
                </span>
                Based on {earnWidget.cadence}
              </p>

              <div className={s.heroCtas}>
                <Link href="/#cta" className={s.btnPrimary}>
                  {HERO_COPY.cta}
                  <span className="material-symbols-outlined" aria-hidden="true">
                    arrow_forward
                  </span>
                </Link>
                <Link href="#quests" className={s.btnGhost}>
                  {HERO_COPY.ctaSecondary}
                </Link>
              </div>
            </div>

            {/* three Airbnb-style stat cards */}
            <ul className={s.statTrio}>
              <li className={s.statCard}>
                <span className={s.statNum}>${cat.earn.max}/hr</span>
                <span className={s.statLabel}>Top payouts</span>
              </li>
              <li className={s.statCard}>
                <span className={s.statNum}>{cat.count}</span>
                <span className={s.statLabel}>Open {cat.label} quests</span>
              </li>
              <li className={s.statCard}>
                <span className={s.statNum}>24 hrs</span>
                <span className={s.statLabel}>Typical time to paid</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 2 — TRUST STAT BAND */}
        <section className={s.trustBand}>
          <ul className={s.trustRow}>
            <li className={s.trustItem}>
              <span className="material-symbols-outlined" aria-hidden="true">
                sell
              </span>
              <span className={s.trustText}>
                <strong>{cat.count}</strong> open {cat.label.toLowerCase()} quests
              </span>
            </li>
            <li className={s.trustDot} aria-hidden="true" />
            <li className={s.trustItem}>
              <span className="material-symbols-outlined" aria-hidden="true">
                payments
              </span>
              <span className={s.trustText}>
                <strong>
                  ${cat.earn.min}–${cat.earn.max}/hr
                </strong>{' '}
                typical pay
              </span>
            </li>
            <li className={s.trustDot} aria-hidden="true" />
            <li className={s.trustItem}>
              <span className="material-symbols-outlined" aria-hidden="true">
                schedule
              </span>
              <span className={s.trustText}>
                <strong>Paid within 24 hrs</strong> of approval
              </span>
            </li>
          </ul>
        </section>

        {/* 3 — WHY JOIN QUEST */}
        <section className={s.why}>
          <div className={s.sectionHead}>
            <span className={s.kicker}>Why Quest</span>
            <h2 className={s.h2}>Work that works around you.</h2>
          </div>
          <ul className={s.whyGrid}>
            {HERO_REASONS.map((r) => (
              <li key={r.title} className={s.whyCard}>
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

        {/* 4 — OPEN QUESTS */}
        <section className={s.quests} id="quests">
          <div className={s.sectionHead}>
            <span className={s.kicker}>Open right now</span>
            <h2 className={s.h2}>Fresh {cat.label} quests near you.</h2>
            <p className={s.sectionLede}>
              {cat.count} live quests, posted by real people who need a hand. Take
              what fits your week.
            </p>
          </div>

          <ul className={s.questGrid}>
            {quests.map((q) => (
              <li key={q.title} className={s.questCard}>
                <div className={s.questTop}>
                  <span className={s.questMeta}>
                    {q.payType} · {q.posted}
                  </span>
                  <span className={s.questPay}>{q.pay}</span>
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
                    <span key={t} className={s.questTag}>
                      {t}
                    </span>
                  ))}
                </div>
                <Link href="/#welcome" className={s.questAction}>
                  View quest
                  <span className="material-symbols-outlined" aria-hidden="true">
                    arrow_forward
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className={s.questsFoot}>
            <Link href="/quests/home" className={s.browseAll}>
              Browse all {cat.label} quests
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
          </div>
        </section>

        {/* 5 — EARNINGS / bell curve */}
        <section className={s.earnings}>
          <div className={s.earningsInner}>
            <div className={s.sectionHead}>
              <span className={s.kicker}>The numbers</span>
              <h2 className={s.h2}>What {cat.label} Heroes earn.</h2>
              <p className={s.sectionLede}>
                Most {cat.label.toLowerCase()} Heroes settle between{' '}
                <strong className={s.inlineCoral}>
                  ${cat.earn.min} and ${cat.earn.max} an hour
                </strong>
                . Take on more recurring quests and the curve shifts right.
              </p>
            </div>

            <figure className={s.curveFig}>
              <div className={s.curve} role="img" aria-label={`Distribution of hourly pay, ${EARN_CURVE.axisLabel}`}>
                {EARN_CURVE.bars.map((h, i) => {
                  const isMedian = i === EARN_CURVE.medianIndex;
                  return (
                    <div
                      key={i}
                      className={`${s.bar} ${isMedian ? s.barMedian : ''}`}
                      style={{ height: `${h}%` }}
                    >
                      {isMedian && (
                        <span className={s.medianTag}>
                          Median ${Math.round((cat.earn.min + cat.earn.max) / 2)}/hr
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <figcaption className={s.curveAxis}>
                <span>${cat.earn.min}/hr</span>
                <span className={s.curveAxisLabel}>{EARN_CURVE.axisLabel}</span>
                <span>${cat.earn.max}+/hr</span>
              </figcaption>
            </figure>

            <div className={s.earningsCta}>
              <Link href="/#cta" className={s.btnPrimary}>
                {HERO_COPY.cta}
                <span className="material-symbols-outlined" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* 6 — HOW TO EARN */}
        <section className={s.how}>
          <div className={s.sectionHead}>
            <span className={s.kicker}>How it works</span>
            <h2 className={s.h2}>Start earning in three steps.</h2>
          </div>
          <ol className={s.howGrid}>
            {HOW_STEPS.map((step) => (
              <li key={step.n} className={`${s.howCard} ${s[`accent_${step.accent}`]}`}>
                <div className={s.howCardTop}>
                  <span className={s.howNum}>{step.n}</span>
                  <span className={s.howDot} aria-hidden="true" />
                  <span className={s.howIcon}>
                    <span className="material-symbols-outlined" aria-hidden="true">
                      {step.icon}
                    </span>
                  </span>
                </div>
                <h3 className={s.howTitle}>{step.title}</h3>
                <p className={s.howBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 7 — TOP HEROES */}
        <section className={s.heroes}>
          <div className={s.sectionHead}>
            <span className={s.kicker}>Top Heroes</span>
            <h2 className={s.h2}>People already earning here.</h2>
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
                    <span className={s.heroLoc}>{h.location}</span>
                    <span className={s.heroYears}>{h.years}</span>
                  </div>
                </div>

                <div className={s.heroStats}>
                  <span className={s.heroStat}>
                    <span className={`material-symbols-outlined ${s.starIcon}`} aria-hidden="true">
                      star
                    </span>
                    {h.rating}
                  </span>
                  <span className={s.heroStat}>{h.reviews}</span>
                  <span className={s.heroStat}>{h.completion} done</span>
                </div>

                <p className={s.heroQuote}>“{h.blurb}”</p>
              </li>
            ))}
          </ul>
          <div className={s.heroesCta}>
            <Link href="/#cta" className={s.btnPrimary}>
              {HERO_COPY.cta}
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
          </div>
        </section>

        {/* 8 — FAQ */}
        <section className={s.faq}>
          <div className={s.sectionHead}>
            <span className={s.kicker}>Good to know</span>
            <h2 className={s.h2}>Questions, answered.</h2>
          </div>
          <div className={s.faqList}>
            {HERO_FAQS.map((f) => (
              <details key={f.q} className={s.faqItem}>
                <summary className={s.faqQ}>
                  <span>{f.q}</span>
                  <span className={`material-symbols-outlined ${s.faqChevron}`} aria-hidden="true">
                    add
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
