// #faq — light off-white accordion. Pure-CSS exclusive accordion via
// <details name="faq"> (no JS): opening one row natively closes the others.
const FAQS = [
  {
    q: 'What exactly is Quest?',
    a: "Quest is a marketplace for real-world work. You describe a task in a sentence — an errand, a delivery, event help, on-location content, an in-person check — and we match you with trusted local people (we call them Heroes) who get it done.",
  },
  {
    q: 'Who are the Heroes, and are they vetted?',
    a: "Heroes are real people near you, from weekend helpers to seasoned pros. Every Hero builds a profile with ratings and reviews, and Heroes who take on sensitive work are background-checked. You always see ratings and recent reviews before you assign anyone.",
  },
  {
    q: 'What kinds of things can I ask for?',
    a: "Anything that takes a human in the physical world: groceries and returns, moving and assembly, local deliveries, event setup and hosting, photo and video shot on location, store audits and site visits — and plenty AI simply can't do on its own.",
  },
  {
    q: 'How do payments work, and is it safe?',
    a: "You agree the price up front. Funds are held securely and only released to your Hero once the work is done and you're happy. Everything runs through Quest — no cash needed, with a clear receipt for every task.",
  },
  {
    q: 'What does Quest cost?',
    a: "Posting a task and getting matched is free. You only pay the agreed price for the work plus a small, transparent service fee shown before you confirm. No subscriptions, no surprises.",
  },
  {
    q: 'How do I get started?',
    a: "Type what you need in the prompt at the top of the page — when, where, and what done looks like. We surface matching Heroes nearby in minutes; you pick one, agree the details, and track it through to completion.",
  },
  {
    q: 'Can my AI agent hire people through Quest?',
    a: "Yes. Quest is built for the agent-first era: an AI agent can post tasks, compare matched Heroes, and dispatch real-world work on your behalf — so the things software can't finish still get done by a person.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq">
      <div className="faq-head">
        <h2 className="faq-title">Questions &amp; Answers</h2>
        <p className="faq-lede">Everything you need to know about getting real-world work done through real people.</p>
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
