import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Scroll-triggered reveal. Wraps children and slides+fades them in
 * once they enter the viewport.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 36,
  duration = 0.9,
  once = true,
  className = '',
  amount = 0.25,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Per-word masked rise, for headlines. */
export function RevealWords({ text, className = '', delay = 0, as: Tag = 'span' }) {
  const words = String(text).split(' ');
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.85, delay: delay + i * 0.055, ease: EASE }}
            aria-hidden="true"
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span aria-hidden="true">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}

/** Stagger container + item pair for lists/grids. */
export const staggerParent = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const staggerChild = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export { EASE };
