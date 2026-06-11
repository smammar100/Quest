'use client';

import { useEffect } from 'react';
import { annotate } from 'rough-notation';

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

    // Hero headline: hand-drawn highlight on "human" (rough-notation). Draw only once the
    // span is laid out (fonts loaded), and redraw on resize so the marker tracks layout shifts.
    const heroMark = document.querySelector<HTMLElement>('.quest-hero__title .rn-mark');
    if (heroMark) {
      let heroAnno: ReturnType<typeof annotate> | null = null;
      const drawHeroMark = () => {
        if (heroMark.getBoundingClientRect().width < 1) { requestAnimationFrame(drawHeroMark); return; }
        heroAnno?.remove();
        heroAnno = annotate(heroMark, { type: 'highlight', color: '#FF5A47', animationDuration: 700 });
        heroMark.style.color = '#FFFFFF';
        heroAnno.show();
      };
      const startHeroMark = () => requestAnimationFrame(() => requestAnimationFrame(drawHeroMark));
      if (document.fonts?.ready) void document.fonts.ready.then(startHeroMark);
      else window.addEventListener('load', startHeroMark);
      // Timer fallback: rAF can be throttled before the first paint, so guarantee one draw.
      setTimeout(drawHeroMark, 700);
      let heroResizeT: ReturnType<typeof setTimeout>;
      window.addEventListener('resize', () => { clearTimeout(heroResizeT); heroResizeT = setTimeout(drawHeroMark, 150); });
    }

    // Mobile menu: tapping a link (or the drawer CTA) closes the drawer before scrolling
    const menuCb = document.querySelector<HTMLInputElement>('.menu-checkbox');
    if (menuCb) {
      document.querySelectorAll<HTMLAnchorElement>('.header-wrapper nav a').forEach((a) =>
        a.addEventListener('click', () => { menuCb.checked = false; })
      );
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

    // "AI can write the plan": centre-focused, draggable carousel.
    // Translate the track so the active card sits at the viewport centre; CSS
    // scales it up. Pointer drag scrubs the strip and snaps to the nearest card.
    const bento = document.querySelector('#bento');
    if (bento) {
      const viewport = bento.querySelector<HTMLElement>('.bento-carousel');
      const track = bento.querySelector<HTMLElement>('.bento-track');
      const cards = [...bento.querySelectorAll<HTMLElement>('.bento-card')];
      const bPrev = bento.querySelector<HTMLButtonElement>('.bento-arrow[data-dir="prev"]');
      const bNext = bento.querySelector<HTMLButtonElement>('.bento-arrow[data-dir="next"]');
      if (viewport && track && cards.length) {
        let active = Math.floor((cards.length - 1) / 2);
        let currentShift = 0;

        // Clamp bounds: pin the first card to the content margin and the last to
        // its mirror so the strip never reveals an empty gutter past the ends.
        const bounds = () => {
          const head = bento.querySelector<HTMLElement>('.bento-head');
          const pad = head ? head.getBoundingClientRect().left : 24;
          const vw = viewport.clientWidth;
          return { vw, max: pad, min: Math.min(pad, vw - pad - track.scrollWidth) };
        };
        const clamp = (shift: number) => {
          const { max, min } = bounds();
          return Math.min(max, Math.max(min, shift));
        };
        const shiftForIndex = (i: number) => {
          const { vw } = bounds();
          const card = cards[i];
          return clamp(vw / 2 - (card.offsetLeft + card.offsetWidth / 2));
        };
        const apply = (shift: number, animate: boolean) => {
          currentShift = shift;
          track.style.transition = animate ? '' : 'none';
          track.style.transform = `translateX(${shift}px)`;
        };
        const markActive = () => {
          cards.forEach((c, i) => c.classList.toggle('is-active', i === active));
          if (bPrev) bPrev.disabled = active <= 0;
          if (bNext) bNext.disabled = active >= cards.length - 1;
        };
        const render = (animate = true) => { apply(shiftForIndex(active), animate); markActive(); };
        const setActive = (i: number) => {
          active = Math.max(0, Math.min(cards.length - 1, i));
          render();
        };
        const nearestIndex = (shift: number) => {
          const { vw } = bounds();
          let best = 0;
          let bestDist = Infinity;
          cards.forEach((c, i) => {
            const dist = Math.abs(shift + c.offsetLeft + c.offsetWidth / 2 - vw / 2);
            if (dist < bestDist) { bestDist = dist; best = i; }
          });
          return best;
        };

        // Pointer drag — scrub freely, live-feature the centred card, snap on release.
        let dragging = false;
        let moved = false;
        let startX = 0;
        let startShift = 0;
        const onDown = (e: PointerEvent) => {
          dragging = true;
          moved = false;
          startX = e.clientX;
          startShift = currentShift;
          viewport.classList.add('is-dragging');
        };
        const onMove = (e: PointerEvent) => {
          if (!dragging) return;
          const dx = e.clientX - startX;
          if (Math.abs(dx) > 4) moved = true;
          apply(clamp(startShift + dx), false);
          const ni = nearestIndex(currentShift);
          if (ni !== active) { active = ni; markActive(); }
        };
        const onUp = () => {
          if (!dragging) return;
          dragging = false;
          viewport.classList.remove('is-dragging');
          active = nearestIndex(currentShift);
          render();
        };
        track.addEventListener('pointerdown', onDown);
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        window.addEventListener('pointercancel', onUp);
        track.addEventListener('dragstart', (e) => e.preventDefault());

        cards.forEach((c, i) =>
          c.addEventListener('click', (e) => { e.preventDefault(); if (!moved && i !== active) setActive(i); })
        );
        if (bPrev) bPrev.addEventListener('click', () => setActive(active - 1));
        if (bNext) bNext.addEventListener('click', () => setActive(active + 1));

        let bRaf = 0;
        window.addEventListener('resize', () => {
          cancelAnimationFrame(bRaf);
          bRaf = requestAnimationFrame(() => render(false));
        });
        render(false);
        if (document.fonts?.ready) void document.fonts.ready.then(() => render(false));
      }
    }

  }, []);

  return null;
}
