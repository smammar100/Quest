import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quest board redesign — pick a layout | Quest",
  description:
    "Six redesigned layouts of the logged-in Quest board, built with Tailwind + ShadCN on the Quest design system. Neutral, WCAG-AA.",
};

const VERSIONS = [
  {
    id: "v1",
    name: "Refined feed",
    blurb:
      "Calm single-column feed. Category chips, sort tabs, generous cards, pay aligned right. Braintrust/Remote energy.",
  },
  {
    id: "v2",
    name: "Marketplace grid",
    blurb:
      "Sidebar filters + a responsive grid of quest cards. Dense and scannable. Faire/Klarna energy.",
  },
  {
    id: "v3",
    name: "Split board",
    blurb:
      "Two-pane workspace: scrollable quest list on the left, a sticky live detail panel on the right. Airtasker energy.",
  },
  {
    id: "v4",
    name: "Quest table",
    blurb:
      "Dense, sortable data table — quest, pay, applied, posted. Built for scanning lots of quests fast. Linear/Attio energy.",
  },
  {
    id: "v5",
    name: "Grouped digest",
    blurb:
      "Browse-by-category home feed: a featured lead quest, then horizontal rails per category. Calm/Substack energy.",
  },
  {
    id: "v6",
    name: "Triage inbox",
    blurb:
      "Three-zone workspace: filter rail + dense quest list + reading pane. Power-user dense. Superhuman/Notion Mail energy.",
  },
];

export default function BountiesHub() {
  return (
    <main className="min-h-dvh bg-offwhite font-sans text-ink">
      <div className="mx-auto max-w-[1100px] px-5 py-16 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/55">
          Quest board · redesign prototypes
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          Pick the quest-board layout.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink/65">
          Six takes on the logged-in quest board, rebuilt with Tailwind + ShadCN
          on the Quest design system. Neutral UI, brand coral reserved for the
          single &ldquo;Post a quest&rdquo; action, WCAG-AA. Same Quest data,
          six layouts.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VERSIONS.map((v, i) => (
            <Link
              key={v.id}
              href={`/prototype/bounties/${v.id}`}
              className="group relative overflow-hidden rounded-3xl border border-ink/[0.1] bg-white p-6 transition-all hover:-translate-y-1 hover:border-ink/20 hover:shadow-xl hover:shadow-ink/5"
            >
              <span className="font-display text-sm font-bold text-ink/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-5 font-display text-xl font-bold tracking-tight">
                {v.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                {v.blurb}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ink">
                Open preview
                <span
                  className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/prototype"
          className="mt-12 inline-flex items-center gap-1 text-sm font-medium text-ink/55 hover:text-ink"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            arrow_back
          </span>
          All prototypes
        </Link>
      </div>
    </main>
  );
}
