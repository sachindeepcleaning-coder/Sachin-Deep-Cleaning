import { useEffect, useRef, useState } from 'react';
import { SOCIAL_PROOF_BOOKINGS, TIME_AGO } from '../lib/landing.js';

const VISIBLE_MS = 5000;
const CYCLE_MS = 25000;
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function SocialProofPopup() {
  const [show, setShow] = useState(false);
  const [entry, setEntry] = useState(SOCIAL_PROOF_BOOKINGS[0]);
  const [time, setTime] = useState(TIME_AGO[0]);
  const nextTimer = useRef(null);
  const cycleTimer = useRef(null);

  // Everything is deferred: nothing runs on page load. The popup only starts
  // once the browser is idle AND the user has shown engagement (first scroll,
  // tap or keypress), so low-end phones never pay main-thread cost up front.
  // Timers pause while the tab is hidden and the repeating cycle is cleared
  // properly instead of spinning forever.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    let armed = false;

    const pickAndShow = () => {
      setEntry(rand(SOCIAL_PROOF_BOOKINGS));
      setTime(rand(TIME_AGO));
      setShow(true);
      nextTimer.current = setTimeout(() => {
        setShow(false);
        cycleTimer.current = setInterval(() => {
          if (document.hidden) return;
          setEntry(rand(SOCIAL_PROOF_BOOKINGS));
          setTime(rand(TIME_AGO));
          setShow(true);
          nextTimer.current = setTimeout(() => setShow(false), VISIBLE_MS);
        }, CYCLE_MS);
      }, VISIBLE_MS);
    };

    const start = () => {
      if (armed) return;
      armed = true;
      const target = document.querySelector('.section');
      if (!target) { pickAndShow(); return; }
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { io.disconnect(); pickAndShow(); }
      }, { threshold: 0.3 });
      io.observe(target);
    };

    const idle = (window.requestIdleCallback || ((cb) => setTimeout(cb, 800)))(start);
    const engage = () => start();
    ['scroll', 'pointerdown', 'keydown'].forEach((ev) =>
      window.addEventListener(ev, engage, { passive: true, once: true })
    );

    return () => {
      if (idle && typeof idle.cancel === 'function') idle.cancel();
      clearTimeout(nextTimer.current);
      clearInterval(cycleTimer.current);
      ['scroll', 'pointerdown', 'keydown'].forEach((ev) =>
        window.removeEventListener(ev, engage)
      );
    };
  }, []);

  return (
    <div className={`booking-popup${show ? ' show' : ''}`} id="bookingPopup" aria-hidden={!show}>
      <div className="bp-av">{entry[0]}</div>
      <div>
        <div className="bp-name">{entry[1]} ({entry[3]})</div>
        <div className="bp-detail">{entry[2]}</div>
        <div className="bp-time">{time}</div>
      </div>
    </div>
  );
}