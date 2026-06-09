import type { CSSProperties } from 'react';
import PageScript from './components/PageScript';
import ScrollFX from './components/ScrollFX';
import TasksShowcase from './components/TasksShowcase';
import AudiencesSection from './components/AudiencesSection';
import SocialProof from './components/SocialProof';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import SiteFooter from './components/SiteFooter';

// #bento use-case tiles — colour-blocked across the full Quest palette.
// `img` paths for the 5 new cards 404 silently (CSS background-image) and fall
// back to the card colour until generated; 3 reuse existing assets.
const useCases = [
  { key: 'errands',  color: 'coral',    title: 'Run errands',               desc: 'Groceries, returns, pickups, and the small jobs that eat your day.', img: '/images/cards/for-everyday-tasks.png', fit: 'auto 115%' },
  { key: 'events',   color: 'marigold', title: 'Staff events',              desc: 'Vetted hands for setup, hosting, and teardown, booked in minutes.', img: '/images/cards/for-onsite-crew.png', fit: 'cover' },
  { key: 'move',     color: 'electric', title: 'Move and set up',           desc: 'Lift, assemble, mount, and install, with muscle and know-how on tap.', img: '/images/cards/for-heavy-lifting.png', fit: '110%' },
  { key: 'deliver',  color: 'lime',     title: 'Deliver locally',           desc: 'Hand-delivered drop-offs across town by a real person nearby.', img: '/images/cards/for-same-day-delivery.png', fit: 'auto 115%' },
  { key: 'content',  color: 'violet',   title: 'Create real-world content', desc: 'Photo, video, and UGC shot where it actually happens.', img: '/images/cards/for-onlocation-ugc.png', fit: 'auto 115%' },
  { key: 'check',    color: 'sky',      title: 'Check places in person',    desc: 'Store audits, site visits, and mystery checks with photo proof.', img: '/images/cards/for-boots-on-grounds.png', fit: '110%' },
  { key: 'business', color: 'ink',      title: 'Help your business',        desc: 'Scale a flexible, on-demand crew for ops, field, and retail.', img: '/images/cards/for-teams.png', fit: '110%' },
  { key: 'anything', color: 'blush',    title: "Do anything AI can't",      desc: 'If it takes a human in the real world, someone here will do it.', img: '/images/cards/for-anything-else.png', fit: 'cover' },
];

export default function Home() {
  return (
    <>
      <div className="header-wrapper">
        <header>
          <a href="#" className="quest-logo" aria-label="Quest">
            <svg className="quest-logo__mark" width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="8" stroke="#FF5A47" strokeWidth="3.2"/>
              <line x1="16.8" y1="16.8" x2="22.5" y2="22.5" stroke="#FF5A47" strokeWidth="3.2" strokeLinecap="round"/>
            </svg>
            <span className="quest-logo__word">uest</span>
          </a>

          <input className="menu-checkbox" type="checkbox" id="menu-checkbox" />
          <label className="menu-button" htmlFor="menu-checkbox">
            <span className="material-symbols-outlined not-sr-only" data-show-when="closed">dehaze</span>
            <span className="material-symbols-outlined not-sr-only" data-show-when="open">close</span>
            <span className="sr-only">Toggle Menu</span>
          </label>

          <nav>
            <ul>
              <li><a href="#how"><span className="nav-rn">How it works</span></a></li>
              <li><a href="#bento"><span className="nav-rn">For Business</span></a></li>
              <li><a href="#audiences"><span className="nav-rn">For AI Agents</span></a></li>
              <li><a href="#audiences"><span className="nav-rn">Earn as a Hero</span></a></li>
              <li><a href="#video"><span className="nav-rn">Manifesto</span></a></li>
            </ul>
          </nav>

          <button className="secondary"><span>Get started</span></button>
        </header>
      </div>

      <section id="welcome" className="center">
        <h1><span className="sr-only">Google Antigravity</span></h1>
        <div className="quest-hero">
          <p className="quest-hero__eyebrow"><span className="quest-hero__eyebrow-emoji">🤖</span><span className="quest-shiny">Let your AI hire humans</span><span className="quest-hero__eyebrow-arrow">→</span></p>
          <h2 className="quest-hero__title">Your AI can&apos;t do<br />everything. Hire a <span className="rn-mark">human</span></h2>
          <p className="quest-hero__subtitle">Quest connects you with trusted people for real-world work, errands, events, content, deliveries, and anything AI still can&apos;t do.</p>

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
          <p className="logos-label">Trusted by teams at<br />600+ businesses</p>
          <ul className="logos-row">
            <li><img src="/images/logos/meta.png" alt="Meta" /></li>
            <li><img src="/images/logos/google.png" alt="Google" /></li>
            <li><img src="/images/logos/gojek.png" alt="Gojek" /></li>
            <li><img src="/images/logos/antler.png" alt="Antler" /></li>
            <li><img src="/images/logos/ascott.png" alt="The Ascott" /></li>
          </ul>
        </div>
      </section>

      <section id="bento">
        <div className="bento-head">
          <div className="bento-head__text">
            <h2 className="bento-title">AI can write the plan.<br />Humans still show up.</h2>
            <p className="bento-lede">Hire people for the physical, local, social, messy, urgent, and uniquely human work that AI cannot complete on its own.</p>
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
          <p className="video-sub">For 5 years, Quest called them Heroes. Today, we&apos;re saying what we&apos;ve always believed more clearly: real-world work still needs humans.</p>
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
            <p className="how-card__desc">Describe the task, location, deadline, and budget in one sentence.</p>
            <span className="how-card__num">/ 01</span>
            <div className="how-card__visual" aria-hidden="true">
              <div className="qmock qmock--post">
                <div className="qmock__head"><span className="qmock__title">New task</span><span className="qmock__step">Step 1 of 3</span></div>
                <div className="qmock__prompt"><span>I need a lawn mower in Dallas for $100</span><span className="qmock__send material-symbols-outlined">arrow_upward</span></div>
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
            <p className="how-card__desc">Quest matches you with trusted humans who have the right skills, location, and track record.</p>
            <span className="how-card__num">/ 02</span>
            <div className="how-card__visual" aria-hidden="true">
              <div className="qmock qmock--match">
                <div className="qmock__head"><span className="qmock__title">Matched humans</span><span className="qmock__pill">5 new offers</span></div>
                <ul className="qmock__heroes">
                  <li className="qmock__hero"><img className="qmock__avatar" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces&auto=format&q=80" alt="" /><span className="qmock__who"><b>Maya R.</b><small>★ 4.9 · Lawn care · 0.8 mi</small></span><button className="qmock__assign">Assign</button></li>
                  <li className="qmock__hero"><img className="qmock__avatar" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&crop=faces&auto=format&q=80" alt="" /><span className="qmock__who"><b>Arjun P.</b><small>★ 4.8 · Gardening · 1.2 mi</small></span><button className="qmock__assign">Assign</button></li>
                  <li className="qmock__hero"><img className="qmock__avatar" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces&auto=format&q=80" alt="" /><span className="qmock__who"><b>Siti N.</b><small>★ 5.0 · Yard work · 2.0 mi</small></span><button className="qmock__assign">Assign</button></li>
                  <li className="qmock__hero"><img className="qmock__avatar" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=faces&auto=format&q=80" alt="" /><span className="qmock__who"><b>Daniel T.</b><small>★ 4.7 · Landscaping · 2.4 mi</small></span><button className="qmock__assign">Assign</button></li>
                  <li className="qmock__hero"><img className="qmock__avatar" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=96&h=96&fit=crop&crop=faces&auto=format&q=80" alt="" /><span className="qmock__who"><b>Liam K.</b><small>★ 4.8 · Yard care · 1.6 mi</small></span><button className="qmock__assign">Assign</button></li>
                </ul>
                <div className="qmock__foot"><span className="material-symbols-outlined">verified_user</span>12 background-checked humans nearby</div>
              </div>
            </div>
          </article>
          <article className="how-card">
            <h3 className="how-card__title">Hire, pay, and get it done</h3>
            <p className="how-card__desc">Hire the right person, track progress, and pay securely through Quest. Funds are held safely until the work is done.</p>
            <span className="how-card__num">/ 03</span>
            <div className="how-card__visual" aria-hidden="true">
              <div className="qmock qmock--pay">
                <div className="qmock__head"><span className="qmock__title">Confirm &amp; pay</span><span className="qmock__pill">Matched</span></div>
                <div className="qmock__hero qmock__hero--lg"><img className="qmock__avatar" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces&auto=format&q=80" alt="" /><span className="qmock__who"><b>Maya R.</b><small>Lawn mowing · Sat 9am · Dallas</small></span></div>
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

      <section id="product">
        <h2><span className="typewriter">Antigravity is our agentic development platform, evolving the IDE into the agent-first era.</span></h2>

        <div className="icons">
          <div className="icon"><span className="material-symbols-outlined">keyboard_return</span></div>
          <div className="icon"><span className="material-symbols-outlined">keyboard_tab</span></div>
          <div className="icon"><span className="material-symbols-outlined">merge</span></div>
          <div className="icon"><span className="material-symbols-outlined">folder</span></div>
          <div className="icon"><span className="material-symbols-outlined">deployed_code</span></div>
          <div className="icon"><span className="material-symbols-outlined">dashboard_customize</span></div>
          <div className="icon"><span className="material-symbols-outlined">commit</span></div>
          <div className="icon"><span className="material-symbols-outlined">chat_add_on</span></div>
          <div className="icon"><span className="material-symbols-outlined">device_hub</span></div>
          <div className="icon"><span className="material-symbols-outlined">refresh</span></div>
          <div className="icon"><span className="material-symbols-outlined">code</span></div>
          <div className="icon"><span className="material-symbols-outlined">file_copy</span></div>
          <div className="icon"><span className="material-symbols-outlined">code_blocks</span></div>
          <div className="icon"><span className="material-symbols-outlined">keyboard_command_key</span></div>
          <div className="icon"><span className="material-symbols-outlined">upload</span></div>
          <div className="icon"><span className="material-symbols-outlined">terminal</span></div>
          <div className="icon"><span className="material-symbols-outlined">swap_horiz</span></div>
          <div className="icon"><span className="material-symbols-outlined">last_page</span></div>
          <div className="icon"><span className="material-symbols-outlined">apps_outage</span></div>
          <div className="icon"><span className="material-symbols-outlined">keyboard_option_key</span></div>
          <div className="icon"><span className="material-symbols-outlined">recenter</span></div>
          <div className="icon"><span className="material-symbols-outlined">power_settings_new</span></div>
          <div className="icon"><span className="material-symbols-outlined">design_services</span></div>
          <div className="icon"><span className="material-symbols-outlined">widgets</span></div>
        </div>

        <div id="features">
          <div className="feature">
            <div className="img-wrapper">
              <img src="https://antigravity.google/assets/image/landing/editor_suggestions.png" alt="" />
            </div>
            <div className="content">
              <h3>An AI IDE Core</h3>
              <p>Google Antigravity&apos;s Editor view offers tab autocompletion, natural language code commands, and a configurable, and context-aware configurable agent.</p>
            </div>
          </div>
          <div className="feature">
            <div className="img-wrapper">
              <img src="https://antigravity.google/assets/image/landing/task_based.png" alt="" />
            </div>
            <div className="content">
              <h3>Higher-level Abstractions</h3>
              <p>A more intuitive task-based approach to monitoring agent activity, presenting you with essential artifacts and verification results to build trust.</p>
            </div>
          </div>
          <div className="feature">
            <div className="img-wrapper">
              <img src="https://antigravity.google/assets/image/landing/browser_use.png" alt="" />
            </div>
            <div className="content">
              <h3>Cross-surface Agents</h3>
              <p>Synchronized agentic control across your editor, terminal, and browser for powerful development workflows.</p>
            </div>
          </div>
          <div className="feature">
            <div className="img-wrapper">
              <img src="https://antigravity.google/assets/image/landing/implementation_comment.png" alt="" />
            </div>
            <div className="content">
              <h3>User Feedback</h3>
              <p>Intuitively integrate feedback across surfaces and artifacts to guide and refine the agent&apos;s work.</p>
            </div>
          </div>
          <div className="feature">
            <div className="img-wrapper">
              <img src="https://antigravity.google/assets/image/landing/inbox.png" alt="" />
            </div>
            <div className="content">
              <h3>An Agent-First Experience</h3>
              <p>Manage multiple agents at the same time, across any workspace, from one central mission control view.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="developers">
        <div>
          <h2>Built for developers for the agent-first era</h2>
          <p className="intro">Google Antigravity is built for user trust, whether you&apos;re a professional developer working in a large enterprise codebase, a hobbyist vibe-coding in their spare time, or anyone in between.</p>
        </div>

        <div className="carousel">
          <div className="developer">
            <figure>
              <img src="https://antigravity.google/assets/image/landing/landing-thumbnail-frontend.jpg" alt="Frontend developer" />
              <figcaption className="typewriter">Frontend Developer</figcaption>
            </figure>
            <h3>Frontend developer</h3>
            <p>Streamline UX development by leveraging browser-in-the-loop agents to automate repetitive tasks.</p>
            <a href="#">View case</a>
          </div>
          <div className="developer">
            <figure>
              <img src="https://antigravity.google/assets/image/landing/landing-thumbnail-fullstack.jpg" alt="Full stack developer" />
              <figcaption className="typewriter">Full stack developer</figcaption>
            </figure>
            <h3>Full stack developer</h3>
            <p>Build production-ready applications with confidence with thoroughly designed artifacts and comprehensive verification tests.</p>
            <a href="#">View case</a>
          </div>
          <div className="developer">
            <figure>
              <img src="https://antigravity.google/assets/image/landing/landing-thumbnail-enterprise.jpg" alt="Enterprise Developer" />
              <figcaption className="typewriter">Enterprise Developer</figcaption>
            </figure>
            <h3>Enterprise Developer</h3>
            <p>Streamline operations and reduce context switching by orchestrating agents across workspaces using the Agent Manager.</p>
            <a href="#">View case</a>
          </div>
        </div>
      </section>

      <section id="who" className="center">
        <div>
          <h3>For developers<br /><span>Achieve new heights</span></h3>
          <button>Download</button>
        </div>
        <div>
          <h3>For organizations<br /><span>Level up your entire team</span></h3>
          <button className="secondary">Notify me</button>
        </div>
      </section>

      <section id="beforeyougo">
        <div className="card dark">
          <p><span className="typewriter">Download Google Antigravity for macOS</span></p>
          <div className="buttons">
            <button>Download for Apple Silicon</button>
            <button className="secondary">Download for Intel</button>
          </div>
        </div>
      </section>

      <PageScript />
      <ScrollFX />
    </>
  );
}
