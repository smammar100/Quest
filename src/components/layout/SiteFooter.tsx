'use client';

import { useAuth } from '@/controllers/useAuth';
import DownloadAppModal from './DownloadAppModal';

const APP_STORE_URL = 'https://apps.apple.com/sg/app/quest-hire-a-hero/id1554496579';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.questinc.quest';

function AppleLogo() {
  return (
    <svg className="ft-store__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.54c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.94-3.94.94-.81 0-2.07-.92-3.4-.9-1.75.03-3.36 1.02-4.26 2.58-1.82 3.16-.47 7.84 1.3 10.4.86 1.26 1.89 2.67 3.24 2.62 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.28-1.28 3.14-2.55.99-1.46 1.4-2.87 1.42-2.94-.03-.01-2.72-1.05-2.74-4.17Zm-2.58-7.66c.72-.87 1.2-2.08 1.07-3.28-1.03.04-2.28.69-3.02 1.55-.66.77-1.24 2-.08 3.21.92.07 1.86-.61 2.61-1.48Z" />
    </svg>
  );
}

function GooglePlayLogo() {
  return (
    <svg className="ft-store__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179zm0 2.067L2.504 23.985c.298.036.612-.016.906-.183l13.324-7.54z" />
    </svg>
  );
}

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', href: '#how' },
      { label: 'For Business', href: '#bento' },
      { label: 'For AI Agents', href: '/agents' },
      { label: 'Manifesto', href: '#video' },
    ],
  },
  {
    title: 'For Humans',
    links: [
      { label: 'Earn as a human', href: '#audiences' },
      { label: 'How payouts work', href: '#faq' },
      { label: 'Safety & trust', href: '#faq' },
      { label: 'Human app', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: 'https://quest-inc.co/aboutus/', external: true },
      // Manifesto hidden for now — restore when the dedicated page exists.
      // { label: 'Manifesto', href: '/manifesto' },
      { label: 'Careers', href: 'https://quest-inc.co/careers/', external: true },
      { label: 'Media', href: 'https://quest-inc.co/quest-in-the-news/', external: true },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'How it works', href: '#how' },
      // TODO: point at the dedicated human-earning page once it exists.
      { label: 'Earn money', href: '/earn' },
      { label: 'Safety & trust', href: 'https://quest-inc.co/payments-on-lock/', external: true },
      // FAQ hidden for now — restore when ready.
      // { label: 'FAQ', href: '#faq' },
      { label: 'Support', href: 'mailto:hello@quest-inc.co' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Community guidelines', href: 'https://quest-inc.co/community-guidelines/', external: true },
      { label: 'Terms and Conditions', href: 'https://quest-inc.co/terms-of-use/', external: true },
      { label: 'Privacy policy', href: 'https://quest-inc.co/privacy-policy/', external: true },
    ],
  },
];

const SOCIALS = [
  {
    label: 'X',
    href: 'https://x.com/hireahumanquest',
    path: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/hireahuman.quest',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/questhireahuman',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@hireahuman.quest',
    path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
];

export default function SiteFooter() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="site-footer">
      <div className="ft-inner">
        <div className="ft-top">
          <div className="ft-brand">
            <a href="#welcome" className="quest-logo" aria-label="Quest">
              <img className="quest-logo__img" src="/images/logos/Logo.svg" alt="Quest" width={80} height={30} />
            </a>
            <p className="ft-brand__tagline">
              Hire a human or earn as one wherever you are with our mobile app.
            </p>

            <div className="ft-download">
              <p className="ft-download__label">Download the app</p>
              <div className="ft-download__badges">
                <a href={APP_STORE_URL} target="_blank" rel="noopener" className="ft-store">
                  <AppleLogo />
                  App Store
                </a>
                <a href={PLAY_STORE_URL} target="_blank" rel="noopener" className="ft-store">
                  <GooglePlayLogo />
                  Google Play
                </a>
              </div>
            </div>
          </div>

          {!isAuthenticated && (
            <nav className="ft-cols" aria-label="Footer">
              {COLUMNS.map((col) => (
                <div className="ft-col" key={col.title}>
                  <h3 className="ft-col__title">{col.title}</h3>
                  <ul className="ft-col__list">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        {'action' in l && l.action === 'download-app' ? (
                          <DownloadAppModal className="ft-link">{l.label}</DownloadAppModal>
                        ) : (
                          <a
                            href={l.href}
                            className="ft-link"
                            {...('external' in l && l.external ? { target: '_blank', rel: 'noopener' } : {})}
                          >
                            {l.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          )}
        </div>

        <div className="ft-bottom">
          <p className="ft-copy">
            © {new Date().getFullYear()}{' '}Quest Hyphen Inc Pte. Ltd. d/b/a Quest &amp; hireahuman.quest
          </p>

          <div className="ft-social-col">
            <ul className="ft-socials">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="ft-social"
                    aria-label={s.label}
                    {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={s.path} /></svg>
                  </a>
                </li>
              ))}
            </ul>
            <p className="ft-made">Designed with Love ❤️ by the Quest team</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
