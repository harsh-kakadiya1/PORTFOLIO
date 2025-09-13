import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DraggableCard from './DraggableCard';

export default function BucketListCard({ initialPosition = { x: 20, y: 260 } }) {
  const [bucketItems] = useState([
    { id: 1, text: "Build a SaaS with 1M+ users", completed: false },
    { id: 2, text: "Contribute to major open source project", completed: false },
    { id: 3, text: "Learn llm and build a product", completed: false },
    { id: 4, text: "Travel to Japan for tech conference", completed: false },
    { id: 5, text: "Master machine learning and llm", completed: true },
    { id: 6, text: "Build a mobile app with 100K+ downloads", completed: false },
    { id: 7, text: "Speak at a major tech conference", completed: false },
    { id: 8, text: "Create an AI-powered portfolio", completed: true },
    { id: 9, text: "Write technical blog posts", completed: false }
  ]);

  return (
    <DraggableCard 
      initialPosition={initialPosition}
      className="w-64 h-64"
    >
      <motion.div
        className="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-900 border border-purple-600 rounded-lg overflow-hidden relative"
        whileHover={{ 
          borderColor: '#8b5cf6',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Header - Draggable area */}
        <div className="bg-gradient-to-r from-purple-800 to-indigo-800 p-2 cursor-grab active:cursor-grabbing border-b border-purple-600/50">
          <div className="flex items-center gap-2">
            <svg 
              className="w-4 h-4 text-purple-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <h3 className="text-white font-semibold text-xs">Bucket List</h3>
            <div className="ml-auto text-xs text-purple-300">
              {bucketItems.filter(item => item.completed).length}/{bucketItems.length}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="h-20 overflow-y-auto scrollbar-thin scrollbar-track-purple-900 scrollbar-thumb-purple-600 p-2">
          <div className="space-y-1">
            {bucketItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className={`flex items-start gap-1 p-1 rounded-md transition-colors ${
                  item.completed 
                    ? 'bg-green-900/30 border-l border-green-400' 
                    : 'bg-purple-800/30 hover:bg-purple-700/40'
                }`}
              >
                <div className={`w-2 h-2 rounded-full border flex-shrink-0 mt-1 ${
                  item.completed 
                    ? 'bg-green-400 border-green-400' 
                    : 'border-purple-400'
                }`}>
                  {item.completed && (
                    <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`text-xs leading-tight ${
                  item.completed 
                    ? 'text-green-300 line-through' 
                    : 'text-white'
                }`}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-800">
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
            initial={{ width: 0 }}
            animate={{ 
              width: `${(bucketItems.filter(item => item.completed).length / bucketItems.length) * 100}%` 
            }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent rounded-lg pointer-events-none opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Corner decoration */}
        <div className="absolute top-1 right-1 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
      </motion.div>
    </DraggableCard>
  );
}
