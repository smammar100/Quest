import type { Bounty } from "@/lib/data/bounties-data";
import { cn } from "@/lib/utils";

// Neutral chrome helpers shared across all 6 quest-board versions.
// No per-category brand color-blocking — categories are identified by
// icon + neutral label. Muted text uses ink/65+ (≥4.5:1 on white) for WCAG.

export function MetaItem({
  icon,
  children,
  className,
}: {
  icon: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[13px] text-ink/65",
        className
      )}
    >
      <span
        className="material-symbols-outlined text-[16px] leading-none"
        aria-hidden="true"
      >
        {icon}
      </span>
      {children}
    </span>
  );
}

// Currency prefix derived from the quest's location — "$" alone is ambiguous
// (US$ / AU$ / C$ / S$ …). Falls back to US$.
export function currencyFor(location: string) {
  if (location.includes("Toronto")) return "C$";
  if (location.includes("Singapore")) return "S$";
  if (location.includes(", AU")) return "AU$";
  if (location.includes(", UK")) return "£";
  if (location.includes(", DE")) return "€";
  return "US$";
}

// Pay shown in ink, large + bold. Currency is location-aware; non-hourly
// quests are labelled "negotiable".
export function PriceTag({
  bounty,
  size = "default",
}: {
  bounty: Bounty;
  size?: "default" | "lg";
}) {
  return (
    <div className="text-right leading-none">
      <span
        className={cn(
          "font-display font-extrabold tracking-tight text-ink",
          size === "lg" ? "text-3xl" : "text-2xl"
        )}
      >
        {currencyFor(bounty.location)}
        {bounty.price}
      </span>
      {bounty.rate === "fixed" && (
        <div className="mt-0.5 text-[12px] font-medium text-ink/55">
          negotiable
        </div>
      )}
    </div>
  );
}

// Small neutral pill for the category label.
export function CategoryPill({
  icon,
  label,
  className,
}: {
  icon: string;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md bg-ink/[0.05] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink/70",
        className
      )}
    >
      <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
        {icon}
      </span>
      {label}
    </span>
  );
}

export function SecuredBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
      <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
        verified_user
      </span>
      Funds held
    </span>
  );
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
