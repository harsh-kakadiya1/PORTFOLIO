import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootMessages = [
  " HARSH-PORTFOLIO-OS v2.0.24 loading...",
  " Initializing neural networks...",
  " Loading personality matrix...",
  " Connecting to consciousness servers...",
  " Calibrating empathy algorithms...", 
  " Loading project database...",
  " Establishing secure connection...",
  " AI system online. Welcome, human.",
  "",
  " Type '/help' to see available commands",
  " Type '/about' to learn more about me",
  ""
];

const MatrixText = ({ targetText, isAnimating }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  
  useEffect(() => {
    if (!isAnimating) return;
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(targetText
        .split('')
        .map((letter, index) => {
          if (index < iteration) {
            return targetText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join(''));
      
      if (iteration >= targetText.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 10;
    }, 50);
    
    return () => clearInterval(interval);
  }, [targetText, isAnimating]);
  
  return <span>{displayText}</span>;
};

export default function BootSequence({ onComplete }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showMatrix, setShowMatrix] = useState(true);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    // Show matrix animation for 3 seconds before starting boot messages
    const matrixTimer = setTimeout(() => {
      setShowMatrix(false);
    }, 3000);

    return () => clearTimeout(matrixTimer);
  }, []);

  useEffect(() => {
    if (showMatrix) return;
    
    if (currentLine >= bootMessages.length) {
      setBootComplete(true);
      return;
    }

    const message = bootMessages[currentLine];
    setDisplayedText(message);

    setTimeout(() => {
      setCurrentLine(prev => prev + 1);
    }, message === "" ? 100 : 500);
  }, [currentLine, showMatrix]);

  // Handle key press to continue
  useEffect(() => {
    if (!bootComplete) return;

    const handleBootComplete = () => {
      // Just complete the boot sequence, don't navigate away
      onComplete();
    };

    const handleKeyPress = (e) => {
      handleBootComplete();
    };

    const handleClick = () => {
      handleBootComplete();
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
    };
  }, [bootComplete, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen bg-black flex items-center justify-center overflow-hidden relative"
    >
      {/* Enhanced Grid Background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 170, 0.2) 2px, transparent 2px),
            linear-gradient(90deg, rgba(0, 212, 170, 0.2) 2px, transparent 2px)
          `,
          backgroundSize: '70px 70px'
        }}
      />

      {/* Matrix rain effect */}
      <div className="absolute inset-0 opacity-50">
        {Array.from({ length: 35 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500 text-lg font-mono select-none font-bold"
            initial={{ y: -100, x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200) }}
            animate={{ 
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
              opacity: [0, 1, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
          >
            {Math.random().toString(36).substring(2, 8)}
          </motion.div>
        ))}
      </div>

      <div className="z-10 w-full max-w-4xl mx-auto p-8">
        {showMatrix ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="text-green-500 font-mono text-5xl mb-4 tracking-wider drop-shadow-lg">
              ╔══════════════════════╗
            </div>
            <div className="text-green-500 font-mono text-5xl mb-4 drop-shadow-lg">
              ║   <MatrixText targetText="HARSH" isAnimating={true} />   ║
            </div>
            <div className="text-green-500 font-mono text-5xl mb-4 drop-shadow-lg">
              ╚══════════════════════╝
            </div>
          </motion.div>
        ) : (
          <>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <div className="text-green-500 font-mono text-5xl mb-4 tracking-wider drop-shadow-lg">
                ╔══════════════════════╗
              </div>
              <div className="text-green-500 font-mono text-5xl mb-4 drop-shadow-lg">
                ║   HARSH's PORTFOLIO    ║
              </div>
              <div className="text-green-500 font-mono text-5xl mb-4 drop-shadow-lg">
                ╚══════════════════════╝
              </div>
            </motion.div>

            <div className="bg-black/95 border-2 border-green-500/40 rounded-xl p-8 font-mono text-base backdrop-blur-lg shadow-2xl shadow-green-500/20 max-h-[50vh] overflow-auto">
              <div className="space-y-2">
                {bootMessages.slice(0, currentLine).map((message, index) => (
                  <div key={index} className="text-green-500">
                    {message && <span className="text-cyan-400 mr-3">&gt;</span>}
                    {message}
                  </div>
                ))}
                {currentLine < bootMessages.length && (
                  <div className="text-green-500">
                    <span className="text-cyan-400 mr-3">&gt;</span>
                    {displayedText}
                  </div>
                )}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: bootComplete ? 1 : 0 }}
              className="text-center mt-8"
            >
              <div className="text-cyan-400 font-mono text-lg animate-pulse bg-cyan-400/10 px-6 py-3 rounded-full border border-cyan-400/30">
                Press any key to continue...
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}