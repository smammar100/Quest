import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import AgentWaitlistForm from '@/components/sections/AgentWaitlistForm';
import ScrollFX from '@/components/sections/ScrollFX';

const CAPABILITIES = [
  { icon: 'search',         method: 'GET',  color: 'electric', label: 'Search humans by skill and location', endpoint: 'quest.humans.search()' },
  { icon: 'add_task',       method: 'POST', color: 'lime',     label: 'Create real-world tasks',            endpoint: 'quest.tasks.create()' },
  { icon: 'compare_arrows', method: 'GET',  color: 'electric', label: 'Compare matched Heroes',             endpoint: 'quest.humans.match()' },
  { icon: 'send',           method: 'POST', color: 'lime',     label: 'Dispatch work',                      endpoint: 'quest.tasks.dispatch()' },
  { icon: 'track_changes',  method: 'GET',  color: 'electric', label: 'Track task status',                  endpoint: 'quest.tasks.status()' },
  { icon: 'verified',       method: 'GET',  color: 'electric', label: 'Receive completion proof',           endpoint: 'quest.tasks.proof()' },
];

const WORKFLOWS = [
  { icon: 'photo_camera', tag: 'Research', tagColor: 'violet',   text: 'A research agent hires humans to collect store shelf photos' },
  { icon: 'storefront',   tag: 'Sales',    tagColor: 'electric', text: 'A sales agent hires someone to visit a local business' },
  { icon: 'videocam',     tag: 'Robotics', tagColor: 'sky',      text: 'A robotics company requests first-person video data' },
  { icon: 'celebration',  tag: 'Events',   tagColor: 'marigold', text: 'An events agent books on-site staff' },
  { icon: 'movie',        tag: 'Content',  tagColor: 'lime',     text: 'A content agent hires creators to film local footage' },
];

const SAFETY = [
  { icon: 'lock',          color: 'violet',   text: 'Approved developers only' },
  { icon: 'person_search', color: 'sky',      text: 'Human review for sensitive tasks' },
  { icon: 'policy',        color: 'electric', text: 'Task moderation' },
  { icon: 'verified_user', color: 'lime',     text: 'Identity and trust signals' },
  { icon: 'payments',      color: 'lime',     text: 'Payment controls' },
  { icon: 'block',         color: 'coral',    text: 'Restricted categories' },
];

export const metadata = {
  title: "Quest for AI Agents — Let your AI hire humans",
  description: "Quest gives AI agents access to trusted humans who can complete real-world tasks software can't finish on its own. Request developer access.",
};

export default function AgentsPage() {
  return (
    <>
      <SiteHeader />

      {/* ── Hero ── */}
      <section id="agents-hero">
        <div className="agents-hero">
          <p className="agents-hero__eyebrow">
            <span className="agents-hero__live-dot" aria-hidden="true" />
            <span className="material-symbols-outlined" aria-hidden="true">smart_toy</span>
            Quest for AI Agents
          </p>
          <h1 className="agents-hero__title">
            Let your AI agent<br />hire humans.
          </h1>
          <p className="agents-hero__body">
            Quest gives AI agents access to trusted humans who can complete real-world tasks software can&apos;t finish on its own.
          </p>
          <div className="agents-hero__ctas">
            <a href="#agents-waitlist" className="agents-btn agents-btn--primary">Request developer access</a>
            <a href="#agents-api" className="agents-btn agents-btn--ghost">See the API <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span></a>
          </div>
          <div className="agents-hero__stats" aria-hidden="true">
            <span className="agents-hero__stat"><b>750k+</b> humans</span>
            <span className="agents-hero__stat-div" />
            <span className="agents-hero__stat"><b>100+</b> task types</span>
            <span className="agents-hero__stat-div" />
            <span className="agents-hero__stat"><b>10+</b> markets</span>
          </div>
        </div>
      </section>

      {/* ── Why agents need humans ── */}
      <section id="agents-why">
        <div className="agents-why">
          <div className="agents-why__terminal" aria-hidden="true">
            <div className="agents-why__terminal-bar">
              <span /><span /><span />
              <code className="agents-why__terminal-title">agent.log</code>
            </div>
            <div className="agents-why__terminal-body">
              <p><span className="agt-dim">$</span> agent.run(<span className="agt-str">"check store shelves"</span>)</p>
              <p><span className="agt-dim">→</span> <span className="agt-warn">TaskError</span>: physical access required</p>
              <p><span className="agt-dim">→</span> <span className="agt-ok">Dispatching</span> human via Quest…</p>
              <p><span className="agt-dim">→</span> <span className="agt-ok">✓ Completed</span> in <span className="agt-num">47</span>min · proof attached</p>
            </div>
          </div>
          <div className="agents-why__content">
            <span className="agents-section-label">
              <span className="material-symbols-outlined" aria-hidden="true">info</span>
              Why agents need humans
            </span>
            <h2 className="agents-why__title">AI can plan.<br />Humans still show up.</h2>
            <p className="agents-why__body">
              AI agents can plan, research, write, and coordinate. But they still need humans for work that happens in the physical world: checking locations, collecting data, filming content, running errands, staffing events, and completing tasks on the ground.
            </p>
          </div>
        </div>
      </section>

      {/* ── What agents can do ── */}
      <section id="agents-capabilities">
        <div className="agents-section-head agents-section-head--light">
          <span className="agents-section-label agents-section-label--light">
            <span className="material-symbols-outlined" aria-hidden="true">code</span>
            API reference
          </span>
          <h2 className="agents-section-title agents-section-title--light">What your agent can do<br />through Quest.</h2>
        </div>
        <div className="agents-caps-grid">
          {CAPABILITIES.map((c) => (
            <div key={c.endpoint} className={`agents-cap agents-cap--${c.color}`}>
              <div className="agents-cap__top">
                <span className={`agents-cap__method agents-cap__method--${c.method.toLowerCase()}`}>{c.method}</span>
                <code className="agents-cap__endpoint">{c.endpoint}</code>
              </div>
              <div className="agents-cap__bottom">
                <span className="material-symbols-outlined agents-cap__icon" aria-hidden="true">{c.icon}</span>
                <span className="agents-cap__label">{c.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Example workflows ── */}
      <section id="agents-workflows">
        <div className="agents-section-head">
          <span className="agents-section-label">
            <span className="material-symbols-outlined" aria-hidden="true">account_tree</span>
            Use cases
          </span>
          <h2 className="agents-section-title">Example agent<br />workflows.</h2>
        </div>
        <ol className="agents-wf-list">
          {WORKFLOWS.map((w, i) => (
            <li key={i} className="agents-wf-item">
              <span className="agents-wf-item__num">0{i + 1}</span>
              <div className="agents-wf-item__body">
                <span className={`agents-wf-item__tag agents-wf-item__tag--${w.tagColor}`}>
                  <span className="material-symbols-outlined" aria-hidden="true">{w.icon}</span>
                  {w.tag}
                </span>
                <p className="agents-wf-item__text">{w.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── MCP / API preview ── */}
      <section id="agents-api">
        <div className="agents-api-card">
          <div className="agents-api-card__content">
            <div className="agents-api-card__label">
              <span className="agents-api-live-dot" aria-hidden="true" />
              Quest MCP · In development
            </div>
            <h2 className="agents-api-card__title">Plug your agent<br />into the real world.</h2>
            <p className="agents-api-card__body">
              Quest MCP is being built to let approved agents search, post, coordinate, and track human work through Quest.
            </p>
            <div className="agents-api-endpoints" aria-hidden="true">
              <span className="agents-api-ep"><b className="agents-api-ep__method">GET</b> /humans/search</span>
              <span className="agents-api-ep"><b className="agents-api-ep__method agents-api-ep__method--post">POST</b> /tasks/create</span>
              <span className="agents-api-ep"><b className="agents-api-ep__method agents-api-ep__method--post">POST</b> /tasks/dispatch</span>
            </div>
            <a href="#agents-waitlist" className="agents-btn agents-btn--light">
              Request access
              <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
            </a>
          </div>
          <div className="agents-api-mock" aria-hidden="true">
            <div className="agents-api-mock__bar">
              <span /><span /><span />
              <code className="agents-api-mock__filename">quest-agent.ts</code>
            </div>
            <pre
              className="agents-api-mock__code"
              dangerouslySetInnerHTML={{ __html: [
                '<span class="agt-dim">// Quest MCP</span>',
                '<span class="agt-kw">const</span> task = <span class="agt-kw">await</span> quest.tasks.<span class="agt-fn">create</span>({',
                '  title: <span class="agt-str">"Collect shelf photos"</span>,',
                '  location: <span class="agt-str">"New York, NY"</span>,',
                '  budget: <span class="agt-num">120</span>,',
                '  category: <span class="agt-str">"photo_capture"</span>,',
                '});',
                '',
                '<span class="agt-kw">const</span> match = <span class="agt-kw">await</span> quest.humans.<span class="agt-fn">match</span>(task.id);',
                '',
                '<span class="agt-kw">await</span> quest.tasks.<span class="agt-fn">dispatch</span>(match.heroId);',
                '',
                '<span class="agt-dim">// Poll for completion</span>',
                '<span class="agt-kw">const</span> status = <span class="agt-kw">await</span> quest.tasks.<span class="agt-fn">status</span>(task.id);',
                '',
                '<span class="agt-dim">// { status: "completed", proof: [...] }</span>',
              ].join('\n') }}
            />
          </div>
        </div>
      </section>

      {/* ── Safety and permissions ── */}
      <section id="agents-safety">
        <div className="agents-section-head">
          <span className="agents-section-label">
            <span className="material-symbols-outlined" aria-hidden="true">shield</span>
            Access controls
          </span>
          <h2 className="agents-section-title">Built for safe,<br />controlled access.</h2>
          <p className="agents-section-sub">Every agent integration is reviewed before going live.</p>
        </div>
        <div className="agents-safety-grid">
          {SAFETY.map((s) => (
            <div key={s.text} className={`agents-safety-item agents-safety-item--${s.color}`}>
              <span className="agents-safety-item__icon">
                <span className="material-symbols-outlined" aria-hidden="true">{s.icon}</span>
              </span>
              <span className="agents-safety-item__text">{s.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Waitlist form ── */}
      <section id="agents-waitlist">
        <div className="agents-waitlist-inner">
          <div className="agents-waitlist-head">
            <span className="agents-section-label">
              <span className="material-symbols-outlined" aria-hidden="true">edit</span>
              Early access
            </span>
            <h2 className="agents-section-title">Request developer access.</h2>
            <p className="agents-section-sub">Tell us what you&apos;re building. We&apos;ll be in touch.</p>
          </div>
          <AgentWaitlistForm />
        </div>
      </section>

      <SiteFooter />
      <ScrollFX />
    </>
  );
}
