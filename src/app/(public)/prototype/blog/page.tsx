import type { Metadata } from 'next';
import { VariantSwitcher } from '../../../../components/prototype/blog/shared';

export const metadata: Metadata = {
  title: 'Lab · Blog page variations',
  robots: { index: false, follow: false },
};

const VARIANTS = [
  {
    n: 1,
    name: 'Clean grid',
    color: 'bg-sky',
    text: 'text-ink',
    desc: 'The baseline. Page hero + 3-up card grid, same card DNA as the homepage section. (ref: Contra)',
  },
  {
    n: 2,
    name: 'Featured + filters',
    color: 'bg-lime',
    text: 'text-ink',
    desc: 'V1 plus a split featured story and working category filter pills. (ref: Contra, full page)',
  },
  {
    n: 3,
    name: 'Editorial split',
    color: 'bg-marigold',
    text: 'text-ink',
    desc: 'V2 plus a newspaper front page: featured + most-popular rail, category sections, newsletter. (ref: Substack / WSJ)',
  },
  {
    n: 4,
    name: 'Color-block magazine',
    color: 'bg-violet',
    text: 'text-white',
    desc: 'The most Quest-native take — typographic tiles across the full palette, photos only where they earn it. (ref: Kickstarter × our #bento)',
  },
  {
    n: 5,
    name: 'The newsroom',
    color: 'bg-coral',
    text: 'text-white',
    desc: 'Everything that worked in V1–V4 in one page: color-block hero, popular rail, working filters, newsletter. The definitive candidate.',
  },
  {
    n: 6,
    name: 'Contree remix',
    color: 'bg-electric',
    text: 'text-white',
    desc: 'The Contree template (UI8 / Unpixel, from Figma) rebuilt in Quest branding: recent-posts split, tabbed archive, gradient CTA banner.',
  },
  {
    n: 7,
    name: 'Canlife remix',
    color: 'bg-ink',
    text: 'text-white',
    desc: 'The Canlife insurance-kit blog body (from Figma) in Quest branding: centered display headline, working pill search, trending-topic pills, big-radius grid, "See more" reveal.',
  },
];

export default function BlogLabHub() {
  return (
    <main className="min-h-screen w-full bg-white pb-32 font-sans">
      <div className="mx-auto w-full max-w-5xl px-6 pt-16">
        <p className="font-sans text-sm font-semibold uppercase tracking-widest text-coral">
          Lab / Prototype
        </p>
        <h1 className="mt-2 w-full font-display text-4xl font-extrabold tracking-tight text-ink sm:text-6xl">
          Blog &amp; News page
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-lg text-midgrey">
          Five full-page variations, each building on the previous one. Same mock content
          everywhere so the layouts compare fairly. Use the floating switcher to flip between
          them on any page.
        </p>

        <div className="mt-12 flex flex-col gap-5">
          {VARIANTS.map((v) => (
            <a
              key={v.n}
              href={`/prototype/blog/v${v.n}`}
              className={`group grid items-center gap-6 rounded-quest-lg p-7 transition-transform duration-200 hover:-translate-y-0.5 sm:grid-cols-[auto_1fr_auto] ${v.color}`}
            >
              <span className={`font-display text-4xl font-extrabold ${v.text}`}>V{v.n}</span>
              <div>
                <h2 className={`font-display text-2xl font-extrabold ${v.text}`}>{v.name}</h2>
                <p
                  className={`mt-1 font-sans text-sm leading-relaxed ${
                    v.text === 'text-white' ? 'text-white/80' : 'text-ink/70'
                  }`}
                >
                  {v.desc}
                </p>
              </div>
              <span className={`hidden font-sans text-2xl sm:block ${v.text}`}>→</span>
            </a>
          ))}
        </div>
      </div>
      <VariantSwitcher active={0} />
    </main>
  );
}
