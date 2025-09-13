import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/navigation/Navbar';

export default function Playground() {
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

  const tools = [
    {
      name: "VS CODE",
      description: "My coding sanctuary where ideas transform into reality",
      icon: "",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "CISCO PKT TRACER",
      description: "Network wizardry and infrastructure simulation mastery",
      icon: "",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      name: "OVERLEAF",
      description: "LaTeX perfection for academic and technical documentation",
      icon: "",
      color: "from-green-500 to-green-600"
    },
    {
      name: "GITHUB",
      description: "Code collaboration hub and version control paradise",
      icon: "",
      color: "from-gray-500 to-gray-600"
    },
    {
      name: "GIT",
      description: "Time machine for code - track every brilliant change",
      icon: "",
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "MONGODB",
      description: "NoSQL database magic for scalable data storage",
      icon: "",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      name: "PYTHON",
      description: "The Swiss Army knife of programming languages",
      icon: "",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      name: "REACT",
      description: "Building interactive UIs with component-based architecture",
      icon: "",
      color: "from-blue-400 to-blue-500"
    },
    {
      name: "NODE.JS",
      description: "JavaScript runtime powering scalable backend solutions",
      icon: "",
      color: "from-green-400 to-green-500"
    },
    {
      name: "FLASK",
      description: "Lightweight Python web framework for rapid development",
      icon: "",
      color: "from-red-500 to-red-600"
    },
    {
      name: "UBUNTU",
      description: "Linux powerhouse for development and server deployment",
      icon: "",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "VERCEL",
      description: "Lightning-fast deployment platform for modern web apps",
      icon: "",
      color: "from-black to-gray-800"
    },
    {
      name: "NETLIFY",
      description: "Seamless continuous deployment and hosting solution",
      icon: "",
      color: "from-teal-500 to-teal-600"
    },
    {
      name: "RENDER",
      description: "Cloud platform for effortless app deployment and scaling",
      icon: "",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      name: "JAVA",
      description: "Enterprise-grade programming for robust applications",
      icon: "",
      color: "from-red-600 to-red-700"
    },
    {
      name: "ANDROID STUDIO",
      description: "Mobile app development IDE for Android ecosystem",
      icon: "",
      color: "from-green-600 to-green-700"
    },
    {
      name: "SPOTIFY",
      description: "Coding soundtrack curator - music fuels creativity",
      icon: "",
      color: "from-green-500 to-green-400"
    },
    {
      name: "NOTION",
      description: "All-in-one workspace for notes, planning, and organization",
      icon: "",
      color: "from-gray-600 to-gray-700"
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
      <div className="relative z-10 container mx-auto px-4 py-32 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            My <span className="text-cyan-400">Toolkit</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The arsenal of tools and technologies that power my development journey
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 212, 170, 0.15)"
              }}
              className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 group cursor-pointer relative overflow-hidden"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-4xl mb-4 text-center">
                  {tool.icon}
                </div>
                
                {/* Tool Name */}
                <h3 className="text-white font-bold text-lg mb-3 text-center group-hover:text-cyan-400 transition-colors">
                  {tool.name}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 text-sm text-center leading-relaxed group-hover:text-gray-300 transition-colors">
                  {tool.description}
                </p>
              </div>

              {/* Hover Border Glow */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-cyan-400/30 transition-colors duration-300" />
              
              {/* Corner Accent */}
              <div className="absolute top-3 right-3 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-lg">
            Each tool is a brushstroke in the masterpiece of development
          </p>
        </motion.div>
      </div>
    </div>
  );
}
