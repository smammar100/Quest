'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { QRCodeSVG } from 'qrcode.react';

export const APP_STORE_URL = 'https://apps.apple.com/sg/app/quest-hire-a-hero/id1554496579';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.questinc.quest';
// QR target. TODO: swap for a platform-aware smart link when one exists; for now
// it points at the App Store listing.
const DOWNLOAD_URL = APP_STORE_URL;

export function AppleLogo() {
  return (
    <svg className="dlapp-store__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.54c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.94-3.94.94-.81 0-2.07-.92-3.4-.9-1.75.03-3.36 1.02-4.26 2.58-1.82 3.16-.47 7.84 1.3 10.4.86 1.26 1.89 2.67 3.24 2.62 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.28-1.28 3.14-2.55.99-1.46 1.4-2.87 1.42-2.94-.03-.01-2.72-1.05-2.74-4.17Zm-2.58-7.66c.72-.87 1.2-2.08 1.07-3.28-1.03.04-2.28.69-3.02 1.55-.66.77-1.24 2-.08 3.21.92.07 1.86-.61 2.61-1.48Z" />
    </svg>
  );
}

export function GooglePlayLogo() {
  return (
    <svg className="dlapp-store__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179zm0 2.067L2.504 23.985c.298.036.612-.016.906-.183l13.324-7.54z" />
    </svg>
  );
}

// A footer/link-styled trigger that opens a centered "Get the Quest app" modal
// with a scannable QR code and both store links. Used for hero-facing CTAs
// (e.g. "Earn as a human") that should send people to the mobile app.
export default function DownloadAppModal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>

      {open && mounted && createPortal(
        <div
          className="dlapp-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Get the Quest app"
          onClick={() => setOpen(false)}
        >
          <div className="dlapp-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="dlapp-close"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">close</span>
            </button>

            <h2 className="dlapp-title">
              Get the
              <br />
              Quest app
            </h2>
            <p className="dlapp-sub">Scan the QR code to download Quest on your phone.</p>

            <div className="dlapp-qr">
              <QRCodeSVG value={DOWNLOAD_URL} size={184} level="M" />
            </div>

            <div className="dlapp-stores">
              <a href={APP_STORE_URL} target="_blank" rel="noopener" className="dlapp-store">
                <AppleLogo />
                App Store
              </a>
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener" className="dlapp-store">
                <GooglePlayLogo />
                Google Play
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
