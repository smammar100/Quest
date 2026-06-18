import type { ReactNode } from "react";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import s from "./legal.module.css";

export type LegalSection = {
  id: string;
  heading: string;
  body: ReactNode;
};

// Shared shell for the Terms of Use and Privacy Policy pages. Renders the
// site header/footer, a coral-accented title block, a sticky in-page table of
// contents, and the numbered sections — all in the Quest design language.
export default function LegalLayout({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <SiteHeader />
      <main className={s.page}>
        <div className={s.hero}>
          <h1 className={s.title}>{title}</h1>
          <p className={s.intro}>{intro}</p>
          <p className={s.updated}>Last updated · {updated}</p>
        </div>

        <div className={s.body}>
          <aside className={s.toc} aria-label="On this page">
            <p className={s.tocLabel}>On this page</p>
            <nav>
              <ol className={s.tocList}>
                {sections.map((sec, i) => (
                  <li key={sec.id}>
                    <a href={`#${sec.id}`} className={s.tocLink}>
                      <span className={s.tocNum}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {sec.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className={s.content}>
            {sections.map((sec, i) => (
              <section key={sec.id} id={sec.id} className={s.section}>
                <h2 className={s.sectionHeading}>
                  <span className={s.sectionNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {sec.heading}
                </h2>
                <div className={s.prose}>{sec.body}</div>
              </section>
            ))}
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
