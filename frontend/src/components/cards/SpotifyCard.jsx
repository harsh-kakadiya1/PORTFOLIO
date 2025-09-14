import React from 'react';
import DraggableCard from './DraggableCard';

export default function SpotifyCard({ initialPosition = { x: 20, y: 450 } }) {
  return (
    <DraggableCard 
      initialPosition={initialPosition}
      className="w-80 h-72"
    >
      <div className="w-full h-full bg-gray-900/90 backdrop-blur-sm rounded-lg p-3">
        <p className="text-cyan-400 text-xs font-medium mb-2">Current Favorites</p>
        <div className="space-y-3">
          <div className="w-full h-20">
            <iframe 
              data-testid="embed-iframe-1"
              style={{
                borderRadius: '8px',
                width: '100%',
                height: '100%',
                border: 'none'
              }} 
              src="https://open.spotify.com/embed/track/5cF0dROlMOK5uNZtivgu50?utm_source=generator" 
              allowFullScreen 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            />
          </div>
          <div className="w-full h-20">
            <iframe 
              data-testid="embed-iframe-2"
              style={{
                borderRadius: '8px',
                width: '100%',
                height: '100%',
                border: 'none'
              }} 
              src="https://open.spotify.com/embed/track/1fkjRQA8wXPPyxqYLbxuqy?utm_source=generator"
              allowFullScreen 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </DraggableCard>
  );
}
