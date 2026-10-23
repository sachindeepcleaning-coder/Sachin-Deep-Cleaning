import { useEffect, useRef, useState } from 'react';
import { SITE_URL } from '../lib/site.js';
import { VIDEOS, VIDEO_POSTER as POSTER, VIDEO_UPLOAD_DATE } from '../lib/videos.js';

const REEL_URL = 'https://www.instagram.com/reel/DbtA_gdz5zA/';
const HANDLE = '@cleaning_service_in_gurgaon';

// One VideoObject per hosted reel, matching the four videos the carousel
// actually plays. Video sitemap entries in sitemap-videos.xml point here.
const videoSchema = {
  '@context': 'https://schema.org',
  '@graph': VIDEOS.map((video) => ({
    '@type': 'VideoObject',
    '@id': `${SITE_URL}/videos/${video.file}#video`,
    name: video.name,
    description: `${video.name} — real job footage from the Sachin Deep Cleaning team, Gurgaon.`,
    thumbnailUrl: `${SITE_URL}${POSTER}`,
    uploadDate: VIDEO_UPLOAD_DATE,
    duration: video.duration,
    contentUrl: `${SITE_URL}/videos/${video.file}`,
    isFamilyFriendly: true,
    publisher: {
      '@id': `${SITE_URL}/#business`,
      '@type': 'LocalBusiness',
      name: 'Sachin Deep Cleaning',
      url: `${SITE_URL}/`,
    },
  })),
};

export default function ReelEmbed() {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  // No network until the reel scrolls into view: fixes GSC "couldn't load
  // media" on every page and saves ~4MB of autoplay downloads on mobile.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || visible) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  useEffect(() => {
    if (visible) {
      videoRef.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [visible, idx]);

  const src = `videos/${VIDEOS[idx].file}`;

  const go = (i) => {
    setIdx((i + VIDEOS.length) % VIDEOS.length);
    setPlaying(true);
  };

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <aside ref={wrapRef} className="reel-embed">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
      <video
        key={src}
        ref={videoRef}
        className="reel-video"
        src={visible ? src : undefined}
        poster={visible ? POSTER : undefined}
        muted
        loop
        playsInline
        preload="none"
        title="Deep cleaning in action"
      />

      <div className="reel-header">
        <div className="reel-avatar">🧹</div>
        <div className="reel-handle">
          <strong>Sachin Deep Cleaning</strong>
          <span>{HANDLE}</span>
        </div>
        <span className="reel-reel-tag">Reel {idx + 1}/{VIDEOS.length}</span>
      </div>

      <div className="reel-caption">
        Real deep-cleaning job in a Gurgaon home 🧼✨
      </div>

      <div className="reel-play" onClick={toggle}>
        {playing ? '❚❚' : '▶'}
      </div>

      <button
        type="button"
        className="reel-nav reel-prev"
        aria-label="Previous video"
        onClick={(e) => { e.stopPropagation(); go(idx - 1); }}
      >‹</button>
      <button
        type="button"
        className="reel-nav reel-next"
        aria-label="Next video"
        onClick={(e) => { e.stopPropagation(); go(idx + 1); }}
      >›</button>

      <a
        href={REEL_URL}
        target="_blank"
        rel="noopener"
        className="reel-cta"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="reel-ig">IG</span> Watch full reel on Instagram →
      </a>
    </aside>
  );
}