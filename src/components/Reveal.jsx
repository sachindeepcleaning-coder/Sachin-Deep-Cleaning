import { useRef, useEffect } from 'react';
import gsap from 'gsap';

// Scroll-reveal wrapper driven by GSAP (respects prefers-reduced-motion).
export default function Reveal({ as: Tag = 'div', children, delay = 0, y = 24, className = '', ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible');
      return;
    }
    gsap.set(el, { opacity: 0, y });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            gsap.to(el, { opacity: 1, y: 0, duration: 0.6, delay, ease: 'power2.out' });
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, y]);
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
