'use client';

import { useEffect } from 'react';

// Drives the "antigravity" ring-particles field on the post-quest hero — the
// same Houdini paint worklet + cursor tracking used by the homepage #welcome
// section (see PageScript). All visuals come from the global #welcome CSS;
// this just registers the worklet and feeds it --ring-x/--ring-y on pointermove.
export default function PostQuestAntigravity() {
  useEffect(() => {
    if (!('paintWorklet' in CSS)) return;

    (CSS as unknown as { paintWorklet: { addModule: (u: string) => void } }).paintWorklet.addModule(
      'https://unpkg.com/css-houdini-ringparticles/dist/ringparticles.js'
    );

    const welcome = document.querySelector<HTMLElement>('#welcome');
    if (!welcome) return;

    let isInteractive = false;
    const onMove = (e: PointerEvent) => {
      if (!isInteractive) {
        welcome.classList.add('interactive');
        isInteractive = true;
      }
      welcome.style.setProperty('--ring-x', String((e.clientX / window.innerWidth) * 100));
      welcome.style.setProperty('--ring-y', String((e.clientY / window.innerHeight) * 100));
      welcome.style.setProperty('--ring-interactive', '1');
    };
    const onLeave = () => {
      welcome.classList.remove('interactive');
      isInteractive = false;
      welcome.style.setProperty('--ring-x', '50');
      welcome.style.setProperty('--ring-y', '50');
      welcome.style.setProperty('--ring-interactive', '0');
    };

    welcome.addEventListener('pointermove', onMove);
    welcome.addEventListener('pointerleave', onLeave);
    return () => {
      welcome.removeEventListener('pointermove', onMove);
      welcome.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return null;
}
