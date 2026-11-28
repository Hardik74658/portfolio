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
import SocialIcon from '../ui/SocialIcon';
import { useContent } from '../../context/ContentContext';

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
  const { sections, profile, socials } = useContent();
  const sec = sections.contact;
  const CONTACT_INFO = [
    profile.email && { icon: EnvelopeIcon, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    profile.phone && { icon: PhoneIcon, label: 'Phone', value: profile.phone, href: /^\+?[\d\s-]{7,}$/.test(profile.phone) ? `tel:${profile.phone.replace(/\s/g, '')}` : undefined },
    profile.location && { icon: MapPinIcon, label: 'Location', value: profile.location },
  ].filter(Boolean);
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

  if (!sec.visible) return null;

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-36">
      {/* Ambient wash */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[24rem] w-[42rem] -translate-x-1/2 rounded-full bg-accent-500/[0.06] blur-3xl" />

      <div className="container-section relative">
        <SectionHeading
          eyebrow={sec.eyebrow}
          title={sec.title}
          lede={sec.lede}
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
                {socials.filter((s) => s.url).map((s) => (
                  <Magnetic key={s.name} strength={0.4}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="grid h-11 w-11 place-items-center rounded-full border border-ink-900/10 dark:border-white/10 text-ink-500 dark:text-ink-200 transition-colors duration-300 hover:border-accent-500 hover:text-accent-600 dark:hover:text-accent-400 cursor-pointer"
                    >
                      <SocialIcon name={s.name} />
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
