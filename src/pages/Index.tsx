
import React, { useState } from 'react';
import Header from '../components/Header';
import PhotoUploader from '../components/PhotoUploader';
import DimensionControls from '../components/DimensionControls';
import ProcessingCanvas from '../components/ProcessingCanvas';
import DownloadButton from '../components/DownloadButton';

const DEFAULT_WIDTH = 3500;
const DEFAULT_HEIGHT = 1080;

const Index: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [canvasWidth, setCanvasWidth] = useState(DEFAULT_WIDTH);
  const [canvasHeight, setCanvasHeight] = useState(DEFAULT_HEIGHT);
  
  const handlePhotoSelected = (file: File) => {
    setSelectedImage(file);
  };
  
  const handleDimensionsChange = (width: number, height: number) => {
    setCanvasWidth(width);
    setCanvasHeight(height);
  };
  
  const handleReset = () => {
    setSelectedImage(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center pb-24">
      <Header />
      
      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <PhotoUploader onPhotoSelected={handlePhotoSelected} />
            <DimensionControls 
              defaultWidth={DEFAULT_WIDTH}
              defaultHeight={DEFAULT_HEIGHT}
              onDimensionsChange={handleDimensionsChange}
            />
          </div>
          
          <ProcessingCanvas 
            imageFile={selectedImage} 
            width={canvasWidth} 
            height={canvasHeight} 
          />
        </div>
        
        <div className="pt-4">
          <DownloadButton 
            imageFile={selectedImage}
            width={canvasWidth}
            height={canvasHeight}
            onReset={handleReset}
          />
        </div>
      </main>
      
      <footer className="mt-auto py-6 text-center text-sm text-muted-foreground">
        <p>CLUBKIT LED PHOTO TILER • Designed for perfect LED wall display</p>
      </footer>
    </div>
  );
};

export default Index;
