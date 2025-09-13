import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/navigation/Navbar';

export default function Projects() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

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

  const projects = [
    {
      id: 1,
      title: "AI-Powered Portfolio",
      description: "Interactive portfolio with terminal interface and AI features",
      tech: ["React", "Framer Motion", "Node.js"],
      image: "/api/placeholder/400/250",
      github: "https://github.com/harsh-kakadiya1/portfolio",
      live: "#",
      status: "completed"
    },
    {
      id: 2,
      title: "Machine Learning Platform",
      description: "End-to-end ML platform for data analysis and model deployment",
      tech: ["Python", "TensorFlow", "FastAPI", "Docker"],
      image: "/api/placeholder/400/250",
      github: "#",
      live: "#",
      status: "in-progress"
    },
    {
      id: 3,
      title: "Real-time Chat Application",
      description: "WebSocket-based chat app with real-time messaging",
      tech: ["React", "Socket.io", "Express", "MongoDB"],
      image: "/api/placeholder/400/250",
      github: "#",
      live: "#",
      status: "completed"
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Grid Background with Reversed Parallax */}
      <div 
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 170, 0.3) 2px, transparent 2px),
            linear-gradient(90deg, rgba(0, 212, 170, 0.3) 2px, transparent 2px)
          `,
          backgroundSize: '70px 70px',
          backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            My <span className="text-cyan-400">Projects</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my latest work in web development, AI/ML, and innovative digital solutions
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-xl overflow-hidden group"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'completed' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-md text-xs border border-cyan-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-center text-sm font-medium transition-colors border border-gray-600"
                  >
                    GitHub
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-4 rounded-lg text-center text-sm font-medium transition-colors"
                  >
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Interested in collaborating or have a project in mind?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0, 212, 170, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-all"
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
