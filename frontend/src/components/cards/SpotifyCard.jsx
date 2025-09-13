import React from 'react';
import { motion } from 'framer-motion';
import DraggableCard from './DraggableCard';

export default function SpotifyCard({ initialPosition = { x: 50, y: 320 } }) {
  return (
    <DraggableCard 
      initialPosition={initialPosition}
      className="w-80 h-40"
    >
      <iframe 
        src="https://open.spotify.com/embed/playlist/2vPIrULH3pu9UYoq3PjFm6?utm_source=generator" 
        width="100%" 
        height="152" 
        frameBorder="0" 
        allowFullScreen="" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
        className="rounded-lg"
      />
    </DraggableCard>
  );
}
