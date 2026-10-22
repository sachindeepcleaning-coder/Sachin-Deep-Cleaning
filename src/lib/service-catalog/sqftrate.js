import { SERVICE_PRICES } from '../service-prices.js';

export default {
  name: 'Deep Cleaning Rate Per Square Foot in Gurgaon',
  tagline: 'One rate for the whole home, one bill',
  intro:
    'Deep cleaning rate per square foot in Gurgaon is ₹3 per sq ft for a full-home deep clean. A 1 BHK measures about 450 sq ft, a 2 BHK about 850 sq ft and a 3 BHK about 1,250 sq ft — here is how the rate compares with the fixed BHK card.',
  detail:
    'Most cleaning quotes in Gurgaon are priced per BHK, which is convenient until two flats with the same label turn out to be very different sizes. A "2 BHK" can be 600 sq ft or 1,000 sq ft, and the work is not the same in either. The per-square-foot rate removes that ambiguity: the price is the measured area multiplied by one rate, which does not move with your floor plan.\n\nWe measure on the walkthrough, room by room, and write the number on the quote before anything starts. Carpeted and tiled areas that we clean are counted, including under a fitted wardrobe and the utility floor if it is in scope, and the kitchen and bathroom tiles are included because they are the heaviest part of the job. Both are on the confirmation call, so the invoice matches what you agreed to.\n\nAt ₹3 per sq ft, a 1 BHK of about 450 sq ft comes to ₹1,350, a 2 BHK of about 850 sq ft to ₹2,550 and a 3 BHK of about 1,250 sq ft to ₹3,750. The fixed BHK card is ₹2,500 for a 1 BHK, ₹4,500 for a 2 BHK and ₹5,500 for a 3 BHK, and it bundles in work the sq-ft rate does not price — wardrobe interiors, the balcony, window tracks, ceiling fans and appliance interiors. The sq-ft rate is therefore cheaper on a compact home or a partial scope, while the card is worth it for a full reset in one line.\n\nBoth prices work the same way across DLF Phase 2 and 3, Sector 43, 45 and 57, Golf Course Road, Sohna Road, MG Road, Palam Vihar, Sushant Lok 1 and the New Colony blocks — we carry the measuring tape, not a label. Send us the carpet area from your brochure and we will tell you which price applies to your flat, and you can compare it with our [full home deep cleaning](/deep-cleaning-services-in-gurgaon.html) scope before you decide.',
  image: '/images/full-home-deep-cleaning.webp',
  imageAlt: 'Gurgaon home deep cleaning crew measuring the floor area of a room before confirming the cleaning quote',
  includes: [
    'Room-by-room measured on site',
    'Written area and rate on the quote',
    'One rate, no size surprises',
    'Core deep clean across all rooms',
    'Kitchen and bathroom tiles included',
    'Utility and balcony floors in scope',
    'Wardrobe interiors bundled on the card',
    'Window tracks and ceiling fans',
    'Invoice matches the agreed number',
  ],
  process: [
    { step: 1, title: 'Measure', desc: 'We measure every room in scope and note the total usable area.' },
    { step: 2, title: 'Compare', desc: 'You see the sq-ft total and the BHK card side by side on the quote.' },
    { step: 3, title: 'Clean', desc: 'The agreed scope is cleaned room by room with our standard checklist.' },
    { step: 4, title: 'Reconcile', desc: 'The final invoice matches the area written down on the confirmation call.' },
  ],
  faqs: [
    { q: 'What is the deep cleaning rate per square foot in Gurgaon?', a: '₹3 per sq ft for the standard full-home deep clean scope. A 1 BHK of about 450 sq ft is ₹1,350, a 2 BHK of about 850 sq ft is ₹2,550 and a 3 BHK of about 1,250 sq ft is ₹3,750. The area is measured on the walkthrough and both the measurement and the rate go on the quote before the work starts.' },
    { q: 'Is per square foot cheaper than the BHK price card?', a: 'For most flats, yes, because you pay only for the area actually cleaned. The BHK card is ₹2,500 for a 1 BHK, ₹4,500 for a 2 BHK and ₹5,500 for a 3 BHK, and it bundles in wardrobe interiors, balcony, window tracks, fans and appliance interiors. The sq-ft rate suits a compact home or a partial scope; the card suits a full reset.' },
    { q: 'How do you measure the area?', a: 'We use the usable floor area of every room in scope, measured on the walkthrough with a tape measure, not the carpet area printed in a brochure. Areas under fitted wardrobes and utility floors are included when they are cleaned, and the total is written on the quote along with the rate. You get the room-by-room breakdown before the job starts.' },
    { q: 'How long does a per-sq-ft deep clean take?', a: 'A 1 BHK takes 5–6 hours, a 2 BHK 7–8 hours and a 3 BHK 9–10 hours, with a villa at 10–12 hours. The area decides the hours, but so does the condition, so we add time for a heavily soiled kitchen or bathroom. A larger crew shortens the visit without changing the price, because the rate is on the area.' },
    { q: 'Does the rate include the kitchen and bathroom?', a: 'Yes, the kitchen and bathroom tiles are part of the measured area, and they are cleaned to the same standard as the rest of the home: grout scrubbed, taps descaled and fittings sanitised. Appliance interiors and chimney filter cleaning are separate lines unless you take the BHK card, which bundles them in.' },
    { q: 'Is the price fixed before you start?', a: 'Yes. The measured area, the rate and the total are all on the confirmation call, and the invoice at the end matches that number. If the measured area changes on the day, we do not quietly adjust it — we tell you before the work starts and you decide whether to proceed. Payment is after the walkthrough, not before.' },
    { q: 'Sq ft ke hisaab se cleaning ka rate kya hai?', a: 'Full home deep cleaning ₹3 per sq ft hai. 1 BHK lagbhag 450 sq ft, 2 BHK 850 sq ft aur 3 BHK 1,250 sq ft hota hai. Measurement walkthrough ke time hoti hai aur total pehle se confirm kar diya jata hai.' },
    { q: 'Do you charge extra for difficult access?', a: 'The rate covers a home in normal condition. It changes if the property has not been cleaned for a long time and needs heavy scrubbing, if there are more than two floors without a working lift, or if you add areas that were not in the original scope, such as a terrace. Each addition is quoted as a line before we start, never on the invoice.' },
  ],
  // No invented testimonials. This page carries the real Google rating
  // (4.4 from 80, checked 2026-10-09) and a sourced price card instead.
  reviews: [],
  price: SERVICE_PRICES.sqftrate,
};
