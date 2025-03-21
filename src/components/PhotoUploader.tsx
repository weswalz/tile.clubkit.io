
import React, { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { Upload, ImageIcon } from 'lucide-react';

interface PhotoUploaderProps {
  onPhotoSelected: (file: File) => void;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onPhotoSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }
      setFileName(file.name);
      onPhotoSelected(file);
    }
  }, [onPhotoSelected]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }
      setFileName(file.name);
      onPhotoSelected(file);
    }
  }, [onPhotoSelected]);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <div 
        className={`drop-area p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${isDragging ? 'active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <div className="bg-primary/10 p-4 rounded-full mb-4">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-medium mb-2">Drop your image here</h3>
        <p className="text-sm text-muted-foreground mb-4 text-center">
          or click to browse your files
        </p>
        
        {fileName ? (
          <div className="flex items-center space-x-2 p-2 bg-accent rounded-lg mt-2 animate-scale-in">
            <ImageIcon className="h-5 w-5 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">{fileName}</span>
          </div>
        ) : null}
        
        <input 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileInput} 
          ref={fileInputRef}
        />
      </div>
    </div>
  );
};

export default PhotoUploader;
