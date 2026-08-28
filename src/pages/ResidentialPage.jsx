import QuoteForm from '../components/QuoteForm.jsx';
import TrustBar from '../components/TrustBar.jsx';
import ReviewsSection from '../components/ReviewsSection.jsx';
import PricingSection from '../components/PricingSection.jsx';
import AreasSection from '../components/AreasSection.jsx';
import FaqSection from '../components/FaqSection.jsx';
import FinalCta from '../components/FinalCta.jsx';
import ReelEmbed from '../components/ReelEmbed.jsx';
import YtShortsSection from '../components/YtShortsSection.jsx';
import { JsonLd, localBusinessSchema, faqSchema, serviceSchema } from '../lib/schema.jsx';
import { useEffect } from 'react';

const NEAR_ME = [
  ['📍', 'Closest Available Team', 'We route your request to the cleaning crew already working nearest to your sector — not a team crossing the whole city.'],
  ['⏱️', 'Faster Arrival Windows', 'Local dispatch means shorter travel time, which usually means a same-day or next-morning slot instead of a multi-day wait.'],
  ['🏢', 'Familiar With Local Societies', 'Our teams already have visitor-pass experience with most major RWAs and gated societies across Gurgaon.'],
  ['👮', 'Still Fully Verified', 'Nearby never means less vetted — every cleaner, local or not, is police-verified and ID-checked before entering your home.'],
];

const FAQS = [
  ['How do you decide which cleaning team is nearest to me?', 'We match your area or sector to the crew already working closest to it that day. This is why we ask for your area in the quote form — it directly affects your arrival time.'],
  ['Is a local team as reliable as a citywide company?', 'Yes — every cleaner, regardless of which zone they are dispatched from, goes through the same police verification, training, and satisfaction guarantee.'],
  ['Can I get same-day residential cleaning near me?', 'In most Gurgaon sectors, yes — especially if you book before noon. We will confirm exact same-day availability for your specific area on the callback.'],
  ['Do you cover gated societies and RWAs?', 'Yes. Our teams regularly work across Gurgaon major societies and are used to standard visitor-entry and ID-verification processes.'],
  ['What if my exact locality is not listed?', 'Our listed areas are not exhaustive. Call us directly — we cover most of Gurgaon and can usually confirm coverage in under a minute.'],
];

const PILLS = [
  'Nearby Team Dispatch',
  'Police-Verified',
  'Pay After Cleaning',
  'Same-Day Slots',
];

const STATS = [
  ['5,000', '+', 'Homes Cleaned'],
  ['4.5', '★', 'Average Rating'],
  ['30', '+', 'Sectors Covered'],
  ['₹2,000', '+', 'Starting Price'],
];

// Exact Instagram oEmbed markup (verbatim). React won't execute <script> inside
// dangerouslySetInnerHTML, so embed.js is loaded separately via useEffect.
const INSTAGRAM_EMBED =
  '<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DbtA_gdz5zA/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DbtA_gdz5zA/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.138 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.615 541,74.615 C533.003,74.615 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.215 519.894,71.631 C518.846,71.049 518.197,70.775 517.654,69.337 C518.244,68.114 518.755,67.675 518.63,64.649 C518.479,61.494 518.086,57.994 518.086,50 C518.086,42.003 518.479,38.506 518.63,35.351 C518.755,32.325 518.244,31.886 517.654,30.663 C518.197,29.225 518.846,28.951 519.894,28.369 C520.942,27.785 521.94,27.197 523.338,26.653 C524.393,26.243 525.979,25.755 528.898,25.622 C531.2,25.479 533.003,25.385 541,25.385 C548.997,25.385 550.935,25.471 553.102,25.622 C556.021,25.755 557.607,26.94 558.662,26.653 C560.06,27.197 561.97,27.368 564.346,28.369 C565.803,28.985 565.02,29.012 565.376,35.351 C566.006,40.6 567.004,48.4 565.376,60.1 C564.756,63.1 565.244,65.4 565.378,63.5"/></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DbtA_gdz5zA/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Deep cleaning services (@cleaning_service_in_gurgaon)</a></p></div></blockquote>';

export default function ResidentialPage({ url }) {

  useEffect(() => {
    const s = document.createElement('script');
    s.async = true;
    s.src = '//www.instagram.com/embed.js';
    document.body.appendChild(s);
    return () => { s.parentNode?.removeChild(s); };
  }, []);

  return (
    <>
      <JsonLd data={localBusinessSchema({ url })} />
      <JsonLd data={serviceSchema({ name: 'Residential Cleaners Near Me in Gurgaon', description: 'Local, police-verified residential cleaners dispatched from the team nearest to your Gurgaon area. Pay only after cleaning.', url })} />
      <JsonLd data={faqSchema(FAQS.map(([q, a]) => ({ q, a })))} />

      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <svg width="8" height="8" fill="#4ade80" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
              Local Team · Gurugram · 4.5★ Rated
            </div>
            <h1>
              <span className="hl">Residential Cleaners Near Me?</span><br />
              You've Found Gurgaon's<br />
              <span className="hl2">Local, Verified Team</span>
            </h1>
            <p className="hero-sub">
              No matter which sector or society you're in, our nearest available team can reach your home <strong>today</strong>. Police-verified residential cleaners, transparent pricing, and <strong>pay only after cleaning</strong>.
            </p>
            <div className="hero-pills">
              {PILLS.map((p) => (
                <span key={p} className="pill"><span className="pi">✓</span> {p}</span>
              ))}
            </div>
            <div className="hero-stats">
              {STATS.map(([num, suffix, label]) => (
                <div key={label} className="hs">
                  <div className="hs-num">{num}<span>{suffix}</span></div>
                  <div className="hs-lbl">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <TrustBar />

      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }} className="fade-up">
            <div className="section-tag">Local Coverage</div>
            <h2 className="section-title">Why "Residential Cleaners Near Me" Actually Matters</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>A nearby team means faster arrival, lower travel delays, and someone who already knows your building or society's access rules.</p>
          </div>
          <div className="whyus-grid">
            {NEAR_ME.map(([icon, title, desc]) => (
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

      <PricingSection />

      <ReviewsSection />

      <section className="section section-alt">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <div className="fade-up">
            <div className="section-tag">Real Work</div>
            <h2 className="section-title">See a Real Deep Cleaning in Action</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Watch a residential deep-cleaning job done by our team in Gurgaon.</p>
          </div>
          <div className="reel-showcase">
            <div className="reel-showcase-item">
              <span className="reel-showcase-label">🗂️ Quick Preview</span>
              <ReelEmbed />
            </div>
            <div className="reel-showcase-item">
              <span className="reel-showcase-label">📱 Live Instagram Reel</span>
              <div className="insta-embed-wrap" dangerouslySetInnerHTML={{ __html: INSTAGRAM_EMBED }} />
            </div>
          </div>
          <p style={{ marginTop: '16px', fontSize: '.84rem', color: 'var(--muted)' }}>
            Can't see the reel? <a href="https://www.instagram.com/reel/DbtA_gdz5zA/" target="_blank" rel="noopener" style={{ color: 'var(--green)', fontWeight: 700 }}>View on Instagram →</a>
          </p>
        </div>
      </section>

      <YtShortsSection />

      <AreasSection />

      <section className="section section-alt">
        <div className="section-inner">
          <div className="faq-wrap">
            <div style={{ textAlign: 'center' }} className="fade-up">
              <div className="section-tag">FAQ</div>
              <h2 className="section-title">Residential Cleaners Near Me — Common Questions</h2>
            </div>
            <FaqSection faqs={FAQS} />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
