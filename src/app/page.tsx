import PageScript from './components/PageScript';
import TasksShowcase from './components/TasksShowcase';
import AudiencesSection from './components/AudiencesSection';

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
              <li><a href="#how">How it works</a></li>
              <li><a href="#bento">For Business</a></li>
              <li><a href="#developers">For Developers</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </nav>

          <button className="secondary"><span>Get started</span></button>
        </header>
      </div>

      <section id="welcome" className="center">
        <h1><span className="sr-only">Google Antigravity</span></h1>
        <div className="quest-hero">
          <p className="quest-hero__eyebrow"><span className="quest-hero__eyebrow-emoji">🤖</span><span className="quest-shiny">Introducing AI agents</span><span className="quest-hero__eyebrow-arrow">→</span></p>
          <h2 className="quest-hero__title">AI <span className="rn-cross">can</span> do everything.<br />But <span className="rn-mark">humans</span> can.</h2>
          <p className="quest-hero__subtitle">Quest connects you with trusted people for real-world work, errands, events, content, deliveries, and anything AI still can&apos;t do.</p>

          <div className="quest-prompt">
            <input className="quest-prompt__input" type="text" placeholder="I need a lawn mower in Dallas for 100$" aria-label="Describe what you need" />
            <div className="quest-prompt__toolbar">
              <button type="button" className="quest-prompt__icon-btn quest-prompt__add" aria-label="Add attachment"><span className="material-symbols-outlined">add</span></button>
              <div className="quest-prompt__actions">
                <button type="button" className="quest-prompt__icon-btn" aria-label="Adjust filters"><span className="material-symbols-outlined">tune</span></button>
                <button type="button" className="quest-prompt__icon-btn" aria-label="Voice input"><span className="material-symbols-outlined">mic</span></button>
                <button type="button" className="quest-prompt__submit">Submit</button>
              </div>
            </div>
          </div>

          <div className="quest-suggest">
            <p className="quest-suggest__label">Not sure where to start? Try one of these:</p>
            <div className="quest-suggest__pills">
              <button type="button" className="quest-pill">Deliver food</button>
              <button type="button" className="quest-pill">Create a UGC Video</button>
              <button type="button" className="quest-pill">Develop a website</button>
              <button type="button" className="quest-pill">Install a furniture</button>
              <button type="button" className="quest-pill">Do Event Photography</button>
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
            <p className="bento-lede">Whatever you&apos;re trying to get done in the real world, there&apos;s a person ready to do it, well, today.</p>
          </div>
          <a href="#" className="bento-seeall">See all</a>
        </div>

        <div className="bento-grid">
          <article className="bento-card bento-card--humans">
            <div className="bento-card__body">
              <h3>For humans</h3>
              <p>Hire trusted humans for errands, events, deliveries, and the everyday tasks AI can&apos;t do.</p>
              <a href="#" className="bento-btn">Hire a Human</a>
            </div>
            <div className="bento-card__media">
              <img src="/images/cards/for-people.jpg" alt="A parcel parachuting down to a doorstep" loading="lazy" />
            </div>
          </article>

          <article className="bento-card bento-card--business">
            <div className="bento-card__body">
              <h3>For business</h3>
              <p>Scale your team on demand, vetted crew for events, ops, store checks, and field work.</p>
              <a href="#" className="bento-btn">Hire for business</a>
            </div>
            <div className="bento-card__media">
              <img src="/images/cards/for-business.jpg" alt="A crew setting up an outdoor event tent at golden hour" loading="lazy" />
            </div>
          </article>

          <article className="bento-card bento-card--agents">
            <div className="bento-card__body">
              <h3>For AI agents</h3>
              <p>Let your AI agent search, hire, and coordinate trusted humans to get real-world work done.</p>
              <a href="#" className="bento-btn">Join developer preview</a>
            </div>
            <div className="bento-card__media">
              <img src="/images/cards/for-ai.jpg" alt="A friendly robot handing a task to a person on a map" loading="lazy" />
            </div>
          </article>
        </div>
      </section>

      <section id="video">
        <div className="video-head">
          <h2 className="video-title">Why humans still matter<br />when AI <span className="video-cross">can</span> do almost everything.</h2>
          <a href="#" className="video-cta">Learn more about Manifesto <span className="material-symbols-outlined">arrow_forward</span></a>
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
            <p className="how-card__desc">Post your task in a sentence — when, where, and what done looks like.</p>
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
            <p className="how-card__desc">We surface trusted Heroes nearby with the right skills and reviews.</p>
            <span className="how-card__num">/ 02</span>
            <div className="how-card__visual" aria-hidden="true">
              <div className="qmock qmock--match">
                <div className="qmock__head"><span className="qmock__title">Matched Heroes</span><span className="qmock__pill">5 new offers</span></div>
                <ul className="qmock__heroes">
                  <li className="qmock__hero"><img className="qmock__avatar" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces&auto=format&q=80" alt="" /><span className="qmock__who"><b>Maya R.</b><small>★ 4.9 · Lawn care · 0.8 mi</small></span><button className="qmock__assign">Assign</button></li>
                  <li className="qmock__hero"><img className="qmock__avatar" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&crop=faces&auto=format&q=80" alt="" /><span className="qmock__who"><b>Arjun P.</b><small>★ 4.8 · Gardening · 1.2 mi</small></span><button className="qmock__assign">Assign</button></li>
                  <li className="qmock__hero"><img className="qmock__avatar" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces&auto=format&q=80" alt="" /><span className="qmock__who"><b>Siti N.</b><small>★ 5.0 · Yard work · 2.0 mi</small></span><button className="qmock__assign">Assign</button></li>
                  <li className="qmock__hero"><img className="qmock__avatar" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=faces&auto=format&q=80" alt="" /><span className="qmock__who"><b>Daniel T.</b><small>★ 4.7 · Landscaping · 2.4 mi</small></span><button className="qmock__assign">Assign</button></li>
                  <li className="qmock__hero"><img className="qmock__avatar" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=96&h=96&fit=crop&crop=faces&auto=format&q=80" alt="" /><span className="qmock__who"><b>Liam K.</b><small>★ 4.8 · Yard care · 1.6 mi</small></span><button className="qmock__assign">Assign</button></li>
                </ul>
                <div className="qmock__foot"><span className="material-symbols-outlined">verified_user</span>12 background-checked Heroes nearby</div>
              </div>
            </div>
          </article>
          <article className="how-card">
            <h3 className="how-card__title">Hire, pay, and get it done</h3>
            <p className="how-card__desc">Agree the price, track the work, and pay securely when it&apos;s complete.</p>
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
    </>
  );
}
