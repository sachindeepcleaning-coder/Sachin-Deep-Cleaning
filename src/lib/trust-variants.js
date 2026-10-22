// trust-variants.js — 2026-09-20 audit fix (template fatigue).
// The default WhyUs / Guarantee / TrustBar blocks were byte-identical on all
// 13 service pages. ServicePage.jsx now picks an angle per service group;
// every other page keeps the defaults (zero visual change outside services).
// RULE: only restate claims that are in src/lib/claims.js with a proof
// (prices, 3-day re-clean, pay-after, same-day-before-noon,
// NDA/GST/photo-logs for office).
//
// The police-verification badge copy is NOT written here — it comes from the
// claims register, so there is one place to confirm or reword that claim.
import { POLICE_VERIFIED_VARIANTS } from './claims.js';

export const WHY_US_VARIANTS = {
  // deep / house / fullhome / move — family + value angle.
  home: [
    ['🔒', 'Fixed Price Locked on Call', 'Your exact BHK quote is confirmed before dispatch — then pay after the walkthrough, not before.'],
    ['👮', 'Police-Verified Team', 'ID and background check shown on request.'],
    ['🧰', 'Machines on Every Visit', 'Single-disc scrubbers, hot-water extraction and descalers — the gap weekly mopping can never close.'],
    ['⚡', 'Same-Day Slots', 'Book before noon and we are usually at your door the same day, anywhere in Gurgaon.'],
    ['🔄', 'Free Re-Clean Within 3 Days', 'Any area below standard gets re-cleaned free within 3 days — then a refund if still not right.'],
    ['🌿', 'Kid & Pet Safe Products', 'Eco-friendly, non-toxic chemistry. No harsh smell lingering after we leave.'],
  ],
  // kitchen / bathroom / sofa / carpet — surface-care angle.
  care: [
    ['🧪', 'Surface-Matched Chemistry', 'Food-safe degreasers for kitchens, fabric-safe shampoo for sofas, glaze-safe descalers for baths.'],
    ['🔧', 'Dismantle, Not Just Wipe', 'Chimney filters, vent covers and tap aerators come off, soak and go back — wiping alone never counts.'],
    ['💰', 'Fixed Per-Unit Pricing', '₹800 per bath, ₹499 per sofa seat, ₹15–18 per sq ft carpet — confirmed on call, honoured on site.'],
    POLICE_VERIFIED_VARIANTS.care,
    ['🌿', 'Safe Around Food & Fabric', 'No harsh residues on cooking surfaces or upholstery your kids touch daily.'],
    ['🔄', 'Free Re-Clean Within 3 Days', 'Stain still showing or scale still white? Tell us within 3 days and we return free.'],
  ],
  // office — commercial angle (all claims attested in office service copy).
  commercial: [
    ['🌙', 'After-Hours Crews', 'Nights and weekends as standard — workstations, pantry and washrooms done with zero workday lost.'],
    ['📋', 'Compliance Pack Included', 'GST invoice, NDA on request, photo walkthrough logs — the paperwork facility heads actually ask for.'],
    ['📐', 'Per-sq-ft Survey Quotes', 'Priced from ₹3 per sq ft after a free site visit. Scope in writing before a rupee is discussed.'],
    POLICE_VERIFIED_VARIANTS.commercial,
    ['🔄', 'Free Re-Clean Within 3 Days', 'Flagged zones re-cleaned free within 3 days — then a refund if still not right.'],
    ['💰', 'Pay After Walkthrough', 'Sign off the site inspection first. No advance, no retainer for one-time deep cleans.'],
  ],
};

export const GUARANTEE_VARIANTS = {
  standard: {
    title: 'Our Iron-Clad Satisfaction Guarantee — 3-Day Service Promise',
    body: "We're so confident in our cleaning that you **don't pay until you're satisfied**. Not happy with any area? Tell us within 3 days and we re-clean the affected area free. Still not satisfied? Full refund — no questions asked. If anything goes wrong, tell us on the spot and we sort it before you pay.",
    pills: ['✓ Pay After Cleaning', '✓ Free Re-Clean Within 3 Days', '✓ 3-Day Service Guarantee', '✓ No Hidden Charges', '✓ Police-Verified Team'],
  },
  // move / fullhome — handover angle.
  handover: {
    title: 'Our Deposit-Safe Handover Promise',
    body: "Moving or resetting a full home is judged at one moment — the **walkthrough**. So you **don't pay until it passes**: every room ticked against the written checklist, landlord-grade finish in kitchen and baths, and a free 3-day re-clean if anything falls short. If anything goes wrong, tell us on the spot and we sort it before you pay.",
    pills: ['✓ Pay After Walkthrough', '✓ Landlord-Checklist Finish', '✓ Free Re-Clean Within 3 Days', '✓ Fixed BHK Price', '✓ No Hidden Charges'],
  },
  // office — uptime angle.
  commercial: {
    title: 'Our Zero-Downtime Commercial Promise',
    body: "Offices can't pause for cleaning, so neither do you: **after-hours crews**, a **signed-off site inspection before invoicing**, and a free re-clean of any flagged zone within 3 days. GST invoice and NDA handling included — and if anything goes wrong, tell us on the spot and we sort it before you pay.",
    pills: ['✓ After-Hours Service', '✓ Sign-Off Before Invoicing', '✓ Free Re-Clean Within 3 Days', '✓ GST Invoice Included', '✓ Police-Verified Team'],
  },
};

export const TRUST_VARIANTS = {
  standard: [
    POLICE_VERIFIED_VARIANTS.standard,
    ['💰', 'Pay After Cleaning', 'Zero advance payment'],
    ['🔄', 'Free Re-Clean', "If you're not satisfied"],
    ['⚡', 'Same-Day Available', 'Book before 12 PM'],
    ['🌿', 'Eco-Friendly Products', 'Safe for kids & pets'],
  ],
  care: [
    ['🧪', 'Surface-Safe Chemistry', 'Food & fabric safe'],
    ['💰', 'Fixed Per-Unit Price', 'Confirmed on call'],
    POLICE_VERIFIED_VARIANTS.standard,
    ['🔄', 'Free Re-Clean', 'Within 3 days'],
    ['🌿', 'No Harsh Residue', 'Safe for kids & pets'],
  ],
  commercial: [
    ['🌙', 'After-Hours Crews', 'Zero workday lost'],
    ['📋', 'GST + NDA Ready', 'Compliance included'],
    POLICE_VERIFIED_VARIANTS.move,
    ['💰', 'Pay After Sign-Off', 'No advance'],
    ['🔄', 'Free Re-Clean', 'Within 3 days'],
  ],
};

// ServicePage group mapping (serviceKey → variant set).
export function trustVariantFor(serviceKey) {
  if (serviceKey === 'office') return 'commercial';
  if (['kitchen', 'bathroom', 'sofa', 'carpet'].includes(serviceKey)) return 'care';
  return 'home';
}

export function guaranteeVariantFor(serviceKey) {
  if (serviceKey === 'office') return 'commercial';
  if (['move', 'fullhome'].includes(serviceKey)) return 'handover';
  return 'standard';
}
