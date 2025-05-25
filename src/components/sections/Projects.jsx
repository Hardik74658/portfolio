import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReactDOM from 'react-dom';
import { 
  CodeBracketIcon, 
  DocumentTextIcon,
  ChartBarIcon, 
  CpuChipIcon, 
  ShieldCheckIcon,
  CommandLineIcon,
  CubeIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ServerIcon,
  PresentationChartLineIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Modal Portal Component that renders directly to body
function ModalPortal({ children }) {
  const modalRoot = typeof document !== 'undefined' ? document.body : null;
  const elRef = useRef(null);
  
  if (!elRef.current && typeof document !== 'undefined') {
    elRef.current = document.createElement('div');
    elRef.current.setAttribute('class', 'modal-portal');
  }
  
  useEffect(() => {
    const el = elRef.current;
    if (!modalRoot || !el) return;
    
    modalRoot.appendChild(el);
    
    return () => {
      if (modalRoot.contains(el)) {
        modalRoot.removeChild(el);
      }
    };
  }, [modalRoot]);
  
  if (!elRef.current) return null;
  
  return ReactDOM.createPortal(children, elRef.current);
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeTag, setActiveTag] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  // Handle clicks outside modal to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target) && isModalOpen) {
        closeModal();
      }
    }
    
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
      
      // Add a class to the body that we can use to style elements when modal is open
      document.body.classList.add('modal-open');
      
      // Find and modify navbar z-index if it exists
      const navbar = document.querySelector('header');
      if (navbar) {
        navbar.style.zIndex = '1'; // Lower z-index than the modal
      }
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
      
      // Restore navbar z-index if needed
      const navbar = document.querySelector('header');
      if (navbar) {
        navbar.style.zIndex = ''; // Reset to default
      }
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
      
      // Reset navbar z-index on cleanup
      const navbar = document.querySelector('header');
      if (navbar) {
        navbar.style.zIndex = '';
      }
    };
  }, [isModalOpen]);

  // Animation variants
  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  // Functions for handling modal
  const handleViewProject = (project) => {
    setActiveProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
    // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 20,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };
  // Filter tags for projects
  const tags = ['All', 'Resume Projects', 'Vibe Code', 'Web Development', 'Data Analysis', 'Full Stack'];
  // Project data (actual projects from resume)  // State to control showing more projects
  const [showAllProjects, setShowAllProjects] = useState(false);
    const projects = [
    {
      id: 1,
      title: "Founders Nexus",
      description: "A full-stack platform connecting startup founders with mentors, investors, and resources.",
      longDescription: "Built during my internship at Grownited Pvt. Ltd., Founders Nexus is a comprehensive platform designed to connect startup founders with mentors, investors, and essential resources. Implemented with FastAPI for backend services and modern frontend frameworks, this project involved development, maintenance, and deployment of both frontend and backend repositories.",
      tags: ['Full Stack', 'FastAPI', 'Web Development'],      images: [
        "/foundersNexus/Screenshot 2025-04-23 234204.png",
        "/foundersNexus/Screenshot 2025-04-23 235410.png"
      ],
      features: [
        "Backend services implemented with FastAPI",
        "Modern frontend with responsive design",
        "Connection platform for startup ecosystem",
        "Repository maintenance and deployment"
      ],
      technologies: ["FastAPI", "React", "Python", "JavaScript", "HTML/CSS"],
      github: "https://github.com/Hardik74658/foundersNexusFrontend",
      demo: "https://foundersnexus.netlify.app/",
      backendRepo: "https://github.com/Hardik74658/foundersNexusBackend",
      icon: CpuChipIcon,
      color: "from-blue-400 to-blue-600",
      category: "resume"
    },    
    {
      id: 2,
      title: "Data Analysis for Sales Optimization",
      description: "Comprehensive data analysis project focusing on sales trends, customer behavior, and product performance.",
      longDescription: "During my Data Analyst internship at Grownited Pvt. Ltd., I extracted and processed data from PDF orders using advanced Python scripting. The project involved analyzing sales trends, customer behavior, and product performance with Power BI and SQL. I employed hypothesis testing and statistical analysis in Google Colab using Pandas and NumPy, and streamlined workflows with JIRA while presenting findings via a professionally designed React/NextJS website.",
      tags: ['Data Analysis', 'Power BI', 'Python'],      images: [
        "/DataAnalysis/data_extraction_script.webp",
        "/DataAnalysis/image.png"
      ],
      features: [
        "PDF data extraction with Python",
        "Sales trend analysis with Power BI and SQL",
        "Statistical analysis with Pandas and NumPy",
        "Workflow optimization with JIRA"
      ],
      technologies: ["Python", "Pandas", "NumPy", "Power BI", "SQL", "React/NextJS", "JIRA"],
      github: "https://github.com/Hardik74658/Internship_Project_Herbalife_Neutrition_Sales_Analysis_2022-2024",
      demo: "#",
      icon: ChartBarIcon,
      color: "from-green-400 to-green-600",
      category: "resume"
    },
    {
      id: 3,
      title: "Neighbourly Connect",
      description: "A neighborhood service aggregator connecting local service providers with households.",
      longDescription: "Neighbourly Connect is a frontend development project designed to connect local service providers with households in a community. The platform serves as an aggregator for neighborhood services, making it easier for residents to find reliable local help for various needs. Built with NextJS, HTML, CSS, and JavaScript, the application features a responsive and modern UI with user authentication and RESTful API integration.",
      tags: ['Web Development', 'NextJS', 'Frontend'],      images: [
        "/neighbourlyConnect/hero.png",
        "/neighbourlyConnect/image.png"
      ],
      features: [
        "Responsive and modern UI design",
        "User authentication integration",
        "RESTful API calls for dynamic content",
        "Service provider listings and search functionality"
      ],
      technologies: ["NextJS", "HTML", "CSS", "JavaScript", "RESTful API"],
      github: "https://github.com/Hardik74658/my-app",
      demo: "https://neighbourly-connect.vercel.app",
      icon: ServerIcon,
      color: "from-yellow-400 to-yellow-600",
      category: "resume"
    },
    {
      id: 4,
      title: "E-Waste Management Facility Locator",
      description: "An application helping users locate nearby e-waste recycling facilities using ReactJS.",
      longDescription: "The E-Waste Management Facility Locator is designed to address the growing challenge of electronic waste disposal by helping users find nearby recycling facilities. Built with ReactJS, the application features an intuitive user interface that makes it easy to search for and locate e-waste recycling centers. The project implements state management via React Context and smooth routing for an enhanced user experience.",
      tags: ['ReactJS', 'State Management', 'UI/UX'],      images: [
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      features: [
        "Facility locator with mapping integration",
        "State management with React Context",
        "Smooth navigation and routing",
        "Responsive design for all devices"
      ],
      technologies: ["ReactJS", "React Context", "JavaScript", "HTML/CSS"],
      github: "https://github.com/Hardik74658/E_Waste_Managemet/tree/main",
      demo: "#",
      icon: PresentationChartLineIcon,
      color: "from-red-400 to-red-600",
      category: "resume"
    },
    {
      id: 5,
      title: "Zerodha Kite Clone",
      description: "A clone of Zerodha's trading platform with a focus on user interface and functionality.",
      longDescription: "This project is a clone of Zerodha's popular trading platform, Kite. The frontend has been implemented to closely match the original interface, featuring dashboards, charts, and trading tools. The backend part is currently under development to add real functionality to the interface.",
      tags: ['Frontend', 'UI/UX', 'Trading Platform'],      images: [
        "/ZerodhaClone/hero.png",
        "/ZerodhaClone/image.png"
      ],
      features: [
        "Detailed UI matching Zerodha's Kite platform",
        "Dashboard with market overview",
        "Interactive charts and visualizations",
        "Responsive design for all devices"
      ],
      technologies: ["React", "JavaScript", "CSS", "HTML"],
      github: "https://github.com/Hardik74658/ZerodhaClone",
      demo: "#",
      icon: ChartBarIcon,
      color: "from-sky-400 to-sky-600",
      category: "resume"
    },
    {
      id: 6,
      title: "IRCTC Modified UI",
      description: "A vibe code project aimed at improving the original IRCTC UI design with modern components and streamlined navigation.",
      longDescription: "IRCTC Modified UI is a vibe code project using Lovable and Copilot aimed at improving the original Indian Railway Catering and Tourism Corporation (IRCTC) user interface. The project focuses on enhancing user experience with modern components, intuitive layouts, and streamlined navigation to make the booking process more efficient and user-friendly.",
      tags: ['UI/UX', 'Frontend', 'Vibe Code'],      images: [
        "/IRCTCModified/hero.png",
        "/IRCTCModified/image.png"
      ],
      features: [
        "Improved booking flow and user experience",
        "Modern UI components and design system",
        "Streamlined navigation structure",
        "Enhanced mobile experience"
      ],
      technologies: ["React", "CSS", "JavaScript", "Lovable", "Copilot"],
      github: "https://github.com/Hardik74658/irctc-clone",
      demo: "https://irctc-modified.netlify.app",
      icon: CommandLineIcon,
      color: "from-indigo-400 to-indigo-600",
      category: "vibe"
    },
    {
      id: 7,
      title: "Portfolio Gallery Showcase",
      description: "An online portfolio gallery developed with Lovable, enhanced by ChatGPT-generated insights and custom tweaks.",
      longDescription: "Portfolio Gallery Showcase is an online gallery platform developed with Lovable and enhanced by ChatGPT-generated insights and custom tweaks. The project showcases a curated collection of various works in a modern, user-friendly layout, with features like filtering, sorting, and detailed view options to provide an optimal viewing experience.",
      tags: ['Web Development', 'Gallery', 'Vibe Code'],      images: [
        "/PortfolioGalley/hero.png",
        "/PortfolioGalley/image.png"
      ],
      features: [
        "Modern gallery layout and animations",
        "Project filtering and sorting options",
        "Detailed project view with rich media support",
        "Responsive design for all devices"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Lovable", "ChatGPT"],
      github: "https://github.com/Hardik74658/PortfolioGallery",
      demo: "https://portfolio-projects-gallery.netlify.app",
      icon: CubeIcon,
      color: "from-purple-400 to-purple-600",
      category: "vibe"
    },
    {
      id: 8,
      title: "Passport Seva Clone",
      description: "A redesigned and modernized version of the Passport Seva government portal.",
      longDescription: "This project is a vibe-coded clone of the Indian Passport Seva portal with a focus on improved user experience, modern design, and streamlined navigation. The interface maintains the functionality of the original portal while enhancing visual appeal and usability for passport application services.",
      tags: ['UI/UX', 'Government Portal', 'Vibe Code'],      images: [
        "/PassportSevaClone/hero.png",
        "/PassportSevaClone/image.png"
      ],
      features: [
        "Modernized user interface",
        "Streamlined application process",
        "Improved form accessibility",
        "Mobile-responsive design"
      ],
      technologies: ["React", "CSS", "JavaScript", "Vibe Code"],
      github: "https://github.com/Hardik74658/passport-seva-clone",
      demo: "https://passport-seva-clone.netlify.app/",
      icon: DocumentTextIcon,
      color: "from-orange-400 to-orange-600",
      category: "vibe"
    },
    {
      id: 9,
      title: "Quantum Vista",
      description: "Beautiful animated landing page for businesses or startups with dynamic visual elements.",
      longDescription: "Quantum Vista is an elegantly designed, visually stunning landing page template for modern businesses and startups. Featuring smooth animations, engaging visual elements, and an optimized user experience, this project demonstrates advanced frontend techniques and creative design approaches.",
      tags: ['Animation', 'Landing Page', 'Vibe Code'],      images: [
        "/QuantamVista/hero.png",
        "/QuantamVista/image.png"
      ],
      features: [
        "Smooth scroll animations",
        "Dynamic visual elements",
        "Modern design language",
        "Performance-optimized animations"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "GSAP", "ScrollTrigger"],
      github: "https://github.com/Hardik74658/quantum-vista-glow-main",
      demo: "https://quantamvista.netlify.app/",
      icon: CpuChipIcon,
      color: "from-blue-500 to-purple-600",
      category: "vibe"
    },
    {
      id: 10,
      title: "Pixel Retro Collectible Haven",
      description: "Design a retro-style platform with pixel art and collectible items e-commerce store.",
      longDescription: "Pixel Retro Collectible Haven is a uniquely designed e-commerce platform that celebrates pixel art and retro collectibles. The website features a nostalgic design language while maintaining modern e-commerce functionality, creating a seamless shopping experience for collectible enthusiasts.",
      tags: ['E-commerce', 'Pixel Art', 'Vibe Code'],      images: [
        "/PixelCollectibleEcommerse/hero.png",
        "/PixelCollectibleEcommerse/image.png"
      ],
      features: [
        "Pixel art design elements",
        "Product gallery with filtering",
        "Collection showcase",
        "Nostalgic user interface"
      ],
      technologies: ["React", "CSS", "JavaScript", "Vibe Code"],
      github: "https://github.com/Hardik74658/pixel-retro-collectible-haven-vibe-coded",
      demo: "https://pixel-pro-vibe-coded.netlify.app/",
      icon: ShieldCheckIcon,
      color: "from-red-500 to-yellow-500",
      category: "vibe"
    },
    {
      id: 11,
      title: "ConnectPro - LinkedIn Redesigned",
      description: "Create a profile-focused app for professional networking and job posts.",
      longDescription: "ConnectPro is a reimagined professional networking platform inspired by LinkedIn but with a fresh design approach. The platform focuses on clean profile presentations, enhanced networking features, and an improved job posting experience, all wrapped in a modern, intuitive interface.",
      tags: ['Social Networking', 'Professional', 'Vibe Code'],      images: [
        "/ConnectPro/UserDashboard.png",
        "/ConnectPro/Recruiterdashboard.png"
      ],
      features: [
        "Enhanced profile UI",
        "Simplified networking features",
        "Improved job listing interface",
        "Modern feed design"
      ],
      technologies: ["React", "CSS", "JavaScript", "Vibe Code"],
      github: "https://github.com/Hardik74658/ConnectPro---Vibe-Coded--",
      demo: "https://connectprovibecoded.netlify.app/",
      icon: ServerIcon,
      color: "from-blue-600 to-blue-800",
      category: "vibe"
    },
    {
      id: 12,
      title: "UpVote - Social Media UI",
      description: "Design a minimalist messaging app with group chats and media sharing.",
      longDescription: "UpVote presents a fresh take on social media interfaces with a minimalist approach to messaging and content sharing. The platform features clean group chat functionality, streamlined media sharing, and an uncluttered interface that prioritizes content and conversation flow.",
      tags: ['Social Media', 'Messaging', 'Vibe Code'],      images: [
        "/UpVote/image.png",
        "/UpVote/profile.png"
      ],
      features: [
        "Minimalist message interface",
        "Streamlined group chats",
        "Clean media sharing experience",
        "Responsive design across devices"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Vibe Code"],
      github: "https://github.com/Hardik74658/UpVote-Vibe-Coded-UI",
      demo: "https://jade-rolypoly-3ecaf6.netlify.app/",
      icon: CommandLineIcon,
      color: "from-green-500 to-teal-500",
      category: "vibe"
    },
    {
      id: 13,
      title: "Skillshare Landing Page",
      description: "A clean, simple landing page for an educational platform built with basic HTML and CSS.",
      longDescription: "This project showcases the fundamentals of web development with a clean landing page for an educational platform similar to Skillshare. Built using basic HTML and CSS without frameworks, it demonstrates core web development skills and responsive design techniques.",
      tags: ['HTML', 'CSS', 'Educational'],      images: [
        "/skillshare/hero.png",
        "/skillshare/image.png"
      ],
      features: [
        "Clean, responsive design",
        "Course showcase sections",
        "Instructor profiles",
        "Basic CSS animations"
      ],
      technologies: ["HTML", "CSS"],
      github: "https://github.com/Hardik74658/skillshare",
      demo: "#",
      icon: DocumentTextIcon,
      color: "from-amber-400 to-amber-600",
      category: "basic"
    }
  ];
  // Filter projects based on selected tag or category
  const filteredProjects = activeTag === 'All'
    ? projects
    : activeTag === 'Resume Projects'
    ? projects.filter(project => project.category === 'resume')
    : activeTag === 'Vibe Code'
    ? projects.filter(project => project.category === 'vibe')
    : projects.filter(project => project.tags.includes(activeTag));
  return (
    <section id="projects" ref={ref} className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Animated Programming SVGs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        {/* Code brackets */}
        <motion.div
          className="absolute text-blue-600 h-16 w-16 top-20 left-[10%]"
          animate={{ 
            y: [0, -15, 0], 
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </motion.div>

        {/* Server icon */}
        <motion.div
          className="absolute text-green-600 h-20 w-20 top-[30%] right-[5%]"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
        </motion.div>
        
        {/* CPU icon */}
        <motion.div
          className="absolute text-purple-600 h-24 w-24 bottom-40 left-[15%]"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </motion.div>

        {/* Chart icon */}
        <motion.div
          className="absolute text-yellow-600 h-16 w-16 top-[60%] right-[20%]"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </motion.div>
        
        {/* Terminal/CLI */}
        <motion.div
          className="absolute text-red-600 h-20 w-20 bottom-20 right-[10%]"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, 8, 0]
          }}
          transition={{ 
            duration: 7.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.8
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Modal for Project Details - Rendered through portal to be above navbar */}
        <AnimatePresence>
          {isModalOpen && activeProject && (
            <ModalPortal>              <motion.div 
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  ref={modalRef}
                  className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col border border-gray-200"
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                {/* Modal header */}                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${activeProject.color} text-white mr-3`}>
                      {React.createElement(activeProject.icon, { className: "w-5 h-5" })}
                    </div>
                    <h2 className="text-2xl font-bold">{activeProject.title}</h2>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Modal body with scrolling */}
                <div className="overflow-y-auto p-6 flex-grow">
                  {/* Project gallery */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {activeProject.images.map((image, idx) => (
                      <motion.div 
                        key={idx}
                        className="rounded-xl overflow-hidden shadow-md h-48 md:h-60"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 + 0.2 }}
                      >
                        <div className="w-full h-full overflow-hidden">
                          <motion.img 
                            src={image} 
                            alt={`${activeProject.title} screenshot ${idx + 1}`}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeProject.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-xl font-bold mb-3">Overview</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{activeProject.longDescription}</p>
                    
                    <h3 className="text-xl font-bold mb-3">Key Features</h3>
                    <ul className="list-disc list-inside space-y-1 mb-6">
                      {activeProject.features.map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          className="text-gray-700"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + 0.4 }}
                        >
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    
                    <h3 className="text-xl font-bold mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {activeProject.technologies.map((tech, idx) => (
                        <motion.span 
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 + 0.5 }}
                          whileHover={{ backgroundColor: "#e0f2fe", color: "#0369a1" }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                {/* Modal footer */}
                <div className="border-t border-gray-200 p-6 flex justify-between">
                  <div className="flex gap-4">
                    {projects.findIndex(p => p.id === activeProject.id) > 0 && (
                      <button 
                        onClick={() => {
                          const currentIndex = projects.findIndex(p => p.id === activeProject.id);
                          if (currentIndex > 0) {
                            setActiveProject(projects[currentIndex - 1]);
                          }
                        }}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <ArrowLeftIcon className="w-4 h-4 mr-1" />
                        Previous
                      </button>
                    )}
                    
                    {projects.findIndex(p => p.id === activeProject.id) < projects.length - 1 && (
                      <button 
                        onClick={() => {
                          const currentIndex = projects.findIndex(p => p.id === activeProject.id);
                          if (currentIndex < projects.length - 1) {
                            setActiveProject(projects[currentIndex + 1]);
                          }
                        }}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        Next
                        <ArrowRightIcon className="w-4 h-4 ml-1" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <a 
                      href={activeProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                    
                    {activeProject.demo && (
                      <a 
                        href={activeProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>                </div>
                </motion.div>
              </motion.div>
            </ModalPortal>
          )}
        </AnimatePresence>
        
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.span 
            className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1 rounded-full inline-block mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            MY WORK
          </motion.span>
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore my latest work showcasing technical expertise, creative problem-solving, and attention to detail
          </motion.p>
        </div>
        
        {/* Project filter tags */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTag === tag
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>          {/* Projects grid - new alternating layout */}        <motion.div 
          className="space-y-20 md:space-y-32"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {filteredProjects
            .slice(0, showAllProjects ? filteredProjects.length : Math.min(4, filteredProjects.length))
            .map((project, idx) => (            <motion.div
              key={project.id}
              className={`flex flex-col md:flex-row gap-8 p-6 bg-white rounded-xl shadow-md border border-gray-100 md:items-center`}
              variants={fadeInUp}
              custom={idx}
            >
              {/* Project Image Side - Always on top for mobile, alternating on desktop */}
              <motion.div 
                className={`w-full md:w-1/2 bg-white shadow-2xl rounded-2xl overflow-hidden cursor-pointer relative order-1 ${idx % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}
                onClick={() => handleViewProject(project)}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <motion.img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover object-center"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-5 w-full text-white">
                    <p className="font-medium">Click to view details</p>
                  </div>
                </div>
              </motion.div>
                {/* Project Info Side - Always below image on mobile, alternating on desktop */}
              <div className={`w-full md:w-1/2 space-y-4 order-2 ${idx % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="flex items-center mb-2">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${project.color} text-white mr-3`}>
                    {React.createElement(project.icon, { className: "w-5 h-5" })}
                  </div>
                  <span className="text-sm font-medium text-gray-500">{project.tags[0]}</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold">{project.title}</h3>
                
                <p className="text-gray-600">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                  <div className="flex items-center space-x-4 pt-3">
                  <motion.button
                    onClick={() => handleViewProject(project)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details
                    <ArrowRightIcon className="w-4 h-4" />
                  </motion.button>
                  
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                  
                  {project.demo && project.demo !== "#" && (
                    <a 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
          {/* View More/Less button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {filteredProjects.length > 4 && (
            <motion.button 
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAllProjects ? "Show Less" : "View More Projects"}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showAllProjects ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
              </svg>
            </motion.button>
          )}
        </motion.div>
      </div>
        {/* Animated Blobs */}
      <div className="absolute top-0 -left-4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 15s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
        {/* Global styles for modal to appear above navbar */}
      <style jsx global>{`
        body.modal-open header {
          z-index: 1 !important; /* Ensure navbar stays below the modal overlay */
        }
        
        /* This ensures the modal overlay is attached to the viewport */
        .fixed.inset-0.z-\\[9999\\] {
          position: fixed !important;
          top: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          left: 0 !important;
        }
      `}</style>
    </section>
  );
}
