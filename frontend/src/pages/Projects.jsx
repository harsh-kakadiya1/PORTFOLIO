import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/navigation/Navbar';
import { useMobile } from '../hooks/useMobile';

export default function Projects() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const { isMobile, isTablet } = useMobile();

  // Mouse tracking for parallax effect (disabled on mobile for performance)
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 7;
      const y = (e.clientY / window.innerHeight) * 7;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const projects = [
    {
      id: 1,
      title: "AI-Powered Portfolio",
      description: "Interactive portfolio with terminal interface and AI features",
      tech: ["React", "Framer Motion", "Node.js"],
      image: "/images/projects/portfolio-preview.png",
      github: "https://github.com/harsh-kakadiya1/portfolio",
      live: "#",
      status: "completed"
    },
    {
        id: 2,
        title: "StyleMe - AI Fashion Stylist",
        description: "StyleMe is a Flutter-based mobile application designed to be your personal fashion assistant.",
        tech: ["Flutter", "Dart"],
        image: "/images/projects/styleme-preview.png",
        github: "https://github.com/harsh-kakadiya1/StyleMe--Your-Personal-AI-Fashion-Stylist",
        live: "#",
        status: "in-progress"
      },
    {
      id: 3,
      title: "DataMimic.io",
      description: "Advanced Synthetic Data Generation & No-Code EDA/Pre-processing Platform",
      tech: ["Python", "Flask", "Pandas", "NumPy", "Scikit-learn", "Faker", "Bootstrap 5", "JavaScript"],
      image: "/images/projects/datamimic-preview.png",
      github: "https://github.com/harsh-kakadiya1/DataMimic.io",
      live: "https://datamimic-io.onrender.com/",
      status: "completed"
    },
    {
        id: 4,
        title: "Machine Learning Projects",
        description: "Vast collection of ML projects for data analysis and model evaluation",
        tech: ["Python","NumPy","Pandas","Matplotlib","Scikit-learn"],
        image: "/images/projects/ml-project-preview.png",
        github: "https://github.com/harsh-kakadiya1/Machine-Learning-projects",
        live: "https://github.com/harsh-kakadiya1/Machine-Learning-projects",
        status: "in-progress"
      },
      {
        id: 5,
        title: "INFINITE-WIKI",
        description: "An AI-powered encyclopedia application that generates encyclopedia-style definitions and ASCII art visualizations for any topic using Google's Gemini 2.5 Flash API.",
        tech: ["React 19","TypeScript","Vite 6","Gemini 2.5 Flash"],
        image: "/images/projects/infinite-wiki-preview.png",
        github: "https://github.com/harsh-kakadiya1/INFINITE-WIKI",
        live: "https://infinite-wikip.netlify.app/",
        status: "completed"
      },
    
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Grid Background with Parallax */}
      <div 
        className={`fixed inset-0 ${isMobile ? 'opacity-20' : 'opacity-30'}`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 170, 0.3) 2px, transparent 2px),
            linear-gradient(90deg, rgba(0, 212, 170, 0.3) 2px, transparent 2px)
          `,
          backgroundSize: isMobile ? '40px 40px' : '70px 70px',
          backgroundPosition: isMobile ? 'center' : `${100 - mousePosition.x}% ${100 - mousePosition.y}%`
        }}
      />

      {/* Content */}
      <div className={`relative z-10 container mx-auto ${isMobile ? 'px-3 py-16 pt-20' : 'px-4 py-24 pt-32'}`}>
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-center ${isMobile ? 'mb-12' : 'mb-20'}`}
        >
          <h1 className={`${isMobile ? 'text-4xl' : 'text-6xl md:text-8xl'} font-bold text-white ${isMobile ? 'mb-4' : 'mb-6'}`}>
            My <span className="text-cyan-400">Projects</span>
          </h1>
          <p className={`${isMobile ? 'text-lg' : 'text-2xl'} text-gray-300 ${isMobile ? 'max-w-sm' : 'max-w-3xl'} mx-auto leading-relaxed ${isMobile ? 'px-2' : ''}`}>
            A showcase of my technical journey and creative solutions
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'} ${isMobile ? 'max-w-sm mx-auto' : ''}`}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`bg-black/30 backdrop-blur-sm border border-white/20 ${isMobile ? 'rounded-xl p-4' : 'rounded-2xl p-6'} hover:border-cyan-400/50 transition-all duration-300 group`}
            >
              {/* Project Image */}
              <div className={`${isMobile ? 'h-40 mb-4' : 'h-48 mb-6'} bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg overflow-hidden relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`${isMobile ? 'text-4xl' : 'text-6xl'}`}>🚀</span>
                </div>
                {/* Status Badge */}
                <div className={`absolute ${isMobile ? 'top-2 right-2' : 'top-3 right-3'}`}>
                  <span className={`${
                    project.status === 'completed' 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  } px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm`}>
                    {project.status === 'completed' ? '✓ Completed' : '⏳ In Progress'}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div>
                <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-white ${isMobile ? 'mb-2' : 'mb-3'} group-hover:text-cyan-400 transition-colors`}>
                  {project.title}
                </h3>
                <p className={`text-gray-300 ${isMobile ? 'text-sm mb-3 leading-relaxed' : 'text-base mb-4 leading-relaxed'}`}>
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className={`flex flex-wrap gap-2 ${isMobile ? 'mb-4' : 'mb-6'}`}>
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`bg-cyan-500/10 text-cyan-400 ${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'} rounded-full border border-cyan-500/20 font-medium`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className={`flex ${isMobile ? 'flex-col gap-2' : 'gap-4'}`}>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${isMobile ? 'w-full py-2 text-sm' : 'flex-1 py-3 text-base'} bg-gradient-to-r from-gray-800 to-gray-700 text-white px-4 rounded-lg font-medium transition-all hover:from-gray-700 hover:to-gray-600 border border-gray-600 text-center`}
                  >
                    <span className="mr-2">📱</span>
                    GitHub
                  </motion.a>
                  
                  {project.live !== '#' && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`${isMobile ? 'w-full py-2 text-sm' : 'flex-1 py-3 text-base'} bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 rounded-lg font-medium transition-all hover:from-cyan-400 hover:to-blue-400 text-center`}
                    >
                      <span className="mr-2">🚀</span>
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`${isMobile ? 'mt-12' : 'mt-20'} text-center bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-lg border border-gray-700 ${isMobile ? 'rounded-xl p-6' : 'rounded-2xl p-12'}`}
        >
          <h2 className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'} font-bold text-white ${isMobile ? 'mb-3' : 'mb-6'}`}>
            Interested in <span className="text-cyan-400">Collaborating?</span>
          </h2>
          <p className={`${isMobile ? 'text-base mb-6' : 'text-xl mb-8'} text-gray-300 ${isMobile ? 'max-w-sm' : 'max-w-2xl'} mx-auto`}>
            Let's build something amazing together. I'm always open to new opportunities and exciting projects.
          </p>
          
          <motion.button
            whileHover={{ 
              scale: isMobile ? 1.02 : 1.05, 
              boxShadow: "0 0 30px rgba(0, 212, 170, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
            className={`bg-gradient-to-r from-cyan-500 to-blue-500 text-white ${isMobile ? 'px-6 py-3 text-base' : 'px-8 py-4 text-lg'} rounded-xl font-bold transition-all`}
          >
            Get In Touch
          </motion.button>
        </motion.section>
      </div>
    </div>
  );
}
