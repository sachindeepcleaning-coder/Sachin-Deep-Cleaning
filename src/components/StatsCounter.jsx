import { useRef, useEffect } from 'react';
import gsap from 'gsap';

// Animated number counters (GSAP). Respects prefers-reduced-motion.
export default function StatsCounter({ stats }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nums = el.querySelectorAll('[data-target]');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      nums.forEach((n) => (n.textContent = n.dataset.target));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            nums.forEach((n) => {
              const target = +n.dataset.target;
              const obj = { v: 0 };
              gsap.to(obj, {
                v: target,
                duration: 1.6,
                ease: 'power1.out',
                onUpdate() {
                  n.textContent = Math.round(obj.v);
                },
                onComplete() {
                  n.textContent = target;
                },
              });
            });
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="stats" ref={ref}>
      {stats.map((s, i) => (
        <div className="stat" key={i}>
          <strong>
            <span data-target={s.value}>0</span>
            {s.suffix || ''}
          </strong>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
