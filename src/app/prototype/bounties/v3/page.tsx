"use client";

import { useMemo, useState } from "react";
import BountyTopBar from "@/components/bounties/BountyTopBar";
import {
  CategoryPill,
  MetaItem,
  SecuredBadge,
  initials,
} from "@/components/bounties/parts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  BOUNTIES,
  BOUNTY_CATEGORIES,
  type Bounty,
} from "@/lib/data/bounties-data";

// V3 — Split board (Airtasker). Scrollable quest list + sticky detail pane.
// Neutral selection (ink), neutral detail header. Coral only in top bar.
export default function BountiesV3() {
  const [cat, setCat] = useState("all");
  const [activeId, setActiveId] = useState(BOUNTIES[0].id);

  const list = useMemo(
    () => BOUNTIES.filter((b) => (cat === "all" ? true : b.category === cat)),
    [cat]
  );

  const active = list.find((b) => b.id === activeId) ?? list[0] ?? BOUNTIES[0];

  return (
    <div className="q-bounties flex h-dvh flex-col bg-offwhite font-sans text-ink">
      <BountyTopBar active="Quests" />

      {/* Category bar */}
      <div className="border-b border-ink/[0.08] bg-white">
        <div
          className="mx-auto flex max-w-[1320px] items-center gap-2 overflow-x-auto px-5 py-3 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Quest category"
        >
          {BOUNTY_CATEGORIES.map((c) => {
            const on = cat === c.id;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={on}
                onClick={() => setCat(c.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-all ${
                  on
                    ? "border-ink bg-ink text-white"
                    : "border-ink/[0.12] bg-white text-ink/65 hover:border-ink/30 hover:text-ink"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  {c.icon}
                </span>
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Two-pane workspace */}
      <div className="mx-auto grid w-full max-w-[1320px] flex-1 grid-cols-1 gap-0 overflow-hidden px-5 lg:grid-cols-[420px_1fr] lg:gap-6 lg:px-8 lg:py-6">
        {/* Left: scrollable list */}
        <div className="flex min-h-0 flex-col">
          <div className="flex items-center justify-between py-3">
            <h1 className="font-display text-lg font-extrabold tracking-tight">
              Open quests
            </h1>
            <span className="text-[13px] text-ink/55">{list.length} open</span>
          </div>
          <div className="-mx-1 flex-1 space-y-2 overflow-y-auto px-1 pb-6 [scrollbar-width:thin]">
            {list.map((b) => {
              const on = b.id === active.id;
              return (
                <button
                  key={b.id}
                  onClick={() => setActiveId(b.id)}
                  aria-pressed={on}
                  className={`relative block w-full overflow-hidden rounded-xl border bg-white p-4 text-left transition-all ${
                    on
                      ? "border-ink ring-1 ring-ink shadow-sm"
                      : "border-ink/[0.1] hover:border-ink/25 hover:shadow-sm"
                  }`}
                >
                  <span
                    className={`absolute inset-y-0 left-0 w-1 bg-ink ${
                      on ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <CategoryPill icon={b.categoryIcon} label={b.categoryLabel} />
                    <span className="font-display text-lg font-extrabold tracking-tight text-ink">
                      ${b.price}
                      <span className="text-[11px] font-medium text-ink/45">
                        {b.rate === "hr" ? "/hr" : ""}
                      </span>
                    </span>
                  </div>
                  <h2 className="mt-2 line-clamp-2 font-display text-[15px] font-bold leading-snug tracking-tight">
                    {b.title}
                  </h2>
                  <div className="mt-2.5 flex items-center gap-3">
                    <MetaItem icon="location_on">
                      {b.location.split(",")[0]}
                    </MetaItem>
                    <MetaItem icon="group">{b.applied}</MetaItem>
                    <span className="ml-auto text-[12px] text-ink/45">
                      {b.postedAgo}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: sticky detail panel */}
        <div className="hidden min-h-0 lg:block">
          <DetailPanel bounty={active} />
        </div>
      </div>
    </div>
  );
}

function DetailPanel({ bounty: b }: { bounty: Bounty }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink/[0.1] bg-white">
      {/* neutral ink header */}
      <div className="relative bg-ink px-7 py-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CategoryPill
                icon={b.categoryIcon}
                label={b.categoryLabel}
                className="bg-white/15 text-white"
              />
              {b.featured && (
                <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink">
                  Featured
                </span>
              )}
            </div>
            <h2 className="mt-3 max-w-lg font-display text-2xl font-extrabold leading-tight tracking-tight text-white">
              {b.title}
            </h2>
          </div>
          <div className="shrink-0 rounded-xl bg-white px-4 py-3 text-right">
            <div className="font-display text-3xl font-extrabold tracking-tight text-ink">
              ${b.price}
            </div>
            <div className="text-[12px] font-medium text-ink/55">
              {b.rate === "hr" ? "per hour" : "fixed price"}
            </div>
          </div>
        </div>
      </div>

      {/* scrollable body */}
      <div className="flex-1 overflow-y-auto px-7 py-6 [scrollbar-width:thin]">
        <div className="flex flex-wrap items-center gap-2">
          {b.fundsSecured && <SecuredBadge />}
          {b.recurring && (
            <span className="inline-flex items-center gap-1 rounded-md bg-ink/[0.05] px-2 py-0.5 text-[11px] font-semibold text-ink/70">
              <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
                repeat
              </span>
              Recurring
            </span>
          )}
          {b.due && (
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
              <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
                event
              </span>
              due {b.due}
            </span>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <MetaCard icon="location_on" label="Location">
            {b.location}
          </MetaCard>
          <MetaCard icon="schedule" label="Est. time">
            {b.duration}
          </MetaCard>
          <MetaCard icon="group" label="Applicants">
            {b.applied} applied
          </MetaCard>
          <MetaCard icon="history" label="Posted">
            {b.postedAgo}
          </MetaCard>
        </div>

        <h3 className="mt-6 font-display text-sm font-bold uppercase tracking-wide text-ink/55">
          Description
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
          {b.description}
        </p>

        <h3 className="mt-6 font-display text-sm font-bold uppercase tracking-wide text-ink/55">
          Skills &amp; tags
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {b.tags.map((t) => (
            <span
              key={t}
              className="rounded-lg bg-ink/[0.05] px-2.5 py-1 text-[13px] font-medium text-ink/70"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-xl bg-ink/[0.03] p-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{initials(b.poster.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-[12px] text-ink/55">Posted by</p>
            <p className="font-semibold text-ink">{b.poster.name}</p>
          </div>
        </div>
      </div>

      {/* sticky footer actions */}
      <div className="flex items-center gap-3 border-t border-ink/[0.1] px-7 py-4">
        <Button variant="secondary" size="lg" className="flex-1">
          Apply for this quest
        </Button>
        <Button variant="outline" size="icon" className="h-12 w-12" aria-label="Save quest">
          <span className="material-symbols-outlined" aria-hidden="true">
            bookmark
          </span>
        </Button>
        <Button variant="outline" size="icon" className="h-12 w-12" aria-label="Share quest">
          <span className="material-symbols-outlined" aria-hidden="true">
            share
          </span>
        </Button>
      </div>
    </div>
  );
}

function MetaCard({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-ink/[0.08] bg-white p-3">
      <div className="flex items-center gap-1.5 text-[12px] font-medium text-ink/55">
        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
          {icon}
        </span>
        {label}
      </div>
      <p className="mt-1 text-sm font-semibold text-ink">{children}</p>
    </div>
  );
}
