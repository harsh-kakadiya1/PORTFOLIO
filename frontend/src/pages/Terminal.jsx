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
    <div className="min-h-screen bg-black relative overflow-hidden">
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
      <div className="relative z-20 flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-5xl h-[70vh] flex flex-col bg-black/95 backdrop-blur-lg border border-cyan-400/50 rounded-xl shadow-2xl shadow-cyan-500/20">
          {/* Header */}
          <div className="flex-shrink-0 border-b border-cyan-400/40 bg-gradient-to-r from-black/90 to-gray-900/90 rounded-t-xl">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                  <div className="w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                </div>
                <span className="text-cyan-400 font-mono text-lg font-semibold">AI Portfolio Terminal</span>
              </div>
              <div className="text-sm font-mono bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/30" style={{ color: '#00d4aa' }}>
                {currentTime.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Terminal Output */}
          <div 
            ref={terminalRef}
            className="flex-1 overflow-auto bg-black/90 backdrop-blur-sm p-6 space-y-3 scrollbar-thin scrollbar-track-black scrollbar-thumb-cyan-500/40 font-mono text-sm"
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
                    <div className="flex items-center mb-4">
                      <span className="mr-2" style={{ color: '#00d4aa' }}>guest@ai-portfolio:~$</span>
                      <span style={{ 
                        color: output.content.startsWith('/') ? '#00d4ff' : '#ffaa00' 
                      }}>
                        {output.content}
                      </span>
                    </div>
                  )}
                  
                  {output.type === 'output' && (
                    <div className="mb-6">
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
                    <div style={{ color: '#ff6b6b' }} className="font-mono mb-4">
                      ERROR: {output.content}
                    </div>
                  )}

                  {output.type === 'warning' && (
                    <div style={{ color: '#ff6b6b' }} className="font-mono mb-4">
                      WARNING: {output.content}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Command Input */}
          <div className="flex-shrink-0 border-t border-cyan-400/40 bg-gradient-to-r from-black/90 to-gray-900/90 rounded-b-xl">
            <div className="p-4">
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
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: black;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 212, 170, 0.3);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 212, 170, 0.5);
        }
      `}</style>
    </div>
  );
}