import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent, useTransform } from 'framer-motion';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

/** Floating back-to-top button with a circular scroll-progress ring. */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const dash = useTransform(progress, [0, 1], [138, 0]);

  useMotionValueEvent(scrollY, 'change', (v) => setVisible(v > 400));

  const scrollToTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-[90] grid h-12 w-12 place-items-center rounded-full glass shadow-soft cursor-pointer"
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="22" fill="none" strokeWidth="2" className="stroke-ink-900/10 dark:stroke-white/10" />
            <motion.circle
              cx="24" cy="24" r="22" fill="none" strokeWidth="2" strokeLinecap="round"
              className="stroke-accent-500"
              strokeDasharray="138"
              style={{ strokeDashoffset: dash }}
            />
          </svg>
          <ArrowUpIcon className="h-5 w-5 text-ink-700 dark:text-ink-100" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
