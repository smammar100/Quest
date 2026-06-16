"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Account avatar + dropdown for the dashboard top bar. Avatar + chevron only
// (no "Me" label). Opening reveals a menu with "Log out", which returns the
// user to the landing page.
export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="flex items-center gap-1 rounded-full py-1 pl-1 pr-1.5 text-ink/70 transition-colors hover:bg-ink/[0.05] hover:text-ink"
      >
        <Avatar className="h-8 w-8 ring-1 ring-ink/10">
          <AvatarFallback className="bg-ink text-[12px] text-white">A</AvatarFallback>
        </Avatar>
        <span
          className={`material-symbols-outlined text-[18px] leading-none transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          keyboard_arrow_down
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] w-44 overflow-hidden rounded-xl border border-ink/[0.1] bg-white py-1 shadow-lg shadow-ink/[0.08]"
        >
          <Link
            role="menuitem"
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-ink/80 transition-colors hover:bg-ink/[0.04] hover:text-ink"
            onClick={() => setOpen(false)}
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              logout
            </span>
            Log out
          </Link>
        </div>
      )}
    </div>
  );
}
