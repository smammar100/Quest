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
import s from './v4.module.css';

export const metadata = { title: 'Editorial Alternating Rows — Quest Hero page prototype' };

const cat = getCategory('home')!;

// Per-row color-block palette + floating proof chip, alternating left/right.
// Echoes Airtasker's "Get found / Get booked" feature rows.
const REASON_VISUALS = [
  { panel: 'var(--sky)', accent: 'var(--electric)', glyph: 'event_available' },
  { panel: 'var(--coral-tint)', accent: 'var(--coral)', glyph: 'rocket_launch' },
  { panel: 'var(--lime)', accent: 'var(--near-black)', glyph: 'verified_user' },
  { panel: '#F2ECDF', accent: 'var(--marigold)', glyph: 'workspace_premium' },
] as const;

const REASON_CHIPS = [
  { icon: 'calendar_month', label: 'You set the hours', meta: 'Mon · Wed · Sat' },
  { icon: 'bolt', label: 'Live in minutes', meta: 'Profile · approved' },
  { icon: 'verified', label: 'Funds in escrow', meta: '$240 · secured' },
  { icon: 'star', label: 'Top-rated streak', meta: '5.0 · 18 quests' },
] as const;

const STATS = [
  { figure: cat.count, label: `open ${cat.label} quests right now`, icon: 'home' },
  { figure: `$${cat.earn.min}–$${cat.earn.max}`, label: 'typical pay per hour', icon: 'payments' },
  { figure: '24 hrs', label: 'from accepted to paid', icon: 'schedule' },
] as const;

const previews = cat.listings.slice(0, 6);

export default function V4Page() {
  return (
    <>
      <SiteHeader />

      <main className={s.page}>
        {/* ───────────────────────── HERO ───────────────────────── */}
        <section className={s.hero}>
          <div className={s.heroGrid}>
            <div className={s.heroLeft}>
              <span className={s.eyebrow}>
                <span className={s.eyebrowDot} aria-hidden="true" />
                {HERO_COPY.eyebrow}
              </span>
              <h1 className={s.heroTitle}>{HERO_COPY.titlePattern(cat.label)}</h1>
              <p className={s.heroSub}>{HERO_COPY.subPattern(cat.label)}</p>
              <div className={s.heroActions}>
                <a href="/#cta" className={s.btnPrimary}>
                  {HERO_COPY.cta}
                  <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </a>
                <a href="#quests" className={s.btnGhost}>{HERO_COPY.ctaSecondary}</a>
              </div>
              <p className={s.heroFoot}>
                <span className="material-symbols-outlined" aria-hidden="true">verified_user</span>
                No joining fee · funds held in escrow · cancel anytime
              </p>
            </div>

            {/* earnings widget card */}
            <aside className={s.earnCard} aria-label={HERO_COPY.earnWidget.label}>
              <p className={s.earnCardLabel}>{HERO_COPY.earnWidget.label}</p>
              <p className={s.earnAmount}>
                {HERO_COPY.earnWidget.amount}
                <span className={s.earnPeriod}>{HERO_COPY.earnWidget.period}</span>
              </p>
              <div className={s.earnSlider}>
                <div className={s.earnSliderHead}>
                  <span>Your pace</span>
                  <span className={s.earnCadence}>{HERO_COPY.earnWidget.cadence}</span>
                </div>
                <div className={s.earnTrack} aria-hidden="true">
                  <div className={s.earnFill} />
                  <div className={s.earnKnob} />
                </div>
                <div className={s.earnScale} aria-hidden="true">
                  <span>1 / wk</span>
                  <span>3 / wk</span>
                  <span>5 / wk</span>
                </div>
              </div>
              <div className={s.earnBreak}>
                <div className={s.earnBreakRow}>
                  <span>Typical payout</span>
                  <strong>${cat.earn.min}–${cat.earn.max}/hr</strong>
                </div>
                <div className={s.earnBreakRow}>
                  <span>Paid out</span>
                  <strong>Within 24 hrs</strong>
                </div>
              </div>
              <a href="/#cta" className={s.earnCta}>{HERO_COPY.cta}</a>
            </aside>
          </div>

          {/* ──────────────── STAT ROW ──────────────── */}
          <div className={s.statRow}>
            {STATS.map((st) => (
              <div className={s.stat} key={st.label}>
                <span className={`material-symbols-outlined ${s.statIcon}`} aria-hidden="true">{st.icon}</span>
                <div className={s.statBody}>
                  <p className={s.statFigure}>{st.figure}</p>
                  <p className={s.statLabel}>{st.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────── WHY JOIN — ALTERNATING ROWS ───────────────── */}
        <section className={s.why}>
          <div className={s.sectionHead}>
            <span className={s.kicker}>Why Quest</span>
            <h2 className={s.sectionTitle}>Work that works around you.</h2>
            <p className={s.sectionLede}>
              Four reasons Heroes keep coming back — laid out plainly, no fine print.
            </p>
          </div>

          <div className={s.rows}>
            {HERO_REASONS.map((r, i) => {
              const v = REASON_VISUALS[i];
              const chip = REASON_CHIPS[i];
              const flipped = i % 2 === 1;
              return (
                <article
                  className={`${s.row} ${flipped ? s.rowFlip : ''}`}
                  key={r.title}
                >
                  <div className={s.rowText}>
                    <span className={s.rowNum}>{String(i + 1).padStart(2, '0')}</span>
                    <h3 className={s.rowTitle}>{r.title}</h3>
                    <p className={s.rowBody}>{r.body}</p>
                  </div>

                  <div
                    className={s.rowVisual}
                    style={{ ['--panel' as string]: v.panel, ['--accent' as string]: v.accent }}
                  >
                    <span
                      className={`material-symbols-outlined ${s.rowGlyph}`}
                      aria-hidden="true"
                    >
                      {v.glyph}
                    </span>
                    {/* floating proof chip */}
                    <div className={s.proofChip}>
                      <span className={`material-symbols-outlined ${s.proofChipIcon}`} aria-hidden="true">{chip.icon}</span>
                      <span className={s.proofChipText}>
                        <strong>{chip.label}</strong>
                        <span>{chip.meta}</span>
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ───────────────────── OPEN QUESTS ───────────────────── */}
        <section className={s.quests} id="quests">
          <div className={s.sectionHead}>
            <span className={s.kicker}>Open now</span>
            <h2 className={s.sectionTitle}>Fresh {cat.label.toLowerCase()} quests near you.</h2>
            <p className={s.sectionLede}>
              {cat.count} live right now. Set your price, pick your hours, get paid fast.
            </p>
          </div>

          <div className={s.questGrid}>
            {previews.map((q) => (
              <a className={s.questCard} href="/#welcome" key={q.title}>
                <div className={s.questTop}>
                  <span className={`${s.questLevel} ${q.level === 'Top-rated Hero' ? s.levelTop : q.level === 'Experienced' ? s.levelExp : s.levelOpen}`}>
                    {q.level}
                  </span>
                  <span className={s.questPay}>{q.pay}</span>
                </div>
                <h3 className={s.questTitle}>{q.title}</h3>
                <p className={s.questMeta}>
                  {q.payType} · {q.posted}
                </p>
                <p className={s.questTeaser}>{q.teaser}</p>
                <div className={s.questFoot}>
                  <span className={s.questTime}>
                    <span className="material-symbols-outlined" aria-hidden="true">schedule</span>
                    {q.time}
                  </span>
                  <div className={s.questTags}>
                    {q.tags.map((t) => (
                      <span className={s.questTag} key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <a className={s.browseAll} href="/quests/home">
            Browse all {cat.label} quests
            <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
          </a>
        </section>

        {/* ───────────────────── EARNINGS ───────────────────── */}
        <section className={s.earn}>
          <div className={s.earnInner}>
            <div className={s.earnCopy}>
              <span className={s.kicker}>The numbers</span>
              <h2 className={s.sectionTitle}>What {cat.label} Heroes earn.</h2>
              <p className={s.sectionLede}>
                Most {cat.label.toLowerCase()} Heroes land between{' '}
                <strong className={s.earnHi}>${cat.earn.min}</strong> and{' '}
                <strong className={s.earnHi}>${cat.earn.max}</strong> an hour. The more
                five-star quests you finish, the higher your rate climbs.
              </p>
              <a href="/#cta" className={s.btnPrimary}>
                {HERO_COPY.cta}
                <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
              </a>
            </div>

            <div className={s.curveCard}>
              <p className={s.curveLabel}>Heroes by hourly rate</p>
              <div className={s.curve} role="img" aria-label="Distribution of Home Hero hourly earnings, peaking near the median rate">
                {EARN_CURVE.bars.map((h, i) => (
                  <div
                    className={`${s.curveBar} ${i === EARN_CURVE.medianIndex ? s.curveBarMedian : ''}`}
                    key={i}
                    style={{ ['--h' as string]: `${h}%` }}
                  >
                    {i === EARN_CURVE.medianIndex && (
                      <span className={s.curveMedianTag}>Median</span>
                    )}
                  </div>
                ))}
              </div>
              <div className={s.curveAxis}>
                <span>${cat.earn.min}/hr</span>
                <span className={s.curveAxisLabel}>{EARN_CURVE.axisLabel}</span>
                <span>${cat.earn.max}+/hr</span>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────── HOW TO EARN ───────────────────── */}
        <section className={s.how}>
          <div className={s.howBand}>
            <div className={s.sectionHead}>
              <span className={s.kicker}>How it works</span>
              <h2 className={s.sectionTitle}>Start earning in three steps.</h2>
              <p className={s.sectionLede}>
                No interviews, no waiting. Set up once and quests come to you.
              </p>
            </div>

            <div className={s.steps}>
              {HOW_STEPS.map((step) => (
                <div className={`${s.step} ${s[`accent_${step.accent}`]}`} key={step.n}>
                  <div className={s.stepTop}>
                    <span className={s.stepNum}>{step.n}</span>
                    <span className={`material-symbols-outlined ${s.stepIcon}`} aria-hidden="true">{step.icon}</span>
                  </div>
                  <h3 className={s.stepTitle}>{step.title}</h3>
                  <p className={s.stepBody}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────── TOP HEROES ───────────────────── */}
        <section className={s.heroes}>
          <div className={s.sectionHead}>
            <span className={s.kicker}>Real Heroes</span>
            <h2 className={s.sectionTitle}>People already earning here.</h2>
            <p className={s.sectionLede}>
              Top-rated {cat.label} Heroes who turned spare hours into steady income.
            </p>
          </div>

          <div className={s.heroCards}>
            {TOP_HEROES.map((h) => (
              <article className={s.heroProfile} key={h.name}>
                <div className={s.heroProfileTop}>
                  <img className={s.heroAvatar} src={h.avatar} alt={h.name} width={64} height={64} loading="lazy" />
                  <div>
                    <p className={s.heroName}>{h.name}</p>
                    <p className={s.heroLoc}>{h.location}</p>
                  </div>
                </div>
                <p className={s.heroQuote}>“{h.blurb}”</p>
                <div className={s.heroStats}>
                  <span className={s.heroRating}>
                    <span className="material-symbols-outlined" aria-hidden="true">star</span>
                    {h.rating}
                  </span>
                  <span className={s.heroStatSep} aria-hidden="true">·</span>
                  <span>{h.reviews}</span>
                  <span className={s.heroStatSep} aria-hidden="true">·</span>
                  <span>{h.completion} done</span>
                </div>
              </article>
            ))}
          </div>

          <div className={s.heroesCta}>
            <a href="/#cta" className={s.btnPrimary}>
              {HERO_COPY.cta}
              <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
            </a>
            <a href="#quests" className={s.btnGhost}>{HERO_COPY.ctaSecondary}</a>
          </div>
        </section>

        {/* ───────────────────── FAQ ───────────────────── */}
        <section className={s.faq}>
          <div className={s.faqHead}>
            <span className={s.kicker}>Good to know</span>
            <h2 className={s.sectionTitle}>Questions, answered.</h2>
          </div>

          <div className={s.faqList}>
            {HERO_FAQS.map((f) => (
              <details className={s.faqItem} key={f.q}>
                <summary className={s.faqQ}>
                  <span>{f.q}</span>
                  <span className={`material-symbols-outlined ${s.faqChevron}`} aria-hidden="true">add</span>
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
