"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/controllers/useAuth";
import { TASK_TYPES } from "@/lib/data/quests-data";

// Shared fixed header (home + /quests pages). Section links are absolute
// ("/#bento") so they work from any route; ScrollFX smooth-scrolls them when
// already on the homepage. "Browse" opens an Airtasker-style mega panel:
// left = intent tabs (As a Hero / As a poster), right = dense task-type list.
type Intent = "hero" | "poster";
type MenuItem = { label: string; category: string; sub?: string };

export default function SiteHeader() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [intent, setIntent] = useState<Intent>("poster");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);
  const { isAuthenticated, signOut } = useAuth();
  const megaRef = useRef<HTMLLIElement>(null);

  // Browse-menu lists. Seed from the static list (no flash / works offline),
  // then swap in the Sanity-driven lists once /api/menu responds. Poster tab =
  // citizen capabilities, hero tab = category subcategories.
  const [posterItems, setPosterItems] = useState<MenuItem[]>(() =>
    TASK_TYPES.map((t) => ({ label: t.label, category: t.category }))
  );
  const [heroItems, setHeroItems] = useState<MenuItem[]>(() =>
    TASK_TYPES.map((t) => ({ label: t.label, category: t.category, sub: t.sub }))
  );

  useEffect(() => {
    let alive = true;
    fetch("/api/menu", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive || !data) return;
        if (data.poster?.length) setPosterItems(data.poster);
        if (data.hero?.length) setHeroItems(data.hero);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

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

  useEffect(() => {
    if (!showLogoutDialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !signingOut) {
        setShowLogoutDialog(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [showLogoutDialog, signingOut]);

  async function handleConfirmLogout() {
    setSignOutError(null);

    try {
      setSigningOut(true);
      await signOut();
      setShowLogoutDialog(false);
      router.push("/");
    } catch {
      setSignOutError("Could not log out right now. Please try again.");
    } finally {
      setSigningOut(false);
    }
  }

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
              <Link href="/browse-quest">
                <span className="nav-rn">Categories</span>
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
                <span className="nav-rn">Categories</span>
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
                    <p className="nav-mega__intent-sub">Pick a type of quest.</p>
                    <div
                      className="nav-mega__tabs"
                      role="tablist"
                      aria-label="Browse intent"
                    >
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
                          I want to
                        </span>
                        <span className="nav-mega__tab-desc">
                          Hire humans.
                        </span>
                      </button>
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
                        <span className="nav-mega__tab-eyebrow">I want to</span>
                        <span className="nav-mega__tab-desc">
                          Earn as a human.
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
                      {(intent === "poster" ? posterItems : heroItems).map((t, i) => (
                        <li key={`${t.category}-${t.label}-${i}`}>
                          <Link
                            href={
                              intent === "poster"
                                ? `/quests/${t.category}/hire`
                                : `/quests/${t.category}${
                                    t.sub ? `?sub=${t.sub}` : ""
                                  }`
                            }
                            className="nav-mega__link"
                            onClick={() => setMenuOpen(false)}
                          >
                            {t.label}
                          </Link>
                        </li>
                      ))}
                      {/* "View all" link — temporarily hidden, restore later
                      <li>
                        <Link
                          href="/quests"
                          className="nav-mega__link nav-mega__link--all"
                          onClick={() => setMenuOpen(false)}
                        >
                          View all
                        </Link>
                      </li>
                      */}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <a href="/signup" className="nav-cta">
            Hire a human
          </a>
        </nav>

        <div className="nav-actions">
          {!isAuthenticated ? (
            <Link href="/login" className="nav-login">
              <span className="nav-rn">Log in</span>
            </Link>
          ) : null}
          {isAuthenticated ? (
            <button
              type="button"
              className="nav-login nav-login-btn"
              onClick={() => {
                setSignOutError(null);
                setShowLogoutDialog(true);
              }}
            >
              <span className="nav-rn">Log out</span>
            </button>
          ) : null}
          <button className="primary" onClick={() => router.push("/signup")}>
            <span>Hire a human</span>
          </button>
        </div>
      </header>

      {showLogoutDialog ? (
        <div
          className="quest-dialog-backdrop"
          role="presentation"
          onClick={() => {
            if (!signingOut) {
              setShowLogoutDialog(false);
            }
          }}
        >
          <div
            className="quest-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            aria-describedby="logout-description"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="logout-title" className="quest-dialog__title">
              Log out of Quest?
            </h3>
            <p id="logout-description" className="quest-dialog__desc">
              You will need to sign in again to post, manage, and browse personalized quests.
            </p>
            {signOutError ? (
              <p className="quest-dialog__error" role="alert" aria-live="polite">
                {signOutError}
              </p>
            ) : null}
            <div className="quest-dialog__actions">
              <button
                type="button"
                className="quest-dialog__cancel"
                onClick={() => setShowLogoutDialog(false)}
                disabled={signingOut}
              >
                Cancel
              </button>
              <button
                type="button"
                className="quest-dialog__confirm"
                onClick={() => void handleConfirmLogout()}
                disabled={signingOut}
              >
                {signingOut ? "Logging out..." : "Log out"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
