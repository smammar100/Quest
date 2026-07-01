'use client';

import { useState } from 'react';

// Hero-side "How it works" — Mews-style horizontal accordion with 5 steps.
// The active card expands and reveals an earning-relevant mockup.

const AVATAR =
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces&auto=format&q=80';

type Step = { title: string; desc: string };

const STEPS: Step[] = [
  { title: 'Create your Hero profile', desc: 'Add your skills, location, and the kind of work you want.' },
  { title: 'Browse or receive tasks', desc: 'Find matching quests nearby or get them sent straight to you.' },
  { title: 'Apply or accept work', desc: 'Grab the quests you want and lock in the details.' },
  { title: 'Complete the task', desc: 'Do the work, follow the brief, and upload proof when needed.' },
  { title: 'Get paid', desc: 'Payment lands securely as soon as the quest is verified done.' },
];

function StepVisual({ i }: { i: number }) {
  switch (i) {
    case 0:
      return (
        <div className="ehmock">
          <div className="ehmock__head"><span className="ehmock__title">Your Hero profile</span><span className="ehmock__pill">Step 1</span></div>
          <div className="ehmock__profile">
            <img className="ehmock__avatar" src={AVATAR} alt="" width={56} height={56} />
            <div><b>Emma M.</b><small>Austin, TX · Available weekends</small></div>
          </div>
          <div className="ehmock__chips">
            <span className="ehmock__chip is-on">Moving</span>
            <span className="ehmock__chip is-on">Delivery</span>
            <span className="ehmock__chip">Errands</span>
            <span className="ehmock__chip">Events</span>
          </div>
          <button className="ehmock__cta">Save profile</button>
        </div>
      );
    case 1:
      return (
        <div className="ehmock">
          <div className="ehmock__head"><span className="ehmock__title">Quests near you</span><span className="ehmock__pill">3 new</span></div>
          <ul className="ehmock__feed">
            <li><div><b>Help move a 1-bed flat</b><small>2.1 mi · today</small></div><span className="ehmock__pay">$120</span></li>
            <li><div><b>Deliver flowers downtown</b><small>0.8 mi · 5pm</small></div><span className="ehmock__pay">$45</span></li>
            <li><div><b>Set up event chairs</b><small>3.4 mi · Sat</small></div><span className="ehmock__pay">$90</span></li>
          </ul>
          <div className="ehmock__foot"><span className="material-symbols-outlined">notifications_active</span>Get matching quests sent to you</div>
        </div>
      );
    case 2:
      return (
        <div className="ehmock">
          <div className="ehmock__head"><span className="ehmock__title">New quest offer</span><span className="ehmock__pill ehmock__pill--live">Live</span></div>
          <div className="ehmock__offer">
            <h4>Help move a 1-bed flat</h4>
            <ul>
              <li><span className="material-symbols-outlined">payments</span>Budget<b>$120</b></li>
              <li><span className="material-symbols-outlined">schedule</span>Timing<b>Today, 2pm</b></li>
              <li><span className="material-symbols-outlined">pin_drop</span>Distance<b>2.1 mi</b></li>
            </ul>
          </div>
          <div className="ehmock__actions">
            <button className="ehmock__ghost">Decline</button>
            <button className="ehmock__cta ehmock__cta--inline">Accept quest</button>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="ehmock">
          <div className="ehmock__head"><span className="ehmock__title">Complete &amp; verify</span><span className="ehmock__pill">In progress</span></div>
          <ul className="ehmock__check">
            <li className="is-done"><span className="material-symbols-outlined">check_circle</span>Arrived on site</li>
            <li className="is-done"><span className="material-symbols-outlined">check_circle</span>Work completed</li>
            <li><span className="material-symbols-outlined">add_a_photo</span>Upload proof photo</li>
          </ul>
          <div className="ehmock__upload"><span className="material-symbols-outlined">photo_library</span>2 photos added</div>
          <button className="ehmock__cta">Submit for review</button>
        </div>
      );
    default:
      return (
        <div className="ehmock ehmock--paid">
          <div className="ehmock__paidicon"><span className="material-symbols-outlined">paid</span></div>
          <span className="ehmock__paidlabel">Payment released</span>
          <span className="ehmock__paidbig">$120.00</span>
          <span className="ehmock__paidsub">Paid to your account · instant</span>
          <div className="ehmock__balance"><span>This week</span><b>$740</b></div>
        </div>
      );
  }
}

export default function EarnHowItWorks() {
  const [active, setActive] = useState(0);
  const last = STEPS.length - 1;

  return (
    <section id="earn-how">
      <div className="ehow-head">
        <div className="ehow-head__text">
          <span className="earn-label">
            <span className="material-symbols-outlined" aria-hidden="true">route</span>
            How it works
          </span>
          <h2 className="earn-h2">From sign-up to paid,<br />in five steps.</h2>
        </div>
        <div className="ehow-arrows">
          <button type="button" className="ehow-arrow" aria-label="Previous" disabled={active <= 0} onClick={() => setActive((a) => Math.max(0, a - 1))}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button type="button" className="ehow-arrow" aria-label="Next" disabled={active >= last} onClick={() => setActive((a) => Math.min(last, a + 1))}>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      <div className="ehow-track">
        {STEPS.map((s, i) => {
          const on = i === active;
          return (
            <article
              key={s.title}
              className={`ehow-card${on ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(i); } }}
            >
              <div className="ehow-card__text">
                <h3 className="ehow-card__title">{s.title}</h3>
                <p className="ehow-card__desc">{s.desc}</p>
              </div>
              {on && (
                <div className="ehow-card__visual" aria-hidden="true">
                  <StepVisual i={i} />
                </div>
              )}
              <span className="ehow-card__num">/ 0{i + 1}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
