import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/navigation/Navbar';
import BootSequence from '../components/terminal/BootSequence';

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isBooting, setIsBooting] = useState(true);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 7;
      const y = (e.clientY / window.innerHeight) * 7;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  const education = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Gujarat Technological University",
      year: "2021 - 2025",
      description: "Specialized in AI/ML, Data Structures, and Software Engineering"
    },
    {
      degree: "Higher Secondary Certificate",
      institution: "Science Stream",
      year: "2019 - 2021",
      description: "Mathematics, Physics, Chemistry with Computer Science"
    }
  ];

  const experience = [
    {
      role: "Full Stack Developer",
      company: "Freelance Projects",
      period: "2023 - Present",
      description: "Built responsive web applications using React, Node.js, and modern tech stack"
    },
    {
      role: "AI/ML Enthusiast",
      company: "Personal Projects",
      period: "2022 - Present",
      description: "Developed machine learning models and AI-powered applications"
    },
    {
      role: "Open Source Contributor",
      company: "GitHub Community",
      period: "2022 - Present",
      description: "Contributing to open source projects and building developer tools"
    }
  ];

  if (isBooting) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Grid Background with Parallax */}
      <div 
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 170, 0.3) 2px, transparent 2px),
            linear-gradient(90deg, rgba(0, 212, 170, 0.3) 2px, transparent 2px)
          `,
          backgroundSize: '70px 70px',
          backgroundPosition: `${100 - mousePosition.x}% ${100 - mousePosition.y}%`
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 pt-32">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
            About <span className="text-cyan-400">Me</span>
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            AI/ML enthusiast and full-stack developer passionate about creating innovative solutions that bridge technology and human needs
          </p>
        </motion.div>

        {/* About Me Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-black/30 backdrop-blur-sm border border-white/50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              More <span className="text-cyan-400">About Me</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  I'm Harsh Kakadiya, a passionate developer who believes in the power of technology to solve real-world problems. 
                  My journey started with curiosity about how things work and evolved into a deep love for creating digital experiences.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Currently pursuing my B.Tech in Computer Science, I specialize in AI/ML technologies while maintaining 
                  strong full-stack development skills. I enjoy building scalable applications and exploring the latest in tech innovation.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, 
                  or listening to music that fuels my creativity.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-cyan-400/30">
                  <div className="text-6xl">👨‍💻</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Education and Experience Centered */}
        <div className="max-w-4xl mx-auto space-y-16 mb-20">
          
          {/* Education Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                My <span className="text-cyan-400">Education</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                My academic journey and continuous learning path in technology and web development.
              </p>
            </div>

            {/* Timeline Container */}
            <div className="relative max-w-6xl mx-auto">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-cyan-400/30 hidden md:block"></div>
              <div className="absolute left-4 md:hidden h-full w-0.5 bg-cyan-400/30"></div>
              
              {/* Timeline Items */}
              <div className="space-y-16">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:justify-start justify-start' : 'md:justify-end justify-start'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-black z-10 hidden md:block"></div>
                    <div className="absolute left-4 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-black z-10 md:hidden"></div>
                    
                    {/* Content Card */}
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 pl-12 md:pl-0' : 'md:pl-8 pl-12'}`}>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300">
                        <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                        <p className="text-cyan-400 font-medium mb-1">{edu.institution}</p>
                        <p className="text-gray-400 text-sm mb-3">{edu.year}</p>
                        <p className="text-gray-300 text-sm leading-relaxed">{edu.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                My Experience
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Professional journey and key projects that shaped my development skills.
              </p>
            </div>

            {/* Timeline Container */}
            <div className="relative max-w-6xl mx-auto">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-cyan-400/30 hidden md:block"></div>
              <div className="absolute left-4 md:hidden h-full w-0.5 bg-cyan-400/30"></div>
              
              {/* Timeline Items */}
              <div className="space-y-16">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:justify-start justify-start' : 'md:justify-end justify-start'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-black z-10 hidden md:block"></div>
                    <div className="absolute left-4 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-black z-10 md:hidden"></div>
                    
                    {/* Content Card */}
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 pl-12 md:pl-0' : 'md:pl-8 pl-12'}`}>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300">
                        <h3 className="text-xl font-bold text-white mb-2">{exp.role}</h3>
                        <p className="text-cyan-400 font-medium mb-1">{exp.company}</p>
                        <p className="text-gray-400 text-sm mb-3">{exp.period}</p>
                        <p className="text-gray-300 text-sm leading-relaxed mb-3">{exp.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Work <span className="text-cyan-400">Together?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's create something amazing together. I'm always excited to take on new challenges and bring innovative ideas to life.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 30px rgba(0, 212, 170, 0.4)" 
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
            >
              Hire Me
            </motion.button>
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                borderColor: '#00d4aa',
                color: '#00d4aa'
              }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gray-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:bg-gray-800/50"
            >
              Download Resume
            </motion.button>
          </div>

          {/* Availability Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-green-400">🌍</span>
              <span>Available for remote work worldwide</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">⚡</span>
              <span>Quick response time</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400">🕒</span>
              <span>Flexible availability</span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
