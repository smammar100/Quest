'use client';

import Link from 'next/link';

// Navigation for authenticated users. Intentionally simpler than SiteHeader —
// no marketing copy, no mega menu. Just the product actions the user needs.
export default function AppHeader() {
  return (
    <div className="app-header-wrapper">
      <header className="app-header">
        <Link href="/" className="quest-logo" aria-label="Quest">
          <img
            className="quest-logo__img"
            src="/images/logos/Logo.svg"
            alt="Quest"
            width={80}
            height={30}
          />
        </Link>

        <nav className="app-header__nav">
          <Link href="/browse-quest" className="app-header__link">Browse</Link>
          <Link href="/post-quest" className="app-header__link app-header__link--cta">
            Hire a human
          </Link>
        </nav>

        <div className="app-header__user">
          {/* TODO: replace with real user avatar + dropdown once auth is wired */}
          <button className="app-header__avatar-btn" aria-label="Account menu">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>
    </div>
  );
}
