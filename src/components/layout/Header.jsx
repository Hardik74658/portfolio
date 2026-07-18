import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';
import Magnetic from '../ui/Magnetic';
import { EASE } from '../ui/Reveal';

const NAV_ITEMS = [
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Experience', id: 'workexperience' },
  { name: 'Contact', id: 'contact' },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Hide on scroll down, reveal on scroll up — keeps the canvas clean
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    setHidden(latest > prev && latest > 320 && !menuOpen);
  });

  // Scroll-spy for active nav state
  useEffect(() => {
    const sections = NAV_ITEMS
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-[100]"
        animate={{ y: hidden ? '-110%' : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {/* Scroll progress hairline */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] w-full origin-left bg-accent-500"
          style={{ scaleX: progress }}
        />
        <div
          className={`transition-all duration-500 ease-out-expo ${
            scrolled ? 'glass shadow-soft py-3' : 'bg-transparent py-5'
          }`}
        >
          <nav className="container-section flex items-center justify-between" aria-label="Primary">
            <Magnetic strength={0.25}>
              <a href="#" className="group flex items-center gap-2.5" aria-label="Back to top">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink-900 dark:bg-cream-50 font-display text-sm font-bold text-cream-50 dark:text-ink-900 transition-transform duration-300 group-hover:rotate-[-8deg]">
                  HS
                </span>
                <span className="hidden sm:block font-display font-semibold text-ink-900 dark:text-ink-50">
                  Hardik Songara
                </span>
              </a>
            </Magnetic>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      active === item.id
                        ? 'text-ink-900 dark:text-ink-50'
                        : 'text-ink-400 dark:text-ink-300 hover:text-ink-900 dark:hover:text-ink-50'
                    }`}
                  >
                    {active === item.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-ink-900/[0.06] dark:bg-white/[0.08]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <Magnetic strength={0.3}>
                <button
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  className="grid h-10 w-10 place-items-center rounded-full glass cursor-pointer overflow-hidden"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={theme}
                      initial={{ y: 14, opacity: 0, rotate: 40 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: -14, opacity: 0, rotate: -40 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      {theme === 'dark'
                        ? <SunIcon className="h-5 w-5 text-accent-400" />
                        : <MoonIcon className="h-5 w-5 text-ink-600" />}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </Magnetic>

              {/* Mobile burger */}
              <button
                className="md:hidden grid h-10 w-10 place-items-center rounded-full glass cursor-pointer"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <div className="flex w-5 flex-col gap-[5px]">
                  <motion.span
                    className="h-[2px] w-full rounded bg-ink-800 dark:bg-ink-100"
                    animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                  />
                  <motion.span
                    className="h-[2px] w-full rounded bg-ink-800 dark:bg-ink-100"
                    animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                  />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col justify-center bg-cream-50 dark:bg-ink-950 px-8 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
          >
            <ul className="space-y-2">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <motion.a
                    href={`#${item.id}`}
                    className="block font-display text-4xl font-semibold text-ink-900 dark:text-ink-50 py-2"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: EASE }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="mr-4 font-sans text-sm text-accent-600 dark:text-accent-400 tabular-nums align-super">
                      0{i + 1}
                    </span>
                    {item.name}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.p
              className="mt-12 text-sm text-ink-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              hardik.songara.21549@gmail.com
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
