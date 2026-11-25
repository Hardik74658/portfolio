import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';
import SectionHeading from '../ui/SectionHeading';
import Reveal, { EASE, staggerParent, staggerChild } from '../ui/Reveal';

const FAQS = [
  {
    question: 'Who am I as a developer?',
    answer: "I'm an engineer who works across enterprise cloud and the modern web. By day I'm an SAP Cloud Technical Consultant at TCS; on the side I run TheMediaLabz, building scalable, user-centric web products with a keen eye for design and functionality.",
  },
  {
    question: 'What technical skills do I bring?',
    answer: 'On the enterprise side: SAP ERP tools (DED, CLD, SPC), SAP S/4HANA, SAP Web Dispatcher, SAP Cloud Connector agents, their installations, and Linux server administration. On the web side: React, Three.js / React Three Fiber, FastAPI, Firebase, MongoDB and Python, plus Excel and Power BI for data.',
  },
  {
    question: "What's my professional experience?",
    answer: "I'm currently at Tata Consultancy Services (TCS) as an Assistant System Engineer Trainee working as a Cloud Technical Consultant in SAP, and I became Team Lead within 3 months of joining. I also founded TheMediaLabz, a branding, content and web studio whose work includes Chai Kaapi Ahmedabad's ordering system and TheWedLabs. Before that, I worked as a Full Stack Developer Intern at Grownited Pvt. Ltd. (Jan–Apr 2025) where I built Founders Nexus — a platform connecting startup founders with mentors and investors — using FastAPI and modern frontend frameworks. I also worked as a Data Analyst Intern (June–July 2024) where I extracted data from PDFs, analyzed sales trends with Power BI, and employed statistical analysis using Python libraries.",
  },
  {
    question: 'How do I lead?',
    answer: "Becoming Team Lead at TCS within my first 3 months taught me that leadership is mostly clarity and trust: breaking work down, unblocking people early and owning the outcome. Running TheMediaLabz adds the other half: managing clients, deadlines and delivery end to end.",
  },
  {
    question: 'How do I approach new challenges?',
    answer: "As a quick learner and team player, I'm always eager to explore AI/ML and emerging technologies. I thrive in collaborative environments and adapt rapidly to new tools and frameworks.",
  },
  {
    question: 'What drives me professionally?',
    answer: "I'm driven by curiosity, empathy, and a desire to create real-world impact. I believe technology should solve genuine problems and enhance human experiences in meaningful ways.",
  },
  {
    question: 'How do I demonstrate my abilities?',
    answer: "My strong problem-solving skills shine through academic projects and hackathons. I've consistently delivered innovative solutions under pressure and transformed complex requirements into elegant implementations.",
  },
];

const STATS = [
  { value: '17+', label: 'Projects shipped' },
  { value: '3 mo', label: 'To team lead' },
  { value: '20+', label: 'Technologies' },
];

function FaqItem({ faq, index, open, onToggle }) {
  return (
    <motion.div variants={staggerChild} className="border-b border-ink-900/[0.08] dark:border-white/[0.08]">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left cursor-pointer"
      >
        <span className="flex items-baseline gap-4">
          <span className="font-display text-sm tabular-nums text-accent-600 dark:text-accent-400">
            0{index + 1}
          </span>
          <span className={`font-display text-lg sm:text-xl font-medium transition-colors duration-300 ${
            open ? 'text-accent-700 dark:text-accent-400' : 'text-ink-800 dark:text-ink-100 group-hover:text-accent-700 dark:group-hover:text-accent-400'
          }`}>
            {faq.question}
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
            open
              ? 'border-accent-500 bg-accent-500 text-white'
              : 'border-ink-900/15 dark:border-white/15 text-ink-500 dark:text-ink-200'
          }`}
        >
          <PlusIcon className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-7 pl-9 pr-4 text-ink-500 dark:text-ink-300 leading-relaxed max-w-2xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function About() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="about" className="relative py-24 md:py-36 overflow-hidden">
      <div className="container-section">
        <SectionHeading
          eyebrow="About Me"
          title="Engineering with empathy, shipping with intent"
          lede="A closer look at how I think, build and grow."
        />

        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          {/* Sticky intro card */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="surface relative overflow-hidden rounded-3xl p-8 noise">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-500/10 blur-2xl" />
                <p className="font-display text-xl sm:text-2xl font-medium leading-snug text-ink-800 dark:text-ink-50">
                  “I believe the best software feels{' '}
                  <span className="text-accent-600 dark:text-accent-400">invisible</span> — it just
                  works, moves beautifully, and respects the person using it.”
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-ink-900/[0.08] dark:border-white/[0.08] pt-6">
                  {STATS.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: EASE }}
                    >
                      <p className="font-display text-3xl font-bold text-ink-900 dark:text-ink-50">{s.value}</p>
                      <p className="mt-1 text-xs uppercase tracking-wider text-ink-400 dark:text-ink-300">{s.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Accordion */}
          <motion.div
            variants={staggerParent(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="border-t border-ink-900/[0.08] dark:border-white/[0.08]"
          >
            {FAQS.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
