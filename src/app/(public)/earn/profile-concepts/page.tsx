import SiteHeader from '@/components/layout/SiteHeader';

const AVATAR =
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=240&h=240&fit=crop&crop=faces&auto=format&q=80';

export const metadata = {
  title: 'Earn — Profile section concepts',
  description: 'Five directions for the “Create your profile” section.',
};

/* Reusable phone profile mockup. `tone` switches the cover treatment. */
function PhoneProfile({ tone = 'coral' }: { tone?: 'coral' | 'ink' | 'gradient' }) {
  return (
    <div className="epphone">
      <div className="epphone__status">
        <span className="epphone__time">9:41</span>
        <span className="epphone__sys">
          <span className="material-symbols-outlined">signal_cellular_alt</span>
          <span className="material-symbols-outlined">wifi</span>
          <span className="material-symbols-outlined">battery_full</span>
        </span>
      </div>
      <div className="epphone__top">
        <span className="material-symbols-outlined">arrow_back</span>
        <span className="epphone__topname">Emma M.</span>
        <span className="epphone__topact">
          <span className="material-symbols-outlined">ios_share</span>
          <span className="material-symbols-outlined">edit</span>
        </span>
      </div>
      <div className={`epphone__cover epphone__cover--${tone}`}>
        <img className="epphone__avatar" src={AVATAR} alt="" width={120} height={120} />
      </div>
      <div className="epphone__body">
        <h3 className="epphone__name">Emma M.</h3>
        <p className="epphone__bio">
          Efficient, friendly local help — 5+ years of removals, deliveries and errands.
        </p>
        <div className="epphone__stats">
          <span><b>★ 4.9</b> rating</span>
          <span><b>320</b> quests</span>
          <span><b>2 yrs</b> on Quest</span>
        </div>
        <div className="epphone__tags">
          <span>Moving</span>
          <span>Delivery</span>
          <span>Errands</span>
        </div>
      </div>
    </div>
  );
}

export default function ProfileConcepts() {
  return (
    <>
      <SiteHeader />

      {/* ───────── Variation 1 — Polished split + floating chips ───────── */}
      <span className="eplabel">Variation 1 — Polished split with live chips</span>
      <section className="ep-wrap">
        <div className="ep1">
          <div className="ep1__content">
            <h2 className="ep-h2">
              Create your profile,<br />start browsing quests.
            </h2>
            <p className="ep-lede">It&apos;s free and takes less than a minute to sign up.</p>
            <a href="/signup" className="ep-btn ep-btn--coral">Become a Hero</a>
            <p className="ep-micro">
              <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
              No fees to join · Get matched the same day
            </p>
          </div>
          <div className="ep1__media">
            <PhoneProfile tone="coral" />
            <span className="ep1__chip ep1__chip--top">
              <span className="material-symbols-outlined" aria-hidden="true">verified</span>
              Profile live
            </span>
            <span className="ep1__chip ep1__chip--bottom">
              <span className="material-symbols-outlined" aria-hidden="true">bolt</span>
              New quest matched · $80
            </span>
          </div>
        </div>
      </section>

      {/* ───────── Variation 2 — Dark premium ───────── */}
      <span className="eplabel">Variation 2 — Dark premium</span>
      <section className="ep-wrap">
        <div className="ep2">
          <div className="ep2__content">
            <span className="ep-eyebrow ep-eyebrow--invert">Get started in minutes</span>
            <h2 className="ep-h2 ep-h2--invert">
              Build your profile,<br />get matched to <em>quests.</em>
            </h2>
            <p className="ep-lede ep-lede--invert">
              It&apos;s free and takes less than a minute to sign up.
            </p>
            <a href="/signup" className="ep-btn ep-btn--coral">Become a Hero</a>
          </div>
          <div className="ep2__media">
            <PhoneProfile tone="ink" />
          </div>
        </div>
      </section>

      {/* ───────── Variation 3 — Quick steps ───────── */}
      <span className="eplabel">Variation 3 — Three quick steps</span>
      <section className="ep-wrap">
        <div className="ep3">
          <div className="ep3__content">
            <h2 className="ep-h2">
              Set up once,<br />start earning fast.
            </h2>
            <ol className="ep3__steps">
              <li><span className="ep3__num">1</span><div><b>Sign up free</b><small>Less than a minute, no fees.</small></div></li>
              <li><span className="ep3__num">2</span><div><b>Build your profile</b><small>Add your skills, area and rates.</small></div></li>
              <li><span className="ep3__num">3</span><div><b>Browse &amp; get matched</b><small>Pick quests or get them sent to you.</small></div></li>
            </ol>
            <a href="/signup" className="ep-btn ep-btn--coral">Become a Hero</a>
          </div>
          <div className="ep3__media">
            <PhoneProfile tone="coral" />
          </div>
        </div>
      </section>

      {/* ───────── Variation 4 — Coral gradient bold ───────── */}
      <span className="eplabel">Variation 4 — Coral gradient</span>
      <section className="ep-wrap">
        <div className="ep4">
          <div className="ep4__content">
            <h2 className="ep-h2 ep-h2--invert">
              Your profile is your<br />ticket to real work.
            </h2>
            <p className="ep-lede ep-lede--onCoral">
              It&apos;s free and takes less than a minute to sign up.
            </p>
            <a href="/signup" className="ep-btn ep-btn--light">Become a Hero</a>
          </div>
          <div className="ep4__media">
            <span className="ep4__halo" aria-hidden="true" />
            <PhoneProfile tone="gradient" />
          </div>
        </div>
      </section>

      {/* ───────── Variation 5 — Dual screen (profile + browse) ───────── */}
      <span className="eplabel">Variation 5 — Dual screen</span>
      <section className="ep-wrap">
        <div className="ep5">
          <div className="ep5__content">
            <h2 className="ep-h2">
              One profile, a whole<br />board of quests.
            </h2>
            <p className="ep-lede">
              It&apos;s free and takes less than a minute to sign up.
            </p>
            <a href="/signup" className="ep-btn ep-btn--coral">Become a Hero</a>
          </div>
          <div className="ep5__media">
            {/* back screen — quest list */}
            <div className="epphone epphone--mini ep5__back" aria-hidden="true">
              <div className="ep5__list-head">Quests near you</div>
              {[
                { t: 'Help move a 1-bed flat', m: '2.1 mi · today', p: '$120' },
                { t: 'Deliver flowers downtown', m: '0.8 mi · 5pm', p: '$45' },
                { t: 'Set up event chairs', m: '3.4 mi · Sat', p: '$90' },
              ].map((q) => (
                <div className="ep5__row" key={q.t}>
                  <div><b>{q.t}</b><small>{q.m}</small></div>
                  <span className="ep5__pay">{q.p}</span>
                </div>
              ))}
            </div>
            {/* front screen — profile */}
            <div className="ep5__front">
              <PhoneProfile tone="coral" />
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: '80px' }} />
    </>
  );
}
