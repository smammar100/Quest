import type { Metadata } from 'next';
import SiteHeader from '../../../components/layout/SiteHeader';
import SiteFooter from '../../../components/layout/SiteFooter';

export const metadata: Metadata = {
  title: 'From Hire a Hero to Hire a Human — Quest',
  description:
    "Your AI can't do everything. As Quest turns 5, our manifesto on why the future needs humans more than ever.",
};

/* Manifesto page — Contree letter layout (Figma node 8126-18002) in Quest
   branding. Full-bleed photo collage, centered display headline, then the
   founder's letter on a warm paper card (fill + soft shadow, no stroke),
   signed off with a signature and a Singapore "stamp". */

// Bricolage sub-heading inside the letter
function Beat({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="pt-2 font-display text-2xl font-bold leading-tight tracking-tight text-ink">
      {children}
    </h2>
  );
}

// Inter Tight body paragraph
function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[15.5px] leading-[1.75] text-ink/75">{children}</p>
  );
}

export default function ManifestoPage() {
  return (
    <>
      <SiteHeader />
      {/* pt clears the fixed 57px SiteHeader so the collage isn't hidden behind it */}
      <main className="w-full bg-white pb-[clamp(72px,10vw,140px)] pt-[57px] font-sans">
        {/* ---- Photo collage hero (full-bleed) ---- */}
        <img
          src="/images/manifesto/collage.webp"
          alt="A collage of Quest team and community photos over the years"
          width={1600}
          height={810}
          className="block h-[70vh] w-full object-cover object-center"
          fetchPriority="high"
        />

        {/* ---- Headline + intro ---- */}
        <div className="mx-auto w-full max-w-[880px] px-6 pt-[clamp(56px,8vw,100px)] text-center">
          <h1 className="mx-auto font-display text-[clamp(2.6rem,6.2vw,68px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink">
            From Hire a Hero
            <br />
            to Hire a Human
          </h1>
          <p className="mx-auto mt-6 font-sans text-base leading-[1.6] text-ink/70">
            For the past 5 years, Quest has helped people get real work done through real
            people. We started with a simple idea: when you need help, you should be able to
            hire someone quickly, safely, and easily. Someone who can pick up the item, staff
            the event, film the content, move the furniture, run the errand, check the place,
            or complete the task that you do not have time to do yourself.
          </p>
        </div>

        {/* ---- Letter card (warm fill + soft shadow, no stroke) ---- */}
        <div className="mx-auto mt-12 w-full max-w-[880px] px-6">
          <article className="relative rounded-[20px] bg-[#f7f4ed] p-8 shadow-[0_24px_60px_-28px_rgba(20,16,31,0.35)] sm:p-11">
            <div className="flex flex-col gap-4">
              <Beat>We called them Heroes.</Beat>
              <P>
                Every day, people on Quest showed up for others. They solved problems. They
                earned income. They helped businesses keep moving. They completed work that was
                too local, too physical, too urgent, too human, or too hard to fit into a
                traditional job platform.
              </P>

              <Beat>But the world has changed.</Beat>
              <P>
                AI can now write, design, generate, analyse, plan, and automate more than ever
                before. That is exciting. It is also scary. Many people, especially young
                people, are wondering what their place will be in a world where machines can do
                so much.
              </P>
              <P>While AI can be powerful and even feel heroic.</P>

              <Beat>AI can never be human.</Beat>
              <P>
                AI cannot show up at your event, queue for you, move your sofa, or check a store
                in person.
                <br />
                AI cannot hold a camera in the real world with lived experience, taste, and
                context.
                <br />
                AI cannot be trusted the way a real person can be trusted.
              </P>
              <P>
                For years, the majority of work completed on Quest has proven this. The most
                valuable quests are not just tasks. They are moments where humans are needed.
              </P>
              <P>
                We believe the future is not AI replacing humans. The future is AI helping
                humans do more, earn more, and access more opportunities. We believe businesses
                will still need people. Families will still need people. Communities will still
                need people.
              </P>

              <Beat>AI agents will need people too.</Beat>
              <P>
                So as Quest turns 5, we are making our stance clearer.
                <br />
                We are changing our brand from:
                <br />
                <span className="text-ink">Hire a Hero</span> to
                <br />
                <span className="font-semibold text-ink">Hire a Human</span>
                <br />
                Your AI can&apos;t do everything. Hire a human.
              </P>

              {/* Sign-off */}
              <div className="pt-6">
                <p className="font-sans text-[15.5px] text-ink/75">with love from SG,</p>
                <p className="font-sans text-[15.5px] text-ink/40">Evan</p>
                <img
                  src="/images/manifesto/signature.svg"
                  alt="Signature"
                  width={80}
                  height={96}
                  className="mt-6 h-24 w-20 object-contain"
                />
              </div>
            </div>

            {/* Singapore "stamp" — tilted photo overflowing the card corner */}
            <img
              src="/images/manifesto/stamp.webp"
              alt="Singapore skyline stamp"
              width={250}
              height={172}
              className="pointer-events-none absolute -bottom-10 right-2 w-[clamp(150px,22vw,240px)] rotate-[-11deg] drop-shadow-[0_22px_34px_rgba(20,16,31,0.16)] sm:-right-10"
            />
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
