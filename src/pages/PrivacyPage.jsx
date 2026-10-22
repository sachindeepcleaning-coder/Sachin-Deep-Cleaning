import { JsonLd, webpageSchema, breadcrumbSchema } from '../lib/schema.jsx';
import { pageUrl, CONTENT_UPDATED, PHONE, ADDRESS_FULL } from '../lib/site.js';

// The privacy page.
//
// Plain language, no legal claims we cannot support: this says exactly what
// the site collects, who receives it, and what the visitor can ask for. It is
// the page the forms point to, so it has to match what the code actually does
// (see src/lib/sendLead.js and public/beacon.js).

const COLLECTED = [
  ['Your name', 'You type it into a quote or contact form.'],
  ['Your mobile number', 'You type it into a quote or contact form. We use it to call you back about the job and to send the fixed price.'],
  ['The page you filled the form on', 'Sent with the enquiry so we know which service and price list you were looking at.'],
  ['Campaign details', 'If you arrived from an ad, we receive the campaign name and the ad click ID so the call can be matched to the ad that produced it.'],
  ['Any message you write', 'Sent as you typed it, so we know what you need done.'],
  ['Which pages you visited in this visit', 'Page paths only, in order, with how long each page was visible and how far you scrolled.'],
  ['Which buttons you clicked', 'Call, WhatsApp and form clicks are recorded so we know which part of the site is useful.'],
];

const PROCESSORS = [
  ['Cloudflare Worker (lead gateway)', 'Our own first-party server for enquiries. It receives your name, number, the page you were on, the campaign details and your message, and stores the lead so the team can call you.'],
  ['Cloudflare Worker (visit log)', 'Our own first-party analytics worker. It receives the page paths, how long each page was on screen, the campaign tags and which buttons you clicked, so we can read the reports. It never receives the values you type.'],
  ['Web3Forms', 'A form-delivery service used as a backup if the lead gateway does not confirm delivery. It receives the same enquiry details.'],
  ['Microsoft Clarity', 'Session recordings and heat maps, so we can see which parts of the site are useful. Form fields are masked, so what you type into a form is not recorded.'],
  ['Google Tag Manager (and Google Analytics)', 'Counts page views, call clicks and form submissions. The site does not send your name, number or message to it.'],
];

export default function PrivacyPage({ url }) {
  return (
    <>
      <JsonLd
        data={webpageSchema({
          title: 'Privacy — What We Collect and Who Sees It',
          description:
            'What this site collects when you call, WhatsApp or fill a form, who receives it, and how to ask us to delete it.',
          url,
          dateModified: CONTENT_UPDATED,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: pageUrl('index') },
          { name: 'Privacy', url },
        ], url)}
      />

      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <svg width="8" height="8" fill="#4ade80" strokeWidth="0"><circle cx="4" cy="4" r="4" /></svg>
              Sachin Deep Cleaning
            </div>
            <h1>
              <span className="hl">What We Collect</span><br />
              <span className="hl2">and Who Sees It</span>
            </h1>
            <p className="hero-sub">
              This page lists everything this site collects, in plain words. If something here is unclear, call us on {PHONE} and ask.
            </p>
            <div className="hero-pills">
              <span className="pill"><span className="pi">✓</span> No data sold on</span>
              <span className="pill"><span className="pi">✓</span> Your number only for your quote</span>
              <span className="pill"><span className="pi">✓</span> Ask us to delete it</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">Privacy</div>
            <h2 className="section-title">What we collect, and why</h2>
            <p className="section-sub" style={{ margin: '0 auto', maxWidth: '820px' }}>
              We collect the minimum needed to quote a clean and call you back. Here is the whole list.
            </p>
          </div>
          <div className="blog-ul" style={{ maxWidth: '860px', margin: '32px auto 0' }}>
            {COLLECTED.map(([what, why]) => (
              <li key={what}>
                <strong>{what}.</strong> {why}
              </li>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">Processors</div>
            <h2 className="section-title">Who receives it</h2>
            <p className="section-sub" style={{ margin: '0 auto', maxWidth: '820px' }}>
              Five services handle the data this site collects. We do not sell any of it, and we do not share it with advertisers.
            </p>
          </div>
          <div className="blog-ul" style={{ maxWidth: '860px', margin: '32px auto 0' }}>
            {PROCESSORS.map(([who, what]) => (
              <li key={who}>
                <strong>{who}.</strong> {what}
              </li>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">Your choices</div>
            <h2 className="section-title">What you can ask us to do</h2>
          </div>
          <div className="blog-ul" style={{ maxWidth: '860px', margin: '32px auto 0' }}>
            <li>
              <strong>Ask what we hold.</strong> Call {PHONE} with the number you gave us and we will tell you what we have for
              it and when it was collected.
            </li>
            <li>
              <strong>Ask us to delete it.</strong> We will delete the enquiry, the call notes and the campaign details for your
              number, and tell you when it is done.
            </li>
            <li>
              <strong>Ask us to stop calling.</strong> We use your number to call you about the quote you asked for. If you ask us
              to stop, we will.
            </li>
            <li>
              <strong>Use the site without the form.</strong> Calling or WhatsApp {PHONE} works the same way and needs no form.
            </li>
          </div>
          <p style={{ textAlign: 'center', marginTop: '28px', color: 'var(--muted)' }}>
            Sachin Deep Cleaning · {ADDRESS_FULL} · {PHONE}
          </p>
        </div>
      </section>
    </>
  );
}
