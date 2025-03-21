
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
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMTUiPjxjaXJjbGUgY3g9IjEiIGN5PSIxIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 z-[-1]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/40 via-fuchsia-950/20 to-blue-950/50 z-[-2]"></div>
      
      <Header />
      
      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PhotoUploader onPhotoSelected={handlePhotoSelected} />
            <DimensionControls 
              defaultWidth={DEFAULT_WIDTH}
              defaultHeight={DEFAULT_HEIGHT}
              onDimensionsChange={handleDimensionsChange}
            />
          </div>
          
          <div className="w-full max-w-full">
            <ProcessingCanvas 
              imageFile={selectedImage} 
              width={canvasWidth} 
              height={canvasHeight}
              previewScale={0.2} // Set preview scale to 20%
            />
          </div>
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
      
      <footer className="mt-auto py-6 text-center text-sm text-white/70">
        <p className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">CLUBKIT LED PHOTO TILER • Designed for perfect LED wall display at nightclubs</p>
      </footer>
    </div>
  );
};

export default Index;
