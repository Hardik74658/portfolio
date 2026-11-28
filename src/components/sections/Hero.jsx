import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion';
import { ArrowDownIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import Magnetic from '../ui/Magnetic';
import { EASE } from '../ui/Reveal';
import SocialIcon from '../ui/SocialIcon';
import { useContent } from '../../context/ContentContext';

const HeroScene = lazy(() => import('../three/HeroScene'));

function LetterReveal({ text, className, delay = 0 }) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.1em] -mb-[0.1em] ${className || ''}`} aria-hidden="true">
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          initial={{ y: '115%', rotate: 4 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: delay + i * 0.045, ease: EASE }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function RotatingRole({ roles }) {
  const longest = roles.reduce((a, b) => (b.length > a.length ? b : a), '');
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, [roles.length]);
  return (
    <span className="relative inline-block h-[1.5em] overflow-hidden align-bottom">
      {/* Invisible sizer: reserves the width of the longest role so none get clipped */}
      <span aria-hidden="true" className="invisible whitespace-nowrap font-display font-medium">
        {longest}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="absolute left-0 whitespace-nowrap font-display font-medium text-accent-600 dark:text-accent-400"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {roles[index % roles.length]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const { profile, socials } = useContent();
  const FIRST = profile.firstName;
  const LAST = profile.lastName;
  const roles = profile.roles?.length ? profile.roles : [''];
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [dark, setDark] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );
  const [showScene, setShowScene] = useState(false);
  const scrollRef = useRef(0);

  // Track theme class so the 3D scene recolors live
  useEffect(() => {
    const observer = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains('dark'))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Defer WebGL until after first paint so the intro stays 60fps
  useEffect(() => {
    const t = setTimeout(() => setShowScene(!prefersReducedMotion), 350);
    return () => clearTimeout(t);
  }, [prefersReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  useMotionValueEvent(scrollYProgress, 'change', (v) => { scrollRef.current = v; });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden noise"
    >
      {/* 3D particle layer */}
      {showScene && (
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <HeroScene dark={dark} scrollRef={scrollRef} />
          </Suspense>
        </div>
      )}

      {/* Ambient washes */}
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-[32rem] w-[32rem] rounded-full bg-accent-500/[0.09] dark:bg-accent-500/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent-300/[0.12] dark:bg-accent-700/[0.08] blur-3xl" />

      <div className="container-section relative z-10 w-full pt-32 pb-24 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
          {/* Copy */}
          <motion.div style={{ y: contentY, opacity: contentOpacity }}>
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
              </span>
              {profile.eyebrow}
            </motion.span>

            <h1 className="text-display mt-6" aria-label={`${FIRST} ${LAST}`}>
              <LetterReveal text={FIRST} delay={0.25} className="text-ink-900 dark:text-ink-50" />
              <br />
              <LetterReveal
                text={LAST}
                delay={0.5}
                className="text-transparent [-webkit-text-stroke:1.5px_theme(colors.accent.600)] dark:[-webkit-text-stroke:1.5px_theme(colors.accent.400)]"
              />
            </h1>

            <motion.p
              className="mt-7 text-lg sm:text-xl text-ink-500 dark:text-ink-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            >
              <RotatingRole roles={roles} /> {profile.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
            >
              <Magnetic strength={0.25}>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink-900 dark:bg-cream-50 px-7 py-3.5 font-medium text-cream-50 dark:text-ink-900 shadow-lift cursor-pointer"
                >
                  <span className="absolute inset-0 -translate-x-full bg-accent-600 transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
                  <span className="relative transition-colors duration-300 group-hover:text-white">{profile.resumeLabel}</span>
                  <ArrowUpRightIcon className="relative h-4 w-4 transition-all duration-300 group-hover:rotate-45 group-hover:text-white" />
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 dark:border-white/15 px-7 py-3.5 font-medium text-ink-800 dark:text-ink-100 transition-colors duration-300 hover:border-accent-500 hover:text-accent-700 dark:hover:text-accent-400 cursor-pointer"
                >
                  View Work
                </a>
              </Magnetic>
            </motion.div>

            {/* Socials */}
            <motion.div
              className="mt-10 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.25 }}
            >
              {socials.filter((l) => l.url).map((link) => (
                <Magnetic key={link.name} strength={0.4}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="grid h-11 w-11 place-items-center rounded-full surface text-ink-500 dark:text-ink-200 transition-colors duration-300 hover:text-accent-600 dark:hover:text-accent-400 cursor-pointer"
                  >
                    <SocialIcon name={link.name} />
                  </a>
                </Magnetic>
              ))}
            </motion.div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            className="relative mx-auto hidden lg:block"
            style={{ y: portraitY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.6, ease: EASE }}
          >
            <div className="relative h-[26rem] w-[26rem]">
              {/* Rotating dashed orbit */}
              <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-accent-500/40" />
              <div className="absolute inset-5 rounded-full border border-ink-900/[0.06] dark:border-white/[0.08]" />
              <motion.img
                src={profile.portraitUrl}
                alt={`Portrait of ${FIRST} ${LAST}`}
                width={416}
                height={416}
                className="absolute inset-8 h-[calc(100%-4rem)] w-[calc(100%-4rem)] rounded-full object-cover shadow-lift"
                whileHover={{ scale: 1.04, rotate: 1.5 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              />
              {/* Badge */}
              <motion.div
                className="surface absolute -bottom-2 left-6 flex items-center gap-2 rounded-2xl px-4 py-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.7, ease: EASE }}
              >
                <span className="font-display text-2xl font-bold text-accent-600 dark:text-accent-400">{profile.badgeValue}</span>
                <span className="max-w-[5.5rem] text-xs leading-tight text-ink-500 dark:text-ink-300">{profile.badgeLabel}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-400 dark:text-ink-300 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ opacity: contentOpacity }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDownIcon className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
