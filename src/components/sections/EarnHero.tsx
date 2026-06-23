'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Auto-cycling split hero (ISO-Meet style) for the For Humans page.
// Left: badge → mixed-style headline → subtext → email capture → social proof.
// Right: rounded image carousel of real-world errands, with floating cards.

type Slide = {
  img: string;
  alt: string;
  review: { stars: number; quote: string; name: string; role: string; avatar: string };
  meta: { place: string; region: string; date: string };
};

const SLIDES: Slide[] = [
  {
    img: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1100&q=80&auto=format&fit=crop',
    alt: 'A Quest Hero helping at a local store counter',
    review: { stars: 5, quote: 'Showed up early and handled everything — made my launch day stress-free.', name: 'Linda White', role: 'Event organiser', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=faces&auto=format&q=80' },
    meta: { place: 'Austin', region: 'TX, USA', date: 'Sunday, 28 Mar' },
  },
  {
    img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1100&q=80&auto=format&fit=crop',
    alt: 'A Quest Hero completing a hands-on cleaning task',
    review: { stars: 5, quote: 'Fast, thorough and professional. Booked the same Hero again the next week.', name: 'Marcus Lee', role: 'Café owner', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=faces&auto=format&q=80' },
    meta: { place: 'Denver', region: 'CO, USA', date: 'Tuesday, 12 Apr' },
  },
  {
    img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1100&q=80&auto=format&fit=crop',
    alt: 'Quest Heroes moving and setting up for a job',
    review: { stars: 5, quote: 'Two Heroes moved everything in under an hour. Worth every cent.', name: 'Priya Shah', role: 'Small-business owner', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces&auto=format&q=80' },
    meta: { place: 'Seattle', region: 'WA, USA', date: 'Friday, 3 May' },
  },
  {
    img: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=1100&q=80&auto=format&fit=crop',
    alt: 'A Quest Hero running a grocery errand',
    review: { stars: 5, quote: 'Picked up the whole list and dropped it at my door. Total lifesaver.', name: 'Dana Romero', role: 'Busy parent', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=faces&auto=format&q=80' },
    meta: { place: 'Miami', region: 'FL, USA', date: 'Saturday, 18 May' },
  },
];

const AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces&auto=format&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces&auto=format&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces&auto=format&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces&auto=format&q=80',
];

export default function EarnHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 3200);
    return () => clearInterval(id);
  }, [paused]);

  const s = SLIDES[active];

  return (
    <section id="earn-hero2">
      <div className="eh2x">
        {/* Left column */}
        <div className="eh2x__content">
          <h1 className="eh2x__title">
            Errands. <em>Events.</em> Delivery.<br />
            <span className="eh2x__title-2">Finally, real work that <em>pays.</em></span>
          </h1>

          <p className="eh2x__body">
            Become a Quest Hero and get paid for real-world tasks — from errands and events
            to content, delivery, and field work.
          </p>

          <div className="eh2x__ctas">
            <Link href="/signup" className="eh2x__cta">Become a Hero</Link>
            <Link href="/browse-quest" className="eh2x__cta-ghost">
              See available tasks
              <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>

          <div className="eh2x__proof">
            <div className="eh2x__avatars" aria-hidden="true">
              {AVATARS.map((a, i) => (
                <img key={i} src={a} alt="" width={28} height={28} loading="lazy" />
              ))}
            </div>
            <p className="eh2x__proof-text"><strong>5,000+ Heroes</strong> already signed up for early access</p>
          </div>
        </div>

        {/* Right column — carousel */}
        <div
          className="eh2x__media"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="eh2x__stage">
            {SLIDES.map((sl, i) => (
              <img
                key={i}
                src={sl.img}
                alt={sl.alt}
                className={`eh2x__slide${i === active ? ' is-active' : ''}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            ))}

            {/* Floating review card */}
            <div className="eh2x__card eh2x__card--review" key={`r-${active}`}>
              <div className="eh2x__stars" aria-label={`${s.review.stars} out of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`material-symbols-outlined${i < s.review.stars ? ' is-on' : ''}`}>star</span>
                ))}
              </div>
              <p className="eh2x__quote">{s.review.quote}</p>
              <div className="eh2x__reviewer">
                <img src={s.review.avatar} alt="" width={32} height={32} loading="lazy" />
                <span><b>{s.review.name}</b><small>{s.review.role}</small></span>
              </div>
            </div>

            {/* Floating meta card */}
            <div className="eh2x__card eh2x__card--meta" key={`m-${active}`}>
              <span className="eh2x__meta-row">
                <span className="material-symbols-outlined" aria-hidden="true">location_on</span>
                <span><b>{s.meta.place}</b><small>{s.meta.region}</small></span>
              </span>
              <span className="eh2x__meta-row">
                <span className="material-symbols-outlined" aria-hidden="true">calendar_today</span>
                <span><b>{s.meta.date}</b><small>Quest booked</small></span>
              </span>
            </div>
          </div>

          {/* Dots */}
          <div className="eh2x__dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`eh2x__dot${i === active ? ' is-active' : ''}`}
                aria-label={`Show slide ${i + 1}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
