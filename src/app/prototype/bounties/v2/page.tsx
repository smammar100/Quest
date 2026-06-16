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
import { Input } from "@/components/ui/input";
import {
  BOUNTIES,
  BOUNTY_CATEGORIES,
  SORT_TABS,
} from "@/lib/data/bounties-data";

// V2 — Marketplace grid (Faire / Klarna). Sidebar filters + neutral card
// grid. No per-category color-blocking; coral only in the top-bar CTA.
export default function BountiesV2() {
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState<string>("newest");
  const [recurringOnly, setRecurringOnly] = useState(false);
  const [city, setCity] = useState("");
  const [securedOnly, setSecuredOnly] = useState(false);

  const list = useMemo(() => {
    let l = BOUNTIES.filter((b) => (cat === "all" ? true : b.category === cat));
    if (recurringOnly) l = l.filter((b) => b.recurring);
    if (securedOnly) l = l.filter((b) => b.fundsSecured);
    if (city.trim())
      l = l.filter((b) =>
        b.location.toLowerCase().includes(city.trim().toLowerCase())
      );
    if (sort === "top pay") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "ending soon")
      l = [...l].sort((a, b) => (b.due ? 1 : 0) - (a.due ? 1 : 0));
    return l;
  }, [cat, sort, recurringOnly, securedOnly, city]);

  return (
    <div className="q-bounties min-h-dvh bg-offwhite font-sans text-ink">
      <BountyTopBar active="Quests" />

      <main className="mx-auto max-w-[1320px] px-5 py-8 lg:px-8">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight">
            Open quests
          </h1>
          <p className="mt-1 text-ink/65">
            Browse {list.length} real-world quests open right now.
          </p>
        </div>

        <div className="mt-7 grid gap-7 lg:grid-cols-[248px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-ink/[0.1] bg-white p-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-ink/55">
                Category
              </p>
              <div className="mt-3 space-y-1">
                {BOUNTY_CATEGORIES.map((c) => {
                  const on = cat === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setCat(c.id)}
                      aria-pressed={on}
                      className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors ${
                        on ? "bg-ink text-white" : "text-ink/70 hover:bg-ink/[0.05]"
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        aria-hidden="true"
                      >
                        {c.icon}
                      </span>
                      <span className="text-sm font-medium">{c.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="my-5 h-px bg-ink/[0.08]" />

              <p className="text-[11px] font-bold uppercase tracking-wider text-ink/55">
                Location
              </p>
              <div className="relative mt-3">
                <span
                  className="material-symbols-outlined pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-ink/45"
                  aria-hidden="true"
                >
                  search
                </span>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City…"
                  aria-label="Filter by city"
                  className="h-9 pl-10 text-[13px]"
                />
              </div>

              <div className="my-5 h-px bg-ink/[0.08]" />

              <p className="text-[11px] font-bold uppercase tracking-wider text-ink/55">
                Filters
              </p>
              <label className="mt-3 flex cursor-pointer items-center justify-between">
                <span className="text-sm text-ink/70">Recurring only</span>
                <Toggle
                  on={recurringOnly}
                  onClick={() => setRecurringOnly((v) => !v)}
                  label="Recurring only"
                />
              </label>
              <label className="mt-3 flex cursor-pointer items-center justify-between">
                <span className="text-sm text-ink/70">Funds held</span>
                <Toggle
                  on={securedOnly}
                  onClick={() => setSecuredOnly((v) => !v)}
                  label="Funds held only"
                />
              </label>
            </div>
          </aside>

          {/* Grid */}
          <section>
            <div
              className="mb-4 flex w-fit items-center gap-1 rounded-full border border-ink/[0.1] bg-white p-1"
              role="tablist"
              aria-label="Sort quests"
            >
              {SORT_TABS.map((s) => (
                <button
                  key={s}
                  role="tab"
                  aria-selected={sort === s}
                  onClick={() => setSort(s)}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium capitalize transition-colors ${
                    sort === s
                      ? "bg-ink text-white"
                      : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((b) => (
                <article
                  key={b.id}
                  className="group flex flex-col rounded-2xl border border-ink/[0.1] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-lg hover:shadow-ink/[0.05]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <CategoryPill icon={b.categoryIcon} label={b.categoryLabel} />
                    {b.featured && (
                      <span className="rounded-md border border-ink/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink/70">
                        Featured
                      </span>
                    )}
                  </div>

                  <h2 className="mt-3 font-display text-base font-bold leading-snug tracking-tight">
                    <a href="#" className="hover:underline underline-offset-2">
                      {b.title}
                    </a>
                  </h2>
                  <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-ink/65">
                    {b.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {b.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-ink/[0.04] px-2 py-0.5 text-[11px] font-medium text-ink/65"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="font-display text-2xl font-extrabold tracking-tight text-ink">
                          ${b.price}
                        </span>
                        <span className="text-[12px] font-medium text-ink/55">
                          {b.rate === "hr" ? "/hr" : " fixed"}
                        </span>
                      </div>
                      {b.fundsSecured && <SecuredBadge />}
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-ink/[0.07] pt-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px]">
                            {initials(b.poster.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-[12px] text-ink/65">
                          {b.poster.name}
                        </span>
                      </div>
                      <MetaItem icon="location_on">
                        {b.location.split(",")[0]}
                      </MetaItem>
                    </div>

                    <Button variant="secondary" size="sm" className="mt-3 w-full">
                      Apply
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {list.length === 0 && (
              <div className="rounded-2xl border border-dashed border-ink/15 bg-white py-20 text-center">
                <p className="font-display text-lg font-bold">No quests match.</p>
                <p className="mt-1 text-sm text-ink/65">
                  Loosen the filters in the sidebar.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function Toggle({
  on,
  onClick,
  label,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`relative h-5 w-9 rounded-full transition-colors ${
        on ? "bg-ink" : "bg-ink/20"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-[18px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
