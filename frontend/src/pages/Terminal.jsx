import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BootSequence from '../components/terminal/BootSequence';
import CommandInput from '../components/terminal/CommandInput';
import OutputDisplay from '../components/terminal/OutputDisplay';
import CommandProcessor from '../components/terminal/CommandProcessor';

export default function Terminal() {
  const [isBooting, setIsBooting] = useState(true);
  const [outputs, setOutputs] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const terminalRef = useRef(null);
  const commandProcessor = useRef(new CommandProcessor());

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [outputs]);

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
    setOutputs([{
      id: Date.now(),
      type: 'output',
      content: `Welcome to my AI-powered portfolio terminal! 

I'm an AI version of the developer behind this portfolio.
Type '/help' to see what we can explore together.
Try asking me anything - I'm here to help!`,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

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
        setTimeout(() => setMatrixMode(false), 3000);
        setOutputs(prev => [...prev, {
          id: Date.now() + 1,
          type: 'output',
          content: result.content,
          timestamp: new Date().toLocaleTimeString(),
          isTyping: true
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

  if (isBooting) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden touch-manipulation">
      {/* Grid Background */}
      <div 
        className="fixed inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 170, 0.3) 2px, transparent 2px),
            linear-gradient(90deg, rgba(0, 212, 170, 0.3) 2px, transparent 2px)
          `,
          backgroundSize: '70px 70px',
          backgroundPosition: `${100 - mousePosition.x}% ${100 - mousePosition.y}%`
        }}
      />

      {/* Matrix rain effect */}
      <AnimatePresence>
        {matrixMode && (
          <div className="fixed inset-0 z-10 pointer-events-none">
            {Array.from({ length: 50 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-green-500 text-xs select-none opacity-70"
                initial={{ 
                  y: -20, 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                  opacity: 0 
                }}
                animate={{ 
                  y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 20,
                  opacity: [0, 1, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: 2,
                  ease: "linear"
                }}
              >
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </motion.div>
            ))}
          </div>
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
      <div className="relative z-20 flex items-center justify-center min-h-screen p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-5xl h-[85vh] sm:h-[80vh] md:h-[75vh] lg:h-[70vh] flex flex-col bg-black/95 backdrop-blur-lg border border-cyan-400/50 rounded-lg sm:rounded-xl shadow-2xl shadow-cyan-500/20">
          {/* Header */}
          <div className="flex-shrink-0 border-b border-cyan-400/40 bg-gradient-to-r from-black/90 to-gray-900/90 rounded-t-lg sm:rounded-t-xl">
            <div className="flex items-center justify-between p-2 sm:p-3 md:p-4">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="flex gap-1 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                </div>
                <span className="text-cyan-400 font-mono text-sm sm:text-base md:text-lg font-semibold">AI Portfolio Terminal</span>
              </div>
              <div className="text-xs sm:text-sm font-mono bg-cyan-400/10 px-2 py-1 sm:px-3 rounded-full border border-cyan-400/30" style={{ color: '#00d4aa' }}>
                <span className="hidden sm:inline">{currentTime.toLocaleString()}</span>
                <span className="sm:hidden">{currentTime.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          {/* Terminal Output */}
          <div 
            ref={terminalRef}
            className="flex-1 overflow-auto bg-black/90 backdrop-blur-sm p-2 sm:p-4 md:p-6 space-y-2 sm:space-y-3 scrollbar-thin scrollbar-track-black scrollbar-thumb-cyan-500/40 font-mono text-xs sm:text-sm"
          >
            <AnimatePresence>
              {outputs.map((output) => (
                <motion.div
                  key={output.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mb-2"
                >
                  {output.type === 'command' && (
                    <div className="flex flex-col sm:flex-row sm:items-center mb-2 sm:mb-4">
                      <span className="mr-0 sm:mr-2 mb-1 sm:mb-0 text-xs sm:text-sm" style={{ color: '#00d4aa' }}>guest@ai-portfolio:~$</span>
                      <span className="text-xs sm:text-sm break-all sm:break-normal" style={{ 
                        color: output.content.startsWith('/') ? '#00d4ff' : '#ffaa00' 
                      }}>
                        {output.content}
                      </span>
                    </div>
                  )}
                  
                  {output.type === 'output' && (
                    <div className="mb-4 sm:mb-6">
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
                    <div style={{ color: '#ff6b6b' }} className="font-mono mb-2 sm:mb-4 text-xs sm:text-sm break-words">
                      ERROR: {output.content}
                    </div>
                  )}

                  {output.type === 'warning' && (
                    <div style={{ color: '#ff6b6b' }} className="font-mono mb-2 sm:mb-4 text-xs sm:text-sm break-words">
                      WARNING: {output.content}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Command Input */}
          <div className="flex-shrink-0 border-t border-cyan-400/40 bg-gradient-to-r from-black/90 to-gray-900/90 rounded-b-lg sm:rounded-b-xl">
            <div className="p-2 sm:p-3 md:p-4">
              <CommandInput 
                onCommand={handleCommand}
                isProcessing={isProcessing}
                commandHistory={commandHistory}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional styling */}
      <style jsx>{`
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-track-black {
          scrollbar-color: rgba(0, 212, 170, 0.3) black;
        }
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: black;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 212, 170, 0.3);
          border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 212, 170, 0.5);
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          ::-webkit-scrollbar {
            width: 2px;
          }
        }
        
        /* Prevent zoom on input focus on mobile */
        input[type="text"] {
          font-size: 16px;
        }
        
        @media (max-width: 640px) {
          input[type="text"] {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}