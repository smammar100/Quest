'use client';

import { useState } from 'react';

// Reusable "How it works" section — same Mews-style horizontal accordion +
// device mockups as the homepage #how, but self-contained (drives the active
// card with React state instead of PageScript, so it works on any page).
export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const last = 2;

  return (
    <section id="how" className="how--standalone">
      <div className="how-head">
        <div className="how-head__text">
          <h2 className="how-title">How it works.</h2>
          <p className="how-lede">
            From a one-line request to real-world work done, in three simple steps.
          </p>
        </div>
        <div className="how-arrows">
          <button
            type="button"
            className="how-arrow"
            aria-label="Previous"
            disabled={active <= 0}
            onClick={() => setActive((a) => Math.max(0, a - 1))}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button
            type="button"
            className="how-arrow"
            aria-label="Next"
            disabled={active >= last}
            onClick={() => setActive((a) => Math.min(last, a + 1))}
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      <div className="how-track">
        <article
          className={`how-card${active === 0 ? ' is-active' : ''}`}
          onClick={() => setActive(0)}
        >
          <h3 className="how-card__title">Tell us what you need</h3>
          <p className="how-card__desc">Tell us the quest, location, deadline, and budget.</p>
          <span className="how-card__num">/ 01</span>
          <div className="how-card__visual" aria-hidden="true">
            <div className="qmock qmock--post">
              <div className="qmock__head"><span className="qmock__title">New quest</span><span className="qmock__step">Step 1 of 3</span></div>
              <div className="qmock__prompt"><span>Mow my lawn in Dallas, $100</span><span className="qmock__send material-symbols-outlined">arrow_upward</span></div>
              <div className="qmock__chips"><span className="qmock__chip">Sat, 9am</span><span className="qmock__chip">Dallas, TX</span><span className="qmock__chip">Lawn mowed</span></div>
              <ul className="qmock__list">
                <li className="qmock__row"><span className="qmock__rowicon material-symbols-outlined">payments</span><span className="qmock__rowlabel">Budget</span><b>$100</b></li>
                <li className="qmock__row"><span className="qmock__rowicon material-symbols-outlined">schedule</span><span className="qmock__rowlabel">Timing</span><b>This weekend</b></li>
                <li className="qmock__row"><span className="qmock__rowicon material-symbols-outlined">photo_library</span><span className="qmock__rowlabel">Photos</span><b>2 added</b></li>
              </ul>
              <button className="qmock__cta">Hire a human</button>
            </div>
          </div>
        </article>

        <article
          className={`how-card${active === 1 ? ' is-active' : ''}`}
          onClick={() => setActive(1)}
        >
          <h3 className="how-card__title">Get matched with humans</h3>
          <p className="how-card__desc">We match you with trusted humans who have the right skills nearby.</p>
          <span className="how-card__num">/ 02</span>
          <div className="how-card__visual" aria-hidden="true">
            <div className="qmock qmock--match">
              <div className="qmock__head"><span className="qmock__title">Matched humans</span><span className="qmock__pill">5 new offers</span></div>
              <ul className="qmock__heroes">
                <li className="qmock__hero"><img className="qmock__avatar" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces&auto=format&q=80" alt="" width={96} height={96} loading="lazy" decoding="async" /><span className="qmock__who"><b>Maya R.</b><small>★ 4.9 · Lawn care · 0.8 mi</small></span><button className="qmock__assign">Assign</button></li>
                <li className="qmock__hero"><img className="qmock__avatar" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&crop=faces&auto=format&q=80" alt="" width={96} height={96} loading="lazy" decoding="async" /><span className="qmock__who"><b>Arjun P.</b><small>★ 4.8 · Gardening · 1.2 mi</small></span><button className="qmock__assign">Assign</button></li>
                <li className="qmock__hero"><img className="qmock__avatar" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces&auto=format&q=80" alt="" width={96} height={96} loading="lazy" decoding="async" /><span className="qmock__who"><b>Siti N.</b><small>★ 5.0 · Yard work · 2.0 mi</small></span><button className="qmock__assign">Assign</button></li>
                <li className="qmock__hero"><img className="qmock__avatar" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=faces&auto=format&q=80" alt="" width={96} height={96} loading="lazy" decoding="async" /><span className="qmock__who"><b>Daniel T.</b><small>★ 4.7 · Landscaping · 2.4 mi</small></span><button className="qmock__assign">Assign</button></li>
                <li className="qmock__hero"><img className="qmock__avatar" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=96&h=96&fit=crop&crop=faces&auto=format&q=80" alt="" width={96} height={96} loading="lazy" decoding="async" /><span className="qmock__who"><b>Liam K.</b><small>★ 4.8 · Yard care · 1.6 mi</small></span><button className="qmock__assign">Assign</button></li>
              </ul>
              <div className="qmock__foot"><span className="material-symbols-outlined">verified_user</span>12 background-checked humans nearby</div>
            </div>
          </div>
        </article>

        <article
          className={`how-card${active === 2 ? ' is-active' : ''}`}
          onClick={() => setActive(2)}
        >
          <h3 className="how-card__title">Hire, pay, and get it done</h3>
          <p className="how-card__desc">Hire, track, and pay securely. Funds held safely.</p>
          <span className="how-card__num">/ 03</span>
          <div className="how-card__visual" aria-hidden="true">
            <div className="qmock qmock--pay">
              <div className="qmock__head"><span className="qmock__title">Confirm &amp; pay</span><span className="qmock__pill">Matched</span></div>
              <div className="qmock__hero qmock__hero--lg"><img className="qmock__avatar" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces&auto=format&q=80" alt="" width={96} height={96} loading="lazy" decoding="async" /><span className="qmock__who"><b>Maya R.</b><small>Lawn mowing · Sat 9am · Dallas</small></span></div>
              <ul className="qmock__lines">
                <li className="qmock__line"><span>Quest</span><span>$90.00</span></li>
                <li className="qmock__line"><span>Service fee</span><span>$10.00</span></li>
                <li className="qmock__line qmock__line--total"><span>Total</span><span>$100.00</span></li>
              </ul>
              <div className="qmock__secure"><span className="material-symbols-outlined">lock</span>Funds held safely until the work is done</div>
              <button className="qmock__cta">Pay securely</button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
