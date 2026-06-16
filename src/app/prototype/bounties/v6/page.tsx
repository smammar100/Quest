"use client";

import { useMemo, useState } from "react";
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
} from "@/lib/data/bounties-data";

// V6 — Triage inbox. A dense, email-like 3-zone workspace (Superhuman /
// Notion Mail / Intercom): left nav rail, middle compact list, right
// reading pane. Neutral throughout — brand coral lives only in the top
// bar's "Post a quest" CTA.
export default function BountiesV6() {
  const [cat, setCat] = useState("all");
  const [recurringOnly, setRecurringOnly] = useState(false);
  const [securedOnly, setSecuredOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string>(BOUNTIES[0].id);

  // Count of matching quests per category, honoring the two toggles.
  const baseFiltered = useMemo(() => {
    let l = BOUNTIES;
    if (recurringOnly) l = l.filter((b) => b.recurring);
    if (securedOnly) l = l.filter((b) => b.fundsSecured);
    return l;
  }, [recurringOnly, securedOnly]);

  const countFor = (id: string) =>
    id === "all"
      ? baseFiltered.length
      : baseFiltered.filter((b) => b.category === id).length;

  const list = useMemo(
    () =>
      baseFiltered.filter((b) =>
        cat === "all" ? true : b.category === cat
      ),
    [baseFiltered, cat]
  );

  const selected =
    list.find((b) => b.id === selectedId) ?? list[0] ?? null;

  return (
    <div className="q-bounties flex h-dvh flex-col bg-offwhite font-sans text-ink">
      <BountyTopBar active="Quests" />

      <div className="flex min-h-0 flex-1">
        {/* LEFT RAIL — email-style sidebar nav */}
        <nav
          aria-label="Filter quests"
          className="hidden w-[220px] shrink-0 flex-col overflow-y-auto bg-offwhite px-2 py-3 md:flex"
        >
          <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink/55">
            Categories
          </p>
          <ul className="space-y-0.5" role="list">
            {BOUNTY_CATEGORIES.map((c) => {
              const on = cat === c.id;
              const n = countFor(c.id);
              return (
                <li key={c.id}>
                  <button
                    aria-current={on ? "true" : undefined}
                    onClick={() => setCat(c.id)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                      on
                        ? "bg-ink/[0.06] font-semibold text-ink"
                        : "text-ink/70 hover:bg-ink/[0.04] hover:text-ink"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[18px] leading-none"
                      aria-hidden="true"
                    >
                      {c.icon}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{c.label}</span>
                    <span
                      className={`shrink-0 rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums ${
                        on ? "bg-ink/[0.08] text-ink/75" : "text-ink/50"
                      }`}
                    >
                      {n}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="my-3 h-px bg-ink/[0.08]" />

          <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink/55">
            Filters
          </p>
          <div className="space-y-0.5">
            <button
              aria-pressed={recurringOnly}
              onClick={() => setRecurringOnly((v) => !v)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                recurringOnly
                  ? "bg-ink/[0.06] font-semibold text-ink"
                  : "text-ink/70 hover:bg-ink/[0.04] hover:text-ink"
              }`}
            >
              <span
                className="material-symbols-outlined text-[18px] leading-none"
                aria-hidden="true"
              >
                repeat
              </span>
              <span className="flex-1">Recurring</span>
              {recurringOnly && (
                <span
                  className="material-symbols-outlined text-[16px] leading-none text-ink/60"
                  aria-hidden="true"
                >
                  check
                </span>
              )}
            </button>
            <button
              aria-pressed={securedOnly}
              onClick={() => setSecuredOnly((v) => !v)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                securedOnly
                  ? "bg-ink/[0.06] font-semibold text-ink"
                  : "text-ink/70 hover:bg-ink/[0.04] hover:text-ink"
              }`}
            >
              <span
                className="material-symbols-outlined text-[18px] leading-none"
                aria-hidden="true"
              >
                verified_user
              </span>
              <span className="flex-1">Funds held</span>
              {securedOnly && (
                <span
                  className="material-symbols-outlined text-[16px] leading-none text-ink/60"
                  aria-hidden="true"
                >
                  check
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* MIDDLE LIST — dense compact quest list */}
        <section
          aria-label="Quest list"
          className="flex w-full shrink-0 flex-col border-ink/[0.1] bg-white md:w-[360px] md:border-x"
        >
          <header className="flex items-center justify-between gap-2 border-b border-ink/[0.08] px-4 py-3">
            <h1 className="font-display text-base font-bold tracking-tight">
              Open quests
            </h1>
            <span className="text-[12px] font-medium text-ink/55 tabular-nums">
              {list.length} open
            </span>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {list.map((b) => {
              const on = selected?.id === b.id;
              return (
                <button
                  key={b.id}
                  aria-pressed={on}
                  onClick={() => setSelectedId(b.id)}
                  className={`relative block w-full border-b border-ink/[0.06] px-4 py-3 text-left transition-colors ${
                    on ? "bg-ink/[0.04]" : "hover:bg-ink/[0.02]"
                  }`}
                >
                  {on && (
                    <span
                      className="absolute inset-y-0 left-0 w-[3px] bg-ink"
                      aria-hidden="true"
                    />
                  )}
                  <div className="flex items-start justify-between gap-2">
                    <span className="truncate text-[14px] font-semibold text-ink">
                      {b.title}
                    </span>
                    <span className="shrink-0 text-[12px] font-semibold text-ink tabular-nums">
                      ${b.price}
                      {b.rate === "hr" && (
                        <span className="font-normal text-ink/55">/hr</span>
                      )}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 truncate text-[12px] text-ink/65">
                    <span className="shrink-0 font-medium text-ink/70">
                      {b.categoryLabel}
                    </span>
                    <span aria-hidden="true" className="text-ink/30">
                      ·
                    </span>
                    <span className="truncate">{b.location}</span>
                    <span aria-hidden="true" className="text-ink/30">
                      ·
                    </span>
                    <span className="shrink-0">{b.applied} applied</span>
                    <span aria-hidden="true" className="text-ink/30">
                      ·
                    </span>
                    <span className="shrink-0 text-ink/50">{b.postedAgo}</span>
                  </div>
                </button>
              );
            })}

            {list.length === 0 && (
              <div className="px-4 py-16 text-center">
                <p className="font-display text-base font-bold">
                  No quests match.
                </p>
                <p className="mt-1 text-[13px] text-ink/65">
                  Try turning off a filter in the sidebar.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT READING PANE — selected quest detail */}
        <section
          aria-label="Quest detail"
          className="hidden min-w-0 flex-1 flex-col bg-white md:flex"
        >
          {selected ? (
            <>
              <div className="min-h-0 flex-1 overflow-y-auto">
                {/* Neutral header */}
                <div className="border-b border-ink/[0.08] bg-ink/[0.02] px-8 py-6">
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <CategoryPill
                          icon={selected.categoryIcon}
                          label={selected.categoryLabel}
                        />
                        {selected.recurring && (
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
                        {selected.fundsSecured && <SecuredBadge />}
                      </div>
                      <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-ink">
                        {selected.title}
                      </h2>
                    </div>
                    <div className="shrink-0">
                      <PriceTag bounty={selected} size="lg" />
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="px-8 py-6">
                  {/* Meta grid */}
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
                    {[
                      { icon: "location_on", label: "Location", value: selected.location },
                      { icon: "schedule", label: "Time", value: selected.duration },
                      { icon: "group", label: "Applicants", value: `${selected.applied} applied` },
                      { icon: "history", label: "Posted", value: selected.postedAgo },
                    ].map((m) => (
                      <div key={m.label}>
                        <dt className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-ink/55">
                          <span
                            className="material-symbols-outlined text-[14px] leading-none"
                            aria-hidden="true"
                          >
                            {m.icon}
                          </span>
                          {m.label}
                        </dt>
                        <dd className="mt-1 text-[14px] font-medium text-ink">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {selected.due && (
                    <div className="mt-5">
                      <MetaItem icon="event">Due {selected.due}</MetaItem>
                    </div>
                  )}

                  <div className="my-6 h-px bg-ink/[0.08]" />

                  <h3 className="text-[12px] font-semibold uppercase tracking-wide text-ink/55">
                    About this quest
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
                    {selected.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {selected.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-ink/[0.04] px-2.5 py-1 text-[12px] font-medium text-ink/65"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="my-6 h-px bg-ink/[0.08]" />

                  {/* Poster */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="text-[13px]">
                        {initials(selected.poster.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-[12px] text-ink/55">Posted by</p>
                      <p className="text-[14px] font-semibold text-ink">
                        {selected.poster.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky bottom action bar */}
              <div className="flex items-center gap-2 border-t border-ink/[0.1] bg-white px-8 py-4">
                <Button variant="secondary" size="lg">
                  Apply for this quest
                </Button>
                <span className="ml-auto flex items-center gap-2">
                  <Button variant="outline" size="icon" aria-label="Save quest">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      aria-hidden="true"
                    >
                      bookmark
                    </span>
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Share quest">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      aria-hidden="true"
                    >
                      ios_share
                    </span>
                  </Button>
                </span>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-[14px] text-ink/55">
                Select a quest to view its details.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
