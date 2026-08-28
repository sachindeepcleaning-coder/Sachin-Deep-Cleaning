import { useEffect, useState } from 'react';
import { slotsLeft, randomCallbackTime } from '../lib/landing.js';

// Top red urgency bar with shimmer + live slot count.
export default function UrgencyBar() {
  const [slots, setSlots] = useState(5);

  useEffect(() => {
    const s = slotsLeft();
    setSlots(s);
    const el = document.getElementById('slotsForm') || document.querySelector('[data-slots]');
    if (el) el.textContent = s + ' left';
    const cb = document.getElementById('callbackTime');
    if (cb) cb.textContent = randomCallbackTime();
  }, []);

  return (
    <div className="urgency-bar">
      <span className="ub-live"><span className="ub-dot"></span>LIVE</span>
      🏠 Full Home Deep Cleaning in Gurgaon &nbsp;·&nbsp; Only <span className="ub-hl">{slots}</span> same-day slots left &nbsp;·&nbsp; 🎁 <span className="ub-hl">₹200 OFF</span> today
    </div>
  );
}