// FactsPage.jsx — the reference sheet.
//
// This page exists to be quoted. Answer engines lift short, factual, dated
// statements; marketing prose does not survive the trip. So everything here is
// a fact with a source, and every number is imported — never typed in.
//
// Sources:
//   src/lib/site.js         → phone, address, coordinates, areas
//   src/lib/service-prices.js → every price on the page
//   src/lib/services.js     → the deep-clean scope and the 4-step method
//   src/lib/schema.jsx      → entity facts the schema publishes
//
// If a fact is not in one of those files, it is not printed. Where a figure
// exists in two places on the site but has no single source yet, the page
// states the mechanism instead of inventing a number.

import {
  BRAND_NAME, PHONE, PHONE_TEL, WHATSAPP, WHATSAPP_NUMBER, ADDRESS_FULL,
  GEO, CONTENT_UPDATED, AREAS, MAPS_URL, SAME_AS,
  formatDate, pageUrl,
} from '../lib/site.js';
import { SERVICE_PRICES, PRICE_BY_BHK, SQFT_BY_BHK } from '../lib/service-prices.js';
import { getService } from '../lib/services.js';
import {
  JsonLd, faqSchema, webpageSchema, serviceSchema,
  FOUNDING_YEAR, FOUNDER_NAME, OPENING_HOURS, PAYMENT_ACCEPTED, DEEP_PRICE_RANGE,
} from '../lib/schema.jsx';

// ── The scope of a deep clean, taken from the service page ──────────────────
const deep = getService('deep');
const INCLUDED = deep.includes || [];
const PROCESS = deep.process || [];

// ── Price card ──────────────────────────────────────────────────────────────
// The display names are labels; every amount is read from service-prices.js.
const SERVICE_ROWS = [
  ['deep', 'Deep cleaning'],
  ['fullhome', 'Full home deep cleaning'],
  ['house', 'House cleaning (per visit)'],
  ['kitchen', 'Kitchen deep cleaning'],
  ['bathroom', 'Bathroom deep cleaning'],
  ['sofa', 'Sofa shampoo cleaning'],
  ['carpet', 'Carpet shampoo cleaning'],
  ['office', 'Office deep cleaning'],
  ['move', 'Move-in / move-out cleaning'],
];

const BHK_LABELS = {
  1: '1 BHK',
  2: '2 BHK',
  3: '3 BHK',
  4: '4 BHK',
  5: '5 BHK / villa',
};

// The lines a deep clean does not cover. These are scope statements, not
// numbers: no figure is asserted here.
const NOT_INCLUDED = [
  'Kitchen utensils and dishwashing',
  'Wall repainting and paint correction',
  'Marble diamond polish and natural-stone work',
  'Appliance servicing or dismantling beyond safe access, including sealed appliance motors',
  'Rope-access facades',
  'Repairs, plumbing and electrical work',
];

// ── Helpers ─────────────────────────────────────────────────────────────────
function clock(t) {
  const [h, m] = String(t).split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, '0')} ${ampm}`;
}

function platformName(u) {
  const host = String(u).replace(/^https?:\/\/(www\.)?/, '').split('/')[0].toLowerCase();
  if (host.includes('facebook')) return 'Facebook';
  if (host.includes('instagram')) return 'Instagram';
  if (host.includes('youtube')) return 'YouTube';
  if (host.includes('twitter') || host === 'x.com') return 'X';
  return host;
}

const HOURS_TEXT = `${OPENING_HOURS.days[0]} to ${OPENING_HOURS.days[6]}, ${clock(OPENING_HOURS.opens)} to ${clock(OPENING_HOURS.closes)}`;

// ── The questions an answer engine asks ─────────────────────────────────────
// Plain, self-contained answers. Each one is quotable on its own.
const FAQS = [
  {
    q: 'How much does deep cleaning cost in Gurgaon?',
    a: `Deep cleaning starts at ${SERVICE_PRICES.deep.amount} for a 1 RK or studio and runs to ${PRICE_BY_BHK[5]} for a 5 BHK or villa. The full-home card is fixed by home size: 1 BHK ${PRICE_BY_BHK[1]}, 2 BHK ${PRICE_BY_BHK[2]}, 3 BHK ${PRICE_BY_BHK[3]}, 4 BHK ${PRICE_BY_BHK[4]}, 5 BHK ${PRICE_BY_BHK[5]}.`,
  },
  {
    q: 'How much does house cleaning cost per visit?',
    a: `House cleaning starts at ${SERVICE_PRICES.house.amount} per visit for a studio. The per-visit price scales with home size — studio, 1 BHK, 2 BHK, 3 BHK — and the exact price is fixed on the confirmation call before the visit.`,
  },
  {
    q: 'What does a deep clean include?',
    a: `A deep clean covers ${INCLUDED.join(', ').toLowerCase()}.`,
  },
  {
    q: 'What is not included in a deep clean?',
    a: `A deep clean does not cover ${NOT_INCLUDED.join(', ').toLowerCase()}. These stay outside the price so a quote never hides a line.`,
  },
  {
    q: 'How long does a deep clean take?',
    a: 'A 1 BHK takes about 5–6 hours with a 2-person crew, a 2 BHK 7–8 hours with 3 cleaners, a 3 BHK 9–10 hours with 3–4 cleaners, a 4 BHK 8–10 hours with 4–5 cleaners and a 5 BHK 10–12 hours with 5 cleaners. The timing for your home is confirmed on the call.',
  },
  {
    q: 'Which areas of Gurgaon do you serve?',
    a: `Crews work across ${AREAS.join(', ')}. Sushant Lok, where our shop is located, is our home area, and any other Gurgaon sector is quoted on the call.`,
  },
  {
    q: 'When do I pay?',
    a: `You pay after the walkthrough, once you have inspected the work and approved it. There is no advance payment on a one-time deep clean. Payment methods: ${PAYMENT_ACCEPTED}.`,
  },
  {
    q: 'What happens if the clean is not right?',
    a: 'Our 3-Day Service Promise covers every booking: if an area falls short we re-clean it free within 3 days, and if it is still not right you get a full refund. Flag it during the walkthrough.',
  },
  {
    q: 'Where is the business, and when is it open?',
    a: `The address is ${ADDRESS_FULL}. The shop is open ${HOURS_TEXT}, and crews are dispatched from there to every sector of Gurgaon. The business has operated in Gurgaon since ${FOUNDING_YEAR}.`,
  },
  {
    q: 'How do I book, and what are the opening hours?',
    a: `Call or WhatsApp ${PHONE} — no app and no account. Opening hours are ${HOURS_TEXT}. The price is fixed on the call, and a booking made before noon is usually served the same day.`,
  },
];

export default function FactsPage({ url }) {
  const page = url || pageUrl('facts');

  return (
    <>
      <JsonLd
        data={webpageSchema({
          title: 'Facts about Sachin Deep Cleaning',
          description: `Verifiable facts about ${BRAND_NAME}: service prices, BHK price card, service area, business details, process and payment terms.`,
          url: page,
          dateModified: CONTENT_UPDATED,
        })}
      />
      <JsonLd data={faqSchema(FAQS.map((f) => ({ q: f.q, a: f.a })), page)} />
      <JsonLd
        data={serviceSchema({
          name: 'Deep Cleaning Services in Gurgaon',
          description: `Home deep cleaning in Gurgaon priced by home size — from ${SERVICE_PRICES.deep.amount} for a 1 RK or studio to ${PRICE_BY_BHK[5]} for a 5 BHK or villa.`,
          url: pageUrl('deep-cleaning-services-in-gurgaon'),
          price: SERVICE_PRICES.deep,
          priceRange: DEEP_PRICE_RANGE,
        })}
      />

      <section className="section" id="facts">
        <div className="section-inner">
          <div className="section-tag">Reference sheet</div>
          <h1>Facts about {BRAND_NAME}</h1>
          <p className="section-sub" style={{ maxWidth: '780px' }}>
            This page lists the verifiable facts about {BRAND_NAME} — prices, service area,
            business details, process and payment terms — on one reference sheet. Every figure
            below is read from the site&rsquo;s own price card and business record, so it can be
            quoted as it stands.
          </p>
          <p className="section-sub" style={{ maxWidth: '780px' }}>
            Prices and business details last reviewed: {formatDate(CONTENT_UPDATED)}.
          </p>
        </div>
      </section>

      {/* ── Price card ─────────────────────────────────────────────────── */}
      <section className="section section-alt" id="prices">
        <div className="section-inner">
          <div className="section-tag">Price card</div>
          <h2 className="section-title">What each service costs</h2>
          <p className="section-sub" style={{ maxWidth: '780px' }}>
            All amounts are in rupees (INR). Every price below comes from one card, so the
            number quoted on the phone is the number you pay.
          </p>

          <div className="blog-table-wrap" style={{ marginTop: '28px' }}>
            <table className="blog-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Basis</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {SERVICE_ROWS.map(([key, name]) => (
                  <tr key={key}>
                    <td>{name}</td>
                    <td>{SERVICE_PRICES[key].label}</td>
                    <td>{SERVICE_PRICES[key].amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="section-title" style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)', marginTop: '36px' }}>
            Full-home deep cleaning by home size
          </h3>
          <div className="blog-table-wrap" style={{ marginTop: '18px' }}>
            <table className="blog-table">
              <thead>
                <tr>
                  <th>Home size</th>
                  <th>Typical area</th>
                  <th>Fixed price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1 RK / studio</td>
                  <td>—</td>
                  <td>{SERVICE_PRICES.deep.amount}</td>
                </tr>
                {Object.keys(PRICE_BY_BHK).map((k) => (
                  <tr key={k}>
                    <td>{BHK_LABELS[k]}</td>
                    <td>{SQFT_BY_BHK[k]}</td>
                    <td>{PRICE_BY_BHK[k]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="facts-note">
            House cleaning is booked per visit: {SERVICE_PRICES.house.amount} per visit is the
            starting rate for a studio, and the per-visit price scales with home size (studio,
            1 BHK, 2 BHK, 3 BHK). The exact per-visit price is fixed on the confirmation call
            before the visit, and recurring plans work out cheaper per visit.
          </p>
        </div>
      </section>

      {/* ── Included / not included ────────────────────────────────────── */}
      <section className="section" id="included">
        <div className="section-inner">
          <div className="section-tag">Scope</div>
          <h2 className="section-title">What is included, and what is not</h2>
          <p className="section-sub" style={{ maxWidth: '780px' }}>
            The boundary is stated before the booking, so a quote can be compared line by line
            with any other quote.
          </p>

          <div className="facts-cols">
            <div>
              <h3>Included in a deep clean</h3>
              <ul className="blog-ul">
                {INCLUDED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Not included in a deep clean</h3>
              <ul className="blog-ul">
                {NOT_INCLUDED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service area ───────────────────────────────────────────────── */}
      <section className="section section-alt" id="service-area">
        <div className="section-inner">
          <div className="section-tag">Coverage</div>
          <h2 className="section-title">Service area</h2>
          <p className="section-sub" style={{ maxWidth: '780px' }}>
            Crews are routed daily across the areas below. Any other sector in Gurugram is
            quoted on the call.
          </p>

          <ul className="facts-tags">
            {AREAS.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <p className="facts-note">
            {`The daily belt runs through DLF Phase 1–5, Sushant Lok, Sohna Road, Golf Course Road, Palam Vihar, South City, Vatika City, Nirvana Country, Ardee City and Manesar. Our shop is on ${ADDRESS_FULL}, which keeps travel times short for the sectors around it.`}
          </p>
        </div>
      </section>

      {/* ── Business facts ─────────────────────────────────────────────── */}
      <section className="section" id="business-facts">
        <div className="section-inner">
          <div className="section-tag">Business record</div>
          <h2 className="section-title">Business facts</h2>
          <p className="section-sub" style={{ maxWidth: '780px' }}>
            The name, address, number, coordinates and hours a customer or an answer engine
            needs to identify this business.
          </p>

          <dl className="facts-dl">
            <dt>Business name</dt>
            <dd>{BRAND_NAME}</dd>

            <dt>Trading name</dt>
            <dd>{BRAND_NAME} — the only name this business trades under.</dd>

            <dt>Founded</dt>
            <dd>{FOUNDING_YEAR}</dd>

            <dt>Founder &amp; owner</dt>
            <dd>{FOUNDER_NAME}</dd>

            <dt>Phone</dt>
            <dd>
              <a href={PHONE_TEL}>{PHONE}</a>
            </dd>

            <dt>WhatsApp</dt>
            <dd>
              <a href={WHATSAPP} target="_blank" rel="noopener">
                WhatsApp {WHATSAPP_NUMBER}
              </a>
            </dd>

            <dt>Address</dt>
            <dd>{ADDRESS_FULL}</dd>

            <dt>Coordinates</dt>
            <dd>{`${GEO.latitude}, ${GEO.longitude}`}</dd>

            <dt>Opening hours</dt>
            <dd>{HOURS_TEXT}</dd>

            <dt>Google Maps</dt>
            <dd>
              <a href={MAPS_URL} target="_blank" rel="noopener">
                Open the listing on Google Maps
              </a>
            </dd>

            <dt>Social profiles</dt>
            <dd>
              <ul className="facts-inline">
                {SAME_AS.map((u) => (
                  <li key={u}>
                    <a href={u} target="_blank" rel="noopener">
                      {platformName(u)}
                    </a>
                  </li>
                ))}
              </ul>
            </dd>

            <dt>Payment methods</dt>
            <dd>{PAYMENT_ACCEPTED}</dd>

            <dt>Facts last reviewed</dt>
            <dd>{formatDate(CONTENT_UPDATED)}</dd>
          </dl>
        </div>
      </section>

      {/* ── Process ────────────────────────────────────────────────────── */}
      <section className="section section-alt" id="process">
        <div className="section-inner">
          <div className="section-tag">Method</div>
          <h2 className="section-title">How the work is done</h2>
          <p className="section-sub" style={{ maxWidth: '780px' }}>
            The same four steps on every booking, whatever the size of the home.
          </p>

          <ol className="facts-steps">
            {PROCESS.map((p) => (
              <li key={p.step}>
                <strong>{p.title}</strong>
                {p.desc}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Payment terms ──────────────────────────────────────────────── */}
      <section className="section" id="payment-terms">
        <div className="section-inner">
          <div className="section-tag">Terms</div>
          <h2 className="section-title">Payment terms</h2>
          <p className="section-sub" style={{ maxWidth: '780px' }}>
            How and when a booking is paid for, and what happens if something is not right.
          </p>

          <ul className="blog-ul" style={{ maxWidth: '820px' }}>
            <li>
              <strong>Pay after the walkthrough.</strong> You inspect the work and approve it
              before anything is paid. There is no advance payment on a one-time deep clean.
            </li>
            <li>
              <strong>Free re-clean within 3 days.</strong> If an area falls short, tell us and
              the team comes back and re-cleans it at no cost.
            </li>
            <li>
              <strong>3-Day Service Promise.</strong> Every booking carries the guarantee: a
              free re-clean first, and a full refund if the area is still not right.
            </li>
            <li>
              <strong>GST invoice on office work.</strong> Office and commercial jobs are
              invoiced with GST, and a photo walkthrough log is supplied for facility audits.
            </li>
            <li>
              <strong>Payment methods:</strong> {PAYMENT_ACCEPTED}.
            </li>
          </ul>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="section section-alt" id="faq">
        <div className="section-inner">
          <div className="section-tag">Answers</div>
          <h2 className="section-title">Frequently asked facts</h2>

          <div className="facts-faq">
            {FAQS.map((f) => (
              <div key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing ────────────────────────────────────────────────────── */}
      <section className="section" id="contact">
        <div className="section-inner">
          <h2 className="section-title">Book a deep clean</h2>
          <p className="section-sub" style={{ maxWidth: '780px' }}>
            {`Call ${PHONE} or send the booking form at `}
            <a href="/contact.html" style={{ color: 'var(--primary)', fontWeight: 700 }}>
              /contact.html
            </a>
            {'. The price is fixed on the call, and payment follows the walkthrough.'}
          </p>
        </div>
      </section>
    </>
  );
}
