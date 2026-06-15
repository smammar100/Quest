"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TASK_TYPES } from "../../app/lib/quests-data";

// Shared fixed header (home + /quests pages). Section links are absolute
// ("/#bento") so they work from any route; ScrollFX smooth-scrolls them when
// already on the homepage. "Browse" opens an Airtasker-style mega panel:
// left = intent tabs (As a Hero / As a poster), right = dense task-type list.
type Intent = "hero" | "poster";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [intent, setIntent] = useState<Intent>("hero");
  const megaRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!megaRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <div className={`header-wrapper${menuOpen ? " has-mega-open" : ""}`}>
      <header>
        <a href="/" className="quest-logo" aria-label="Quest">
          <img
            className="quest-logo__img"
            src="/images/logos/Logo.svg"
            alt="Quest"
            width={80}
            height={30}
          />
        </a>

        <input className="menu-checkbox" type="checkbox" id="menu-checkbox" />
        <label className="menu-button" htmlFor="menu-checkbox">
          <span
            className="material-symbols-outlined not-sr-only"
            data-show-when="closed"
          >
            dehaze
          </span>
          <span
            className="material-symbols-outlined not-sr-only"
            data-show-when="open"
          >
            close
          </span>
          <span className="sr-only">Toggle Menu</span>
        </label>

        <nav>
          <ul>
            <li>
              <a href="/#bento">
                <span className="nav-rn">For business</span>
              </a>
            </li>
            <li>
              <a href="/#tasks">
                <span className="nav-rn">For humans</span>
              </a>
            </li>
            <li>
              <a href="/#audiences">
                <span className="nav-rn">For AI agents</span>
              </a>
            </li>
            {/* mobile drawer: plain link to the quests index */}
            <li className="nav-browse-mobile">
              <Link href="/quests">
                <span className="nav-rn">Browse</span>
              </Link>
            </li>
            {/* desktop: click-toggled Airtasker-style mega panel */}
            <li className="nav-mega-li" ref={megaRef}>
              <button
                type="button"
                className="nav-mega-trigger"
                aria-expanded={menuOpen}
                aria-haspopup="true"
                aria-controls="browse-dropdown"
                onClick={() => setMenuOpen((o) => !o)}
              >
                <span className="nav-rn">Browse</span>
                <span
                  className="material-symbols-outlined nav-mega-trigger__chev"
                  aria-hidden="true"
                >
                  keyboard_arrow_down
                </span>
              </button>

              <div id="browse-dropdown" className="nav-mega" hidden={!menuOpen}>
                <div className="nav-mega__inner">
                  {/* left intent column */}
                  <div className="nav-mega__intent">
                    <p className="nav-mega__intent-title">
                      What are you looking for?
                    </p>
                    <p className="nav-mega__intent-sub">Pick a type of task.</p>
                    <div
                      className="nav-mega__tabs"
                      role="tablist"
                      aria-label="Browse intent"
                    >
                      <button
                        type="button"
                        role="tab"
                        id="browse-tab-hero"
                        aria-selected={intent === "hero"}
                        aria-controls="browse-tabpanel"
                        className={`nav-mega__tab${
                          intent === "hero" ? " is-active" : ""
                        }`}
                        onClick={() => setIntent("hero")}
                        onMouseEnter={() => setIntent("hero")}
                      >
                        <span className="nav-mega__tab-eyebrow">As a Hero</span>
                        <span className="nav-mega__tab-desc">
                          I’m looking for work
                        </span>
                      </button>
                      <button
                        type="button"
                        role="tab"
                        id="browse-tab-poster"
                        aria-selected={intent === "poster"}
                        aria-controls="browse-tabpanel"
                        className={`nav-mega__tab${
                          intent === "poster" ? " is-active" : ""
                        }`}
                        onClick={() => setIntent("poster")}
                        onMouseEnter={() => setIntent("poster")}
                      >
                        <span className="nav-mega__tab-eyebrow">
                          As a poster
                        </span>
                        <span className="nav-mega__tab-desc">
                          I’m looking to hire someone
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* right dense task-type list */}
                  <div
                    className="nav-mega__panel"
                    role="tabpanel"
                    id="browse-tabpanel"
                    aria-labelledby={
                      intent === "hero"
                        ? "browse-tab-hero"
                        : "browse-tab-poster"
                    }
                  >
                    <ul className="nav-mega__grid">
                      {TASK_TYPES.map((t) => (
                        <li key={t.label}>
                          <Link
                            href={`/quests/${t.category}${
                              intent === "poster"
                                ? ""
                                : t.sub
                                ? `?sub=${t.sub}`
                                : ""
                            }`}
                            className="nav-mega__link"
                            onClick={() => setMenuOpen(false)}
                          >
                            {t.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href="/quests"
                          className="nav-mega__link nav-mega__link--all"
                          onClick={() => setMenuOpen(false)}
                        >
                          View all
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <a href="/#welcome" className="nav-cta">
            Hire a human
          </a>
        </nav>

        <div className="nav-actions">
          <a href="/login" className="nav-login">
            <span className="nav-rn">Log in</span>
          </a>
          <button className="primary">
            <span>Hire a human</span>
          </button>
        </div>
      </header>
    </div>
  );
}
