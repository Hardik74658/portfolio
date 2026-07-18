import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  EnvelopeIcon, PhoneIcon, MapPinIcon, ArrowRightIcon,
  CheckCircleIcon, ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { sendEmail } from '../../util/sendmail';
import SectionHeading from '../ui/SectionHeading';
import Magnetic from '../ui/Magnetic';
import Reveal, { EASE, staggerParent, staggerChild } from '../ui/Reveal';

const CONTACT_INFO = [
  { icon: EnvelopeIcon, label: 'Email', value: 'hardik.songara.21549@gmail.com', href: 'mailto:hardik.songara.21549@gmail.com' },
  { icon: PhoneIcon, label: 'Phone', value: 'Available on request' },
  { icon: MapPinIcon, label: 'Location', value: 'Ahmedabad, Gujarat, India' },
];

const SOCIALS = [
  {
    name: 'GitHub', url: 'https://github.com/Hardik74658',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn', url: 'https://linkedin.com/in/hardik21549',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
      </svg>
    ),
  },
  {
    name: 'Twitter', url: 'https://twitter.com/kano746581',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
];

const FIELD_CLS = `peer w-full rounded-2xl border border-ink-900/10 dark:border-white/10 bg-white dark:bg-ink-800
  px-5 pt-6 pb-2.5 text-ink-900 dark:text-ink-50 outline-none transition-all duration-300
  focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 placeholder-transparent`;

const LABEL_CLS = `pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-ink-400 transition-all duration-300
  peer-focus:top-[16px] peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-accent-600 dark:peer-focus:text-accent-400
  peer-[:not(:placeholder-shown)]:top-[16px] peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest`;

function FloatingField({ id, label, textarea = false, ...props }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div className="relative">
      <Tag
        id={id}
        name={id}
        placeholder={label}
        className={`${FIELD_CLS} ${textarea ? 'resize-none' : ''}`}
        {...props}
      />
      <label
        htmlFor={id}
        className={`${LABEL_CLS} ${textarea ? 'top-8' : ''}`}
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await sendEmail(formData);
      setFormStatus({ submitted: true, success: result.success, message: result.message });
      if (result.success) setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Oops! Something went wrong. Please try again later.',
      });
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-36">
      {/* Ambient wash */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[24rem] w-[42rem] -translate-x-1/2 rounded-full bg-accent-500/[0.06] blur-3xl" />

      <div className="container-section relative">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great"
          lede="Have a project in mind or want to collaborate? Drop me a message — I'll get back to you soon."
        />

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.6fr]">
          {/* Info panel */}
          <motion.div
            variants={staggerParent(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="surface flex flex-col justify-between rounded-3xl p-8 noise relative overflow-hidden"
          >
            <div>
              <motion.h3 variants={staggerChild} className="font-display text-2xl font-semibold">
                Contact Information
              </motion.h3>
              <div className="mt-8 space-y-6">
                {CONTACT_INFO.map((item) => (
                  <motion.div key={item.label} variants={staggerChild} className="group flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent-500/10 text-accent-600 dark:text-accent-400 transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-widest text-ink-400 dark:text-ink-300">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="mt-1 block break-words font-medium text-ink-800 dark:text-ink-50 hover:text-accent-700 dark:hover:text-accent-400 transition-colors cursor-pointer">
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 break-words font-medium text-ink-800 dark:text-ink-50">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div variants={staggerChild} className="mt-10 border-t border-ink-900/[0.08] dark:border-white/[0.08] pt-6">
              <p className="mb-4 text-sm text-ink-500 dark:text-ink-300">Connect with me:</p>
              <div className="flex gap-3">
                {SOCIALS.map((s) => (
                  <Magnetic key={s.name} strength={0.4}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="grid h-11 w-11 place-items-center rounded-full border border-ink-900/10 dark:border-white/10 text-ink-500 dark:text-ink-200 transition-colors duration-300 hover:border-accent-500 hover:text-accent-600 dark:hover:text-accent-400 cursor-pointer"
                    >
                      {s.icon}
                    </a>
                  </Magnetic>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="surface rounded-3xl p-8 md:p-10">
              <h3 className="font-display text-2xl font-semibold">Send a Message</h3>

              <AnimatePresence>
                {formStatus.submitted && (
                  <motion.div
                    className={`mt-6 flex items-center gap-2.5 rounded-2xl p-4 ${
                      formStatus.success
                        ? 'bg-leaf/10 text-leaf'
                        : 'bg-rose2/10 text-rose2'
                    }`}
                    initial={{ opacity: 0, y: -12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    role="status"
                    aria-live="polite"
                  >
                    {formStatus.success
                      ? <CheckCircleIcon className="h-5 w-5 shrink-0" />
                      : <ExclamationCircleIcon className="h-5 w-5 shrink-0" />}
                    <p className="text-sm font-medium">{formStatus.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <FloatingField id="name" label="Your Name" type="text" required value={formData.name} onChange={handleChange} autoComplete="name" />
                  <FloatingField id="email" label="Your Email" type="email" required value={formData.email} onChange={handleChange} autoComplete="email" />
                </div>
                <FloatingField id="subject" label="Subject" type="text" required value={formData.subject} onChange={handleChange} />
                <FloatingField id="message" label="Your Message" textarea rows={5} required value={formData.message} onChange={handleChange} />

                <Magnetic strength={0.15}>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent-600 px-8 py-4 font-medium text-white shadow-glow transition-opacity disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="absolute inset-0 -translate-x-full bg-ink-900 transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
                    {loading ? (
                      <span className="relative flex items-center gap-2.5">
                        <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending…
                      </span>
                    ) : (
                      <span className="relative flex items-center gap-2">
                        Send Message
                        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    )}
                  </motion.button>
                </Magnetic>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
