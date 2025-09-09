import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function OutputDisplay({ content, isTyping = false, onContentChange, onTypingComplete, allowHTML = false }) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isCurrentlyTyping, setIsCurrentlyTyping] = useState(false);
  const intervalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!content) return;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isTyping) {
      setDisplayedContent(content);
      setIsCurrentlyTyping(false);
      return;
    }

    // Start typing animation
    setDisplayedContent('');
    setIsCurrentlyTyping(true);
    let i = 0;
    
    intervalRef.current = setInterval(() => {
      if (i < content.length) {
        setDisplayedContent(content.substring(0, i + 1));
        if (onContentChange) {
          onContentChange();
        }
        i++;
      } else {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsCurrentlyTyping(false);
        if (onTypingComplete) {
          onTypingComplete();
        }
      }
    }, 20);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsCurrentlyTyping(false);
    };
  }, [content, isTyping]);

  if (!content) return null;

  return (
    <div className="font-mono text-xs sm:text-sm whitespace-pre-wrap break-words" ref={contentRef}>
      <div style={{ color: 'rgb(0, 212, 170)' }}>
        {allowHTML ? (
          <div 
            className="break-words"
            dangerouslySetInnerHTML={{ __html: displayedContent }}
          />
        ) : (
          <>
            {displayedContent}
            {isCurrentlyTyping && displayedContent.length < content.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-black px-1"
                style={{ backgroundColor: 'rgb(0, 212, 170)' }}
              >
                _
              </motion.span>
            )}
          </>
        )}
      </div>
    </div>
  );
}