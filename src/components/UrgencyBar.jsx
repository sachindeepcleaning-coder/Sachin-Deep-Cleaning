import { useEffect, useState } from 'react';
import { randomCallbackTime } from '../lib/landing.js';

// Top urgency bar. Real benefits, no fake scarcity. Callback time is a real
// target (5-minute response) and rotates copy for variety, not to lie.
export default function UrgencyBar() {
  const [cb, setCb] = useState('5 min callback');
  const [date, setDate] = useState('');

  useEffect(() => {
    setCb(randomCallbackTime());
    const d = new Date();
    const opts = { weekday: 'long', day: 'numeric', month: 'short' };
    setDate(d.toLocaleDateString('en-IN', opts));
    const el = document.getElementById('callbackTime');
    if (el) el.textContent = 'under 5 min';
  }, []);

  return (
    <div className="urgency-bar">
      <span className="ub-live"><span className="ub-dot"></span>OPEN TODAY</span>
      🏠 Full Home Deep Cleaning in Gurgaon &nbsp;·&nbsp; <span className="ub-hl">{cb}</span> &nbsp;·&nbsp; 🎁 <span className="ub-hl">₹200 OFF</span> for new customers
    </div>
  );
}
