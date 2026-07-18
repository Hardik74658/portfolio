import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE } from './Reveal';

const NAME = 'HARDIK';

/**
 * Cinematic intro: letters rise in, a counter runs 0→100, then the
 * curtain peels upward revealing the page.
 */
export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const DURATION = 1600;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION);
      // ease-out so the counter feels like it "lands"
      setCount(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink-950"
      exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.87, 0, 0.13, 1] } }}
      onAnimationComplete={() => {}}
    >
      <div className="flex overflow-hidden" aria-label="Hardik">
        {NAME.split('').map((ch, i) => (
          <motion.span
            key={i}
            className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-cream-50"
            initial={{ y: '120%', rotate: 6 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.06, ease: EASE }}
          >
            {ch}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="mt-8 h-px w-40 sm:w-56 bg-ink-600 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="h-full bg-accent-500"
          style={{ width: `${count}%` }}
        />
      </motion.div>

      <motion.span
        className="mt-4 font-display text-sm tabular-nums text-ink-300 tracking-[0.3em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {String(count).padStart(3, '0')}
      </motion.span>

      {/* Signal completion once the counter lands */}
      {count === 100 && <CompletionPing onComplete={onComplete} />}
    </motion.div>
  );
}

function CompletionPing({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 250);
    return () => clearTimeout(t);
  }, [onComplete]);
  return null;
}
