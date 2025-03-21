
import React, { useState } from 'react';
import { toast } from 'sonner';
import { createTiledImage, loadImage } from '../utils/imageProcessing';
import { Download, RefreshCw } from 'lucide-react';

interface DownloadButtonProps {
  imageFile: File | null;
  width: number;
  height: number;
  onReset: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  imageFile, 
  width, 
  height,
  onReset
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  
  const handleProcess = async () => {
    if (!imageFile) {
      toast.error('Please select an image first');
      return;
    }
    
    setIsProcessing(true);
    try {
      // Load the image
      const img = await loadImage(imageFile);
      
      // Create the tiled version
      const blob = await createTiledImage(img, width, height);
      
      // Create URL for the processed image
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `clubkit-tiled-${width}x${height}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      setTimeout(() => URL.revokeObjectURL(url), 100);
      
      toast.success('Image processed and downloaded successfully');
      setIsProcessed(true);
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleNewTile = () => {
    setIsProcessed(false);
    onReset();
  };
  
  if (isProcessed) {
    return (
      <div className="flex flex-col items-center space-y-4 animate-fade-in">
        <button 
          onClick={handleNewTile}
          className="btn-secondary flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Create New Tile</span>
        </button>
        <p className="text-sm text-muted-foreground">
          Make another photo tile with different settings
        </p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center space-y-4 animate-fade-in">
      <button 
        onClick={handleProcess}
        disabled={!imageFile || isProcessing}
        className="btn-primary flex items-center space-x-2 px-6 py-3"
      >
        {isProcessing ? (
          <>
            <div className="loading-spinner h-4 w-4 border-t-2 border-white"></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            <span>Process & Download</span>
          </>
        )}
      </button>
      <p className="text-sm text-muted-foreground">
        Generate a perfectly tiled image based on your specifications
      </p>
    </div>
  );
};

export default DownloadButton;
