
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 animate-fade-in relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800/30 to-pink-600/30 blur-3xl z-[-1]"></div>
      <div className="container flex flex-col items-center justify-center">
        <div className="mb-4 relative">
          <img 
            src="/lovable-uploads/87969d33-3577-401d-bdd5-0db3c8abd3cb.png" 
            alt="CLUBKIT Logo" 
            className="h-20 animate-float glow-box"
          />
        </div>
        
        <div className="text-center">
          <div className="flex flex-col items-center space-y-3">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight animate-slide-up glow-text bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" style={{ animationDelay: '0.3s' }}>
              LED PHOTO TILER
            </h1>
            <p className="text-white/80 max-w-lg mt-2 animate-fade-in text-lg" style={{ animationDelay: '0.4s' }}>
              Create perfectly tiled nightclub photos for LED walls with precise dimensions
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
