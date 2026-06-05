/* Flat SVG mini-illustrations, Quest palette — crafted spot art. */

// Avatar stack: overlapping circles, each a clean user silhouette (clipped).
function ArtPeople() {
  const av = [
    { x: 23, c: 'var(--coral)' },
    { x: 51, c: 'var(--electric)' },
    { x: 79, c: 'var(--violet)' },
    { x: 107, c: 'var(--marigold)' },
    { x: 135, c: 'var(--lime)' },
  ];
  return (
    <svg className="proof-art" viewBox="0 0 158 56" fill="none" aria-hidden="true">
      <defs>
        <clipPath id="qpAvatar"><circle cx="0" cy="0" r="20" /></clipPath>
      </defs>
      {av.map((a, i) => (
        <g key={i} transform={`translate(${a.x},28)`}>
          <circle cx="0" cy="0" r="23" fill="#fff" />
          <g clipPath="url(#qpAvatar)">
            <circle cx="0" cy="0" r="20" fill={a.c} />
            <circle cx="0" cy="-3" r="6.6" fill="#fff" />
            <ellipse cx="0" cy="19" rx="12.5" ry="12.5" fill="#fff" />
          </g>
        </g>
      ))}
    </svg>
  );
}

// Task-list app card: header + rows with checkboxes (two done), live badge.
function ArtQuests() {
  return (
    <svg className="proof-art" viewBox="0 0 116 100" fill="none" aria-hidden="true">
      <rect x="8" y="14" width="100" height="78" rx="14" fill="var(--violet)" opacity="0.22" />
      <rect x="14" y="8" width="100" height="78" rx="14" fill="#fff" />
      <rect x="26" y="20" width="34" height="7" rx="3.5" fill="var(--violet)" />
      <rect x="86" y="18" width="20" height="11" rx="5.5" fill="var(--coral)" />
      {[42, 58, 74].map((y, i) => {
        const done = i < 2;
        return (
          <g key={i}>
            <rect
              x="26" y={y - 8} width="16" height="16" rx="5"
              fill={done ? 'var(--lime)' : 'none'}
              stroke={done ? 'none' : 'var(--violet)'}
              strokeWidth="2" opacity={done ? 1 : 0.45}
            />
            {done && (
              <path d={`M30 ${y} l3 3 6-7`} stroke="var(--near-black)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            )}
            <rect x="50" y={y - 4} width={done ? 46 : 32} height="7" rx="3.5" fill="var(--violet)" opacity={done ? 0.22 : 0.4} />
          </g>
        );
      })}
    </svg>
  );
}

// Storefront: building + scalloped awning + door, windows, little tree.
function ArtBusinesses() {
  return (
    <svg className="proof-art" viewBox="0 0 118 96" fill="none" aria-hidden="true">
      {/* tree */}
      <rect x="98" y="64" width="5" height="22" rx="2" fill="var(--near-black)" opacity="0.25" />
      <circle cx="100.5" cy="58" r="13" fill="var(--lime)" />
      {/* building */}
      <rect x="12" y="36" width="78" height="52" rx="6" fill="#fff" />
      {/* awning + scalloped edge */}
      <path d="M8 36 v-3 a5 5 0 0 1 5-5 h76 a5 5 0 0 1 5 5 v3 z" fill="var(--coral)" />
      <path d="M8 36 h86 v4 q-7.2 7 -14.3 0 q-7.2 7 -14.3 0 q-7.2 7 -14.3 0 q-7.2 7 -14.3 0 q-7.2 7 -14.3 0 V36 z" fill="var(--coral)" />
      {/* sign */}
      <rect x="34" y="44" width="34" height="9" rx="4.5" fill="var(--marigold)" />
      {/* door */}
      <rect x="42" y="62" width="20" height="26" rx="3" fill="var(--electric)" />
      <circle cx="58" cy="76" r="1.6" fill="#fff" />
      {/* windows */}
      <rect x="20" y="62" width="15" height="15" rx="3" fill="var(--sky)" />
      <rect x="69" y="62" width="15" height="15" rx="3" fill="var(--sky)" />
    </svg>
  );
}

// Globe: sphere + continent blobs + grid lines + location pins.
function ArtCountries() {
  const pins = [
    { x: 40, y: 32 },
    { x: 62, y: 24 },
    { x: 70, y: 48 },
  ];
  return (
    <svg className="proof-art" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="50" cy="56" r="34" fill="var(--sky)" />
      <g clipPath="url(#qpGlobe)">
        <path d="M28 46 q9 -8 19 -3 q7 5 1 12 q-9 5 -17 0 q-7 -5 -3 -9 z" fill="var(--lime)" />
        <path d="M55 64 q11 -5 17 2 q4 6 -4 10 q-10 3 -15 -3 q-3 -6 2 -9 z" fill="var(--lime)" />
        <path d="M58 38 q6 -3 10 1 q2 4 -3 6 q-6 1 -8 -3 z" fill="var(--lime)" />
      </g>
      <defs><clipPath id="qpGlobe"><circle cx="50" cy="56" r="34" /></clipPath></defs>
      <ellipse cx="50" cy="56" rx="13" ry="34" stroke="#fff" strokeWidth="2" opacity="0.65" fill="none" />
      <line x1="16" y1="56" x2="84" y2="56" stroke="#fff" strokeWidth="2" opacity="0.65" />
      <path d="M22 42 q28 10 56 0" stroke="#fff" strokeWidth="2" opacity="0.65" fill="none" />
      <path d="M22 70 q28 10 56 0" stroke="#fff" strokeWidth="2" opacity="0.65" fill="none" />
      {pins.map((p, i) => (
        <g key={i} transform={`translate(${p.x},${p.y})`}>
          <ellipse cx="0" cy="20" rx="5" ry="2" fill="var(--near-black)" opacity="0.12" />
          <path d="M0 19 C-6 11 -8 7 -8 3 a8 8 0 1 1 16 0 c0 4 -2 8 -8 16 z" fill="var(--coral)" />
          <circle cx="0" cy="3" r="3.2" fill="#fff" />
        </g>
      ))}
    </svg>
  );
}

// Category tiles: rounded app-style tiles, each a simple white glyph.
function ArtCategories() {
  const tiles = [
    { c: 'var(--coral)', g: <rect x="-5" y="-5" width="10" height="10" rx="2.5" fill="#fff" /> },
    { c: 'var(--electric)', g: <circle r="5.5" fill="#fff" /> },
    { c: 'var(--lime)', g: <path d="M0 -6 L6 5 H-6 Z" fill="#fff" /> },
    { c: 'var(--violet)', g: <path d="M0 -6 V6 M-6 0 H6" stroke="#fff" strokeWidth="3" strokeLinecap="round" /> },
    { c: 'var(--marigold)', g: <path d="M0 -6 L1.8 -1.8 6 -1.8 2.6 1.2 4 6 0 3 -4 6 -2.6 1.2 -6 -1.8 -1.8 -1.8 Z" fill="#fff" /> },
    { c: 'var(--sky)', g: <path d="M-5 2 a5 5 0 1 1 10 0 z M0 -5 v7" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" /> },
  ];
  return (
    <svg className="proof-art" viewBox="0 0 100 72" fill="none" aria-hidden="true">
      {tiles.map((t, i) => {
        const cx = 18 + (i % 3) * 32;
        const cy = 18 + Math.floor(i / 3) * 36;
        return (
          <g key={i}>
            <rect x={cx - 14} y={cy - 14} width="28" height="28" rx="8" fill={t.c} />
            <g transform={`translate(${cx},${cy})`}>{t.g}</g>
          </g>
        );
      })}
    </svg>
  );
}

const CARDS = [
  { key: 'people', tint: 'coral', big: true, num: '750k+', label: 'people on Quest', Art: ArtPeople },
  { key: 'quests', tint: 'violet', num: '3,500+', label: 'quests every week', Art: ArtQuests },
  { key: 'biz', tint: 'lime', num: '600+', label: 'businesses served', Art: ArtBusinesses },
  { key: 'geo', tint: 'sky', num: '5', label: 'countries', sub: 'SG · PH · ID · MY · US', Art: ArtCountries },
  { key: 'cat', tint: 'marigold', num: '10+', label: 'task categories', sub: 'Moving · Events · Cleaning · Content · Errands', Art: ArtCategories },
];

export default function SocialProof() {
  return (
    <section id="proof">
      <div className="proof-hd">
        <h2 className="proof-title">5 years of real-world work.</h2>
        <p className="proof-lede">
          For the past 5 years, Quest has helped people and businesses get real tasks done
          through real humans. Now we&apos;re making that mission clearer than ever.
        </p>
      </div>

      <div className="proof-bento">
        {CARDS.map((c) => (
          <article
            key={c.key}
            className={`proof-card proof-card--${c.tint}${c.big ? ' proof-card--big' : ''}`}
          >
            <c.Art />
            <div className="proof-card__info">
              <span className="proof-card__num">{c.num}</span>
              <span className="proof-card__label">{c.label}</span>
              {c.sub && <span className="proof-card__sub">{c.sub}</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
