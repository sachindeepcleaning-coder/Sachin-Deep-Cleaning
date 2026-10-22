// image-dims.js — measured true dimensions (2026-09-20 audit, seo-images).
// Several heroes claimed width=1200/1200w but files are 390–1300px; srcset
// descriptors and reserved ratios now use real values so browsers pick the
// right resource and CLS reservation matches the rendered file.
// Regenerate with: python3 scripts (see plan.md) after replacing any image.

export const IMAGE_DIMS = {
  '/images/bathroom-deep-cleaning.webp': [1024, 768],
  '/images/bathroom-deep-cleaning.jpg': [1024, 768],
  '/images/carpet-shampoo-cleaning.webp': [390, 250],
  '/images/cleaning-1.jpg': [500, 375],
  '/images/cleaning-1.webp': [500, 375],
  '/images/full-home-2bhk-deep-cleaning.webp': [626, 418],
  '/images/full-home-3bhk-deep-cleaning.webp': [1300, 957],
  '/images/full-home-4bhk-deep-cleaning.webp': [626, 418],
  '/images/full-home-5bhk-deep-cleaning.webp': [1300, 957],
  '/images/full-home-deep-cleaning.webp': [800, 531],
  '/images/house-cleaning.webp': [1200, 800],
  '/images/kitchen-deep-cleaning.webp': [940, 705],
  '/images/office-deep-cleaning.jpg': [800, 534],
  '/images/office-deep-cleaning.webp': [800, 534],
  '/images/sofa-shampoo-cleaning.webp': [500, 334],
  '/images/og-cover.jpg': [1200, 630],
};

export function imageDims(src) {
  return IMAGE_DIMS[src] || [1200, 675];
}

// Truthful srcset: 400w/800w variants (verified 400/800px) + base at real width.
//
// The old version always appended the base, which produced TWO candidates
// with the same width descriptor (e.g. "…-800w.webp 800w, …webp 800w" for an
// 800px source). Duplicate width descriptors make a browser reject the whole
// srcset, and for sources narrower than 400px it emitted an out-of-order list.
// Now each real width appears once, ascending, and the base wins ties.
export function srcSetFor(src) {
  const base = src.replace(/\.(jpg|webp)$/, '');
  const [w] = imageDims(src);

  const byWidth = new Map();
  byWidth.set(w, src); // the original file, at its true width
  if (!byWidth.has(400)) byWidth.set(400, `${base}-400w.webp`);
  if (!byWidth.has(800)) byWidth.set(800, `${base}-800w.webp`);

  return [...byWidth.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([width, url]) => `${url} ${width}w`)
    .join(', ');
}
