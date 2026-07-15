import { useState, useEffect } from 'react';
import { FORMSPREE_ID } from '../lib/site.js';

const STEPS = [{ title: 'Your Details' }, { title: 'Service' }, { title: 'Schedule' }];
const STORAGE_KEY = 'sdc_lead';

// Multi-step quote form: progress bar, localStorage draft, Formspree submit.
export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: '', phone: '', service: '', date: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) setData((d) => ({ ...d, ...JSON.parse(s) }));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }, [data]);

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    const fd = new FormData();
    fd.append('form-name', 'lead-multistep');
    Object.entries(data).forEach(([k, v]) => fd.append(k, v));
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
        window.location.href = 'thank-you.html';
        return;
      }
      const b = await res.json().catch(() => ({}));
      throw new Error(b?.errors?.[0]?.message || 'Something went wrong. Please try again.');
    } catch (err) {
      setStatus('idle');
      setError(err.message);
    }
  };

  return (
    <form className="multistep" onSubmit={submit}>
      <div className="steps-bar">
        {STEPS.map((s, i) => (
          <div key={i} className={`bar${i <= step ? ' done' : ''}`} />
        ))}
      </div>
      <p className="text-muted" style={{ marginBottom: 16 }}>
        Step {step + 1} of {STEPS.length}: {STEPS[step].title}
      </p>

      {step === 0 && (
        <>
          <label>Your Name *</label>
          <input value={data.name} onChange={(e) => set('name', e.target.value)} required />
          <label>Phone *</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => set('phone', e.target.value)}
            pattern="[0-9+ ]{8,15}"
            required
          />
        </>
      )}
      {step === 1 && (
        <>
          <label>Service Needed</label>
          <input value={data.service} onChange={(e) => set('service', e.target.value)} placeholder="e.g. 2 BHK deep cleaning" />
          <label>Message</label>
          <textarea rows="3" value={data.message} onChange={(e) => set('message', e.target.value)} />
        </>
      )}
      {step === 2 && (
        <>
          <label>Preferred Date</label>
          <input type="date" value={data.date} onChange={(e) => set('date', e.target.value)} />
          <p className="lead-note">We’ll confirm the exact time by phone.</p>
        </>
      )}

      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        {step > 0 && (
          <button type="button" className="btn btn-outline" onClick={prev}>
            Back
          </button>
        )}
        {step < STEPS.length - 1 && (
          <button type="button" className="btn btn-primary" onClick={next}>
            Next
          </button>
        )}
        {step === STEPS.length - 1 && (
          <button type="submit" className="btn btn-secondary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Submit'}
          </button>
        )}
      </div>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}
