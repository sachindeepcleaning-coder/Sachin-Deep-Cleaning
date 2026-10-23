// Hosted reel videos — one source of truth for the carousel schema
// (ReelEmbed.jsx) and the video sitemap (scripts/gen-sitemap.mjs).
// `duration` is ISO 8601; `seconds` is the same length for sitemap-videos.xml.
// Values measured with ffprobe on the published MP4s (2026-10-23).

export const VIDEO_POSTER = '/images/cleaning-1.webp';
export const VIDEO_UPLOAD_DATE = '2026-08-28';

export const VIDEOS = [
  {
    file: 'cleaning-1.mp4',
    name: 'Full home deep cleaning in a Gurgaon apartment',
    duration: 'PT32S',
    seconds: 32,
  },
  {
    file: 'cleaning-2.mp4',
    name: 'Kitchen degreasing and chimney cleaning in Gurgaon',
    duration: 'PT14S',
    seconds: 14,
  },
  {
    file: 'cleaning-3.mp4',
    name: 'Bathroom descaling and deep cleaning in Gurgaon',
    duration: 'PT30S',
    seconds: 30,
  },
  {
    file: 'cleaning-4.mp4',
    name: 'Sofa and carpet shampoo extraction in Gurgaon',
    duration: 'PT39S',
    seconds: 39,
  },
];
