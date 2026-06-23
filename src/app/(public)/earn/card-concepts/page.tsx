import SiteHeader from '@/components/layout/SiteHeader';

const AVATAR =
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=240&h=240&fit=crop&crop=faces&auto=format&q=80';
const PHOTO =
  'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=720&q=80&auto=format&fit=crop';

export const metadata = {
  title: 'Earn — Profile card concepts',
  description: 'Profile card design variations.',
};

const TAGS = ['Moving', 'Delivery', 'Errands'];

export default function CardConcepts() {
  return (
    <>
      <SiteHeader />
      <section className="pc-page">
        <div className="pc-head">
          <span className="earn-label">
            <span className="material-symbols-outlined" aria-hidden="true">style</span>
            Profile card concepts
          </span>
          <h1 className="pc-title">Six ways to show a Hero.</h1>
        </div>

        <div className="pc-grid">
          {/* 1 — Coral cover, centered avatar (baseline+) */}
          <div className="pc-cell">
            <span className="pc-cap">1 · Coral cover</span>
            <article className="pc-card pc1">
              <span className="pc-verified"><span className="material-symbols-outlined">verified</span></span>
              <div className="pc1__cover"><img className="pc1__avatar" src={AVATAR} alt="" /></div>
              <div className="pc-pad">
                <h3 className="pc-name">Emma M.</h3>
                <p className="pc-bio">Efficient, friendly local help — 5+ years of removals and errands.</p>
                <div className="pc-stats">
                  <span><b>★ 4.9</b> rating</span><span><b>320</b> quests</span><span><b>2 yrs</b> here</span>
                </div>
                <div className="pc-tags">{TAGS.map((t) => <span key={t}>{t}</span>)}</div>
              </div>
            </article>
          </div>

          {/* 2 — Photo hero overlay */}
          <div className="pc-cell">
            <span className="pc-cap">2 · Photo hero</span>
            <article className="pc-card pc2">
              <div className="pc2__hero" style={{ backgroundImage: `url(${PHOTO})` }}>
                <div className="pc2__scrim" />
                <span className="pc-pill pc2__avail"><span className="pc-dot" />Available now</span>
                <div className="pc2__head">
                  <h3 className="pc-name pc-name--light">Emma M. <span className="material-symbols-outlined pc2__check">verified</span></h3>
                  <p className="pc2__role">Removals &amp; errands · ★ 4.9</p>
                </div>
              </div>
              <div className="pc-pad">
                <p className="pc-bio">Reliable, on-time and friendly — 320 quests completed across town.</p>
                <div className="pc-tags">{TAGS.map((t) => <span key={t}>{t}</span>)}</div>
              </div>
            </article>
          </div>

          {/* 3 — Clean, no cover, left avatar */}
          <div className="pc-cell">
            <span className="pc-cap">3 · Minimal</span>
            <article className="pc-card pc3">
              <div className="pc3__head">
                <img className="pc3__avatar" src={AVATAR} alt="" />
                <div>
                  <h3 className="pc-name">Emma M. <span className="material-symbols-outlined pc3__check">verified</span></h3>
                  <p className="pc3__role">Removals &amp; errands · Austin, TX</p>
                </div>
              </div>
              <p className="pc-bio">Efficient, friendly local help with 5+ years of experience.</p>
              <div className="pc3__statrow">
                <div><b>★ 4.9</b><small>Rating</small></div>
                <div><b>320</b><small>Quests</small></div>
                <div><b>2 yrs</b><small>On Quest</small></div>
              </div>
              <div className="pc-tags">{TAGS.map((t) => <span key={t}>{t}</span>)}</div>
            </article>
          </div>

          {/* 4 — Cover + in-card CTA */}
          <div className="pc-cell">
            <span className="pc-cap">4 · Hire CTA</span>
            <article className="pc-card pc4">
              <div className="pc4__cover">
                <img className="pc4__avatar" src={AVATAR} alt="" />
                <span className="pc-pill pc4__rate">★ 4.9</span>
              </div>
              <div className="pc-pad">
                <h3 className="pc-name">Emma M.</h3>
                <p className="pc4__role">Top-rated mover · responds in ~10 min</p>
                <div className="pc-tags">{TAGS.map((t) => <span key={t}>{t}</span>)}</div>
                <a href="/signup" className="pc4__cta">Hire Emma</a>
              </div>
            </article>
          </div>

          {/* 5 — Dark */}
          <div className="pc-cell">
            <span className="pc-cap">5 · Dark</span>
            <article className="pc-card pc5">
              <div className="pc5__head">
                <span className="pc5__ring"><img src={AVATAR} alt="" /></span>
                <div>
                  <h3 className="pc-name pc-name--light">Emma M.</h3>
                  <p className="pc5__role">★ 4.9 · 320 quests</p>
                </div>
                <span className="pc-verified pc-verified--dark"><span className="material-symbols-outlined">verified</span></span>
              </div>
              <p className="pc5__bio">Efficient, friendly local help — 5+ years of removals and errands.</p>
              <div className="pc5__stats">
                <span>Moving</span><span>Delivery</span><span>Errands</span>
              </div>
            </article>
          </div>

          {/* 6 — Gradient mesh + glass stats */}
          <div className="pc-cell">
            <span className="pc-cap">6 · Gradient + glass</span>
            <article className="pc-card pc6">
              <div className="pc6__cover">
                <img className="pc6__avatar" src={AVATAR} alt="" />
                <div className="pc6__glass">
                  <span><b>★ 4.9</b><small>Rating</small></span>
                  <span><b>320</b><small>Quests</small></span>
                  <span><b>2 yrs</b><small>Here</small></span>
                </div>
              </div>
              <div className="pc-pad pc6__pad">
                <h3 className="pc-name">Emma M.</h3>
                <p className="pc-bio">Reliable, on-time, friendly. Removals and errands across Austin.</p>
                <div className="pc-tags">{TAGS.map((t) => <span key={t}>{t}</span>)}</div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
