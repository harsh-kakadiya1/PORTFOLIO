import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AVAILABLE_COMMANDS = [
  { command: '/help', description: 'Show available commands' },
  { command: '/about', description: 'Learn about the developer' },
  { command: '/skills', description: 'View technical skills' },
  { command: '/projects', description: 'Browse project portfolio' },
  { command: '/project <name>', description: 'View specific project' },
  { command: '/contact', description: 'Get contact information' },
  { command: '/whoami', description: 'Display current user info' },
  { command: '/history', description: 'Show command history' },
  { command: '/clear', description: 'Clear terminal screen' },
  { command: '/coffee', description: '☕ Check coding fuel status' },
  { command: '/sudo', description: '🔒 Try root access' },
  { command: '/exit', description: '🚪 Attempt to exit' }
];

export default function CommandInput({ onCommand, isProcessing, commandHistory = [] }) {
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCommands, setFilteredCommands] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Initialize and preload audio
    const audio = new Audio('/command-sound.mp3');
    audio.volume = 0.5;
    audio.preload = 'auto';
    
    // Preload the audio by playing it silently
    const preloadAudio = async () => {
      try {
        audio.muted = true;
        await audio.play();
        audio.pause();
        audio.currentTime = 0;
        audio.muted = false;
      } catch (error) {
        console.log('Audio preload failed:', error);
      }
    };
    
    preloadAudio();
    audioRef.current = audio;
  }, []);

  useEffect(() => {
    if (input.startsWith('/') && input.length > 1) {
      const filtered = AVAILABLE_COMMANDS.filter(cmd => 
        cmd.command.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCommands(filtered);
      setShowDropdown(filtered.length > 0);
      setSelectedIndex(-1);
    } else if (input === '/') {
      setFilteredCommands(AVAILABLE_COMMANDS);
      setShowDropdown(true);
      setSelectedIndex(-1);
    } else {
      setShowDropdown(false);
      setFilteredCommands([]);
      setSelectedIndex(-1);
    }
  }, [input]);

  const playCommandSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playCommandSound(); // Play sound immediately when Enter is pressed
    if (input.trim() && !isProcessing) {
      onCommand(input.trim());
      setInput('');
      setHistoryIndex(-1);
      setShowDropdown(false);
    }
  };

  const selectCommand = (command) => {
    setInput(command);
    setShowDropdown(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (showDropdown && filteredCommands.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
        return;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
        return;
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        playCommandSound(); // Play sound when selecting from dropdown
        selectCommand(filteredCommands[selectedIndex].command);
        return;
      } else if (e.key === 'Escape') {
        setShowDropdown(false);
        setSelectedIndex(-1);
        return;
      }
    }

    // Command history navigation (only when dropdown is not shown)
    if (!showDropdown) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex = historyIndex + 1;
          if (newIndex < commandHistory.length) {
            setHistoryIndex(newIndex);
            setInput(commandHistory[commandHistory.length - 1 - newIndex]);
          }
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInput('');
        }
      }
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-center">
        <span className="font-mono mr-0 sm:mr-2 mb-1 sm:mb-0 select-none text-xs sm:text-sm" style={{ color: '#00ff41' }}>
          guest@ai-portfolio:~$
        </span>
        <div className="flex items-center flex-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            className="flex-1 bg-transparent font-mono outline-none border-none disabled:opacity-50 text-xs sm:text-sm"
            style={{ 
              color: '#00d4ff',
              caretColor: '#00d4ff'
            }}
            placeholder={isProcessing ? "AI is thinking..." : "Type a command or '/' for suggestions..."}
            autoComplete="off"
            spellCheck={false}
          />
          {isProcessing && (
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="ml-2 text-xs sm:text-sm"
              style={{ color: '#00ff41' }}
            >
              ⟩⟩⟩
            </motion.div>
          )}
        </div>
      </form>

      {/* Command Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-black/95 border border-cyan-400/40 rounded-lg shadow-2xl shadow-cyan-500/20 backdrop-blur-sm z-50 max-h-48 sm:max-h-64 overflow-y-auto"
          >
            <div className="p-2">
              <div className="text-cyan-400 text-xs font-mono mb-2 px-2">
                Available Commands ({filteredCommands.length})
              </div>
              {filteredCommands.map((cmd, index) => (
                <motion.div
                  key={cmd.command}
                  className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded cursor-pointer font-mono text-xs sm:text-sm transition-colors ${
                    index === selectedIndex 
                      ? 'bg-cyan-400/20 border-l-2 border-cyan-400' 
                      : 'hover:bg-cyan-400/10'
                  }`}
                  onClick={() => selectCommand(cmd.command)}
                  whileHover={{ x: 2 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs sm:text-sm" style={{ color: '#00d4ff' }}>{cmd.command}</span>
                    <span className="text-xs text-gray-400 mt-0.5 sm:mt-0 sm:ml-2">{cmd.description}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="border-t border-cyan-400/20 p-2">
              <div className="text-xs text-gray-500 font-mono">
                <span className="hidden sm:inline">↑↓ Navigate • Enter Select • Esc Close</span>
                <span className="sm:hidden">↑↓ Navigate • Enter Select</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}