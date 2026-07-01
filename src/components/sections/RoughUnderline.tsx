'use client';

import { useEffect, useRef } from 'react';
import { annotate } from 'rough-notation';

/**
 * Hand-drawn rough-notation underline, drawn once the wrapped text scrolls
 * into view (and the fonts have settled so the box is stable). Same library
 * the hero "human" highlight uses.
 */
export default function RoughUnderline({
  children,
  className,
  color = '#FF5A47',
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let anno: ReturnType<typeof annotate> | null = null;
    let shown = false;

    const draw = () => {
      // wait until the span has a laid-out box (fonts loaded)
      if (el.getBoundingClientRect().width < 1) {
        requestAnimationFrame(draw);
        return;
      }
      anno?.remove();
      anno = annotate(el, {
        type: 'underline',
        color,
        strokeWidth: 3,
        animationDuration: 700,
        padding: 2,
        multiline: true,
      });
      anno.show();
      shown = true;
    };
    const trigger = () => {
      if (document.fonts?.ready) void document.fonts.ready.then(() => requestAnimationFrame(draw));
      else requestAnimationFrame(draw);
      setTimeout(draw, 700); // rAF-throttled-before-paint fallback
    };

    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            trigger();
            io?.disconnect();
          }
        },
        { threshold: 0.6 },
      );
      io.observe(el);
    } else {
      trigger();
    }

    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => {
      if (!shown) return;
      clearTimeout(rt);
      rt = setTimeout(draw, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      io?.disconnect();
      window.removeEventListener('resize', onResize);
      clearTimeout(rt);
      anno?.remove();
    };
  }, [color]);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
