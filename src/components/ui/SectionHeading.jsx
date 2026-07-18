import React from 'react';
import { motion } from 'framer-motion';
import Reveal, { RevealWords, EASE } from './Reveal';

/**
 * Consistent section header: eyebrow chip, masked headline, optional lede.
 */
export default function SectionHeading({ eyebrow, title, lede, align = 'center' }) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col ${alignCls} mb-14 md:mb-20`}>
      {eyebrow && (
        <Reveal y={16} duration={0.7}>
          <span className="eyebrow">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-accent-500"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <RevealWords
        as="h2"
        text={title}
        delay={0.08}
        className="text-display-sm mt-4 text-balance"
      />
      {lede && (
        <motion.p
          className={`mt-5 max-w-2xl text-base sm:text-lg text-ink-500 dark:text-ink-300 ${align === 'center' ? 'mx-auto' : ''}`}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
        >
          {lede}
        </motion.p>
      )}
    </div>
  );
}
