const FAQS = [
  {
    q: 'What exactly is Quest?',
    a: "Quest is a marketplace for real-world work. You describe a task in a sentence, like an errand, a delivery, event help, on-location content, or an in-person check, and we match you with trusted local people who get it done.",
  },
  {
    q: 'Who are the humans, and are they vetted?',
    a: "They're real people near you, from weekend helpers to seasoned pros. Each builds a profile with ratings and reviews, and anyone who takes on sensitive work is background-checked. You always see ratings and recent reviews before you assign someone.",
  },
  {
    q: 'How do payments work, and is it safe?',
    a: "You agree the price up front. Funds are held securely and only released to the person once the work is done and you're happy. Everything runs through Quest, with no cash needed and a clear receipt for every task.",
  },
  {
    q: 'What does Quest cost?',
    a: "Posting a task and getting matched is free. You only pay the agreed price for the work plus a small, transparent service fee shown before you confirm. No subscriptions, no surprises.",
  },
  {
    q: 'Can my AI agent hire people through Quest?',
    a: "Yes. Quest is built for the agent-first era: an AI agent can post tasks, compare matched people, and dispatch real-world work on your behalf, so the things software can't finish still get done by a person.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq">
      <div className="faq-head">
        <h2 className="faq-title">Questions &amp; Answers</h2>
        <p className="faq-lede">Everything you need to know about working with real people.</p>
      </div>

      <div className="faq-list">
        {FAQS.map((item, i) => (
          <details className="faq-item" name="faq" key={i}>
            <summary className="faq-q">
              <span className="faq-q__text">{item.q}</span>
              <span className="faq-q__icon" aria-hidden="true" />
            </summary>
            <div className="faq-a">
              <p className="faq-a__text">{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
