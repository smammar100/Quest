import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'Hero page prototypes — pick a winner | Quest',
  description: 'Five design variations of the Hero category landing page. Open each, compare, and pick the template.',
};

const VARIATIONS = [
  { id: 'v1', name: 'Earnings-first', color: 'coral', blurb: 'Calm and premium. The big earnings number and stat cards do the selling — Airbnb-host style.' },
  { id: 'v2', name: 'Bold poster', color: 'marigold', blurb: 'High-energy color-block hero, huge display type, marigold step cards, a black poster moment.' },
  { id: 'v3', name: 'Bento mosaic', color: 'electric', blurb: 'Everything as a modular grid of colorful tiles — dense, playful, dashboard-like.' },
  { id: 'v4', name: 'Editorial rows', color: 'violet', blurb: 'Refined and airy. Alternating feature rows with floating proof cards — the Airtasker++ take.' },
  { id: 'v5', name: 'Split sticky', color: 'lime', blurb: 'Immersive split hero with a live quest feed and a sticky scrolling “how to earn” narrative.' },
];

// Auth prototypes — 3 Clerk-inspired layouts, each as both login + signup.
// Methods on every screen: email · Google · Apple. Visual only (no real auth).
const AUTH_LAYOUTS = [
  { layout: 'centered', name: 'Centered card', color: 'coral', blurb: 'Clerk-classic. A white card floats on a soft coral dot-field — logo, social row, email, done.' },
  { layout: 'split', name: 'Split branding', color: 'violet', blurb: 'Coral brand panel with proof points on the left, a clean form card on the right.' },
  { layout: 'social', name: 'Social-first', color: 'electric', blurb: 'Big stacked “Continue with Google / Apple” buttons; email tucked behind one tap.' },
];

export default function PrototypeIndex() {
  return (
    <>
      <SiteHeader />
      <section className="proto-hub">
        <p className="proto-hub__eyebrow">Hero category page · prototypes</p>
        <h1 className="proto-hub__title">Pick the winning template.</h1>
        <p className="proto-hub__lede">
          Five takes on the “As a Hero” category landing page. Same content, five very different designs.
          Open each, then tell me which one to ship — that one becomes the template for all five categories.
        </p>
        <div className="proto-hub__grid">
          {VARIATIONS.map((v, i) => (
            <Link key={v.id} href={`/prototype/${v.id}`} className={`proto-card proto-card--${v.color}`}>
              <span className="proto-card__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="proto-card__name">{v.name}</span>
              <span className="proto-card__blurb">{v.blurb}</span>
              <span className="proto-card__go">Open preview <span className="material-symbols-outlined">arrow_forward</span></span>
            </Link>
          ))}
        </div>

        {/* ── Auth prototypes ── */}
        <div className="proto-sub">
          <p className="proto-hub__eyebrow">Auth screens · login &amp; signup</p>
          <h2 className="proto-sub__title">Pick a login &amp; signup look.</h2>
          <p className="proto-hub__lede">
            Three Clerk-inspired layouts, each built as both a log&nbsp;in and a sign&nbsp;up screen.
            Every screen offers email, Google and Apple. Open the pair, compare, pick one to ship.
          </p>
        </div>
        <div className="proto-hub__grid">
          {AUTH_LAYOUTS.map((v, i) => (
            <div key={v.layout} className={`proto-card proto-card--${v.color}`}>
              <span className="proto-card__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="proto-card__name">{v.name}</span>
              <span className="proto-card__blurb">{v.blurb}</span>
              <span className="proto-card__pair">
                <Link href={`/prototype/auth/login-${v.layout}`} className="proto-card__go">
                  Log in <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <Link href={`/prototype/auth/signup-${v.layout}`} className="proto-card__go">
                  Sign up <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </span>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
