const TRUST_AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces&auto=format&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=faces&auto=format&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=faces&auto=format&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=faces&auto=format&q=80',
];

export default function CtaSection() {
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
          <h2 className="ft-cta__title">Creating the next million jobs uniquely human</h2>
          <p className="ft-cta__sub">Describe a task in a sentence. A trusted human gets it done.</p>
          <a href="#welcome" className="ft-cta-btn ft-cta-btn--primary">Hire a human</a>
        </div>
      </div>
    </section>
  );
}
