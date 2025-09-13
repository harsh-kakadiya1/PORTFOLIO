import React from 'react';
import { motion } from 'framer-motion';
import DraggableCard from './DraggableCard';

export default function CourseraCard({ initialPosition = { x: 20, y: 250 } }) {
  const handleClick = () => {
    window.open('https://www.coursera.org/learner/harsh-kakadiya', '_blank');
  };

  return (
    <DraggableCard 
      initialPosition={initialPosition}
      className="w-80 h-32"
      onClick={handleClick}
    >
      <div className="w-full h-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-4 cursor-pointer border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
        <div className="flex items-center justify-between h-full">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">C</span>
              </div>
              <h3 className="text-white font-bold text-lg">Coursera</h3>
            </div>
            <p className="text-blue-100 text-sm">Learning Portfolio</p>
            <p className="text-blue-200 text-xs mt-1">Click to view certificates</p>
          </div>
          <div className="text-white/60">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </DraggableCard>
  );
}
