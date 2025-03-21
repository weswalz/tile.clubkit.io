
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 animate-fade-in">
      <div className="container flex flex-col items-center justify-center">
        <img 
          src="/lovable-uploads/87969d33-3577-401d-bdd5-0db3c8abd3cb.png" 
          alt="CLUBKIT Logo" 
          className="h-16 mb-4 animate-float"
        />
        <div className="text-center">
          <div className="flex flex-col items-center space-y-2">
            <span className="chip animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Photo Processing
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight animate-slide-up" style={{ animationDelay: '0.3s' }}>
              LED PHOTO TILER
            </h1>
            <p className="text-muted-foreground max-w-md mt-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Create perfectly tiled photos for LED displays with precise dimensions.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
