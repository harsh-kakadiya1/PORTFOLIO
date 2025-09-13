import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function DraggableCard({ 
  children, 
  initialPosition = { x: 100, y: 100 }, 
  className = "",
  onHover,
  onLeave,
  onClick,
  isDraggable = true,
  glowColor = "cyan", 
  ...props 
}) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dragStarted, setDragStarted] = useState(false);
  const dragRef = useRef(null);

  const handleDragStart = () => {
    setIsDragging(true);
    setDragStarted(true);
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    
    // Calculate final position based on current position + offset
    let newX = position.x + info.offset.x;
    let newY = position.y + info.offset.y;
    
    // Get card dimensions for constraints
    const rect = dragRef.current?.getBoundingClientRect();
    if (rect) {
      const cardWidth = rect.width;
      const cardHeight = rect.height;
      
      // Apply constraints - allow 50% off-screen
      const minX = -cardWidth * 0.5;
      const maxX = window.innerWidth - cardWidth * 0.5;
      const minY = 0;
      const maxY = window.innerHeight - cardHeight;
      
      newX = Math.max(minX, Math.min(maxX, newX));
      newY = Math.max(minY, Math.min(maxY, newY));
    }
    
    setPosition({ x: newX, y: newY });
    
    // Reset drag started after delay to prevent click
    setTimeout(() => {
      setDragStarted(false);
    }, 100);
  };

  const handleClick = (e) => {
    if (!dragStarted && onClick) {
      onClick(e);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover && onHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onLeave && onLeave();
  };

  return (
    <motion.div
      ref={dragRef}
      drag={isDraggable}
      dragMomentum={false}
      dragElastic={0}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: 1
      }}
      whileDrag={{ 
        scale: 1,
        zIndex: 1000
      }}
      transition={{
        type: "tween",
        duration: 0
      }}
      className={`
        absolute cursor-grab active:cursor-grabbing select-none
        ${isDragging ? 'z-50' : 'z-40'}
        ${className}
      `}
      style={{
        left: 0,
        top: 0
      }}
      {...props}
    >
      <motion.div
        animate={{
          boxShadow: "none"
        }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
