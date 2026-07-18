import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CodeBracketIcon, ChartBarIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import SectionHeading from '../ui/SectionHeading';
import { EASE } from '../ui/Reveal';

const EXPERIENCES = [
  {
    id: 0,
    role: 'Full Stack Developer Intern',
    company: 'Grownited Pvt. Ltd.',
    location: 'Ahmedabad, Gujarat',
    duration: 'Jan 2025 – Apr 2025',
    url: 'https://foundersnexus.netlify.app/',
    description: [
      'Built a full-stack web application using FastAPI for backend services combined with modern frontend frameworks.',
      'Contributed to Founders Nexus—a platform connecting startup founders with mentors, investors, and resources.',
      'Maintenance of repos and deployment: Frontend Repo: foundersNexusFrontend, Backend Repo: foundersNexusBackend',
    ],
    tech: ['FastAPI', 'React', 'MongoDB', 'NextJS'],
    icon: CodeBracketIcon,
  },
  {
    id: 1,
    role: 'Data Analyst Intern',
    company: 'Grownited Pvt. Ltd.',
    location: 'Ahmedabad, Gujarat',
    duration: 'June 2024 – July 2024',
    description: [
      'Extracted and processed data from PDF orders using advanced Python scripting.',
      'Analyzed sales trends, customer behavior, and product performance with Power BI and SQL.',
      'Employed hypothesis testing and statistical analysis in Google Colab using Pandas and NumPy.',
      'Streamlined workflows with JIRA and presented findings via a professionally designed React/NextJS website.',
    ],
    tech: ['Python', 'Power BI', 'SQL', 'Pandas', 'NumPy', 'JIRA', 'React/NextJS'],
    icon: ChartBarIcon,
  },
];

function ExperienceCard({ exp, index }) {
  return (
    <div className="relative pl-12 md:pl-20 pb-16 last:pb-0">
      {/* Node */}
      <motion.span
        className="absolute left-[13px] md:left-[21px] top-9 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.2 }}
      >
        <span className="absolute h-4 w-4 rounded-full bg-accent-500/30" />
        <span className="h-2 w-2 rounded-full bg-accent-500" />
      </motion.span>

      <motion.div
        className="surface group relative overflow-hidden rounded-3xl p-7 md:p-9"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.85, delay: index * 0.05, ease: EASE }}
        whileHover={{ y: -5 }}
      >
        <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-accent-500/[0.07] blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-500/10 text-accent-600 dark:text-accent-400 transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110">
              <exp.icon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-semibold">{exp.role}</h3>
              <p className="mt-1 text-ink-500 dark:text-ink-300">
                {exp.company} · {exp.location}
              </p>
              {exp.url && (
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent-700 dark:text-accent-400 hover:text-accent-600 cursor-pointer"
                >
                  View Project <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
          <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-accent-500/30 bg-accent-500/[0.07] px-4 py-1.5 text-sm font-medium text-accent-700 dark:text-accent-400">
            {exp.duration}
          </span>
        </div>

        <ul className="mt-6 space-y-2.5">
          {exp.description.map((item, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 text-ink-600 dark:text-ink-300"
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + i * 0.08, duration: 0.6, ease: EASE }}
            >
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500/70" />
              {item}
            </motion.li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-ink-900/[0.06] dark:border-white/[0.08] pt-5">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="rounded-full bg-cream-100 dark:bg-ink-800 px-3 py-1 text-xs font-medium text-ink-500 dark:text-ink-200"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function WorkEx() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 70%', 'end 60%'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="workexperience" className="relative overflow-hidden py-24 md:py-36 bg-cream-100/60 dark:bg-ink-900/40">
      <div className="container-section">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've made an impact"
          lede="Internships where I shipped real products and real analysis."
        />

        <div ref={timelineRef} className="relative mx-auto max-w-4xl">
          {/* Track + scroll-drawn progress line */}
          <div className="absolute left-[13px] md:left-[21px] top-2 bottom-2 w-px bg-ink-900/[0.08] dark:bg-white/[0.08]" />
          <motion.div
            className="absolute left-[13px] md:left-[21px] top-2 bottom-2 w-px origin-top bg-accent-500"
            style={{ scaleY: lineScale }}
          />

          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>

        {/* Availability pill */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="surface inline-flex items-center gap-3 rounded-full px-6 py-3.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-leaf" />
            </span>
            <p className="font-medium text-ink-700 dark:text-ink-100">Ready for new opportunities</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
