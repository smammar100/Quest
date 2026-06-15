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
import s from './v3.module.css';

export const metadata = { title: 'Bento Mosaic — Quest Hero page prototype' };

const cat = getCategory('home')!;
const quests = cat.listings.slice(0, 6);
const earnLow = `$${cat.earn.min}`;
const earnHigh = `$${cat.earn.max}`;

// map the data accent keys to module-css tile classes
const stepAccent: Record<string, string> = {
  electric: s.tileElectric,
  marigold: s.tileMarigold,
  lime: s.tileLime,
  violet: s.tileViolet,
};

export default function Page() {
  return (
    <>
      <SiteHeader />

      <main className={s.page}>
        {/* ───────────────────────── HERO BENTO ───────────────────────── */}
        <section className={s.heroSection}>
          <div className={s.heroGrid}>
            {/* Big headline tile */}
            <div className={`${s.tile} ${s.heroLead}`}>
              <span className={s.eyebrow}>
                <span className="material-symbols-outlined">bolt</span>
                {HERO_COPY.eyebrow}
              </span>
              <h1 className={s.heroTitle}>{HERO_COPY.titlePattern(cat.label)}</h1>
              <p className={s.heroSub}>{HERO_COPY.subPattern(cat.label)}</p>
              <div className={s.heroActions}>
                <Link href="/#cta" className={s.btnPrimary}>
                  {HERO_COPY.cta}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <Link href="#quests" className={s.btnGhost}>
                  {HERO_COPY.ctaSecondary}
                </Link>
              </div>
            </div>

            {/* Earnings widget tile (coral) */}
            <div className={`${s.tile} ${s.tileCoral} ${s.heroEarn}`}>
              <span className={s.earnLabel}>{HERO_COPY.earnWidget.label}</span>
              <span className={s.earnAmount}>{HERO_COPY.earnWidget.amount}</span>
              <span className={s.earnPeriod}>{HERO_COPY.earnWidget.period}</span>
              <div className={s.earnCadence}>
                <span className="material-symbols-outlined">event_available</span>
                {HERO_COPY.earnWidget.cadence}
              </div>
            </div>

            {/* Category badge tile (near-black) */}
            <div className={`${s.tile} ${s.tileBlack} ${s.heroCat}`}>
              <span className={`material-symbols-outlined ${s.heroCatIcon}`}>
                {cat.icon}
              </span>
              <span className={s.heroCatCount}>{cat.count}</span>
              <span className={s.heroCatLabel}>open {cat.label} quests</span>
            </div>

            {/* Mini quest card tile (beige) */}
            <div className={`${s.tile} ${s.tileBeige} ${s.heroMini}`}>
              <span className={s.miniTag}>Live now</span>
              <span className={s.miniTitle}>{quests[0].title}</span>
              <div className={s.miniFoot}>
                <span className={s.miniPay}>{quests[0].pay}</span>
                <span className={s.miniMeta}>{quests[0].time}</span>
              </div>
            </div>

            {/* Big social-proof number tile (lime) */}
            <div className={`${s.tile} ${s.tileLime} ${s.heroProof}`}>
              <span className={s.proofNumber}>$2.4M</span>
              <span className={s.proofLabel}>paid to Heroes this month</span>
            </div>

            {/* Rating tile (violet) */}
            <div className={`${s.tile} ${s.tileViolet} ${s.heroRating}`}>
              <span className={s.ratingStars}>
                <span className="material-symbols-outlined">star</span>
                4.9
              </span>
              <span className={s.ratingLabel}>avg Hero rating</span>
            </div>
          </div>
        </section>

        {/* ───────────────────────── STAT ROW ───────────────────────── */}
        <section className={s.statSection}>
          <div className={s.statGrid}>
            <div className={`${s.tile} ${s.tileMarigold} ${s.statTile}`}>
              <span className="material-symbols-outlined">workspace_premium</span>
              <span className={s.statNum}>{cat.count}</span>
              <span className={s.statText}>open {cat.label} quests</span>
            </div>
            <div className={`${s.tile} ${s.tileElectric} ${s.statTile}`}>
              <span className="material-symbols-outlined">sell</span>
              <span className={s.statNum}>
                {earnLow}–{earnHigh}
              </span>
              <span className={s.statText}>typical pay per hour</span>
            </div>
            <div className={`${s.tile} ${s.tileBeige} ${s.statTile}`}>
              <span className="material-symbols-outlined">bolt</span>
              <span className={s.statNum}>24 hrs</span>
              <span className={s.statText}>typical time to get paid</span>
            </div>
          </div>
        </section>

        {/* ───────────────────────── WHY JOIN ───────────────────────── */}
        <section className={s.whySection}>
          <div className={s.sectionHead}>
            <h2 className={s.sectionTitle}>Why Heroes choose Quest</h2>
            <p className={s.sectionLede}>
              No gatekeepers, no fees, no boss. Just the work you want, on the
              terms you set.
            </p>
          </div>
          <div className={s.whyGrid}>
            {HERO_REASONS.map((r, i) => (
              <div
                key={r.title}
                className={`${s.tile} ${s.whyTile} ${
                  [s.tileBeige, s.tileSky, s.tileBeige, s.tileSky][i]
                }`}
              >
                <span className={`material-symbols-outlined ${s.whyIcon}`}>
                  {r.icon}
                </span>
                <h3 className={s.whyTitle}>{r.title}</h3>
                <p className={s.whyBody}>{r.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────── OPEN QUESTS ───────────────────────── */}
        <section className={s.questsSection} id="quests">
          <div className={s.sectionHead}>
            <h2 className={s.sectionTitle}>Open {cat.label} quests right now</h2>
            <p className={s.sectionLede}>{cat.tagline}</p>
          </div>
          <div className={s.questGrid}>
            {quests.map((q) => (
              <Link key={q.title} href="/#welcome" className={`${s.tile} ${s.questTile}`}>
                <div className={s.questTop}>
                  <span className={s.questPay}>{q.pay}</span>
                  <span className={s.questLevel}>{q.level}</span>
                </div>
                <h3 className={s.questTitle}>{q.title}</h3>
                <p className={s.questTeaser}>{q.teaser}</p>
                <div className={s.questTags}>
                  {q.tags.map((t) => (
                    <span key={t} className={s.questTag}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className={s.questFoot}>
                  <span className={s.questMeta}>
                    {q.payType} · {q.posted}
                  </span>
                  <span className={s.questTime}>
                    <span className="material-symbols-outlined">schedule</span>
                    {q.time}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className={s.questsBrowse}>
            <Link href="/quests/home" className={s.browseLink}>
              Browse all {cat.label} quests
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </section>

        {/* ───────────────────────── EARNINGS ───────────────────────── */}
        <section className={s.earnSection}>
          <div className={s.earnGrid}>
            <div className={`${s.tile} ${s.tileBlack} ${s.earnCopy}`}>
              <h2 className={s.earnHeadline}>What {cat.label} Heroes earn</h2>
              <p className={s.earnText}>
                Most Heroes in this category take home between {earnLow} and{' '}
                {earnHigh} an hour. Stack a few recurring quests and it adds up
                fast.
              </p>
              <div className={s.earnRange}>
                <span className={s.earnRangeNum}>
                  {earnLow}–{earnHigh}
                </span>
                <span className={s.earnRangeText}>typical hourly rate</span>
              </div>
              <Link href="/#cta" className={s.btnPrimary}>
                {HERO_COPY.cta}
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>

            <div className={`${s.tile} ${s.tileLime} ${s.earnViz}`}>
              <span className={s.vizLabel}>Distribution of Hero earnings</span>
              <div className={s.vizBars}>
                {EARN_CURVE.bars.map((h, i) => (
                  <div key={i} className={s.vizCol}>
                    <div
                      className={`${s.vizBar} ${
                        i === EARN_CURVE.medianIndex ? s.vizBarMedian : ''
                      }`}
                      style={{ height: `${h}%` }}
                    >
                      {i === EARN_CURVE.medianIndex && (
                        <span className={s.vizMedianTag}>median</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <span className={s.vizAxis}>{EARN_CURVE.axisLabel}</span>
            </div>
          </div>
        </section>

        {/* ───────────────────────── HOW TO EARN ───────────────────────── */}
        <section className={s.howSection}>
          <div className={s.sectionHead}>
            <h2 className={s.sectionTitle}>How to start earning</h2>
            <p className={s.sectionLede}>
              Three steps from sign-up to your first payout.
            </p>
          </div>
          <div className={s.howGrid}>
            {HOW_STEPS.map((step) => (
              <div
                key={step.n}
                className={`${s.tile} ${s.howTile} ${stepAccent[step.accent]}`}
              >
                <span className={s.howNum}>{step.n}</span>
                <span className={`material-symbols-outlined ${s.howIcon}`}>
                  {step.icon}
                </span>
                <h3 className={s.howTitle}>{step.title}</h3>
                <p className={s.howBody}>{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────── TOP HEROES ───────────────────────── */}
        <section className={s.heroesSection}>
          <div className={s.sectionHead}>
            <h2 className={s.sectionTitle}>Heroes who made it their own</h2>
            <p className={s.sectionLede}>
              Real Heroes earning real money in the {cat.label.toLowerCase()}{' '}
              category.
            </p>
          </div>
          <div className={s.heroesGrid}>
            {TOP_HEROES.map((h, i) => (
              <div
                key={h.name}
                className={`${s.tile} ${s.heroProfileTile} ${
                  [s.tileBeige, s.tileSky, s.tileBeige][i]
                }`}
              >
                <div className={s.profileHead}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={s.profileAvatar}
                    src={h.avatar}
                    alt={h.name}
                    width={64}
                    height={64}
                    loading="lazy"
                  />
                  <div className={s.profileWho}>
                    <span className={s.profileName}>{h.name}</span>
                    <span className={s.profileLoc}>{h.location}</span>
                  </div>
                </div>
                <p className={s.profileQuote}>“{h.blurb}”</p>
                <div className={s.profileStats}>
                  <span className={s.profileStat}>
                    <span className="material-symbols-outlined">star</span>
                    {h.rating}
                  </span>
                  <span className={s.profileStatMeta}>{h.reviews}</span>
                  <span className={s.profileStatMeta}>{h.completion} done</span>
                </div>
              </div>
            ))}
          </div>
          <div className={`${s.tile} ${s.tileCoral} ${s.heroesCta}`}>
            <span className={s.heroesCtaText}>
              Your name could be on this wall next.
            </span>
            <Link href="/#cta" className={s.btnInverse}>
              {HERO_COPY.cta}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </section>

        {/* ───────────────────────── FAQ ───────────────────────── */}
        <section className={s.faqSection}>
          <div className={s.sectionHead}>
            <h2 className={s.sectionTitle}>Questions, answered</h2>
            <p className={s.sectionLede}>
              Everything you need to know before your first quest.
            </p>
          </div>
          <div className={s.faqList}>
            {HERO_FAQS.map((f) => (
              <details key={f.q} className={s.faqItem}>
                <summary className={s.faqSummary}>
                  <span>{f.q}</span>
                  <span className={`material-symbols-outlined ${s.faqChevron}`}>
                    expand_more
                  </span>
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
