import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import {
  CodeBracketIcon, ChartBarIcon, CubeIcon, ServerStackIcon,
  CpuChipIcon, AcademicCapIcon,
} from '@heroicons/react/24/outline';
import {
  FaPython, FaBootstrap, FaDatabase, FaChartBar, FaFileExcel,
  FaUserFriends, FaChartLine, FaCode, FaFlask,
} from 'react-icons/fa';
import {
  SiNumpy, SiPandas, SiScikitlearn, SiStreamlit, SiReact,
  SiMongodb, SiMysql, SiFastapi, SiJira, SiGoogleanalytics,
} from 'react-icons/si';
import FaJava from '../../assets/icons/skills/java.svg';
import FaHtml5 from '../../assets/icons/skills/html5.svg';
import FaCss3Alt from '../../assets/icons/skills/css3.svg';
import FaJs from '../../assets/icons/skills/javascript.svg';
import PowerBiIcon from '../../assets/icons/powerbi-icon-new.svg';
import SectionHeading from '../ui/SectionHeading';
import { EASE, staggerParent, staggerChild } from '../ui/Reveal';

const skillIcons = {
  'Java': () => <img src={FaJava} alt="" className="h-5 w-5" />,
  'Python': FaPython,
  'HTML5': () => <img src={FaHtml5} alt="" className="h-5 w-5" />,
  'CSS3': () => <img src={FaCss3Alt} alt="" className="h-5 w-5" />,
  'JavaScript': () => <img src={FaJs} alt="" className="h-5 w-5" />,
  'Power BI': () => <img src={PowerBiIcon} alt="" className="h-5 w-5" />,
  'Excel': FaFileExcel,
  'NumPy': SiNumpy,
  'pandas': SiPandas,
  'scikit-learn': SiScikitlearn,
  'Streamlit': SiStreamlit,
  'Bootstrap': FaBootstrap,
  'Flask': FaFlask,
  'React': SiReact,
  'FastAPI': SiFastapi,
  'MongoDB': SiMongodb,
  'MySQL': SiMysql,
  'Strategy & Roadmapping': FaChartLine,
  'Agile & Scrum': SiJira,
  'User Research & UX Thinking': FaUserFriends,
  'A/B Testing': SiGoogleanalytics,
  'SQL for Analytics': FaDatabase,
  'Data Storytelling': FaChartBar,
};

const getSkillIcon = (skill) => skillIcons[skill] || FaCode;

const CATEGORIES = [
  { title: 'Programming Languages', icon: CodeBracketIcon, items: ['Java', 'Python', 'HTML5', 'CSS3', 'JavaScript'], span: 'md:col-span-2' },
  { title: 'Frameworks', icon: CpuChipIcon, items: ['Bootstrap', 'Flask', 'React', 'FastAPI'] },
  { title: 'Data Visualization', icon: ChartBarIcon, items: ['Power BI', 'Excel'] },
  { title: 'ML Libraries', icon: CubeIcon, items: ['NumPy', 'pandas', 'scikit-learn', 'Streamlit'] },
  { title: 'Databases', icon: ServerStackIcon, items: ['MongoDB', 'MySQL'] },
  { title: 'Product & Analytical Skills', icon: AcademicCapIcon, items: ['Strategy & Roadmapping', 'Agile & Scrum', 'User Research & UX Thinking', 'A/B Testing', 'SQL for Analytics', 'Data Storytelling'], span: 'md:col-span-2' },
];

const MARQUEE_SKILLS = ['React', 'Python', 'FastAPI', 'MongoDB', 'Power BI', 'JavaScript', 'pandas', 'MySQL', 'Flask', 'NumPy', 'Excel', 'Bootstrap'];

/** Card with pointer-tracked 3D tilt (pointer devices only). */
function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });
  const rotateX = useTransform(srx, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(sry, [-0.5, 0.5], ['-5deg', '5deg']);

  const onMouseMove = (e) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rx.set((e.clientY - rect.top) / rect.height - 0.5);
    ry.set((e.clientX - rect.left) / rect.width - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

function MarqueeRow() {
  const items = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];
  return (
    <div className="pause-hover relative mb-16 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-marquee gap-4">
        {items.map((skill, i) => {
          const Icon = getSkillIcon(skill);
          return (
            <span
              key={i}
              className="surface flex items-center gap-2.5 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium text-ink-600 dark:text-ink-200"
            >
              <span className="text-accent-600 dark:text-accent-400"><Icon className="h-4 w-4" /></span>
              {skill}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-36 overflow-hidden bg-cream-100/60 dark:bg-ink-900/40">
      <div className="container-section">
        <SectionHeading
          eyebrow="Toolkit"
          title="Skills that turn ideas into products"
          lede="Full-stack engineering meets data — one coherent toolkit."
        />
      </div>

      <MarqueeRow />

      <div className="container-section">
        <motion.div
          className="grid gap-5 md:grid-cols-3"
          variants={staggerParent(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {CATEGORIES.map((cat) => (
            <motion.div key={cat.title} variants={staggerChild} className={cat.span || ''}>
              <TiltCard className="surface group h-full rounded-3xl p-7 transition-shadow duration-500 hover:shadow-lift">
                <div className="mb-6 flex items-center gap-3" style={{ transform: 'translateZ(24px)' }}>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-500/10 text-accent-600 dark:text-accent-400 transition-transform duration-500 ease-out-expo group-hover:rotate-[-8deg] group-hover:scale-110">
                    <cat.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{cat.title}</h3>
                </div>
                <ul className="flex flex-wrap gap-2.5" style={{ transform: 'translateZ(12px)' }}>
                  {cat.items.map((skill) => {
                    const Icon = getSkillIcon(skill);
                    return (
                      <li key={skill}>
                        <motion.span
                          className="flex items-center gap-2 rounded-full border border-ink-900/[0.08] dark:border-white/[0.1] bg-cream-50 dark:bg-ink-800 px-3.5 py-2 text-sm text-ink-600 dark:text-ink-200"
                          whileHover={{ scale: 1.06, y: -2 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        >
                          <span className="text-ink-400 dark:text-ink-300"><Icon className="h-4 w-4" /></span>
                          {skill}
                        </motion.span>
                      </li>
                    );
                  })}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
