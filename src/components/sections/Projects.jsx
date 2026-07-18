import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  motion, AnimatePresence, useScroll, useTransform, LayoutGroup,
} from 'framer-motion';
import {
  ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, XMarkIcon,
} from '@heroicons/react/24/outline';
import SectionHeading from '../ui/SectionHeading';
import Magnetic from '../ui/Magnetic';
import { EASE } from '../ui/Reveal';
import { PROJECTS, PROJECT_TAGS } from '../../data/projects';

const GitHubGlyph = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

function ModalPortal({ children }) {
  const elRef = useRef(null);
  if (!elRef.current && typeof document !== 'undefined') {
    elRef.current = document.createElement('div');
    elRef.current.className = 'modal-portal';
  }
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    document.body.appendChild(el);
    return () => { document.body.removeChild(el); };
  }, []);
  if (!elRef.current) return null;
  return ReactDOM.createPortal(children, elRef.current);
}

/** Scroll-parallax project card, alternating sides on desktop. */
function ProjectCard({ project, index, onOpen }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1, 1.12]);
  const flip = index % 2 === 1;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE }}
      className={`group grid items-center gap-8 md:gap-12 lg:grid-cols-2 ${flip ? 'lg:[direction:rtl]' : ''}`}
    >
      {/* Image with parallax + hover zoom */}
      <div className="[direction:ltr]">
        <motion.button
          onClick={() => onOpen(project)}
          aria-label={`Open details for ${project.title}`}
          className="relative block w-full cursor-pointer overflow-hidden rounded-3xl surface"
          whileHover="hover"
          whileTap={{ scale: 0.985 }}
        >
          <div className="aspect-[16/10] overflow-hidden">
            <motion.img
              src={project.images[0]}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover object-top"
              style={{ scale: imageScale }}
              variants={{ hover: { scale: 1.24 } }}
              transition={{ duration: 0.8, ease: EASE }}
            />
          </div>
          {/* Hover veil + CTA */}
          <motion.div
            className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink-950/70 via-transparent p-6 opacity-0"
            variants={{ hover: { opacity: 1 } }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-medium text-white">View case</span>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-accent-500 text-white">
              <ArrowUpRightIcon className="h-5 w-5" />
            </span>
          </motion.div>
        </motion.button>
      </div>

      {/* Copy */}
      <div className="[direction:ltr]">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm tabular-nums text-accent-600 dark:text-accent-400">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="h-px w-10 bg-accent-500/50" />
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink-400 dark:text-ink-300">
            {project.tags[0]}
          </span>
        </div>

        <h3 className="mt-4 font-display text-2xl md:text-3xl font-semibold transition-colors duration-300 group-hover:text-accent-700 dark:group-hover:text-accent-400">
          {project.title}
        </h3>
        <p className="mt-3 max-w-xl text-ink-500 dark:text-ink-300">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-ink-900/[0.08] dark:border-white/[0.1] px-3 py-1 text-xs text-ink-500 dark:text-ink-300"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-5">
          <Magnetic strength={0.2}>
            <button
              onClick={() => onOpen(project)}
              className="group/btn inline-flex items-center gap-2 rounded-full bg-ink-900 dark:bg-cream-50 px-6 py-3 text-sm font-medium text-cream-50 dark:text-ink-900 cursor-pointer transition-transform duration-300"
            >
              View Details
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </Magnetic>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 dark:text-ink-300 transition-colors hover:text-accent-700 dark:hover:text-accent-400 cursor-pointer"
          >
            <GitHubGlyph className="h-4 w-4" /> GitHub
          </a>
          {project.demo && project.demo !== '#' && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 dark:text-accent-400 transition-colors hover:text-accent-600 cursor-pointer"
            >
              Live Demo <ArrowUpRightIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      window.__lenis?.start();
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        ref={modalRef}
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-cream-50 dark:bg-ink-900 shadow-lift border border-ink-900/[0.06] dark:border-white/[0.08]"
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.25 } }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-900/[0.08] dark:border-white/[0.08] p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
              {React.createElement(project.icon, { className: 'h-5 w-5' })}
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-semibold">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close details"
            className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink-900/[0.06] dark:hover:bg-white/[0.08] cursor-pointer"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-grow overflow-y-auto p-5 sm:p-6" data-lenis-prevent>
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {project.images.map((image, idx) => (
                  <motion.div
                    key={idx}
                    className="h-48 overflow-hidden rounded-2xl surface md:h-60"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 + 0.1, ease: EASE }}
                  >
                    <motion.img
                      src={image}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className="h-full w-full object-cover object-top"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  </motion.div>
                ))}
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-accent-500/10 px-3 py-1 text-sm text-accent-700 dark:text-accent-400">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="mb-2 font-display text-lg font-semibold">Overview</h3>
              <p className="mb-6 leading-relaxed text-ink-600 dark:text-ink-300">{project.longDescription}</p>

              <h3 className="mb-3 font-display text-lg font-semibold">Key Features</h3>
              <ul className="mb-6 space-y-2">
                {project.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-2.5 text-ink-600 dark:text-ink-300"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.07 + 0.2 }}
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <h3 className="mb-3 font-display text-lg font-semibold">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <motion.span
                    key={tech}
                    className="rounded-lg border border-ink-900/[0.08] dark:border-white/[0.1] px-3 py-1.5 text-sm text-ink-600 dark:text-ink-200"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.04 + 0.3 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-900/[0.08] dark:border-white/[0.08] p-5 sm:p-6">
          <div className="flex gap-2">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              aria-label="Previous project"
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/15 dark:border-white/15 transition-all enabled:hover:border-accent-500 enabled:hover:text-accent-600 enabled:cursor-pointer disabled:opacity-30"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              aria-label="Next project"
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/15 dark:border-white/15 transition-all enabled:hover:border-accent-500 enabled:hover:text-accent-600 enabled:cursor-pointer disabled:opacity-30"
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 dark:bg-cream-50 px-5 py-2.5 text-sm font-medium text-cream-50 dark:text-ink-900 transition-transform hover:scale-[1.03] cursor-pointer"
            >
              <GitHubGlyph /> GitHub
            </a>
            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.03] cursor-pointer"
              >
                Live Demo <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeTag, setActiveTag] = useState('All');
  const [activeProject, setActiveProject] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = activeTag === 'All'
    ? PROJECTS
    : activeTag === 'Resume Projects'
      ? PROJECTS.filter((p) => p.category === 'resume')
      : activeTag === 'Vibe Code'
        ? PROJECTS.filter((p) => p.category === 'vibe')
        : PROJECTS.filter((p) => p.tags.includes(activeTag));

  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 4);
  const activeIndex = activeProject ? PROJECTS.findIndex((p) => p.id === activeProject.id) : -1;

  return (
    <section id="projects" className="relative overflow-hidden py-24 md:py-36">
      <div className="container-section">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects with craft in every pixel"
          lede="Technical depth, creative problem-solving and obsessive attention to detail."
        />

        {/* Filters */}
        <LayoutGroup>
          <motion.div
            className="mb-16 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {PROJECT_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => { setActiveTag(tag); setShowAll(false); }}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer ${
                  activeTag === tag
                    ? 'text-white'
                    : 'text-ink-500 dark:text-ink-300 hover:text-ink-900 dark:hover:text-ink-50'
                }`}
              >
                {activeTag === tag && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-accent-600"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{tag}</span>
              </button>
            ))}
          </motion.div>
        </LayoutGroup>

        {/* Cards */}
        <div className="space-y-24 md:space-y-32">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onOpen={setActiveProject}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Show more */}
        {filteredProjects.length > 4 && (
          <div className="mt-20 text-center">
            <Magnetic strength={0.25}>
              <button
                onClick={() => setShowAll((s) => !s)}
                className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 dark:border-white/15 px-8 py-3.5 font-medium text-ink-800 dark:text-ink-100 transition-colors duration-300 hover:border-accent-500 hover:text-accent-700 dark:hover:text-accent-400 cursor-pointer"
              >
                {showAll ? 'Show Less' : `View All ${filteredProjects.length} Projects`}
                <motion.span animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.4, ease: EASE }}>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              </button>
            </Magnetic>
          </div>
        )}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {activeProject && (
          <ModalPortal>
            <ProjectModal
              project={activeProject}
              onClose={() => setActiveProject(null)}
              onPrev={() => setActiveProject(PROJECTS[activeIndex - 1])}
              onNext={() => setActiveProject(PROJECTS[activeIndex + 1])}
              hasPrev={activeIndex > 0}
              hasNext={activeIndex < PROJECTS.length - 1}
            />
          </ModalPortal>
        )}
      </AnimatePresence>
    </section>
  );
}
