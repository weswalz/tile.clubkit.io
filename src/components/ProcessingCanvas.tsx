
import React, { useEffect, useRef, useState } from 'react';
import { drawPreview, loadImage } from '../utils/imageProcessing';
import { ImageIcon } from 'lucide-react';

interface ProcessingCanvasProps {
  imageFile: File | null;
  width: number;
  height: number;
}

const ProcessingCanvas: React.FC<ProcessingCanvasProps> = ({ imageFile, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const [previewRatio, setPreviewRatio] = useState(1);
  
  // Handle responsive canvas scaling
  useEffect(() => {
    const calculatePreviewSize = () => {
      if (!canvasRef.current) return;
      
      const containerWidth = canvasRef.current.parentElement?.clientWidth || width;
      const maxPreviewWidth = Math.min(containerWidth, 1000);
      const ratio = maxPreviewWidth / width;
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
          
          // Draw the preview
          drawPreview(img, canvasRef.current, previewWidth, previewHeight);
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
    
    // Draw the preview
    drawPreview(loadedImage, canvasRef.current, previewWidth, previewHeight);
  }, [width, height, loadedImage, previewRatio]);
  
  if (!imageFile) {
    return (
      <div className="preview-container flex items-center justify-center h-[300px] animate-fade-in" style={{ animationDelay: '0.7s' }}>
        <div className="flex flex-col items-center text-muted-foreground">
          <ImageIcon className="h-16 w-16 mb-4 opacity-20" />
          <p>Image preview will appear here</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative animate-fade-in" style={{ animationDelay: '0.7s' }}>
      <div className="preview-container overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
            <div className="loading-spinner h-8 w-8 border-2 border-primary"></div>
          </div>
        ) : null}
        
        <canvas 
          ref={canvasRef} 
          className="w-full max-w-full"
          style={{ 
            height: `${height * previewRatio}px`, 
            maxHeight: '500px',
            width: `${width * previewRatio}px`,
            maxWidth: '100%'
          }}
        />
      </div>
      
      <div className="absolute bottom-3 right-3">
        <div className="chip bg-background/80 backdrop-blur-sm text-foreground">
          {width} × {height}
        </div>
      </div>
    </div>
  );
};

export default ProcessingCanvas;
