'use client';

import { useState } from 'react';
import Link from 'next/link';
import s from './auth.module.css';

// Quest auth prototype screens. Three Clerk-inspired layouts (centered card,
// split-branding, social-first) rendered in Quest's design system — coral +
// Bricolage + beige, never Clerk purple. Each works for both login and signup
// via the `mode` prop; the only auth method copy is email · Google · Apple.
// Purely visual: no real authentication is wired.

export type AuthMode = 'login' | 'signup';
export type AuthLayout = 'centered' | 'split' | 'social';

const COPY = {
  login: {
    eyebrow: 'Welcome back',
    title: 'Log in to Quest',
    sub: 'Pick up where you left off.',
    submit: 'Log in',
    switchText: 'New to Quest?',
    switchCta: 'Create an account',
  },
  signup: {
    eyebrow: 'Join Quest',
    title: 'Create your account',
    sub: 'Hire trusted humans — or start earning as one.',
    submit: 'Create account',
    switchText: 'Already have an account?',
    switchCta: 'Log in',
  },
} as const;

const SPLIT_BENEFITS = [
  { icon: 'verified', t: 'Vetted, rated humans', b: 'Every Hero has reviews and a track record you can see.' },
  { icon: 'bolt', t: 'Real work, done fast', b: 'Post a quest in a sentence and get matched in minutes.' },
  { icon: 'lock', t: 'Payments held safely', b: 'Funds release only when the job is done and you’re happy.' },
];

function GoogleIcon() {
  return (
    <svg className={s.glyph} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.27-4.74 3.27-8.09Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.76c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className={s.glyph} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M17.05 12.54c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.94-3.94.94-.81 0-2.07-.92-3.4-.9-1.75.03-3.36 1.02-4.26 2.58-1.82 3.16-.47 7.84 1.3 10.4.86 1.26 1.89 2.67 3.24 2.62 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.28-1.28 3.14-2.55.99-1.46 1.4-2.87 1.42-2.94-.03-.01-2.72-1.05-2.74-4.17Zm-2.58-7.66c.72-.87 1.2-2.08 1.07-3.28-1.03.04-2.28.69-3.02 1.55-.66.77-1.24 2-.08 3.21.92.07 1.86-.61 2.61-1.48Z" />
    </svg>
  );
}

function Divider({ label = 'or' }: { label?: string }) {
  return (
    <div className={s.divider} role="separator">
      <span>{label}</span>
    </div>
  );
}

function Field({
  id,
  label,
  type = 'text',
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className={s.field} htmlFor={id}>
      <span className={s.fieldLabel}>{label}</span>
      <input id={id} className={s.input} type={type} placeholder={placeholder} autoComplete={autoComplete} />
    </label>
  );
}

// The shared form body: social buttons, divider, fields, submit, switch link.
function AuthForm({
  mode,
  layout,
  switchHref,
}: {
  mode: AuthMode;
  layout: AuthLayout;
  switchHref: string;
}) {
  const c = COPY[mode];
  const [showEmail, setShowEmail] = useState(layout !== 'social');
  const stacked = layout === 'social';

  const social = (
    <div className={stacked ? s.socialStack : s.socialRow}>
      <button type="button" className={s.social}>
        <GoogleIcon />
        <span>{stacked ? 'Continue with Google' : 'Google'}</span>
      </button>
      <button type="button" className={s.social}>
        <AppleIcon />
        <span>{stacked ? 'Continue with Apple' : 'Apple'}</span>
      </button>
    </div>
  );

  const emailBlock = (
    <>
      {mode === 'signup' && (
        <div className={s.row2}>
          <Field id="firstName" label="First name" placeholder="Jane" autoComplete="given-name" />
          <Field id="lastName" label="Last name" placeholder="Doe" autoComplete="family-name" />
        </div>
      )}
      <Field id="email" label="Email address" type="email" placeholder="you@example.com" autoComplete="email" />
      <Field
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
      />
      {mode === 'signup' && (
        <Field
          id="confirmPassword"
          label="Re-enter password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
        />
      )}
      <button type="submit" className={s.submit}>
        {c.submit}
        <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
      </button>
    </>
  );

  return (
    <form className={s.form} onSubmit={(e) => e.preventDefault()}>
      {social}
      <Divider />
      {stacked && !showEmail ? (
        <button type="button" className={s.emailToggle} onClick={() => setShowEmail(true)}>
          <span className="material-symbols-outlined" aria-hidden="true">mail</span>
          Continue with email
        </button>
      ) : (
        emailBlock
      )}
      <p className={s.switch}>
        {c.switchText}{' '}
        <Link href={switchHref} className={s.switchLink}>
          {c.switchCta}
        </Link>
      </p>
    </form>
  );
}

function Brandmark() {
  return (
    <Link href="/" className={s.brand} aria-label="Quest home">
      <img src="/images/logos/Logo.svg" alt="Quest" width={92} height={34} />
    </Link>
  );
}

export default function AuthScreen({
  mode,
  layout,
  switchHref: switchHrefProp,
}: {
  mode: AuthMode;
  layout: AuthLayout;
  switchHref?: string;
}) {
  const c = COPY[mode];
  const other: AuthMode = mode === 'login' ? 'signup' : 'login';
  // default switch link stays within the prototype set; real /login + /signup
  // routes pass an explicit switchHref to point at each other.
  const switchHref = switchHrefProp ?? `/prototype/auth/${other}-${layout}`;

  // ── Split: coral brand panel + white form card ──
  if (layout === 'split') {
    return (
      <main className={`${s.page} ${s.pageSplit}`}>
        <aside className={s.brandPanel}>
          <div className={s.brandPanelInner}>
            <Brandmark />
            <h2 className={s.brandHeadline}>
              The work AI can’t do,<br />done by real people.
            </h2>
            <ul className={s.benefits}>
              {SPLIT_BENEFITS.map((b) => (
                <li key={b.t} className={s.benefit}>
                  <span className={s.benefitIcon} aria-hidden="true">
                    <span className="material-symbols-outlined">{b.icon}</span>
                  </span>
                  <span>
                    <span className={s.benefitTitle}>{b.t}</span>
                    <span className={s.benefitBody}>{b.b}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className={s.brandFoot}>Trusted by teams at Meta, Google, Gojek &amp; Antler.</p>
          </div>
        </aside>

        <section className={s.formPanel}>
          <div className={s.card}>
            <h1 className={s.title}>{c.title}</h1>
            <p className={s.sub}>{c.sub}</p>
            <AuthForm mode={mode} layout={layout} switchHref={switchHref} />
          </div>
            </section>
      </main>
    );
  }

  // ── Centered card & Social-first: single centered column on a soft field ──
  const isSocial = layout === 'social';
  return (
    <main className={`${s.page} ${isSocial ? s.pageSocial : s.pageCentered}`}>
      <div className={s.field0} aria-hidden="true" />
      <section className={`${s.card} ${isSocial ? s.cardSocial : s.cardCentered}`}>
        <Brandmark />
        <h1 className={s.title}>{c.title}</h1>
        <p className={s.sub}>{c.sub}</p>
        <AuthForm mode={mode} layout={layout} switchHref={switchHref} />
      </section>
    </main>
  );
}
