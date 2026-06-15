import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/sections/SiteHeader';
import SiteFooter from '@/components/sections/SiteFooter';
import CtaSection from '@/components/sections/CtaSection';
import ScrollFX from '@/components/sections/ScrollFX';
import { QUEST_CATEGORIES, getCategory, monthlyEstimate } from '@/app/lib/quests-data';
import { HERO_REASONS, HOW_STEPS, TOP_HEROES, HERO_FAQS, EARN_CURVE } from '@/app/lib/hero-page-data';

// Hero category landing template (the "As a Hero" page). Structure adapts the
// Airtasker individual-category page into Quest's design system:
//   image hero → why join → open quests (3×3) → earnings (dark, animated) →
//   how to earn → meet the heroes → category FAQ → CTA → footer.
// Only the data in lib/quests-data.ts + lib/hero-page-data.ts changes per
// category; the page is shared.

type Params = Promise<{ category: string }>;

export function generateStaticParams() {
  return QUEST_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const cat = getCategory((await params).category);
  if (!cat) return {};
  return {
    title: `Earn as a ${cat.label} Hero on Quest`,
    description: `Find ${cat.count} open ${cat.label.toLowerCase()} quests near you. Set your price, work your hours, get paid fast.`,
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const cat = getCategory((await params).category);
  if (!cat) notFound();
  const low = cat.label.toLowerCase();

  const quests = cat.listings.slice(0, 9);

  const FAQS = [
    {
      q: `What kind of ${low} quests can I take on?`,
      a: `${cat.seo.intro} Most quests fall under ${cat.subcategories.slice(0, 3).map((s) => s.label.toLowerCase()).join(', ')} and more — pick whatever fits your skills and your week.`,
    },
    ...HERO_FAQS,
  ];

  const monthly = monthlyEstimate(cat.earn);

  return (
    <>
      <SiteHeader />

      {/* ── Hero ── */}
      <section className="qh">
        <div className="qh__banner" style={{ '--qh-img': `url(${cat.image})` } as CSSProperties}>
          <div className="qh__main">
          <div className="qh__content">
            <div className="qh__crumbs">
              <Link href="/quests">Browse</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{cat.label}</span>
            </div>
            <h1 className="qh__title">{cat.label} quests near you.</h1>
            <p className="qh__sub">Browse over {cat.count} open {low} quests near you.</p>
          </div>

          <aside className="qh__earn" aria-label="Estimated earnings">
            <p className="qh__earn-label">See what you could earn</p>
            <div className="qh__earn-field">
              <span className="material-symbols-outlined">tune</span>
              <span className="qh__earn-field-val">1–2 quests / week</span>
              <span className="material-symbols-outlined qh__earn-chev">expand_more</span>
            </div>
            <div className="qh__earn-field qh__earn-field--loc">
              <span className="material-symbols-outlined">location_on</span>
              <span className="qh__earn-field-val">United States</span>
            </div>
            <p className="qh__earn-amount">
              {monthly}<span className="qh__earn-per">per month</span>
            </p>
            <a href="/#cta" className="qh__earn-cta">Become a Hero</a>
            <p className="qh__earn-fine">Based on average {low} payouts. Actual earnings vary.</p>
          </aside>
          </div>
        </div>
      </section>

      {/* ── Why Heroes choose Quest ── */}
      <section className="hc-why">
        <p className="hc-eyebrow">Why Heroes choose Quest</p>
        <h2 className="hc-h2">Built around your<br />time, not ours.</h2>
        <div className="hc-why__grid">
          {HERO_REASONS.map((r) => (
            <article className="hc-reason" key={r.title}>
              <span className="hc-reason__icon" aria-hidden="true">
                <span className="material-symbols-outlined">{r.icon}</span>
              </span>
              <h3 className="hc-reason__title">{r.title}</h3>
              <p className="hc-reason__body">{r.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Open quests (3×3) ── */}
      <section className="hc-quests" id="quests">
        <p className="hc-eyebrow">Open right now</p>
        <h2 className="hc-h2">Fresh {low} quests, open now.</h2>
        <p className="hc-lede">{cat.tagline}</p>

        <div className="hc-quests__grid">
          {quests.map((q) => (
            <article className="hc-card" key={q.title}>
              <div className="hc-card__top">
                <span className="hc-card__pay">{q.pay}</span>
                <span className="hc-card__meta">{q.payType} · {q.posted}</span>
              </div>
              <h3 className="hc-card__title">{q.title}</h3>
              <p className="hc-card__teaser">{q.teaser}</p>
              <div className="hc-card__foot">
                <span className="hc-card__time">
                  <span className="material-symbols-outlined">schedule</span>{q.time}
                </span>
                <a href="/#welcome" className="hc-card__view">View<span className="material-symbols-outlined">arrow_forward</span></a>
              </div>
            </article>
          ))}
        </div>

        <a href="/quests" className="hc-btn hc-btn--primary hc-quests__cta">
          Browse all {cat.label} quests<span className="material-symbols-outlined">arrow_forward</span>
        </a>
      </section>

      {/* ── Earnings (dark, full-bleed, animated chart) ── */}
      <section className="hc-earn">
        <div className="hc-earn__inner">
          <div className="hc-earn__copy">
            <p className="hc-eyebrow hc-eyebrow--gold">The numbers</p>
            <h2 className="hc-h2 hc-h2--light">What {low} Heroes earn.</h2>
            <p className="hc-earn__text">
              Most {low} Heroes settle in the <strong>${cat.earn.min}–${cat.earn.max}/hr</strong> band.
              Take on recurring quests and the curve shifts right — fast.
            </p>
            <a href="/#cta" className="hc-btn hc-btn--white">Become a Hero<span className="material-symbols-outlined">arrow_forward</span></a>
          </div>

          <figure className="hc-chart" aria-label={`Distribution of ${low} Hero hourly rates`}>
            <div className="hc-chart__bars">
              {EARN_CURVE.bars.map((v, i) => (
                <span
                  key={i}
                  className={`hc-bar${i === EARN_CURVE.medianIndex ? ' is-median' : ''}`}
                  style={{ '--h': `${v}%`, '--i': i } as CSSProperties}
                >
                  {i === EARN_CURVE.medianIndex && <span className="hc-bar__flag">Median</span>}
                </span>
              ))}
            </div>
            <figcaption className="hc-chart__axis">
              <span>${cat.earn.min}/hr</span>
              <span className="hc-chart__axis-label">{EARN_CURVE.axisLabel}</span>
              <span>${cat.earn.max}+/hr</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── How to earn on Quest ── */}
      <section className="hc-how">
        <div className="hc-how__head">
          <div>
            <p className="hc-eyebrow">Getting started</p>
            <h2 className="hc-h2">How to earn on Quest.</h2>
          </div>
          <a href="/#cta" className="hc-btn hc-btn--primary hc-how__cta">Become a Hero<span className="material-symbols-outlined">arrow_forward</span></a>
        </div>

        <div className="hc-how__grid">
          {HOW_STEPS.map((s, i) => (
            <article className={`hc-step hc-step--${s.accent}`} key={s.n}>
              <div className="hc-step__art">
                {i === 0 && (
                  <div className="hc-mock hc-mock--find">
                    <div className="hc-fcard hc-fcard--a">
                      <span className="hc-fcard__thumb hc-fcard__thumb--violet"><span className="material-symbols-outlined">{cat.icon}</span></span>
                      <span className="hc-fcard__pay">{quests[1]?.pay ?? '$120'}</span>
                      <span className="hc-fcard__t">{quests[1]?.title ?? 'Open quest'}</span>
                    </div>
                    <div className="hc-fcard hc-fcard--b">
                      <span className="hc-fcard__thumb hc-fcard__thumb--marigold"><span className="material-symbols-outlined">{cat.icon}</span></span>
                      <span className="hc-fcard__pay">{quests[2]?.pay ?? '$90'}</span>
                      <span className="hc-fcard__t">{quests[2]?.title ?? 'Open quest'}</span>
                    </div>
                    <div className="hc-noti">
                      <span className="hc-noti__icon">Q</span>
                      <div className="hc-noti__body">
                        <div className="hc-noti__head"><b>Quest</b><span>now</span></div>
                        <p>9 new <b>{low} quests</b> match you.</p>
                      </div>
                    </div>
                    <span className="hc-pin"><span className="material-symbols-outlined">location_on</span></span>
                  </div>
                )}
                {i === 1 && (
                  <div className="hc-mock hc-mock--price">
                    <div className="hc-photo" style={{ backgroundImage: `url(${cat.image})` }} />
                    <div className="hc-offer">
                      <img className="hc-offer__avatar" src={TOP_HEROES[0].avatar} alt="" width={36} height={36} loading="lazy" />
                      <div className="hc-offer__meta">
                        <span className="hc-offer__label">I want to earn</span>
                        <span className="hc-offer__amt">{quests[0]?.pay ?? '$120'}</span>
                      </div>
                      <span className="hc-offer__btn">Make an offer</span>
                    </div>
                    <span className="hc-coin">$</span>
                  </div>
                )}
                {i === 2 && (
                  <div className="hc-mock hc-mock--paid">
                    <div className="hc-pcard">
                      <span className="hc-pcard__stars">★★★★★</span>
                      <span className="hc-pcard__t">"A real superstar."</span>
                    </div>
                    <div className="hc-paid">
                      <span className="hc-paid__check"><span className="material-symbols-outlined">check</span></span>
                      <span className="hc-paid__label">You've been paid</span>
                      <span className="hc-paid__amt">{quests[0]?.pay ?? '$120'}</span>
                      <span className="hc-paid__stars">★★★★★</span>
                      <span className="hc-paid__sub">5-star {low} Hero</span>
                    </div>
                    <span className="hc-confetti" aria-hidden="true" />
                  </div>
                )}
              </div>
              <span className="hc-step__n">/ {s.n}</span>
              <h3 className="hc-step__title">{s.title}</h3>
              <p className="hc-step__body">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Meet the heroes ── */}
      <section className="hc-heroes">
        <div className="hc-heroes__head">
          <div>
            <p className="hc-eyebrow">Meet the heroes</p>
            <h2 className="hc-h2">Real people,<br />getting it done.</h2>
          </div>
          <a href="/#cta" className="hc-btn hc-btn--primary hc-heroes__cta">Become a Hero<span className="material-symbols-outlined">arrow_forward</span></a>
        </div>

        <div className="hc-heroes__grid">
          {TOP_HEROES.map((h) => (
            <article className="hc-hero" key={h.name}>
              <div className="hc-hero__top">
                <img className="hc-hero__avatar" src={h.avatar} alt="" width={56} height={56} loading="lazy" />
                <div>
                  <p className="hc-hero__name">{h.name}</p>
                  <p className="hc-hero__loc"><span className="material-symbols-outlined">location_on</span>{h.location}</p>
                </div>
              </div>
              <p className="hc-hero__quote">"{h.blurb}"</p>
              <div className="hc-hero__stats">
                <div className="hc-stat"><span className="hc-stat__v"><span className="hc-stat__star">★</span>{h.rating}</span><span className="hc-stat__l">{h.reviews}</span></div>
                <div className="hc-stat"><span className="hc-stat__v">{h.completion}</span><span className="hc-stat__l">completion</span></div>
                <div className="hc-stat"><span className="hc-stat__v">{h.years.split(' ')[0]}</span><span className="hc-stat__l">years on Quest</span></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Category FAQ ── */}
      <section className="hc-faq">
        <div className="faq-head">
          <h2 className="faq-title">{cat.label} quest questions.</h2>
          <p className="faq-lede">Everything you need to know about earning as a {low} Hero.</p>
        </div>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <details className="faq-item" name="hcfaq" key={i} open={i === 0 ? true : undefined}>
              <summary className="faq-q">
                <span className="faq-q__text">{item.q}</span>
                <span className="faq-q__icon" aria-hidden="true" />
              </summary>
              <div className="faq-a">
                <p className="faq-a__text">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <CtaSection />
      <SiteFooter />
      <ScrollFX />
    </>
  );
}
