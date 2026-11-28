import { DEFAULT_PROJECTS, DEFAULT_PROJECT_TAGS } from './projects.js';

/**
 * Built-in site content. The live site uses whatever is saved from the admin
 * page (stored in Convex); these values are the fallback and the starting
 * point the admin page edits from. Every value here must stay plain JSON.
 */
export const DEFAULT_CONTENT = {
  profile: {
    firstName: 'Hardik',
    lastName: 'Songara',
    eyebrow: 'Cloud Technical Consultant @ TCS · Founder, TheMediaLabz',
    roles: ['SAP Cloud Consultant', 'Team Lead', 'Software Engineer', 'Full-Stack Developer', 'Studio Founder'],
    tagline: 'building scalable, human-centred products with React, FastAPI & data — obsessed with motion, detail and impact.',
    resumeUrl: 'https://res.cloudinary.com/dzt4vlcde/image/upload/v1747974219/Hardik_Songara_updated_ts8zh1.pdf',
    resumeLabel: 'Get Resume',
    portraitUrl: '/ProfilePic (2).png',
    badgeValue: '17+',
    badgeLabel: 'projects shipped',
    email: 'hardik.songara.21549@gmail.com',
    phone: 'Available on request',
    location: 'Ahmedabad, Gujarat, India',
  },

  socials: [
    { name: 'GitHub', url: 'https://github.com/Hardik74658' },
    { name: 'LinkedIn', url: 'https://in.linkedin.com/in/hardik21549' },
    { name: 'Twitter', url: 'https://twitter.com/kano746581' },
    { name: 'Instagram', url: 'https://instagram.com/hardik_21549' },
  ],

  sections: {
    about: { visible: true, eyebrow: 'About Me', title: 'Engineering with empathy, shipping with intent', lede: 'A closer look at how I think, build and grow.' },
    skills: { visible: true, eyebrow: 'Toolkit', title: 'Skills that turn ideas into products', lede: 'SAP cloud, full-stack engineering, data and leadership: one coherent toolkit.' },
    projects: { visible: true, eyebrow: 'Selected Work', title: 'Projects with craft in every pixel', lede: 'Technical depth, creative problem-solving and obsessive attention to detail.' },
    experience: { visible: true, eyebrow: 'Experience', title: "Where I've made an impact", lede: 'From SAP cloud consulting and team leadership at TCS to founding my own studio.' },
    contact: { visible: true, eyebrow: 'Contact', title: "Let's build something great", lede: "Have a project in mind or want to collaborate? Drop me a message — I'll get back to you soon." },
  },

  about: {
    quote: 'I believe the best software feels *invisible* — it just works, moves beautifully, and respects the person using it.',
    stats: [
      { value: '17+', label: 'Projects shipped' },
      { value: '3 mo', label: 'To team lead' },
      { value: '20+', label: 'Technologies' },
    ],
    faqs: [
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
        answer: 'Becoming Team Lead at TCS within my first 3 months taught me that leadership is mostly clarity and trust: breaking work down, unblocking people early and owning the outcome. Running TheMediaLabz adds the other half: managing clients, deadlines and delivery end to end.',
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
    ],
  },

  skills: {
    marquee: ['SAP S/4HANA', 'SAP Cloud Connector', 'Linux Server', 'Team Leadership', 'React', 'Python', 'FastAPI', 'MongoDB', 'Power BI', 'JavaScript', 'pandas', 'MySQL', 'Flask', 'NumPy', 'Excel', 'Bootstrap'],
    categories: [
      { title: 'SAP & Cloud', icon: 'CloudIcon', wide: true, items: ['SAP S/4HANA', 'SAP ERP (DED, CLD, SPC)', 'SAP Web Dispatcher', 'SAP Cloud Connector', 'SAP Installations', 'Linux Server'] },
      { title: 'Leadership', icon: 'UserGroupIcon', wide: false, items: ['Team Leadership', 'People Management', 'Stakeholder Communication'] },
      { title: 'Programming Languages', icon: 'CodeBracketIcon', wide: true, items: ['Java', 'Python', 'HTML5', 'CSS3', 'JavaScript'] },
      { title: 'Frameworks', icon: 'CpuChipIcon', wide: false, items: ['Bootstrap', 'Flask', 'React', 'FastAPI', 'Three.js / R3F', 'Firebase'] },
      { title: 'Data Visualization', icon: 'ChartBarIcon', wide: false, items: ['Power BI', 'Excel'] },
      { title: 'ML Libraries', icon: 'CubeIcon', wide: false, items: ['NumPy', 'pandas', 'scikit-learn', 'Streamlit'] },
      { title: 'Databases', icon: 'ServerStackIcon', wide: false, items: ['MongoDB', 'MySQL'] },
      { title: 'Product & Analytical Skills', icon: 'AcademicCapIcon', wide: true, items: ['Strategy & Roadmapping', 'Agile & Scrum', 'User Research & UX Thinking', 'A/B Testing', 'SQL for Analytics', 'Data Storytelling'] },
    ],
  },

  projects: {
    filters: DEFAULT_PROJECT_TAGS,
    initialCount: 4,
    items: DEFAULT_PROJECTS,
  },

  experience: {
    availability: 'Currently at TCS · Building TheMediaLabz',
    items: [
      {
        id: 'tcs',
        role: 'Assistant System Engineer Trainee',
        subtitle: 'Cloud Technical Consultant (SAP) · Team Lead',
        company: 'Tata Consultancy Services (TCS)',
        location: 'India',
        duration: 'Present',
        url: '',
        urlLabel: '',
        description: [
          'Working as a Cloud Technical Consultant on SAP, supporting SAP ERP systems and tools including DED, CLD and SPC.',
          'Hands-on with SAP solutions: SAP S/4HANA, SAP Web Dispatcher and SAP Cloud Connector agents, including their installation and configuration.',
          'Installing, configuring and administering Linux servers that host SAP workloads.',
          "Became Team Lead within 3 months of joining: leading the team's day-to-day work and building real management and leadership skills.",
        ],
        tech: ['SAP S/4HANA', 'SAP ERP', 'DED', 'CLD', 'SPC', 'SAP Web Dispatcher', 'SAP Cloud Connector', 'Linux', 'Team Leadership'],
        icon: 'CloudIcon',
      },
      {
        id: 'medialabz',
        role: 'Founder',
        subtitle: '',
        company: 'TheMediaLabz',
        location: 'Ahmedabad, Gujarat',
        duration: '2026 – Present',
        url: 'https://themedialabz.vercel.app/',
        urlLabel: 'Visit TheMediaLabz',
        description: [
          'Founded and run a branding, content and custom-web studio: logos, Instagram management, posters, reels, custom websites and AI agents.',
          'Built a table-ordering system for Chai Kaapi Ahmedabad that takes UPI payments with zero gateway fees, plus their posters, creatives and reels.',
          'Launched TheWedLabs, a wedding invitation website product with 50+ WedSites delivered.',
          'Designed and built client sites such as an animated video-editor portfolio for Karan Suthar.',
        ],
        tech: ['React', 'React Three Fiber', 'Firebase', 'Tailwind CSS', 'Motion', 'Branding', 'Video Editing'],
        icon: 'SparklesIcon',
      },
      {
        id: 'grownited-fs',
        role: 'Full Stack Developer Intern',
        subtitle: '',
        company: 'Grownited Pvt. Ltd.',
        location: 'Ahmedabad, Gujarat',
        duration: 'Jan 2025 – Apr 2025',
        url: 'https://foundersnexus.netlify.app/',
        urlLabel: 'View Project',
        description: [
          'Built a full-stack web application using FastAPI for backend services combined with modern frontend frameworks.',
          'Contributed to Founders Nexus—a platform connecting startup founders with mentors, investors, and resources.',
          'Maintenance of repos and deployment: Frontend Repo: foundersNexusFrontend, Backend Repo: foundersNexusBackend',
        ],
        tech: ['FastAPI', 'React', 'MongoDB', 'NextJS'],
        icon: 'CodeBracketIcon',
      },
      {
        id: 'grownited-da',
        role: 'Data Analyst Intern',
        subtitle: '',
        company: 'Grownited Pvt. Ltd.',
        location: 'Ahmedabad, Gujarat',
        duration: 'June 2024 – July 2024',
        url: '',
        urlLabel: '',
        description: [
          'Extracted and processed data from PDF orders using advanced Python scripting.',
          'Analyzed sales trends, customer behavior, and product performance with Power BI and SQL.',
          'Employed hypothesis testing and statistical analysis in Google Colab using Pandas and NumPy.',
          'Streamlined workflows with JIRA and presented findings via a professionally designed React/NextJS website.',
        ],
        tech: ['Python', 'Power BI', 'SQL', 'Pandas', 'NumPy', 'JIRA', 'React/NextJS'],
        icon: 'ChartBarIcon',
      },
    ],
  },

  footer: {
    eyebrow: "What's next",
    headline: "Have an idea? Let's make it move.",
    ctaLabel: 'Say Hello',
    marqueeText: 'HARDIK SONGARA',
    copyright: 'Hardik Songara. Crafted with care.',
  },
};

/**
 * Fills in anything missing from saved content with the defaults, so fields
 * added to the site later still render for content saved before they existed.
 */
export function mergeContent(saved) {
  if (!saved || typeof saved !== 'object') return DEFAULT_CONTENT;
  const merge = (def, val) => {
    if (val === undefined || val === null) return def;
    if (Array.isArray(def)) return Array.isArray(val) ? val : def;
    if (def && typeof def === 'object') {
      if (typeof val !== 'object' || Array.isArray(val)) return def;
      const out = { ...val };
      for (const k of Object.keys(def)) out[k] = merge(def[k], val[k]);
      return out;
    }
    return val;
  };
  return merge(DEFAULT_CONTENT, saved);
}
