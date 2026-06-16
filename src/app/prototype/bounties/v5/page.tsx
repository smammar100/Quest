"use client";

import { useMemo } from "react";
import BountyTopBar from "@/components/browse/BountyTopBar";
import {
  CategoryPill,
  MetaItem,
  PriceTag,
  SecuredBadge,
  initials,
} from "@/components/browse/parts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  BOUNTIES,
  BOUNTY_CATEGORIES,
  type Bounty,
} from "@/lib/data/bounties-data";

// V5 — Grouped digest (Calm / Substack / Givingli section rails). A
// magazine browse-by-category home feed: one featured hero band, then a
// horizontal-scroll rail per category. Neutral chrome throughout — brand
// coral lives only in the top bar's "Post a quest". Green SecuredBadge is
// the only non-neutral accent allowed on the body.
export default function BountiesV5() {
  const featured = useMemo(() => BOUNTIES.find((b) => b.featured), []);

  const sections = useMemo(
    () =>
      BOUNTY_CATEGORIES.filter((c) => c.id !== "all")
        .map((c) => ({
          category: c,
          items: BOUNTIES.filter((b) => b.category === c.id),
        }))
        .filter((s) => s.items.length > 0),
    []
  );

  return (
    <div className="q-bounties min-h-dvh bg-offwhite font-sans text-ink">
      <BountyTopBar active="Quests" />

      <main className="mx-auto max-w-[1080px] px-5 py-8 lg:py-10">
        {/* Heading */}
        <header>
          <h1 className="font-display text-3xl font-extrabold tracking-tight">
            Open quests
          </h1>
          <p className="mt-1 max-w-2xl text-ink/65">
            Browse real-world work by category. Featured picks up top, then a
            rail for every kind of quest — scroll each row to see what Heroes
            are taking on near you.
          </p>
        </header>

        {/* Featured quest band */}
        {featured && (
          <section className="mt-8" aria-labelledby="featured-heading">
            <div className="mb-3 flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[18px] text-ink/70"
                aria-hidden="true"
              >
                star
              </span>
              <h2
                id="featured-heading"
                className="font-display text-sm font-bold uppercase tracking-wide text-ink/70"
              >
                Featured quest
              </h2>
            </div>

            <article className="overflow-hidden rounded-3xl border border-ink/[0.1] bg-white">
              <div className="grid gap-0 md:grid-cols-[1.4fr_1fr]">
                <div className="p-7 lg:p-9">
                  <div className="flex flex-wrap items-center gap-2">
                    <CategoryPill
                      icon={featured.categoryIcon}
                      label={featured.categoryLabel}
                    />
                    {featured.fundsSecured && <SecuredBadge />}
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tight text-ink lg:text-3xl">
                    <a href="#" className="hover:underline underline-offset-2">
                      {featured.title}
                    </a>
                  </h3>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink/65">
                    {featured.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {featured.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-ink/[0.04] px-2 py-0.5 text-[12px] font-medium text-ink/65"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="text-[12px]">
                        {initials(featured.poster.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-[13px] text-ink/65">
                      Posted by{" "}
                      <span className="font-semibold text-ink">
                        {featured.poster.name}
                      </span>{" "}
                      · {featured.postedAgo}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-6 border-t border-ink/[0.08] bg-ink/[0.02] p-7 md:border-l md:border-t-0 lg:p-9">
                  <div>
                    <PriceTag bounty={featured} size="lg" />
                    <div className="mt-5 flex flex-col gap-2.5">
                      <MetaItem icon="location_on">
                        {featured.location}
                      </MetaItem>
                      <MetaItem icon="schedule">{featured.duration}</MetaItem>
                      <MetaItem icon="group">
                        {featured.applied} applied
                      </MetaItem>
                      {featured.due && (
                        <MetaItem icon="event">due {featured.due}</MetaItem>
                      )}
                    </div>
                  </div>
                  <Button variant="secondary" size="lg" className="w-full">
                    Apply
                  </Button>
                </div>
              </div>
            </article>
          </section>
        )}

        {/* One rail per category */}
        <div className="mt-12 space-y-12">
          {sections.map(({ category, items }) => (
            <section
              key={category.id}
              aria-labelledby={`section-${category.id}`}
            >
              {/* Section header */}
              <div className="flex items-end justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span
                    className="material-symbols-outlined mt-0.5 text-[26px] text-ink/75"
                    aria-hidden="true"
                  >
                    {category.icon}
                  </span>
                  <div>
                    <h2
                      id={`section-${category.id}`}
                      className="font-display text-xl font-extrabold tracking-tight text-ink"
                    >
                      {category.label}
                    </h2>
                    <p className="mt-0.5 text-sm text-ink/65">
                      {category.blurb}
                    </p>
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-ink/65 hover:text-ink"
                >
                  See all
                  <span
                    className="material-symbols-outlined text-[18px]"
                    aria-hidden="true"
                  >
                    arrow_forward
                  </span>
                </a>
              </div>

              {/* Horizontal scroll rail */}
              <div className="mt-4 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {items.map((b) => (
                  <RailCard key={b.id} bounty={b} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

// Compact quest card for the horizontal rails.
function RailCard({ bounty: b }: { bounty: Bounty }) {
  return (
    <article className="flex min-w-[300px] max-w-[300px] flex-col rounded-2xl border border-ink/[0.1] bg-white p-5 transition-all hover:border-ink/20 hover:shadow-lg hover:shadow-ink/[0.04]">
      <div className="flex items-center justify-between gap-2">
        <CategoryPill icon={b.categoryIcon} label={b.categoryLabel} />
        {b.recurring && (
          <span className="inline-flex items-center gap-1 rounded-md bg-ink/[0.05] px-2 py-0.5 text-[11px] font-semibold text-ink/70">
            <span
              className="material-symbols-outlined text-[13px]"
              aria-hidden="true"
            >
              repeat
            </span>
            Recurring
          </span>
        )}
      </div>

      <h3 className="mt-3 line-clamp-2 font-display text-base font-bold leading-snug tracking-tight text-ink">
        <a href="#" className="hover:underline underline-offset-2">
          {b.title}
        </a>
      </h3>

      <div className="mt-3 flex flex-col gap-1.5">
        <MetaItem icon="location_on">{b.location}</MetaItem>
        <MetaItem icon="group">{b.applied} applied</MetaItem>
      </div>

      {b.fundsSecured && (
        <div className="mt-3">
          <SecuredBadge />
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-ink/[0.07] pt-3">
        <span className="font-display text-lg font-extrabold tracking-tight text-ink">
          ${b.price}
          <span className="ml-0.5 text-[12px] font-medium text-ink/55">
            {b.rate === "hr" ? "/hr" : ""}
          </span>
        </span>
        <Button variant="secondary" size="sm">
          Apply
        </Button>
      </div>
    </article>
  );
}
