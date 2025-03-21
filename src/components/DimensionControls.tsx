
import React, { useState, useEffect } from 'react';
import { LayoutGrid } from 'lucide-react';

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
    <div className="glassmorphism p-6 rounded-xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-full bg-accent mr-3">
          <LayoutGrid className="h-5 w-5 text-accent-foreground" />
        </div>
        <h3 className="text-lg font-medium">LED Wall Dimensions</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="width" className={`block text-sm font-medium transition-colors duration-200 ${isFocused === 'width' ? 'text-primary' : 'text-muted-foreground'}`}>
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
              className="input-animated w-full text-lg"
              min="1"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="height" className={`block text-sm font-medium transition-colors duration-200 ${isFocused === 'height' ? 'text-primary' : 'text-muted-foreground'}`}>
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
              className="input-animated w-full text-lg"
              min="1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DimensionControls;
