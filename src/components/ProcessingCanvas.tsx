
import React, { useEffect, useRef, useState } from 'react';
import { drawPreview, loadImage } from '../utils/imageProcessing';
import { ImageIcon, Sparkles } from 'lucide-react';

interface ProcessingCanvasProps {
  imageFile: File | null;
  width: number;
  height: number;
  previewScale?: number; // New prop for controlling preview size
}

const ProcessingCanvas: React.FC<ProcessingCanvasProps> = ({ 
  imageFile, 
  width, 
  height,
  previewScale = 1 // Default to full size if not specified
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const [previewRatio, setPreviewRatio] = useState(1);
  
  // Handle responsive canvas scaling
  useEffect(() => {
    const calculatePreviewSize = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.clientWidth || width;
      // Maintain aspect ratio while fitting container width
      const ratio = containerWidth / width;
      setPreviewRatio(ratio);
    };

    calculatePreviewSize();
    window.addEventListener('resize', calculatePreviewSize);
    return () => window.removeEventListener('resize', calculatePreviewSize);
  }, [width]);
  
  // Load and process image when file or dimensions change
  useEffect(() => {
    if (!imageFile || !canvasRef.current) return;
    
    const processImage = async () => {
      setIsLoading(true);
      try {
        const img = await loadImage(imageFile);
        setLoadedImage(img);
        
        if (canvasRef.current) {
          // Calculate preview dimensions
          const previewWidth = width * previewRatio;
          const previewHeight = height * previewRatio;
          
          // Draw the preview with vertical centering
          drawPreview(img, canvasRef.current, previewWidth, previewHeight, true);
        }
      } catch (error) {
        console.error('Error processing image:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    processImage();
  }, [imageFile, width, height, previewRatio]);
  
  // Update preview when dimensions or ratio changes
  useEffect(() => {
    if (!loadedImage || !canvasRef.current) return;
    
    // Calculate preview dimensions
    const previewWidth = width * previewRatio;
    const previewHeight = height * previewRatio;
    
    // Draw the preview with vertical centering
    drawPreview(loadedImage, canvasRef.current, previewWidth, previewHeight, true);
  }, [width, height, loadedImage, previewRatio]);
  
  if (!imageFile) {
    return (
      <div ref={containerRef} className="preview-container flex items-center justify-center h-[300px] animate-fade-in relative overflow-hidden" style={{ animationDelay: '0.7s' }}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600"></div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 via-pink-500 to-cyan-400"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-pink-500 to-purple-600"></div>
        
        <div className="flex flex-col items-center text-white/60">
          <div className="relative">
            <ImageIcon className="h-20 w-20 mb-4 opacity-30" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="h-6 w-6 text-cyan-400/70" />
            </div>
          </div>
          <p className="text-lg">Drop an image to preview</p>
          <p className="text-sm mt-2 text-white/40">Your tiled result will appear here</p>
        </div>
      </div>
    );
  }
  
  return (
    <div ref={containerRef} className="relative animate-fade-in w-full" style={{ animationDelay: '0.7s' }}>
      <div className="preview-container overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600"></div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 via-pink-500 to-cyan-400"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-pink-500 to-purple-600"></div>
        
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-10">
            <div className="loading-spinner h-12 w-12 border-4"></div>
          </div>
        ) : null}
        
        <canvas 
          ref={canvasRef} 
          className="w-full"
          style={{ 
            height: `${height * previewRatio}px`,
            maxHeight: '500px'
          }}
        />
      </div>
      
      <div className="absolute bottom-4 right-4 z-10">
        <div className="chip bg-black/70 backdrop-blur-sm text-white">
          {width} × {height} px
        </div>
      </div>
      
      <div className="mt-2 text-center text-xs text-white/50">
        Preview at {Math.round(previewRatio * 100)}% of actual width
      </div>
    </div>
  );
};

export default ProcessingCanvas;
