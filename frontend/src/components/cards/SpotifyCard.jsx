import React from 'react';
import { motion } from 'framer-motion';
import DraggableCard from './DraggableCard';

export default function SpotifyCard({ initialPosition = { x: 20, y: 180 } }) {
  return (
    <DraggableCard 
      initialPosition={initialPosition}
      className="w-80 h-40"
      glowColor="red"
    >
      <div className="w-full h-full">
        <iframe 
          src="https://open.spotify.com/embed/playlist/2vPIrULH3pu9UYoq3PjFm6?utm_source=generator" 
          width="100%" 
          height="152" 
          frameBorder="0" 
          allowFullScreen="" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          className="rounded-lg"
          style={{ filter: 'none' }}
        />
      </div>
    </DraggableCard>
  );
}
