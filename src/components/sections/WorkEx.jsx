import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  CodeBracketIcon, 
  CommandLineIcon, 
  ServerIcon,
  ChartBarIcon, 
  CircleStackIcon,
  CloudIcon
} from '@heroicons/react/24/outline';

export default function WorkEx() {
  const [activeExperience, setActiveExperience] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Define work experiences from resume
  const experiences = [
    {
      id: 0,
      role: "Full Stack Developer Intern",
      company: "Grownited Pvt. Ltd.",
      location: "Ahmedabad, Gujarat",
      duration: "Jan 2025 – Apr 2025",
      url: "https://foundersnexus.netlify.app/",
      description: [
        "Built a full-stack web application using FastAPI for backend services combined with modern frontend frameworks.",
        "Contributed to Founders Nexus—a platform connecting startup founders with mentors, investors, and resources.",
        "Maintenance of repos and deployment: Frontend Repo: foundersNexusFrontend, Backend Repo: foundersNexusBackend"
      ],
      color: "blue",
      tech: ["FastAPI", "React", "MongoDB", "NextJS"],
      icon: <CodeBracketIcon className="w-6 h-6" />
    },
    {
      id: 1,
      role: "Data Analyst Intern",
      company: "Grownited Pvt. Ltd.",
      location: "Ahmedabad, Gujarat",
      duration: "June 2024 – July 2024",
      description: [
        "Extracted and processed data from PDF orders using advanced Python scripting.",
        "Analyzed sales trends, customer behavior, and product performance with Power BI and SQL.",
        "Employed hypothesis testing and statistical analysis in Google Colab using Pandas and NumPy.",
        "Streamlined workflows with JIRA and presented findings via a professionally designed React/NextJS website."
      ],
      color: "purple",
      tech: ["Python", "Power BI", "SQL", "Pandas", "NumPy", "JIRA", "React/NextJS"],
      icon: <ChartBarIcon className="w-6 h-6" />
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Animated coding SVGs that float in the background
  const FloatingCodeSVG = ({ delay, top, left, icon, color }) => (
    <motion.div
      className={`absolute ${color} opacity-20 md:opacity-30 pointer-events-none z-0`}
      style={{ top: `${top}%`, left: `${left}%` }}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 4,
        delay: delay,
        ease: "easeInOut"
      }}
    >
      {icon}
    </motion.div>
  );

  // Collection of programming SVGs for the background
  const svgCollection = [
    { 
      icon: <CodeBracketIcon className="w-12 h-12" />, 
      color: "text-blue-500", 
      top: 15, 
      left: 5, 
      delay: 0 
    },
    { 
      icon: <ServerIcon className="w-14 h-14" />, 
      color: "text-green-500", 
      top: 75, 
      left: 80, 
      delay: 1.2 
    },
    { 
      icon: <CommandLineIcon className="w-10 h-10" />, 
      color: "text-purple-500", 
      top: 45, 
      left: 92, 
      delay: 0.5 
    },    { 
      icon: <CircleStackIcon className="w-16 h-16" />, 
      color: "text-yellow-500", 
      top: 85, 
      left: 15, 
      delay: 2.1 
    },
    { 
      icon: <CloudIcon className="w-12 h-12" />, 
      color: "text-pink-500", 
      top: 10, 
      left: 85, 
      delay: 1.7 
    },
    // Binary code SVG representation
    { 
      icon: (
        <div className="font-mono text-xs md:text-sm space-y-1 opacity-60">
          <div>01001100</div>
          <div>10101010</div>
          <div>01010101</div>
        </div>
      ), 
      color: "text-gray-600", 
      top: 30, 
      left: 70, 
      delay: 0.8 
    }
  ];

  // Custom connector line for timeline
  const TimelineConnector = ({ active }) => {
    return (
      <div className="absolute left-5 md:left-6 top-0 h-full flex justify-center">
        <div className="w-0.5 bg-gradient-to-b from-transparent via-gray-200 to-transparent h-full"></div>
        <motion.div 
          className={`absolute w-3 h-3 rounded-full ${active ? 'bg-blue-500' : 'bg-gray-300'} -left-[5px] top-[26px]`}
          initial={{ scale: active ? 0.8 : 1 }}
          animate={{ scale: active ? 1.2 : 1 }}
          transition={{ duration: 0.5, repeat: active ? Infinity : 0, repeatType: "reverse" }}
        />
      </div>
    );
  };

  // Tech pill badge component
  const TechBadge = ({ tech, color }) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-700',
      purple: 'bg-purple-100 text-purple-700',
      default: 'bg-gray-100 text-gray-700'
    };

    const badgeColor = colorMap[color] || colorMap.default;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColor} mr-2 mb-2`}>
        {tech}
      </span>
    );
  };

  return (
    <section id="workexperience" className="relative py-20 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
      {/* Background SVG Elements */}
      {svgCollection.map((svg, index) => (
        <FloatingCodeSVG
          key={index}
          delay={svg.delay}
          top={svg.top}
          left={svg.left}
          icon={svg.icon}
          color={svg.color}
        />
      ))}

      {/* Animated code paths in the background */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M0,50 Q25,30 50,50 T100,50"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          className="text-blue-500"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.path
          d="M0,70 Q40,40 70,60 T100,30"
          stroke="currentColor" 
          strokeWidth="0.5"
          fill="none"
          className="text-purple-500"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.7 }}
        />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header with animated reveal */}
        <motion.div 
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-block"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            <CommandLineIcon className="w-12 h-12 mx-auto text-blue-500 mb-4" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">Work Experience</h2>
          <p className="max-w-xl mx-auto text-lg text-gray-600">My professional journey building impactful solutions and analyzing data</p>
          
          {/* Animated glowing underline */}
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-4"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Experience timeline with visual effects */}
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id}
              className={`relative pl-10 md:pl-16 pb-12 ${index === experiences.length - 1 ? '' : ''}`}
              variants={itemVariants}
              onMouseEnter={() => setActiveExperience(index)}
            >
              <TimelineConnector active={activeExperience === index} />
              
              <motion.div 
                className={`relative rounded-xl p-6 md:p-8 shadow-lg bg-white hover:shadow-xl transition-all duration-300 border-l-4 ${exp.color === 'blue' ? 'border-blue-500' : 'border-purple-500'}`}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <div className={`mr-3 p-2 rounded-lg ${exp.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                        {exp.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                        <p className="text-lg text-gray-800 font-medium">
                          {exp.company} - <span className="text-gray-600">{exp.location}</span>
                        </p>
                      </div>
                    </div>
                    
                    {exp.url && (
                      <a 
                        href={exp.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`inline-flex items-center mt-2 text-sm ${exp.color === 'blue' ? 'text-blue-600 hover:text-blue-800' : 'text-purple-600 hover:text-purple-800'}`}
                      >
                        <span>View Project</span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                  
                  <div className="mt-2 md:mt-0">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${exp.color === 'blue' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                      {exp.duration}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 my-4">
                  {exp.description.map((item, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <svg className={`w-4 h-4 mt-1.5 mr-2 ${exp.color === 'blue' ? 'text-blue-500' : 'text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <p className="text-gray-700">{item}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mb-2">Technologies:</p>
                  <div className="flex flex-wrap">
                    {exp.tech.map((tech, i) => (
                      <TechBadge key={i} tech={tech} color={exp.color} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Visual indicator of project success */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-lg">
            <motion.div
              className="h-4 w-4 bg-green-500 rounded-full mr-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <p className="text-gray-700 font-medium">Ready for new opportunities</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
