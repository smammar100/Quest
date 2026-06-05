'use client';

import { useEffect } from 'react';
import { annotate, annotationGroup } from 'rough-notation';

export default function PageScript() {
  useEffect(() => {
    // Ring Particles Houdini PaintWorklet + mouse tracking
    if ('paintWorklet' in CSS) {
      (CSS as any).paintWorklet.addModule(
        'https://unpkg.com/css-houdini-ringparticles/dist/ringparticles.js'
      );
      let isInteractive = false;
      const welcome = document.querySelector<HTMLElement>('#welcome');
      if (welcome) {
        welcome.addEventListener('pointermove', (e) => {
          const pe = e as PointerEvent;
          if (!isInteractive) { welcome.classList.add('interactive'); isInteractive = true; }
          welcome.style.setProperty('--ring-x', String((pe.clientX / window.innerWidth) * 100));
          welcome.style.setProperty('--ring-y', String((pe.clientY / window.innerHeight) * 100));
          welcome.style.setProperty('--ring-interactive', '1');
        });
        welcome.addEventListener('pointerleave', () => {
          welcome.classList.remove('interactive');
          isInteractive = false;
          welcome.style.setProperty('--ring-x', '50');
          welcome.style.setProperty('--ring-y', '50');
          welcome.style.setProperty('--ring-interactive', '0');
        });
      }
    }

    // Hero headline: cross off "can", highlight "humans"
    function drawHeroAnnotations() {
      const crossEl = document.querySelector<HTMLElement>('.quest-hero__title .rn-cross');
      const markEl = document.querySelector<HTMLElement>('.quest-hero__title .rn-mark');
      if (!crossEl || !markEl) return;

      const highlight = annotate(markEl, {
        type: 'highlight',
        color: '#FF5A47',
        animationDuration: 800,
      });
      const crossOff = annotate(crossEl, {
        type: 'crossed-off',
        color: '#FF5A47',
        strokeWidth: 3,
        animationDuration: 700,
      });

      annotationGroup([highlight, crossOff]).show();
      markEl.style.color = '#FFFFFF';
    }

    const startHero = () => setTimeout(drawHeroAnnotations, 120);
    if (document.fonts?.ready) {
      void document.fonts.ready.then(startHero);
    } else {
      window.addEventListener('load', startHero);
    }

    // Video section: click-to-play
    const frame = document.querySelector<HTMLElement>('#video .video-frame');
    if (frame) {
      const btn = frame.querySelector('.video-play');
      const vid = frame.querySelector<HTMLVideoElement>('.video-el');
      if (btn && vid) {
        btn.addEventListener('click', () => {
          frame.classList.add('is-playing');
          vid.setAttribute('controls', '');
          void vid.play();
        });
      }
    }

    // Video headline: cross off "can" on scroll into view
    const videoTitle = document.querySelector('#video .video-title');
    if (videoTitle && 'IntersectionObserver' in window) {
      const el = videoTitle.querySelector<HTMLElement>('.video-cross');
      if (el) {
        let drawn = false;
        const draw = () => {
          if (drawn) return;
          drawn = true;
          const go = () => annotate(el, { type: 'crossed-off', color: '#FF5A47', strokeWidth: 3, animationDuration: 700 }).show();
          if (document.fonts?.ready) void document.fonts.ready.then(() => setTimeout(go, 60));
          else go();
        };
        const io = new IntersectionObserver(
          (entries) => { if (entries.some((e) => e.isIntersecting)) { draw(); io.disconnect(); } },
          { threshold: 0.6 }
        );
        io.observe(videoTitle);
      }
    }

    // "How it works": Mews-style horizontal accordion
    const how = document.querySelector('#how');
    if (how) {
      const cards = [...how.querySelectorAll<HTMLElement>('.how-card')];
      const prev = how.querySelector<HTMLButtonElement>('.how-arrow[data-dir="prev"]');
      const next = how.querySelector<HTMLButtonElement>('.how-arrow[data-dir="next"]');
      if (cards.length) {
        let active = 0;
        const setActive = (i: number) => {
          active = Math.max(0, Math.min(cards.length - 1, i));
          cards.forEach((c, idx) => c.classList.toggle('is-active', idx === active));
          if (prev) prev.disabled = active <= 0;
          if (next) next.disabled = active >= cards.length - 1;
        };
        cards.forEach((c, idx) => c.addEventListener('click', () => { if (idx !== active) setActive(idx); }));
        if (prev) prev.addEventListener('click', () => setActive(active - 1));
        if (next) next.addEventListener('click', () => setActive(active + 1));
        setActive(0);
      }
    }

  }, []);

  return null;
}
