'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * ScrollFX — Lenis smooth scrolling + subtle GSAP entrance reveals.
 *
 * Coexists with (never overrides) the existing scroll effects:
 *   #proof sticky stack, #video bleed (view-timeline), #bento wave + drag,
 *   #tasks marquee, #cta animated gradient. Lenis runs on NATIVE scroll, so all
 *   of those keep working. Everything is gated on (prefers-reduced-motion:
 *   no-preference) via gsap.matchMedia, and nothing is CSS-hidden — so reduced
 *   motion / no-JS users get a fully-visible, native-scroll page.
 */
export default function ScrollFX() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // ── Lenis smooth scroll, driven by GSAP's ticker (one rAF loop) ──
      const lenis = new Lenis({ autoRaf: false, duration: 1.1 });
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // ── Smooth in-page anchor links (offset clears the fixed header) ──
      const onAnchorClick = (e: MouseEvent) => {
        const link = (e.target as HTMLElement | null)?.closest?.('a[href^="#"], a[href^="/#"]') as HTMLAnchorElement | null;
        if (!link) return;
        let href = link.getAttribute('href');
        // "/#section" links (shared header) smooth-scroll when already on the homepage
        if (href?.startsWith('/#')) {
          if (window.location.pathname !== '/') return;
          href = href.slice(1);
        }
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const header = document.querySelector<HTMLElement>('.header-wrapper');
        lenis.scrollTo(target as HTMLElement, { offset: -(header?.offsetHeight ?? 64) });
      };
      document.addEventListener('click', onAnchorClick);

      // ── Reveal helper: fade + rise once, then hand styles back to CSS ──
      const revealUp = (selector: string) => {
        const els = gsap.utils.toArray<HTMLElement>(selector);
        if (!els.length) return;
        gsap.set(els, { opacity: 0, y: 24 });
        ScrollTrigger.batch(els, {
          start: 'top 85%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.1,
              overwrite: true,
              clearProps: 'transform,opacity',
            }),
        });
      };

      // ── Hero load-in (above the fold → on mount, not scroll-triggered) ──
      // The headline (.quest-hero__title) is intentionally NOT animated so the
      // rough-notation highlight on .rn-mark keeps a stable box.
      const heroBits = gsap.utils.toArray<HTMLElement>(
        '.quest-hero__eyebrow, .quest-hero__subtitle, .quest-prompt, .quest-suggest'
      );
      if (heroBits.length) {
        gsap.set(heroBits, { opacity: 0, y: 20 });
        gsap.to(heroBits, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.09,
          delay: 0.1,
          clearProps: 'transform,opacity',
        });
      }

      // ── Section entrance reveals ──
      // Delicate sections (already self-animating) reveal their HEADS only;
      // static sections reveal heads + item groups. Never the #proof cards,
      // #video frame, #bento cards/track, or #tasks rows.
      [
        '.logos-label',
        '.logos-row li',
        '.bento-title, .bento-lede',
        '.video-title, .video-sub, .video-cta',
        '.how-title, .how-lede',
        '.tasks-title, .tasks-post, .tasks-tabs',
        '.aud-title',
        '.aud-item',
        '.aud-media',
        '.proof-title, .proof-lede',
        '.faq-title, .faq-lede',
        '.faq-item',
        '.ft-cta',
        '.ft-top, .ft-bottom',
        // /quests pages (selectors no-op on the homepage)
        '.qp-hero__title, .qp-hero__proof, .qp-hero__cta',
        '.qp-sample-head',
        '.qp-earn',
        '.qp-seo__intro, .qp-seo__block',
        '.qp-related__col',
        '.qx-card',
      ].forEach(revealUp);

      // Recalc positions after client sections / fonts / images settle.
      ScrollTrigger.refresh();
      requestAnimationFrame(() => ScrollTrigger.refresh());
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', onLoad);

      return () => {
        document.removeEventListener('click', onAnchorClick);
        window.removeEventListener('load', onLoad);
        gsap.ticker.remove(tick);
        ScrollTrigger.getAll().forEach((t) => t.kill());
        lenis.destroy();
      };
    });

    return () => mm.revert();
  });

  return null;
}
