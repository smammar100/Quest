'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';

// #bento use-case tiles — colour-blocked across the full Quest palette.
const useCases = [
  { key: 'errands',  color: 'coral',    title: 'Run errands',               desc: 'Groceries, returns, pickups, and the small jobs that eat your day.', img: '/images/cards/for-everyday-tasks.webp', fit: 'auto 115%' },
  { key: 'events',   color: 'marigold', title: 'Staff events',              desc: 'Vetted hands for setup, hosting, and teardown, booked in minutes.', img: '/images/cards/for-onsite-crew.webp', fit: 'cover' },
  { key: 'move',     color: 'electric', title: 'Move and set up',           desc: 'Lift, assemble, mount, and install, with muscle and know-how on tap.', img: '/images/cards/for-heavy-lifting.webp', fit: '110%' },
  { key: 'deliver',  color: 'lime',     title: 'Deliver locally',           desc: 'Hand-delivered drop-offs across town by a real person nearby.', img: '/images/cards/for-same-day-delivery.webp', fit: 'auto 115%' },
  { key: 'content',  color: 'violet',   title: 'Create real-world content', desc: 'Photo, video, and UGC shot where it actually happens.', img: '/images/cards/for-onlocation-ugc.webp', fit: 'auto 115%' },
  { key: 'check',    color: 'sky',      title: 'Check places in person',    desc: 'Store audits, site visits, and mystery checks with photo proof.', img: '/images/cards/for-boots-on-grounds.webp', fit: '110%' },
  { key: 'business', color: 'ink',      title: 'Help your business',        desc: 'Scale a flexible, on-demand crew for ops, field, and retail.', img: '/images/cards/for-teams.webp', fit: '110%' },
  { key: 'anything', color: 'blush',    title: "Do anything AI can't",      desc: 'If it takes a human in the real world, someone here will do it.', img: '/images/cards/for-anything-else.webp', fit: 'cover' },
];

type Props = {
  /** Override the section heading + lede (e.g. for the /business page). */
  title?: React.ReactNode;
  lede?: string;
};

/**
 * "AI can write the plan. Humans still show up." — centre-focused, draggable
 * use-case carousel. Self-contained: owns its own carousel behaviour so it can
 * be dropped onto any page (home, /business, …) without PageScript.
 */
export default function BentoSection({
  title = (
    <>
      AI can write the plan.<br />Humans still show up.
    </>
  ),
  lede = "Hire people for the physical, local, urgent work AI can't finish.",
}: Props) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const bento = rootRef.current;
    if (!bento) return;
    const viewport = bento.querySelector<HTMLElement>('.bento-carousel');
    const track = bento.querySelector<HTMLElement>('.bento-track');
    const cards = [...bento.querySelectorAll<HTMLElement>('.bento-card')];
    const bPrev = bento.querySelector<HTMLButtonElement>('.bento-arrow[data-dir="prev"]');
    const bNext = bento.querySelector<HTMLButtonElement>('.bento-arrow[data-dir="next"]');
    if (!viewport || !track || !cards.length) return;

    let active = Math.floor((cards.length - 1) / 2);
    let currentShift = 0;

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
    const onDragStart = (e: Event) => e.preventDefault();
    track.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    track.addEventListener('dragstart', onDragStart);

    const onCardClick = (i: number) => (e: Event) => {
      e.preventDefault();
      if (!moved && i !== active) setActive(i);
    };
    const cardHandlers = cards.map((c, i) => {
      const h = onCardClick(i);
      c.addEventListener('click', h);
      return h;
    });
    const onPrev = () => setActive(active - 1);
    const onNext = () => setActive(active + 1);
    if (bPrev) bPrev.addEventListener('click', onPrev);
    if (bNext) bNext.addEventListener('click', onNext);

    let bRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(bRaf);
      bRaf = requestAnimationFrame(() => render(false));
    };
    window.addEventListener('resize', onResize);
    render(false);
    if (document.fonts?.ready) void document.fonts.ready.then(() => render(false));

    return () => {
      track.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      track.removeEventListener('dragstart', onDragStart);
      cards.forEach((c, i) => c.removeEventListener('click', cardHandlers[i]));
      if (bPrev) bPrev.removeEventListener('click', onPrev);
      if (bNext) bNext.removeEventListener('click', onNext);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(bRaf);
    };
  }, []);

  return (
    <section id="bento" ref={rootRef}>
      <div className="bento-head">
        <div className="bento-head__text">
          <h2 className="bento-title">{title}</h2>
          <p className="bento-lede">{lede}</p>
        </div>
        <div className="bento-arrows">
          <button type="button" className="bento-arrow" data-dir="prev" aria-label="Previous use case"><span className="material-symbols-outlined">arrow_back</span></button>
          <button type="button" className="bento-arrow" data-dir="next" aria-label="Next use case"><span className="material-symbols-outlined">arrow_forward</span></button>
        </div>
      </div>

      <div className="bento-carousel">
        <div className="bento-track">
          {useCases.map((c, i) => (
            <a key={c.key} href="#" className={`bento-card bento-card--${c.color}`} style={{ '--i': i } as CSSProperties}>
              <div className="bento-card__top">
                <h3 className="bento-card__title">{c.title}</h3>
                <p className="bento-card__desc">{c.desc}</p>
              </div>
              <div
                className="bento-card__media"
                style={{ backgroundImage: `url(${c.img})`, backgroundSize: c.fit }}
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
