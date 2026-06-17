import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import CtaSection from '@/components/sections/CtaSection';
import AudiencesSection from '@/components/sections/AudiencesSection';
import HowItWorks from '@/components/sections/HowItWorks';
import ScrollFX from '@/components/sections/ScrollFX';
import { QUEST_CATEGORIES, getCategory } from '@/lib/data/quests-data';
import { getSanityCitizen } from '@/sanity/queries';
import { urlForImage } from '@/sanity/image';

// Citizen / poster category page (the "As a citizen" page) — demand-side, for
// people hiring. Distinct structure from the Hero (earn) template:
//   full-bleed hero → what you can hire for → example tasks → who uses this →
//   how it works → trust/proof → FAQ → CTA.
// Reuses the Hero template's full-bleed .qh hero and the shared hc-* section
// classes; only the data + copy differ per category.

type Params = Promise<{ category: string }>;

export function generateStaticParams() {
  return QUEST_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const cat = getCategory((await params).category);
  if (!cat) return {};
  const low = cat.label.toLowerCase();
  return {
    title: `Hire a ${cat.label} human on Quest`,
    description: `Describe what you need and get matched with vetted ${low} people near you. Funds held safely, released when the work is done.`,
  };
}

// Placeholder Unsplash imagery for the service cards (verified ids reused from
// the category hero set). TODO: swap for per-subcategory art when available.
const SERVICE_IMAGES = [
  'photo-1441986300917-64674bd600d8',
  'photo-1583258292688-d0213dc5a3a8',
  'photo-1492691527719-9d1e07e534b4',
  'photo-1530103862676-de8c9debad1d',
];
const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?w=640&h=640&fit=crop&auto=format&q=80`;

// Trust / proof points (static).
const TRUST = [
  { icon: 'lock', title: 'Secure payments', body: 'Only release payment once the quest is completed to your satisfaction.' },
  { icon: 'star', title: 'Trusted ratings & reviews', body: 'Pick the right person based on real ratings and reviews from other people.' },
  { icon: 'verified_user', title: 'Vetted & rated', body: 'Every human is reviewed and rated, and sensitive work is background-checked.' },
];

export default async function HireCategoryPage({ params }: { params: Params }) {
  const slug = (await params).category;
  const cat = getCategory(slug);
  if (!cat) notFound();
  const low = cat.label.toLowerCase();

  // CMS content (the Citizen schema) overrides local data where authored;
  // otherwise the page falls back to lib/data so it always renders.
  const sc = await getSanityCitizen(slug);

  const heroHeading = sc?.heroHeading ?? `Hire a trusted ${low} human near you.`;
  const heroSubtext =
    sc?.heroSubtext ?? `${cat.tagline} Describe the quest — a vetted human gets it done.`;
  const heroImage = sc?.heroImage?.asset
    ? urlForImage(sc.heroImage.asset).width(1600).quality(80).url()
    : cat.image;

  const capEyebrow = sc?.capabilitiesEyebrow ?? 'What you can hire for';
  const capHeading = sc?.capabilitiesHeading ?? `Every kind of ${low} quest.`;

  // "What you can hire for" image cards — CMS capabilities, else local subcats.
  const capCards = sc?.capabilities?.length
    ? sc.capabilities.slice(0, 4).map((c, i) => ({
        label: c.title,
        img: c.image?.asset
          ? urlForImage(c.image.asset).width(640).height(640).fit('crop').url()
          : unsplash(SERVICE_IMAGES[i % SERVICE_IMAGES.length]),
      }))
    : cat.subcategories.slice(0, 4).map((s, i) => ({
        label: s.label,
        img: unsplash(SERVICE_IMAGES[i % SERVICE_IMAGES.length]),
      }));

  // Hero action-card checklist labels.
  const checklist = (sc?.capabilities?.length
    ? sc.capabilities.map((c) => c.title)
    : cat.subcategories.map((s) => s.label)
  ).slice(0, 5);

  const questsEyebrow = sc?.questsEyebrow ?? 'Example quests';
  const questsHeading = sc?.questsHeading ?? 'What people post.';
  const questsSubtext = sc?.questsSubtext ?? cat.tagline;
  const examples = sc?.quests?.length ? sc.quests.slice(0, 6) : cat.listings.slice(0, 6);

  const faqHeading = sc?.faqHeading ?? `Hiring ${low} help — questions.`;
  const faqSubtext = sc?.faqSubtext ?? 'Everything you need to know about hiring on Quest.';

  const FAQS = sc?.faqs?.length
    ? sc.faqs.map((f) => ({ q: f.question, a: f.answer }))
    : [
        {
          q: `How do I hire someone for ${low} work?`,
          a: `Describe the quest in a sentence — what you need, where, when, and your budget. We match you with vetted ${low} people nearby; you compare ratings and reviews, then assign whoever fits.`,
        },
        {
          q: 'Are the people vetted?',
          a: 'Yes. Everyone builds a profile with ratings and reviews, and anyone taking on sensitive work is background-checked. You always see recent reviews before you assign someone.',
        },
        {
          q: 'How does payment work, and is it safe?',
          a: 'You agree the price up front. Funds are held securely and only released once the work is done and you’re happy — no cash needed, with a clear receipt for every quest.',
        },
        {
          q: 'What does it cost?',
          a: 'Posting a quest and getting matched is free. You only pay the agreed price plus a small, transparent service fee shown before you confirm. No subscriptions, no surprises.',
        },
      ];

  return (
    <>
      <SiteHeader />

      {/* ── Hero (reuses the full-bleed .qh banner) ── */}
      <section className="qh">
        <div className="qh__banner" style={{ '--qh-img': `url(${heroImage})` } as CSSProperties}>
          <div className="qh__main">
            <div className="qh__content">
              <div className="qh__crumbs">
                <Link href="/quests">Browse</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{cat.label}</span>
              </div>
              <h1 className="qh__title">{heroHeading}</h1>
              <p className="qh__sub">{heroSubtext}</p>
            </div>

            <aside className="qh-card" aria-label={`Hire ${low} help`}>
              <h2 className="qh-card__title">Get help with {low}</h2>
              <ul className="qh-card__list">
                {checklist.map((label) => (
                  <li className="qh-card__item" key={label}>
                    <span className="material-symbols-outlined qh-card__check">check</span>
                    {label}
                  </li>
                ))}
                <li className="qh-card__item qh-card__item--more">… or anything else</li>
              </ul>
              <Link href="/post-quest" className="qh-card__cta">
                Find a {low} expert near me
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <p className="qh-card__fine">It only takes 2 minutes. And it’s free.</p>
            </aside>
          </div>
        </div>
      </section>

      {/* ── What you can hire humans for (image cards) ── */}
      <section className="hc-why">
        <p className="hc-eyebrow">{capEyebrow}</p>
        <h2 className="hc-h2">{capHeading}</h2>
        <div className="cz-services">
          {capCards.map((c) => (
            <Link href="/post-quest" className="cz-service" key={c.label}>
              <span
                className="cz-service__img"
                style={{ backgroundImage: `url(${c.img})` }}
                aria-hidden="true"
              />
              <span className="cz-service__label">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Example tasks ── */}
      <section className="hc-quests">
        <p className="hc-eyebrow">{questsEyebrow}</p>
        <h2 className="hc-h2">{questsHeading}</h2>
        <p className="hc-lede">{questsSubtext}</p>
        <div className="hc-quests__grid">
          {examples.map((q) => (
            <article className="hc-card" key={q.title}>
              <div className="hc-card__top">
                <span className="hc-card__pay">{q.pay?.replace('/hr', '')}</span>
                <span className="hc-card__meta">{q.posted}</span>
              </div>
              <h3 className="hc-card__title">{q.title}</h3>
              <p className="hc-card__teaser">{q.teaser}</p>
              <div className="hc-card__foot">
                <span className="hc-card__time">
                  <span className="material-symbols-outlined">schedule</span>{q.time}
                </span>
                <Link href="/post-quest" className="hc-card__view">
                  Post similar<span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Who uses this (shared Audiences section from the landing page) ── */}
      <AudiencesSection className="section--standalone" />

      {/* ── How it works (shared Mews-style accordion, same as the landing page) ── */}
      <HowItWorks />

      {/* ── Trust / proof (simple centered) ── */}
      <section className="cz-trust">
        <h2 className="cz-trust__title">Hire with confidence.</h2>
        <div className="cz-trust__grid">
          {TRUST.map((t) => (
            <div className="cz-trust__item" key={t.title}>
              <span className="cz-trust__icon" aria-hidden="true">
                <span className="material-symbols-outlined">{t.icon}</span>
              </span>
              <h3 className="cz-trust__item-title">{t.title}</h3>
              <p className="cz-trust__item-body">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="hc-faq">
        <div className="faq-head">
          <h2 className="faq-title">{faqHeading}</h2>
          <p className="faq-lede">{faqSubtext}</p>
        </div>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <details className="faq-item" name="czfaq" key={i} open={i === 0 ? true : undefined}>
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
