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

const HeroScene = lazy(() => import('../three/HeroScene'));

const RESUME_URL = 'https://res.cloudinary.com/dzt4vlcde/image/upload/v1747974219/Hardik_Songara_updated_ts8zh1.pdf';

const SOCIAL_LINKS = [
  {
    name: 'GitHub', url: 'https://github.com/Hardik74658',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn', url: 'https://in.linkedin.com/in/hardik21549',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter', url: 'https://twitter.com/kano746581',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  },
  {
    name: 'Instagram', url: 'https://instagram.com/hardik_21549',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
];

const ROLES = ['Software Engineer', 'Full-Stack Developer', 'Data Analyst', 'UI Craftsman'];
const FIRST = 'Hardik';
const LAST = 'Songara';

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

function RotatingRole() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block h-[1.5em] overflow-hidden align-bottom min-w-[13ch]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="absolute left-0 whitespace-nowrap font-display font-medium text-accent-600 dark:text-accent-400"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
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
              Open to opportunities · Ahmedabad, IN
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
              <RotatingRole /> building scalable, human-centred products with
              React, FastAPI &amp; data — obsessed with motion, detail and impact.
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
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink-900 dark:bg-cream-50 px-7 py-3.5 font-medium text-cream-50 dark:text-ink-900 shadow-lift cursor-pointer"
                >
                  <span className="absolute inset-0 -translate-x-full bg-accent-600 transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
                  <span className="relative transition-colors duration-300 group-hover:text-white">Get Resume</span>
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
              {SOCIAL_LINKS.map((link) => (
                <Magnetic key={link.name} strength={0.4}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="grid h-11 w-11 place-items-center rounded-full surface text-ink-500 dark:text-ink-200 transition-colors duration-300 hover:text-accent-600 dark:hover:text-accent-400 cursor-pointer"
                  >
                    {link.icon}
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
                src={`${import.meta.env.BASE_URL}ProfilePic (2).png`}
                alt="Portrait of Hardik Songara"
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
                <span className="font-display text-2xl font-bold text-accent-600 dark:text-accent-400">13+</span>
                <span className="text-xs leading-tight text-ink-500 dark:text-ink-300">projects<br />shipped</span>
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
