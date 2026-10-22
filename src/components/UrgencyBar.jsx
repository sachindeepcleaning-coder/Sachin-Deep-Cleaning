import { useEffect, useState } from 'react';

// Top urgency bar. Fully static markup: React hydrates this identically on
// server and client. (A previous version mutated #callbackTime — a node owned
// by QuoteForm, which may not be hydrated yet when this effect fires —
// causing hydration mismatch #425/#418 flakily on every page with a form.
// Never touch another component's DOM from here.)
export default function UrgencyBar() {
  const [date, setDate] = useState('');

  useEffect(() => {
    const d = new Date();
    const opts = { weekday: 'long', day: 'numeric', month: 'short' };
    setDate(d.toLocaleDateString('en-IN', opts));
  }, []);

  return (
    <div className="urgency-bar">
      <span className="ub-live"><span className="ub-dot"></span>OPEN 7 DAYS</span>
      🏠 Deep Cleaning in Gurgaon &nbsp;·&nbsp; <span className="ub-hl">fixed BHK price</span> &nbsp;·&nbsp; <span className="ub-hl">pay after walkthrough</span> &nbsp;·&nbsp; same-day slots when you book before noon
    </div>
  );
}
