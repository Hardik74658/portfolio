import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import Magnetic from '../ui/Magnetic';
import { EASE } from '../ui/Reveal';
import { useContent } from '../../context/ContentContext';

const NAV = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#workexperience' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { profile, socials, footer, sections } = useContent();
  const LINKS = socials.filter((l) => l.url);
  const nav = NAV.filter((n) => {
    const key = { '#about': 'about', '#skills': 'skills', '#projects': 'projects', '#workexperience': 'experience', '#contact': 'contact' }[n.href];
    return !key || sections[key]?.visible !== false;
  });

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-cream-50 noise">
      {/* Big CTA */}
      <div className="container-section pt-24 pb-16 text-center">
        <motion.p
          className="eyebrow justify-center !text-accent-400"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {footer.eyebrow}
        </motion.p>
        <motion.h2
          className="text-display-sm mx-auto mt-4 max-w-3xl !text-cream-50 text-balance"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        >
          {footer.headline}
        </motion.h2>
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
        >
          <Magnetic strength={0.25}>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-3 rounded-full bg-accent-600 px-9 py-4 font-medium text-white shadow-glow transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
            >
              {footer.ctaLabel}
              <ArrowUpRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Marquee name */}
      <div className="pointer-events-none select-none overflow-hidden border-y border-white/[0.06] py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]" aria-hidden="true">
        <div className="flex w-max animate-marquee-slow">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-8 font-display text-5xl md:text-7xl font-bold tracking-tight text-white/[0.07] whitespace-nowrap">
              {footer.marqueeText} <span className="text-accent-500/30">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-section flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <p className="text-sm text-ink-300">© {year} {footer.copyright}</p>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {nav.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="text-sm text-ink-200 transition-colors hover:text-accent-400 cursor-pointer">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-5">
          {LINKS.map((link) => (
            <li key={link.name}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm text-ink-200 transition-colors hover:text-accent-400 cursor-pointer"
              >
                {link.name}
                <ArrowUpRightIcon className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
