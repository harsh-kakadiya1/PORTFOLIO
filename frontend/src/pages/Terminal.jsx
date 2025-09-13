import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CommandInput from '../components/terminal/CommandInput';
import OutputDisplay from '../components/terminal/OutputDisplay';
import CommandProcessor from '../components/terminal/CommandProcessor';
import GitHubCard from '../components/cards/GitHubCard';
import LinkedInCard from '../components/cards/LinkedInCard';
import SpotifyCard from '../components/cards/SpotifyCard';
import CourseraCard from '../components/cards/CourseraCard';
import Navbar from '../components/navigation/Navbar';
import { useMobile } from '../hooks/useMobile';

export default function Terminal() {
  const [outputs, setOutputs] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const terminalRef = useRef(null);
  const commandProcessor = useRef(new CommandProcessor());
  const { isMobile, isTablet } = useMobile();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [outputs]);

  useEffect(() => {
    // Initialize terminal with welcome message
    setOutputs([{
      id: Date.now(),
      type: 'output',
      content: `Welcome to my AI-powered portfolio terminal! 

I'm Agastya, a personal AI assistant of Harsh Kakadiya.
Type '/help' to see what we can explore together.
Try asking me anything - I'm here to help!`,
      timestamp: new Date().toLocaleTimeString(),
      isTyping: true // Enable typewriter effect for welcome message
    }]);
  }, []);

  // Auto-scroll function that can be called during typing
  const handleAutoScroll = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mouse tracking for parallax effect (disabled on mobile for performance)
  useEffect(() => {
    if (isMobile) return; // Skip mouse tracking on mobile
    
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 7;
      const y = (e.clientY / window.innerHeight) * 7;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const handleCommand = async (input) => {
    // Add command to history
    setCommandHistory(prev => [...prev, input]);
    
    // Add ALL inputs to output (both commands and regular text)
    setOutputs(prev => [...prev, {
      id: Date.now(),
      type: 'command',
      content: input,
      timestamp: new Date().toLocaleTimeString()
    }]);

    setIsProcessing(true);

    try {
      const result = await commandProcessor.current.processCommand(input, commandHistory);
      
      if (result.type === 'clear') {
        setOutputs([]);
      } else if (result.type === 'matrix') {
        setMatrixMode(true);
        setTimeout(() => setMatrixMode(false), 5000); // Extended matrix mode
        setOutputs(prev => [...prev, {
          id: Date.now() + 1,
          type: 'output',
          content: result.content,
          timestamp: new Date().toLocaleTimeString(),
          isTyping: true,
          allowHTML: result.allowHTML
        }]);
      } else {
        setOutputs(prev => [...prev, {
          id: Date.now() + 1,
          type: result.type || 'output',
          content: result.content,
          timestamp: new Date().toLocaleTimeString(),
          isTyping: true,
          allowHTML: result.allowHTML
        }]);
      }
    } catch (error) {
      setOutputs(prev => [...prev, {
        id: Date.now() + 1,
        type: 'error',
        content: 'An error occurred while processing your command. Please try again.',
        timestamp: new Date().toLocaleTimeString()
      }]);
    }

    setIsProcessing(false);
  };

  const handleTypingComplete = (outputId) => {
    setOutputs(prev => prev.map(output => 
      output.id === outputId 
        ? { ...output, isTyping: false }
        : output
    ));
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden touch-manipulation">
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Grid Background */}
      <div 
        className={`fixed inset-0 ${isMobile ? 'opacity-20' : 'opacity-40'}`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 170, 0.3) 2px, transparent 2px),
            linear-gradient(90deg, rgba(0, 212, 170, 0.3) 2px, transparent 2px)
          `,
          backgroundSize: isMobile ? '50px 50px' : '70px 70px',
          backgroundPosition: isMobile ? 'center' : `${100 - mousePosition.x}% ${100 - mousePosition.y}%`
        }}
      />

      {/* Draggable Cards - Only show on desktop */}
      {!isMobile && !isTablet && (
        <>
          <GitHubCard initialPosition={{ x: 20, y: 40 }} />
          <LinkedInCard initialPosition={{ x: 20, y: 180 }} />
          <CourseraCard initialPosition={{ x: 20, y: 320 }} />
          <SpotifyCard initialPosition={{ x: 20, y: 450 }} />
        </>
      )}

      {/* Matrix rain effect */}
      <AnimatePresence>
        {matrixMode && (
          <div className="fixed inset-0 z-10 pointer-events-none">
            {Array.from({ length: 150 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute select-none font-mono"
                style={{
                  color: Math.random() > 0.1 ? '#00ff41' : '#ffffff',
                  fontSize: Math.random() > 0.5 ? '12px' : '16px',
                  fontWeight: Math.random() > 0.7 ? 'bold' : 'normal'
                }}
                initial={{ 
                  y: -50, 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                  opacity: 0 
                }}
                animate={{ 
                  y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
                  opacity: [0, 1, 0.8, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: 3,
                  ease: "linear",
                  delay: Math.random() * 0.5
                }}
              >
                {(() => {
                  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
                  return chars[Math.floor(Math.random() * chars.length)];
                })()}
              </motion.div>
            ))}
            
            {/* Add some binary streams */}
            {Array.from({ length: 30 }, (_, i) => (
              <motion.div
                key={`binary-${i}`}
                className="absolute select-none font-mono text-green-400"
                style={{
                  fontSize: '10px',
                  left: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                  opacity: 0.6
                }}
                initial={{ y: -20 }}
                animate={{ y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 20 }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: 2,
                  ease: "linear",
                  delay: Math.random() * 1
                }}
              >
                {Array.from({ length: Math.floor(Math.random() * 10) + 5 }, () => 
                  Math.random() > 0.5 ? '1' : '0'
                ).join('')}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Matrix overlay effect */}
      <AnimatePresence>
        {matrixMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-5 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at center, 
                  rgba(0, 255, 65, 0.1) 0%, 
                  rgba(0, 0, 0, 0.3) 50%, 
                  rgba(0, 0, 0, 0.7) 100%
                )
              `,
              backdropFilter: 'contrast(1.2) brightness(0.8)'
            }}
          >
            <div className="absolute inset-0 opacity-30" 
                 style={{
                   backgroundImage: `
                     repeating-linear-gradient(
                       0deg,
                       transparent,
                       transparent 2px,
                       rgba(0, 255, 65, 0.1) 2px,
                       rgba(0, 255, 65, 0.1) 4px
                     )
                   `
                 }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scanlines effect */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="h-full bg-gradient-to-b from-transparent via-green-500 to-transparent bg-repeat-y animate-pulse" 
             style={{
               backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.1) 2px, rgba(0,255,65,0.1) 4px)'
             }} />
      </div>

      {/* Terminal Container */}
      <div className={`relative z-20 flex items-center justify-center min-h-screen ${isMobile ? 'p-1' : 'p-2 sm:p-4 md:p-6 lg:p-8'}`}>
        <div className={`w-full max-w-5xl ${isMobile ? 'h-[95vh]' : 'h-[85vh] sm:h-[80vh] md:h-[75vh] lg:h-[70vh]'} flex flex-col bg-black/95 backdrop-blur-lg border border-cyan-400/50 ${isMobile ? 'rounded-lg' : 'rounded-lg sm:rounded-xl'} shadow-2xl shadow-cyan-500/20`}>
          {/* Header */}
          <div className={`flex-shrink-0 border-b border-cyan-400/40 bg-gradient-to-r from-black/90 to-gray-900/90 ${isMobile ? 'rounded-t-lg' : 'rounded-t-lg sm:rounded-t-xl'}`}>
            <div className={`flex items-center justify-between ${isMobile ? 'p-2' : 'p-2 sm:p-3 md:p-4'}`}>
              <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-2 sm:gap-3 md:gap-4'}`}>
                <div className={`flex ${isMobile ? 'gap-1' : 'gap-1 sm:gap-2'}`}>
                  <div className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3 sm:w-4 sm:h-4'} rounded-full bg-red-500 shadow-lg shadow-red-500/50`}></div>
                  <div className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3 sm:w-4 sm:h-4'} rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50`}></div>
                  <div className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3 sm:w-4 sm:h-4'} rounded-full bg-green-500 shadow-lg shadow-green-500/50`}></div>
                </div>
                <span className={`text-cyan-400 font-mono ${isMobile ? 'text-xs' : 'text-sm sm:text-base md:text-lg'} font-semibold`}>
                  {isMobile ? "AI Assistant" : "Harsh's AI Assistant"}
                </span>
              </div>
              <div className={`${isMobile ? 'text-xs' : 'text-xs sm:text-sm'} font-mono bg-cyan-400/10 px-2 py-1 sm:px-3 rounded-full border border-cyan-400/30`} style={{ color: '#00d4aa' }}>
                {isMobile ? currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : (
                  <>
                    <span className="hidden sm:inline">{currentTime.toLocaleString()}</span>
                    <span className="sm:hidden">{currentTime.toLocaleTimeString()}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Terminal Output */}
          <div 
            ref={terminalRef}
            className={`flex-1 overflow-auto bg-black/90 backdrop-blur-sm ${isMobile ? 'p-2 space-y-1' : 'p-2 sm:p-4 md:p-6 space-y-2 sm:space-y-3'} scrollbar-thin scrollbar-track-black scrollbar-thumb-cyan-500/40 font-mono ${isMobile ? 'text-xs' : 'text-xs sm:text-sm'}`}
          >
            <AnimatePresence>
              {outputs.map((output) => (
                <motion.div
                  key={output.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={isMobile ? 'mb-1' : 'mb-2'}
                >
                  {output.type === 'command' && (
                    <div className={`flex ${isMobile ? 'flex-col' : 'flex-col sm:flex-row sm:items-center'} ${isMobile ? 'mb-1' : 'mb-2 sm:mb-4'}`}>
                      <span className={`${isMobile ? 'mr-0 mb-0' : 'mr-0 sm:mr-2 mb-1 sm:mb-0'} ${isMobile ? 'text-xs' : 'text-xs sm:text-sm'}`} style={{ color: '#00ff41' }}>
                        {isMobile ? 'guest@ai:~$' : 'guest@ai-portfolio:~$'}
                      </span>
                      <span className={`${isMobile ? 'text-xs break-all' : 'text-xs sm:text-sm break-all sm:break-normal'}`} style={{ 
                        color: output.content.startsWith('/') ? '#00d4ff' : '#ffaa00' 
                      }}>
                        {output.content}
                      </span>
                    </div>
                  )}
                  
                  {output.type === 'output' && (
                    <div className={isMobile ? 'mb-2' : 'mb-4 sm:mb-6'}>
                      <OutputDisplay 
                        content={output.content} 
                        isTyping={output.isTyping}
                        onContentChange={handleAutoScroll}
                        onTypingComplete={() => handleTypingComplete(output.id)}
                        allowHTML={output.allowHTML}
                      />
                    </div>
                  )}
                  
                  {output.type === 'error' && (
                    <div style={{ color: '#ff6b6b' }} className={`font-mono ${isMobile ? 'mb-1 text-xs' : 'mb-2 sm:mb-4 text-xs sm:text-sm'} break-words`}>
                      ERROR: {output.content}
                    </div>
                  )}

                  {output.type === 'warning' && (
                    <div style={{ color: '#ff6b6b' }} className={`font-mono ${isMobile ? 'mb-1 text-xs' : 'mb-2 sm:mb-4 text-xs sm:text-sm'} break-words`}>
                      WARNING: {output.content}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Command Input */}
          <div className={`flex-shrink-0 border-t border-cyan-400/40 bg-gradient-to-r from-black/90 to-gray-900/90 ${isMobile ? 'rounded-b-lg' : 'rounded-b-lg sm:rounded-b-xl'}`}>
            <div className={isMobile ? 'p-2' : 'p-2 sm:p-3 md:p-4'}>
              <CommandInput 
                onCommand={handleCommand}
                isProcessing={isProcessing}
                commandHistory={commandHistory}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}