"use client";

import { useMemo, useRef, useState } from "react";
import BountyTopBar from "@/components/bounties/BountyTopBar";
import { MetaItem, PriceTag, initials } from "@/components/bounties/parts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BOUNTIES, BOUNTY_CATEGORIES } from "@/lib/data/bounties-data";

// All filterable chips: the main categories + every sub-category present in
// the data (derived from unique categoryLabels), so the whole taxonomy shows.
const SUBCATS = Array.from(
  new Map(
    BOUNTIES.map((b) => [
      b.categoryLabel,
      { id: b.categoryLabel, label: b.categoryLabel, icon: b.categoryIcon },
    ])
  ).values()
);
const CHIPS = [...BOUNTY_CATEGORIES, ...SUBCATS];

// V1 — Refined feed. Body "Post a quest" CTA, full category taxonomy, 2-up
// grid of pared-back quest cards.
export default function BountiesV1() {
  const [cat, setCat] = useState("all");

  const list = useMemo(
    () =>
      cat === "all"
        ? BOUNTIES
        : BOUNTIES.filter((b) => b.category === cat || b.categoryLabel === cat),
    [cat]
  );

  const chipsRef = useRef<HTMLDivElement>(null);
  const scrollChips = (dir: 1 | -1) =>
    chipsRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <div className="q-bounties min-h-dvh bg-offwhite font-sans text-ink">
      <BountyTopBar active="Quests" showPost={false} />

      <main className="mx-auto max-w-[1320px] px-5 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight">
              Open quests
            </h1>
            <p className="mt-1 text-ink/65">
              Real-world work, posted by people near you. Pick one, apply, get
              paid.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-ink/55">{list.length} open</span>
            <Button variant="primary">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                add
              </span>
              Post a quest
            </Button>
          </div>
        </div>

        {/* Category + sub-category chips (the only filter), with scroll arrows */}
        <div className="mt-6 flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollChips(-1)}
            aria-label="Scroll categories left"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink/55 transition-colors hover:bg-ink/[0.06] hover:text-ink"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              chevron_left
            </span>
          </button>

          <div
            ref={chipsRef}
            className="flex flex-1 gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Quest category"
          >
            {CHIPS.map((c) => {
              const on = cat === c.id;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setCat(c.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all ${
                    on
                      ? "border-ink bg-ink text-white"
                      : "border-ink/15 bg-white text-ink/70 hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    {c.icon}
                  </span>
                  {c.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollChips(1)}
            aria-label="Scroll categories right"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink/55 transition-colors hover:bg-ink/[0.06] hover:text-ink"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              chevron_right
            </span>
          </button>
        </div>

        {/* Quests — 2-up grid, pared-back cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {list.map((b) => (
            <article
              key={b.id}
              className="group relative flex flex-col rounded-2xl border border-ink/[0.1] bg-white p-5 transition-all hover:border-ink/20 hover:shadow-lg hover:shadow-ink/[0.04]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[13px]">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px]">
                        {initials(b.poster.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-ink">{b.poster.name}</span>
                    <span className="text-ink/30" aria-hidden="true">·</span>
                    <span className="flex items-center gap-0.5 text-ink/55">
                      <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
                        location_on
                      </span>
                      {b.location}
                    </span>
                  </div>
                  <h2 className="mt-2.5 font-display text-lg font-bold leading-snug tracking-tight text-ink">
                    <a href="#" className="hover:underline underline-offset-2">
                      {b.title}
                    </a>
                  </h2>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink/65">
                    {b.description}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <PriceTag bounty={b} />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/[0.07] pt-3">
                <MetaItem icon="schedule">{b.duration}</MetaItem>
                <MetaItem icon="group">{b.applied} offered</MetaItem>
                {b.due && <MetaItem icon="event">due {b.due}</MetaItem>}
                <div className="ml-auto flex items-center gap-3">
                  <span className="text-[12px] text-ink/45">{b.postedAgo}</span>
                  <Button variant="secondary" size="sm">
                    Make offer
                  </Button>
                </div>
              </div>
            </article>
          ))}

          {list.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-ink/15 bg-white py-16 text-center">
              <p className="font-display text-lg font-bold">No quests match.</p>
              <p className="mt-1 text-sm text-ink/65">Try another category.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
