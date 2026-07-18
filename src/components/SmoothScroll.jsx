import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';

/**
 * Buttery inertial scrolling via Lenis. Disabled automatically for
 * users who prefer reduced motion.
 */
export default function SmoothScroll({ children }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Anchor links should glide through Lenis, not jump
    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"], a[href^="/#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute('href').replace('/', '');
      const target = hash === '#' ? document.body : document.querySelector(hash);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -72, duration: 1.3 });
      }
    };
    document.addEventListener('click', onClick);

    window.__lenis = lenis;
    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [prefersReducedMotion]);

  return children;
}
