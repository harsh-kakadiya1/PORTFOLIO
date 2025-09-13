import React from 'react';
import { motion } from 'framer-motion';
import DraggableCard from './DraggableCard';

export default function GitHubCard({ initialPosition = { x: 50, y: 150 } }) {
  const handleClick = () => {
    window.open('https://github.com/harsh-kakadiya1', '_blank');
  };

  return (
    <DraggableCard 
      initialPosition={initialPosition}
      className="w-64 h-32"
      onClick={handleClick}
    >
      <motion.div
        className="w-full h-full bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-lg p-4 cursor-pointer overflow-hidden relative"
        whileHover={{ 
          borderColor: '#00ff41',
          boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* GitHub Icon */}
        <div className="flex items-center gap-3 mb-2">
          <svg 
            className="w-8 h-8 text-white" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <div>
            <h3 className="text-white font-semibold text-lg">GitHub</h3>
            <p className="text-gray-400 text-sm">@harsh-kakadiya1</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-sm">
          <div className="text-center">
            <div className="text-white font-bold">15+</div>
            <div className="text-gray-400 text-xs">Repos</div>
          </div>
          <div className="text-center">
            <div className="text-white font-bold">320+</div>
            <div className="text-gray-400 text-xs">Commits</div>
          </div>
          <div className="text-center">
            <div className="text-white font-bold">40+</div>
            <div className="text-gray-400 text-xs">Stars</div>
          </div>
        </div>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-lg pointer-events-none opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Corner decoration */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </motion.div>
    </DraggableCard>
  );
}
