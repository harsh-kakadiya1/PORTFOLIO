import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DraggableCard from './DraggableCard';

export default function SpotifyCard({ initialPosition = { x: 50, y: 320 } }) {
  const [currentSong, setCurrentSong] = useState({
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    isPlaying: true
  });

  const [progress, setProgress] = useState(45);

  useEffect(() => {
    // Simulate song progress
    const interval = setInterval(() => {
      setProgress(prev => (prev + 1) % 100);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    window.open('https://open.spotify.com/user/harsh-kakadiya', '_blank');
  };

  return (
    <DraggableCard 
      initialPosition={initialPosition}
      className="w-72 h-40"
      onClick={handleClick}
    >
      <motion.div
        className="w-full h-full bg-gradient-to-br from-green-900 to-black border border-green-600 rounded-lg p-4 cursor-pointer overflow-hidden relative"
        whileHover={{ 
          borderColor: '#1db954',
          boxShadow: '0 0 20px rgba(29, 185, 84, 0.4)'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Spotify Header */}
        <div className="flex items-center gap-2 mb-3">
          <svg 
            className="w-6 h-6 text-green-400" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span className="text-green-400 font-semibold text-sm">Currently Playing</span>
        </div>

        {/* Song Info */}
        <div className="mb-3">
          <h3 className="text-white font-bold text-lg truncate">{currentSong.title}</h3>
          <p className="text-gray-300 text-sm truncate">{currentSong.artist}</p>
          <p className="text-gray-400 text-xs truncate">{currentSong.album}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="w-full bg-gray-700 rounded-full h-1">
            <motion.div 
              className="bg-green-400 h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1:23</span>
            <span>3:20</span>
          </div>
        </div>

        {/* Play/Pause Button */}
        <div className="absolute bottom-4 right-4">
          <motion.div
            className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {currentSong.isPlaying ? (
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </motion.div>
        </div>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent rounded-lg pointer-events-none opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Corner decoration */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </motion.div>
    </DraggableCard>
  );
}
