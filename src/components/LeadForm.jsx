import { useState, useRef } from 'react';
import { PHONE, waMsg } from '../lib/site.js';
import { sendLead } from '../lib/sendLead.js';
import { track, whatsappClick } from '../lib/landing.js';
import { normalizePhone, isValidPhone } from '../lib/phone.js';
import { focusField, cgFormRejected } from '../lib/formReject.js';

// Simple lead form posting to Web3Forms, then redirecting to thank-you.html.
//
// Owner priority: never lose a lead, never fake a conversion.
//  - The phone field used to carry pattern="[0-9+ ]{8,15}", so a visitor who
//    typed "98739-15215" FAILED the browser's own validation: the browser
//    blocked the submit with a native bubble and the lead was lost before
//    anything else happened. The field now takes any way a number is typed
//    and the value that is SENT is always the canonical 10 digits.
//  - A submit the site refuses (or a send that fails) creates no lead, so
//    click-guard is told to undo the conversion it recorded.
export default function LeadForm({ formName = 'lead', source = 'Website', compact = false }) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const phoneRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Normalise ONCE, here — never while typing. The visitor may type
    // "+91 98739-15215" or a leading 0; the raw-ish value stays in the field
    // and is canonicalised at submit, so the gateway, the Sheet and the owner
    // all get the same 10 digits and a valid number is never refused.
    const p = normalizePhone(phone);
    if (!isValidPhone(p)) {
      setStatus('idle');
      setError('❌ Enter a valid 10-digit mobile number (it starts with 6-9).');
      // The site refused this submit -> no lead -> click-guard must not
      // count it as a conversion.
      cgFormRejected();
      focusField(phoneRef.current);
      return;
    }
    setStatus('sending');
    const data = new FormData(e.target);
    const ok = await sendLead({
      name: String(data.get('name') || '').trim(),
      phone: p,
      source,
      fields: { message: String(data.get('message') || '').trim() },
    });
    if (ok) {
      track('generate_lead', { event_category: 'Lead', event_label: 'Lead Form' });
      window.setTimeout(() => { window.location.href = '/thank-you.html'; }, 250);
      return;
    }
    setStatus('idle');
    setError(`❌ Couldn't send your request. Please call ${PHONE} or`);
    // The send failed, so no lead exists on the site either — click-guard
    // must not count this as a conversion.
    cgFormRejected();
    focusField(phoneRef.current);
  };

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value={formName} />
      <input type="hidden" name="source" value={source} />
      <div className={compact ? 'hero-form-row' : ''}>
        <div>
          <label htmlFor={`${formName}-name`}>Your Name *</label>
          <input id={`${formName}-name`} name="name" placeholder="e.g. Rahul Sharma" required />
        </div>
        <div>
          <label htmlFor={`${formName}-phone`}>Phone Number *</label>
          {/* No pattern attribute: a hyphenated / spaced / +91 number used to
              fail the browser's own validation, which blocked the submit and
              LOST the lead. The digits are stripped as they are typed (13
              digits, so "+91 98739-15215" still fits) and the canonical 10
              digits are what gets sent. */}
          <input
            id={`${formName}-phone`}
            name="phone"
            type="tel"
            placeholder="+91 9560739281"
            inputMode="numeric"
            maxLength="13"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 13))}
            ref={phoneRef}
          />
        </div>
      </div>
      <div>
        <label htmlFor={`${formName}-msg`}>Message</label>
        <textarea id={`${formName}-msg`} name="message" rows="3" placeholder="Tell us about your cleaning needs" />
      </div>
      <button type="submit" className="btn btn-secondary btn-block" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Get Free Quote'}
      </button>
      {error && (
        <p className="form-error">
          {error}{' '}
          <a href={waMsg('Hi, my quote request on your website did not go through. Please call me back.')} target="_blank" rel="noopener" onClick={whatsappClick}>
            WhatsApp us →
          </a>
        </p>
      )}
      <p className="lead-note">We’ll call you back to confirm your booking.</p>
    </form>
  );
}
