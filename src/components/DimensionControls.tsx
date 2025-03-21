
import React, { useState, useEffect } from 'react';
import { LayoutGrid, Maximize } from 'lucide-react';

interface DimensionControlsProps {
  defaultWidth: number;
  defaultHeight: number;
  onDimensionsChange: (width: number, height: number) => void;
}

const DimensionControls: React.FC<DimensionControlsProps> = ({ 
  defaultWidth, 
  defaultHeight, 
  onDimensionsChange 
}) => {
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [isFocused, setIsFocused] = useState<'width' | 'height' | null>(null);

  // Update dimensions when inputs change
  useEffect(() => {
    onDimensionsChange(width, height);
  }, [width, height, onDimensionsChange]);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setWidth(value);
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setHeight(value);
    }
  };

  return (
    <div className="glassmorphism p-6 rounded-xl animate-fade-in relative overflow-hidden" style={{ animationDelay: '0.6s' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800/10 to-pink-600/10 z-[-1]"></div>
      
      <div className="flex items-center mb-6">
        <div className="p-2 rounded-full bg-gradient-blue-green mr-3">
          <Maximize className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-medium text-white">LED Wall Dimensions</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="width" className={`block text-sm font-medium transition-colors duration-200 ${isFocused === 'width' ? 'text-cyan-400 neon-text' : 'text-white/70'}`}>
            Width (pixels)
          </label>
          <div className="relative">
            <input
              id="width"
              type="number"
              value={width}
              onChange={handleWidthChange}
              onFocus={() => setIsFocused('width')}
              onBlur={() => setIsFocused(null)}
              className="input-animated w-full text-xl"
              min="1"
            />
            {isFocused === 'width' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"></div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="height" className={`block text-sm font-medium transition-colors duration-200 ${isFocused === 'height' ? 'text-cyan-400 neon-text' : 'text-white/70'}`}>
            Height (pixels)
          </label>
          <div className="relative">
            <input
              id="height"
              type="number"
              value={height}
              onChange={handleHeightChange}
              onFocus={() => setIsFocused('height')}
              onBlur={() => setIsFocused(null)}
              className="input-animated w-full text-xl"
              min="1"
            />
            {isFocused === 'height' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"></div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex justify-between items-center">
          <div className="text-xs text-white/60">Common sizes:</div>
          <div className="flex space-x-2">
            <button
              onClick={() => { setWidth(3500); setHeight(1080); }}
              className="px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/20 text-white/90 transition"
            >
              3500×1080
            </button>
            <button
              onClick={() => { setWidth(1920); setHeight(1080); }}
              className="px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/20 text-white/90 transition"
            >
              1920×1080
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DimensionControls;
