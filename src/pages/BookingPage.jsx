import QuoteForm from '../components/QuoteForm.jsx';
import TrustBar from '../components/TrustBar.jsx';
import AreasSection from '../components/AreasSection.jsx';
import FaqSection from '../components/FaqSection.jsx';
import FinalCta from '../components/FinalCta.jsx';
import { JsonLd, localBusinessSchema, faqSchema, serviceSchema } from '../lib/schema.jsx';

// App-less online booking landing page: the no-app answer to
// "cleaning services app / house cleaning app / instant maid" searches.
// WhatsApp/call booking that beats a 7-screen app checkout.
const BENEFITS = [
  ['💬', '30-Second Booking', 'One WhatsApp message with BHK + sector — no download, no account, no OTP loops. Fixed price locked on the call in under 30 minutes.'],
  ['⚡', 'Same-Day Before Noon', 'Message in the morning, team at your door the same day across DLF, Sohna Road, Golf Course Road and all sectors.'],
  ['💰', 'Pay After Walkthrough', 'UPI, cash or card only after you inspect every room. Zero advance — apps charge you before the cleaner arrives.'],
  ['🔄', 'Free Rescheduling', 'Plans change? One message moves your slot free. No app cancellation windows, no penalty logic.'],
];

const STEPS = [
  ['Message your BHK', 'WhatsApp +91 9267905943 — sector, BHK, preferred date. Thirty seconds of typing.'],
  ['Get fixed price', 'Itemised quote on the call: rooms, bathrooms, kitchen, add-ons. Locked, no asterisks.'],
  ['Team arrives equipped', 'Police-verified crew with machines and eco-friendly products. Team-lead number shared beforehand.'],
  ['Approve, then pay', 'Walk every room first. Pay only on approval; misses re-cleaned on the spot, free.'],
];

const FAQS = [
  ['How is booking on WhatsApp better than a cleaning app?', 'Speed and accountability: one message reaches the manager who sets your price and slot — no 7-screen checkout, no account, no dynamic surge pricing. Same verified teams, same machines, pay-after terms either way.'],
  ['Do I need to create an account or pay in advance?', 'Neither. No app, no account, zero advance — ever. Your booking lives in a WhatsApp thread you can scroll, and payment happens only after the walkthrough.'],
  ['How fast is “instant” booking really?', 'Message before noon for same-day slots in most Gurgaon sectors; the fixed-price confirmation lands in under 30 minutes in working hours (8 AM–8 PM, all 7 days).'],
  ['Can I reschedule or cancel online?', 'Yes — one message moves or cancels free of charge, even morning-of. Compare that against app cancellation windows before you commit elsewhere.'],
  ['Is my number and address safe without an app?', 'Your details stay in a private chat with our booking desk — no app permissions, no location tracking, no data harvesting. Key-pouch + photo-log system for working couples.'],
  ['What if I need a daily maid, not a one-time clean?', 'We will tell you honestly: daily chores need a maid agency, not us. Read our house-maid-vs-deep-cleaning guide first — then book us for weekly upkeep (from ₹499/visit) and quarterly resets.'],
  ['Online booking Gurgaon me kaise karein bina app ke?', 'WhatsApp +91 9267905943 par BHK + sector bhejein — 30 minute me fixed price, same-day slot dopahar se pehle message par. Kaam ke baad payment, advance kabhi nahi.'],
  ['Can I book for my parents’ home in another sector?', 'Yes — share their sector, BHK and a contact number; we confirm the slot with you, clean with a walkthrough to them on video call if needed, and you pay on UPI after their approval. Popular for NRI families booking from abroad.'],
  ['Do you serve Delhi or Noida for online bookings?', 'Our teams cover all of Gurgaon (DLF to Manesar) same-day. Delhi/Noida requests are quoted case-by-case on WhatsApp depending on crew routing — message us and we confirm honestly instead of overpromising.'],
];

export default function BookingPage({ url }) {
  return (
    <>
      <JsonLd data={localBusinessSchema({ url })} />
      <JsonLd data={serviceSchema({ name: 'Book Cleaning Online in Gurgaon — No App Needed', description: 'Book house and deep cleaning online in Gurgaon without any app: WhatsApp booking in 30 seconds, same-day slots, fixed price, pay after walkthrough.', url })} />
      <JsonLd data={faqSchema(FAQS.map(([q, a]) => ({ q, a })))} />

      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <svg width="8" height="8" fill="#4ade80" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
              No App · No Account · Instant Confirm
            </div>
            <h1>
              <span className="hl">Book Cleaning Online in Gurgaon</span><br />
              Without Any <span className="hl2">App Download</span>
            </h1>
            <p className="hero-sub">
              Skip the 7-screen app checkout. One WhatsApp message books verified deep cleaning with a
              fixed price and <strong>pay-after-walkthrough</strong> — serving Gurgaon since <strong>2015</strong>.
            </p>
            <div className="hero-pills">
              <span className="pill"><span className="pi">✓</span> 30-Second Booking</span>
              <span className="pill"><span className="pi">✓</span> Same-Day Slots</span>
              <span className="pill"><span className="pi">✓</span> Pay After Cleaning</span>
              <span className="pill"><span className="pi">✓</span> Police-Verified Team</span>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <TrustBar />

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">Why No-App Wins</div>
            <h2 className="section-title">App Checkout vs One Message</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Apps are great software. But for booking a cleaner, a direct line beats a download every time.</p>
          </div>
          <div className="whyus-grid">
            {BENEFITS.map(([icon, title, desc]) => (
              <div key={title} className="why-card fade-up">
                <div className="why-icon">{icon}</div>
                <div>
                  <div className="why-title">{title}</div>
                  <div className="why-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">How It Works</div>
            <h2 className="section-title">Booked Before Your Tea Cools</h2>
          </div>
          <div className="hiw-wrap" style={{ marginTop: '36px' }}>
            {STEPS.map(([title, desc], i) => (
              <div key={title} className="hiw-step fade-up">
                <div className="hiw-num">{i + 1}</div>
                <div className="hiw-title">{title}</div>
                <div className="hiw-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }} className="fade-up">
            <div className="section-tag">Honest Note</div>
            <h2 className="section-title">If You Need a Daily Maid, We’ll Say So</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>We sell professional cleaning visits — not live-in maids. If your need is daily chores, our house-maid-vs-deep-cleaning guide maps the right hire, and our weekly plans (from ₹499/visit) cover everything between maid days and quarterly resets. No bait, no app required to find out.</p>
          </div>
          <div className="fade-up" style={{ marginTop: 32, overflowX: 'auto', borderRadius: 14, border: '1px solid var(--border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--card)' }}>
              <thead><tr style={{ background: 'var(--primary)' }}><th style={{ padding: '14px 20px', color: '#fff', textAlign: 'left' }}>Booking</th><th style={{ padding: '14px 20px', color: '#fff', textAlign: 'left' }}>Fixed Price</th><th style={{ padding: '14px 20px', color: '#fff', textAlign: 'left' }}>Time</th></tr></thead>
              <tbody>
                {[
                  ['1 RK / Studio deep clean', 'From ₹2,000', '3–5 hrs'],
                  ['1 BHK deep clean', 'From ₹2,500', '5–6 hrs'],
                  ['2 BHK deep clean', 'From ₹4,500', '7–8 hrs'],
                  ['3 BHK deep clean', 'From ₹5,500', '9–10 hrs'],
                  ['Weekly house cleaning', 'From ₹499/visit', '2–3 hrs'],
                  ['Kitchen / Bathroom', '₹1,500+ / ₹800+', '3–4 / 1.5–2 hrs'],
                ].map(([a, b, c], i) => (
                  <tr key={a} style={{ background: i % 2 ? 'var(--card)' : 'var(--bg-alt)' }}>
                    <td style={{ padding: '13px 20px', borderBottom: '1px solid var(--border)' }}>{a}</td>
                    <td style={{ padding: '13px 20px', borderBottom: '1px solid var(--border)', color: 'var(--primary)', fontWeight: 700 }}>{b}</td>
                    <td style={{ padding: '13px 20px', borderBottom: '1px solid var(--border)' }}>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="section-sub" style={{ margin: '16px auto 0', textAlign: 'center' }}>Every figure locked on the confirmation call — identical in DLF, Sohna Road, Golf Course Road and all sectors.</p>
        </div>
      </section>

      <AreasSection />

      <section className="section section-alt">
        <div className="section-inner">
          <div className="faq-wrap">
            <div style={{ textAlign: 'center' }} className="fade-up">
              <div className="section-tag">FAQ</div>
              <h2 className="section-title">Online Booking Questions</h2>
            </div>
            <FaqSection faqs={FAQS} />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
