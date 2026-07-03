import { BLOG_POSTS, CATEGORY_ACCENT, accentFor, type BlogPost } from '../../../lib/data/blog-posts';

/* Floating variation switcher — present on every /prototype/blog page */
export function VariantSwitcher({ active }: { active: number }) {
  return (
    <nav
      className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-ink px-2 py-1.5 shadow-lg"
      aria-label="Blog page variations"
    >
      <a
        href="/prototype/blog"
        className="rounded-full px-3 py-1.5 font-sans text-xs font-semibold text-white/70 hover:text-white"
      >
        Lab
      </a>
      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
        <a
          key={n}
          href={`/prototype/blog/v${n}`}
          className={`rounded-full px-3 py-1.5 font-sans text-xs font-semibold transition-colors ${
            n === active ? 'bg-coral text-white' : 'text-white/70 hover:text-white'
          }`}
        >
          V{n}
        </a>
      ))}
    </nav>
  );
}

export function Chip({ post, small = false }: { post: BlogPost; small?: boolean }) {
  const accent = accentFor(post);
  return (
    <span
      className={`inline-block rounded-full font-sans font-semibold ${accent.bg} ${accent.text} ${
        small ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'
      }`}
    >
      {post.category}
    </span>
  );
}

export function ReadTime({ post, className = 'text-midgrey' }: { post: BlogPost; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 font-sans text-xs ${className}`}>
      <span className="material-symbols-outlined !text-[15px] leading-none" aria-hidden="true">
        schedule
      </span>
      {post.read}
    </span>
  );
}

/* Photo cover with flat palette block behind it (fallback while loading / on 404) */
export function Cover({ post, className = '' }: { post: BlogPost; className?: string }) {
  const accent = accentFor(post);
  return (
    <div className={`overflow-hidden ${accent.bg} ${className}`}>
      <img
        src={post.img}
        alt={post.alt}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/* Standard card used by V1/V2 grids (same DNA as the homepage #blog card) */
export function PostCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-quest-lg bg-[#f2ecdf] transition-transform duration-200 hover:-translate-y-1"
    >
      <Cover post={post} className="aspect-[3/2] w-full" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-3">
          <Chip post={post} />
          <span className="font-sans text-xs text-midgrey">{post.date}</span>
          <span className="ml-auto">
            <ReadTime post={post} />
          </span>
        </div>
        <h3 className="font-display text-xl font-bold leading-snug text-ink group-hover:text-coral">
          {post.title}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-midgrey">{post.excerpt}</p>
      </div>
    </a>
  );
}

export function PageHero({
  kicker = 'Blog & News',
  title,
  lede,
}: {
  kicker?: string;
  title: string;
  lede: string;
}) {
  return (
    // top padding clears the fixed header (same clamp as #biz-hero / #earn-hero);
    // side gutters use --page-pad so edges line up with the landing page
    <div className="w-full px-[var(--page-pad)] pb-12 pt-[clamp(96px,11vw,132px)] text-center">
      {kicker && (
        <p className="font-sans text-sm font-semibold uppercase tracking-widest text-coral">
          {kicker}
        </p>
      )}
      <h1 className="mx-auto mt-3 w-full max-w-3xl font-display text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">
        {title}
      </h1>
      <p className="mx-auto mt-4 max-w-xl font-sans text-lg text-midgrey">{lede}</p>
    </div>
  );
}

export function NewsletterBlock({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`rounded-quest-lg p-8 sm:p-10 ${dark ? 'bg-ink' : 'bg-[#f2ecdf]'}`}
    >
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3
            className={`font-display text-2xl font-extrabold ${dark ? 'text-white' : 'text-ink'}`}
          >
            The dispatch, monthly.
          </h3>
          <p className={`mt-1 font-sans text-sm ${dark ? 'text-white/60' : 'text-midgrey'}`}>
            Hero stories, product news, and field notes. No spam, ever.
          </p>
        </div>
        <form className="flex w-full max-w-md gap-2" action="#">
          <input
            type="email"
            placeholder="you@work.com"
            className={`min-w-0 flex-1 rounded-full px-5 py-3 font-sans text-sm outline-none ${
              dark ? 'bg-white/10 text-white placeholder:text-white/40' : 'bg-white text-ink'
            }`}
          />
          <button
            type="button"
            className="shrink-0 rounded-full bg-coral-cta px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-coral-cta-hover"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export { BLOG_POSTS, CATEGORY_ACCENT };
export type { BlogPost };
