import { useRef, useState } from 'react';
import { track, whatsappClick } from '../lib/landing.js';
import { waMsg } from '../lib/site.js';

const VIDEOS = ['cleaning-1.mp4', 'cleaning-2.mp4', 'cleaning-3.mp4', 'cleaning-4.mp4'];

export default function VideoSection() {
  const videoRef = useRef(null);
  const [slide, setSlide] = useState(0);
  const [showPlay, setShowPlay] = useState(true);
  // Track whether the current source actually loads. With no video files the
  // browser fires onError; we then show a friendly placeholder instead of an
  // empty black box / orphaned play button.
  const [videoReady, setVideoReady] = useState(false);

  const go = (i) => {
    const next = (i + VIDEOS.length) % VIDEOS.length;
    setSlide(next);
    setShowPlay(true);
    setVideoReady(false);
    window.requestAnimationFrame(() => videoRef.current?.load());
    track('video_change', { event_category: 'Engagement', event_label: `Video ${next + 1}`, value: next + 1 });
  };

  const src = `videos/${VIDEOS[slide]}`;

  return (
    <section className="section">
      <div className="section-inner">
        <div style={{ textAlign: 'center' }} className="fade-up">
          <div className="section-tag">Videos</div>
          <h2 className="section-title">Watch Our Cleaning Work</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Real footage from actual Gurgaon homes</p>
        </div>
        <div className="video-carousel" style={{ maxWidth: '800px', margin: '40px auto' }}>
          <div className="video-panel">
            <video
              ref={videoRef}
              key={src}
              controls
              muted
              preload="metadata"
              onLoadedData={() => { setVideoReady(true); setShowPlay(true); }}
              onError={() => { setVideoReady(false); setShowPlay(false); }}
              onPlay={() => { setShowPlay(false); track('video_play', { event_category: 'Engagement', event_label: `Video ${slide + 1}`, value: 1 }); }}
              onPause={() => videoRef.current && !videoRef.current.ended && setShowPlay(true)}
              onEnded={() => { setShowPlay(true); track('video_complete', { event_category: 'Engagement', event_label: `Video ${slide + 1}`, value: 100 }); }}
            >
              <source src={src} type="video/mp4" />
            </video>
            {videoReady && showPlay && (
              <button type="button" className="play-overlay" onClick={() => videoRef.current?.play()} aria-label="Play video">
                ▶
              </button>
            )}
            {!videoReady && (
              <div className="video-placeholder">
                <div className="vp-icon">🎬</div>
                <div className="vp-title">Cleaning in Action</div>
<div className="vp-hint">
                  Our before &amp; after cleaning videos will appear here as soon as they're added to the <code>videos/</code> folder.
                </div>
                <a href={waMsg('Hi, please share a video of your cleaning work.')} target="_blank" rel="noopener" className="vp-link" onClick={whatsappClick}>
                  💬 Request Video on WhatsApp
                </a>
              </div>
            )}
          </div>
          <div className="video-controls" style={{ display: 'flex', justifyContent: 'center', gap: '14px', alignItems: 'center', marginTop: '18px' }}>
            <button type="button" className="video-nav" onClick={() => go(slide - 1)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontSize: '18px', color: 'var(--body)' }} aria-label="Previous video">‹</button>
            <span style={{ fontSize: '.85rem', color: 'var(--muted)' }}>{slide + 1} / {VIDEOS.length}</span>
            <button type="button" className="video-nav" onClick={() => go(slide + 1)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontSize: '18px', color: 'var(--body)' }} aria-label="Next video">›</button>
          </div>
        </div>
      </div>
    </section>
  );
}