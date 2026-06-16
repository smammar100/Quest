"use client";

import { useMemo, useState } from "react";
import BountyTopBar from "@/components/browse/BountyTopBar";
import { CategoryPill } from "@/components/browse/parts";
import { Button } from "@/components/ui/button";
import { BOUNTIES, BOUNTY_CATEGORIES } from "@/lib/data/bounties-data";

// V4 — Quest table (Retool / Attio / Clay / Linear). A dense, scannable
// data table. Neutral chrome throughout; brand coral lives only in the
// top bar's "Post a quest" CTA.

type SortKey = "newest" | "pay" | "applied";
type SortDir = "asc" | "desc";

// Map postedAgo to a rough recency rank for "newest" sorting (lower = newer).
function recency(postedAgo: string) {
  const m = postedAgo.match(/(\d+)\s*([a-z]+)/i);
  if (!m) return Number.MAX_SAFE_INTEGER;
  const n = Number(m[1]);
  const unit = m[2].toLowerCase();
  const mult = unit.startsWith("h") ? 1 : unit.startsWith("d") ? 24 : 0.5;
  return n * mult;
}

export default function BountiesV4() {
  const [cat, setCat] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("newest");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const list = useMemo(() => {
    const l = BOUNTIES.filter((b) =>
      cat === "all" ? true : b.category === cat
    );
    const sorted = [...l].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "pay") cmp = a.price - b.price;
      else if (sortKey === "applied") cmp = a.applied - b.applied;
      else cmp = recency(a.postedAgo) - recency(b.postedAgo);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return sorted;
  }, [cat, sortKey, sortDir]);

  // Newest defaults to ascending recency (newest first). Pay/applied default
  // to descending (highest first) the first time you click them.
  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "newest" ? "asc" : "desc");
    }
  }

  function ariaSort(key: SortKey): "ascending" | "descending" | "none" {
    if (key !== sortKey) return "none";
    return sortDir === "asc" ? "ascending" : "descending";
  }

  function SortHeader({
    label,
    sortKey: key,
    align = "left",
  }: {
    label: string;
    sortKey: SortKey;
    align?: "left" | "right";
  }) {
    const active = key === sortKey;
    return (
      <button
        type="button"
        onClick={() => toggleSort(key)}
        className={`group inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-wide transition-colors ${
          align === "right" ? "flex-row-reverse" : ""
        } ${active ? "text-ink" : "text-ink/65 hover:text-ink"}`}
      >
        {label}
        <span
          className={`material-symbols-outlined text-[16px] transition-opacity ${
            active ? "opacity-100" : "opacity-0 group-hover:opacity-40"
          }`}
          aria-hidden="true"
        >
          {sortDir === "asc" ? "arrow_upward" : "arrow_downward"}
        </span>
      </button>
    );
  }

  return (
    <div className="q-bounties min-h-dvh bg-offwhite font-sans text-ink">
      <BountyTopBar active="Quests" />

      <main className="mx-auto max-w-[1100px] px-5 py-8 lg:py-10">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight">
              Open quests
            </h1>
            <p className="mt-1 text-ink/65">
              Every open quest, in one scannable table. Sort, filter, apply.
            </p>
          </div>
          <span className="text-sm font-medium text-ink/65">
            {list.length} open
          </span>
        </div>

        {/* Category tab rail */}
        <div
          className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all ${
                  on
                    ? "border-ink bg-ink text-white"
                    : "border-ink/15 bg-white text-ink/70 hover:border-ink/30 hover:text-ink"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  aria-hidden="true"
                >
                  {c.icon}
                </span>
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Table card */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-ink/[0.1] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink/[0.1] bg-ink/[0.015]">
                  <th
                    scope="col"
                    className="px-5 py-3 text-[12px] font-semibold uppercase tracking-wide text-ink/65"
                  >
                    Quest
                  </th>
                  <th
                    scope="col"
                    aria-sort={ariaSort("pay")}
                    className="px-5 py-3 text-right"
                  >
                    <SortHeader label="Pay" sortKey="pay" align="right" />
                  </th>
                  <th
                    scope="col"
                    aria-sort={ariaSort("applied")}
                    className="px-5 py-3 text-right"
                  >
                    <SortHeader
                      label="Applied"
                      sortKey="applied"
                      align="right"
                    />
                  </th>
                  <th
                    scope="col"
                    aria-sort={ariaSort("newest")}
                    className="px-5 py-3 text-right"
                  >
                    <SortHeader
                      label="Posted"
                      sortKey="newest"
                      align="right"
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-right text-[12px] font-semibold uppercase tracking-wide text-ink/65"
                  >
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/[0.07]">
                {list.map((b) => (
                  <tr
                    key={b.id}
                    className="transition-colors hover:bg-ink/[0.03]"
                  >
                    {/* Quest */}
                    <td className="px-5 py-4 align-top">
                      <a
                        href="#"
                        className="font-display text-[15px] font-semibold leading-snug tracking-tight text-ink hover:underline underline-offset-2"
                      >
                        {b.title}
                      </a>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <CategoryPill
                          icon={b.categoryIcon}
                          label={b.categoryLabel}
                        />
                        <span className="inline-flex items-center gap-1 text-[12px] text-ink/65">
                          <span
                            className="material-symbols-outlined text-[14px] leading-none"
                            aria-hidden="true"
                          >
                            location_on
                          </span>
                          {b.location}
                        </span>
                      </div>
                    </td>

                    {/* Pay */}
                    <td className="whitespace-nowrap px-5 py-4 text-right align-top">
                      <span className="font-display text-[15px] font-bold tracking-tight text-ink">
                        ${b.price}
                      </span>
                      <span className="ml-0.5 text-[12px] font-medium text-ink/65">
                        {b.rate === "hr" ? "/hr" : "fixed"}
                      </span>
                    </td>

                    {/* Applied */}
                    <td className="whitespace-nowrap px-5 py-4 text-right align-top text-[14px] font-medium text-ink/75 tabular-nums">
                      {b.applied}
                    </td>

                    {/* Posted */}
                    <td className="whitespace-nowrap px-5 py-4 text-right align-top text-[13px] text-ink/65">
                      {b.postedAgo}
                    </td>

                    {/* Action */}
                    <td className="whitespace-nowrap px-5 py-4 text-right align-top">
                      <Button variant="secondary" size="sm">
                        Apply
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {list.length === 0 && (
            <div className="border-t border-ink/[0.07] py-16 text-center">
              <p className="font-display text-lg font-bold">No quests match.</p>
              <p className="mt-1 text-sm text-ink/65">
                Try another category.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
