import type { CSSProperties } from 'react';
import { useCases } from '@/lib/data/useCases';
import PageScript from '@/components/sections/PageScript';
import ScrollFX from '@/components/sections/ScrollFX';
import TasksShowcase from '@/components/sections/TasksShowcase';
import AudiencesSection from '@/components/sections/AudiencesSection';
import SocialProof from '@/components/sections/SocialProof';
import FaqSection from '@/components/sections/FaqSection';
import CtaSection from '@/components/sections/CtaSection';
import SiteFooter from '@/components/layout/SiteFooter';

export default function Home() {
  return (
    <>
      <div className="header-wrapper">
        <header>
          <a href="#" className="quest-logo" aria-label="Quest">
            <img className="quest-logo__img" src="/images/logos/Logo.svg" alt="Quest" width={80} height={30} />
          </a>

          <input className="menu-checkbox" type="checkbox" id="menu-checkbox" />
          <label className="menu-button" htmlFor="menu-checkbox">
            <span className="material-symbols-outlined not-sr-only" data-show-when="closed">dehaze</span>
            <span className="material-symbols-outlined not-sr-only" data-show-when="open">close</span>
            <span className="sr-only">Toggle Menu</span>
          </label>

          <nav>
            <ul>
              <li><a href="#bento"><span className="nav-rn">For business</span></a></li>
              <li><a href="#tasks"><span className="nav-rn">For humans</span></a></li>
              <li><a href="#audiences"><span className="nav-rn">For AI agents</span></a></li>
            </ul>
            <a href="#welcome" className="nav-cta">Hire a human</a>
          </nav>

          <button className="secondary"><span>Hire a human</span></button>
        </header>
      </div>

      <section id="welcome" className="center">
        <h1><span className="sr-only">Quest. Hire trusted humans for real-world work AI can&apos;t do.</span></h1>
        <div className="quest-hero">
          <p className="quest-hero__eyebrow"><span className="quest-hero__eyebrow-emoji">🤖</span><span className="quest-shiny">Let your AI hire humans</span><span className="quest-hero__eyebrow-arrow">→</span></p>
          <h2 className="quest-hero__title">Your AI can&apos;t do<br />everything. Hire a <span className="rn-mark">human</span>.</h2>
          <p className="quest-hero__subtitle">Hire trusted people for the real-world work AI can&apos;t do.</p>

          <div className="quest-prompt">
            <input className="quest-prompt__input" type="text" placeholder="Pick up a parcel in New York for $40" aria-label="Describe what you need" />
            <div className="quest-prompt__toolbar">
              <button type="button" className="quest-prompt__icon-btn quest-prompt__add" aria-label="Add attachment"><span className="material-symbols-outlined">add</span></button>
              <div className="quest-prompt__actions">
                <button type="button" className="quest-prompt__icon-btn" aria-label="Adjust filters"><span className="material-symbols-outlined">tune</span></button>
                <button type="button" className="quest-prompt__icon-btn" aria-label="Voice input"><span className="material-symbols-outlined">mic</span></button>
                <button type="button" className="quest-prompt__submit">Hire a human</button>
              </div>
            </div>
          </div>

          <div className="quest-suggest">
            <p className="quest-suggest__label">What do you need a human to do?</p>
            <div className="quest-suggest__pills">
              <button type="button" className="quest-pill">Pick up a parcel in New York</button>
              <button type="button" className="quest-pill">Shoot a UGC video</button>
              <button type="button" className="quest-pill">Check an apartment &amp; take photos</button>
              <button type="button" className="quest-pill">Assemble furniture</button>
            </div>
          </div>
        </div>
      </section>

      <section id="logos">
        <div className="logos-wrap">
          <p className="logos-label">Trusted by teams at<br />1,000+ businesses</p>
          <ul className="logos-row">
            <li><img src="/images/logos/meta.webp" alt="Meta" width={360} height={97} loading="lazy" decoding="async" /></li>
            <li><img src="/images/logos/google.webp" alt="Google" width={360} height={132} loading="lazy" decoding="async" /></li>
            <li><img src="/images/logos/gojek.webp" alt="Gojek" width={300} height={85} loading="lazy" decoding="async" /></li>
            <li><img src="/images/logos/antler.webp" alt="Antler" width={360} height={116} loading="lazy" decoding="async" /></li>
            <li><img src="/images/logos/ascott.webp" alt="The Ascott" width={140} height={136} loading="lazy" decoding="async" /></li>
          </ul>
        </div>
      </section>

      <section id="bento">
        <div className="bento-head">
          <div className="bento-head__text">
            <h2 className="bento-title">AI can write the plan.<br />Humans still show up.</h2>
            <p className="bento-lede">Hire people for the physical, local, urgent work AI can&apos;t finish.</p>
          </div>
          <div className="bento-arrows">
            <button type="button" className="bento-arrow" data-dir="prev" aria-label="Previous use case"><span className="material-symbols-outlined">arrow_back</span></button>
            <button type="button" className="bento-arrow" data-dir="next" aria-label="Next use case"><span className="material-symbols-outlined">arrow_forward</span></button>
          </div>
        </div>

        <div className="bento-carousel">
          <div className="bento-track">
            {useCases.map((c, i) => (
              <a key={c.key} href="#" className={`bento-card bento-card--${c.color}`} style={{ '--i': i } as CSSProperties}>
                <div className="bento-card__top">
                  <h3 className="bento-card__title">{c.title}</h3>
                  <p className="bento-card__desc">{c.desc}</p>
                </div>
                <div
                  className="bento-card__media"
                  style={{ backgroundImage: `url(${c.img})`, backgroundSize: c.fit }}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="video">
        <div className="video-head">
          <h2 className="video-title">Why humans still matter<br />in the age of AI.</h2>
          <p className="video-sub">We called them Heroes. Real-world work still needs humans.</p>
          <a href="#" className="video-cta">Read the Manifesto <span className="material-symbols-outlined">arrow_forward</span></a>
        </div>
        <div className="video-frame">
          <video className="video-el" preload="metadata" playsInline>
            <source src="/videos/manifesto.mp4#t=0.5" type="video/mp4" />
          </video>
          <button type="button" className="video-play" aria-label="Play video">
            <span className="material-symbols-outlined">play_arrow</span>
          </button>
        </div>
      </section>

      <section id="how">
        <div className="how-head">
          <div className="how-head__text">
            <h2 className="how-title">How it works.</h2>
            <p className="how-lede">From a one-line request to real-world work done, in three simple steps.</p>
          </div>
          <div className="how-arrows">
            <button type="button" className="how-arrow" data-dir="prev" aria-label="Previous"><span className="material-symbols-outlined">arrow_back</span></button>
            <button type="button" className="how-arrow" data-dir="next" aria-label="Next"><span className="material-symbols-outlined">arrow_forward</span></button>
          </div>
        </div>
        <div className="how-track">
          <article className="how-card is-active">
            <h3 className="how-card__title">Tell us what you need</h3>
            <p className="how-card__desc">Tell us the task, location, deadline, and budget.</p>
            <span className="how-card__num">/ 01</span>
            <div className="how-card__visual" aria-hidden="true">
              <div className="qmock qmock--post">
                <div className="qmock__head"><span className="qmock__title">New task</span><span className="qmock__step">Step 1 of 3</span></div>
                <div className="qmock__prompt"><span>Mow my lawn in Dallas, $100</span><span className="qmock__send material-symbols-outlined">arrow_upward</span></div>
                <div className="qmock__chips"><span className="qmock__chip">Sat, 9am</span><span className="qmock__chip">Dallas, TX</span><span className="qmock__chip">Lawn mowed</span></div>
                <ul className="qmock__list">
                  <li className="qmock__row"><span className="qmock__rowicon material-symbols-outlined">payments</span><span className="qmock__rowlabel">Budget</span><b>$100</b></li>
                  <li className="qmock__row"><span className="qmock__rowicon material-symbols-outlined">schedule</span><span className="qmock__rowlabel">Timing</span><b>This weekend</b></li>
                  <li className="qmock__row"><span className="qmock__rowicon material-symbols-outlined">photo_library</span><span className="qmock__rowlabel">Photos</span><b>2 added</b></li>
                </ul>
                <button className="qmock__cta">Post task</button>
              </div>
            </div>
          </article>
          <article className="how-card">
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
          <article className="how-card">
            <h3 className="how-card__title">Hire, pay, and get it done</h3>
            <p className="how-card__desc">Hire, track, and pay securely. Funds held safely.</p>
            <span className="how-card__num">/ 03</span>
            <div className="how-card__visual" aria-hidden="true">
              <div className="qmock qmock--pay">
                <div className="qmock__head"><span className="qmock__title">Confirm &amp; pay</span><span className="qmock__pill">Matched</span></div>
                <div className="qmock__hero qmock__hero--lg"><img className="qmock__avatar" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces&auto=format&q=80" alt="" width={96} height={96} loading="lazy" decoding="async" /><span className="qmock__who"><b>Maya R.</b><small>Lawn mowing · Sat 9am · Dallas</small></span></div>
                <ul className="qmock__lines">
                  <li className="qmock__line"><span>Task</span><span>$90.00</span></li>
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

      <TasksShowcase />
      <AudiencesSection />
      <SocialProof />
      <FaqSection />
      <CtaSection />
      <SiteFooter />
      <PageScript />
      <ScrollFX />
    </>
  );
}
