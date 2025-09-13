import React from 'react';
import { motion } from 'framer-motion';
import DraggableCard from './DraggableCard';

export default function LinkedInCard({ initialPosition = { x: 350, y: 150 } }) {
  const handleClick = () => {
    window.open('https://linkedin.com/in/harsh-kakadiya', '_blank');
  };

  return (
    <DraggableCard 
      initialPosition={initialPosition}
      className="w-64 h-32"
      onClick={handleClick}
    >
      <motion.div
        className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-600 rounded-lg p-4 cursor-pointer overflow-hidden relative"
        whileHover={{ 
          borderColor: '#0077b5',
          boxShadow: '0 0 20px rgba(0, 119, 181, 0.4)'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* LinkedIn Icon */}
        <div className="flex items-center gap-3 mb-2">
          <svg 
            className="w-8 h-8 text-white" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <div>
            <h3 className="text-white font-semibold text-lg">LinkedIn</h3>
            <p className="text-blue-200 text-sm">Harsh Kakadiya</p>
          </div>
        </div>

        {/* Professional Info */}
        <div className="text-sm">
          <div className="text-white font-medium">AI/ML Enthusiast</div>
          <div className="text-blue-200 text-xs">500+ Connections</div>
        </div>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent rounded-lg pointer-events-none opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Corner decoration */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>

        {/* LinkedIn pattern */}
        <div className="absolute bottom-2 right-2 opacity-20">
          <div className="w-6 h-1 bg-white rounded mb-1"></div>
          <div className="w-4 h-1 bg-white rounded mb-1"></div>
          <div className="w-5 h-1 bg-white rounded"></div>
        </div>
      </motion.div>
    </DraggableCard>
  );
}
