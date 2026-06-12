'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollFX() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({ autoRaf: false, duration: 1.1 });
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const onAnchorClick = (e: MouseEvent) => {
        const link = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
        if (!link) return;
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const header = document.querySelector<HTMLElement>('.header-wrapper');
        lenis.scrollTo(target as HTMLElement, { offset: -(header?.offsetHeight ?? 64) });
      };
      document.addEventListener('click', onAnchorClick);

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
      ].forEach(revealUp);

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
