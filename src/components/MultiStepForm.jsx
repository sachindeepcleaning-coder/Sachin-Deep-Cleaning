import { useState, useEffect, useRef } from 'react';
import { PHONE, waMsg } from '../lib/site.js';
import { sendLead } from '../lib/sendLead.js';
import { track, whatsappClick } from '../lib/landing.js';
import { normalizePhone, isValidPhone } from '../lib/phone.js';
import { focusField, cgFormRejected } from '../lib/formReject.js';

const STEPS = [{ title: 'Your Details' }, { title: 'Service' }, { title: 'Schedule' }];
const STORAGE_KEY = 'sdc_lead';

// Multi-step quote form: progress bar, localStorage draft, Web3Forms submit.
//
// Owner priority: never lose a lead, never fake a conversion.
//  - The phone field used to carry pattern="[0-9+ ]{8,15}". The browser's
//    own validation runs BEFORE the submit event, so a hyphenated / spaced
//    number never even reached the submit handler — the visitor was stuck on
//    a native bubble and the lead was lost.
//  - The "Next" button is a plain button, so the browser never checks the
//    phone at all: the number is validated here, on submit, and a submit the
//    site refuses (or a send that fails) tells click-guard to undo the
//    conversion it recorded.
export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: '', phone: '', service: '', date: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [focusPhone, setFocusPhone] = useState(false);
  const phoneRef = useRef(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) {
        const saved = JSON.parse(s);
        // A restored draft may hold an old raw number ("+91 98739-15215") —
        // put the canonical digits back in the field.
        setData((d) => ({ ...d, ...saved, phone: normalizePhone(saved && saved.phone) }));
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }, [data]);

  // The phone field only exists on step 1, so bringing the focus back to it
  // means going back to that step first.
  useEffect(() => {
    if (!focusPhone || step !== 0) return;
    setFocusPhone(false);
    if (phoneRef.current) focusField(phoneRef.current);
  }, [focusPhone, step]);

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  // The site refused this submit: no lead was created, so click-guard must
  // not count it as a conversion and the visitor must land back on the field
  // that has to be fixed. The service / date / message the visitor already
  // picked are kept (state + localStorage draft), so a retry is 2 clicks.
  const rejectSubmit = (message) => {
    setStatus('idle');
    setError(message);
    cgFormRejected();
    setStep(0);
    setFocusPhone(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    // Normalise ONCE, here — never while typing. "+91 98739-15215" and
    // "09873915215" become the canonical 10 digits the gateway accepts.
    const p = normalizePhone(data.phone);
    if (!isValidPhone(p)) {
      rejectSubmit('❌ Enter a valid 10-digit mobile number (it starts with 6-9).');
      return;
    }
    setStatus('sending');
    const ok = await sendLead({
      name: data.name,
      phone: p,
      source: 'Multi-Step Form',
      fields: { service: data.service, date: data.date, message: data.message },
    });
    if (ok) {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      track('generate_lead', { event_category: 'Lead', event_label: 'Multi-Step Form' });
      window.setTimeout(() => { window.location.href = '/thank-you.html'; }, 250);
      return;
    }
    // The send failed, so no lead exists on the site either — click-guard
    // must not count this as a conversion.
    rejectSubmit(`❌ Couldn't send your request. Please call ${PHONE} or`);
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
          {/* No pattern attribute: a hyphenated / spaced / +91 number used to
              fail the browser's own validation. The digits are stripped as
              they are typed (13 digits, so "+91 98739-15215" still fits) and
              the canonical 10 digits are what gets sent. */}
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => set('phone', e.target.value.replace(/\D/g, '').slice(0, 13))}
            inputMode="numeric"
            maxLength="13"
            autoComplete="tel"
            required
            ref={phoneRef}
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
      <p className="form-consent" style={{ fontSize: '.78rem', color: 'var(--muted)', margin: '10px 0 0' }}>
        By sending this form you agree that we may use your number and message to quote and call you about this
        job. See the <a href="/privacy.html" style={{ color: 'var(--primary)', fontWeight: 600 }}>privacy page</a>.
      </p>

      </div>
      {error && (
        <p className="form-error">
          {error}{' '}
          <a href={waMsg('Hi, my booking request on your website did not go through. Please call me back.')} target="_blank" rel="noopener" onClick={whatsappClick}>
            WhatsApp us →
          </a>
        </p>
      )}
    </form>
  );
}
