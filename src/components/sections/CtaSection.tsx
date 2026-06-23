const TRUST_AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces&auto=format&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=faces&auto=format&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=faces&auto=format&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=faces&auto=format&q=80',
];

import DownloadAppModal from '@/components/layout/DownloadAppModal';

// `appModal`: on hero category pages the CTA opens the app-download QR modal
// instead of linking to signup. Content defaults to the homepage copy; pass
// title/sub/ctaText/ctaHref to reuse this section elsewhere (e.g. /business).
export default function CtaSection({
  appModal,
  title = 'Creating the next million jobs uniquely human',
  sub = 'Describe a quest in a sentence. A trusted human gets it done.',
  ctaText = 'Hire a human',
  ctaHref = '/signup',
}: {
  appModal?: boolean;
  title?: string;
  sub?: string;
  ctaText?: string;
  ctaHref?: string;
}) {
  return (
    <section id="cta">
      <div className="ft-cta">
        <div className="ft-cta__content">
          <div className="ft-trust">
            <div className="ft-trust__avatars" aria-hidden="true">
              {TRUST_AVATARS.map((src, i) => (
                <img key={i} className="ft-trust__avatar" src={src} alt="" width={28} height={28} loading="lazy" />
              ))}
            </div>
            <p className="ft-trust__text">Trusted by <strong>750k+</strong> humans</p>
          </div>
          <h2 className="ft-cta__title">{title}</h2>
          <p className="ft-cta__sub">{sub}</p>
          {appModal ? (
            <DownloadAppModal className="ft-cta-btn ft-cta-btn--primary">Get the app</DownloadAppModal>
          ) : (
            <a href={ctaHref} className="ft-cta-btn ft-cta-btn--primary">{ctaText}</a>
          )}
        </div>
      </div>
    </section>
  );
}
