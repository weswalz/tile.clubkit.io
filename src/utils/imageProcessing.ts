
/**
 * Utility functions for image processing and tiling
 */

// Load image from file and return a promise with the Image object
export const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = URL.createObjectURL(file);
  });
};

// Calculate the number of times the image needs to be tiled horizontally
export const calculateTiling = (
  imageWidth: number,
  imageHeight: number,
  canvasWidth: number,
  canvasHeight: number
): { 
  tilesCount: number, 
  scale: number, 
  finalImageWidth: number, 
  finalImageHeight: number,
  verticalOffset: number 
} => {
  // First, scale the image to match the canvas height
  const scale = canvasHeight / imageHeight;
  const scaledWidth = imageWidth * scale;
  
  // Calculate how many tiles we need to cover the canvas width
  const rawTilesCount = Math.ceil(canvasWidth / scaledWidth);
  
  // The total width of all tiles before adjusting
  const totalTiledWidth = scaledWidth * rawTilesCount;
  
  // If the tiles don't perfectly fit, we need to scale down
  let finalScale = scale;
  if (totalTiledWidth > canvasWidth) {
    // Scale adjustment to make tiles fit perfectly
    finalScale = (canvasWidth / totalTiledWidth) * scale;
  }
  
  // Recalculate with the adjusted scale
  const finalImageWidth = imageWidth * finalScale;
  const finalImageHeight = imageHeight * finalScale;
  
  // Final number of tiles with the adjusted scale
  const tilesCount = Math.ceil(canvasWidth / finalImageWidth);
  
  // Calculate vertical centering offset
  const verticalOffset = (canvasHeight - finalImageHeight) / 2;
  
  return {
    tilesCount,
    scale: finalScale,
    finalImageWidth,
    finalImageHeight,
    verticalOffset
  };
};

// Process the image and create the tiled version on canvas
export const createTiledImage = (
  img: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }
    
    // Calculate tiling
    const { tilesCount, finalImageWidth, finalImageHeight, verticalOffset } = calculateTiling(
      img.width,
      img.height,
      canvasWidth,
      canvasHeight
    );
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw the tiled images with vertical centering
    for (let i = 0; i < tilesCount; i++) {
      ctx.drawImage(
        img,
        i * finalImageWidth,
        verticalOffset, // Apply vertical centering
        finalImageWidth,
        finalImageHeight
      );
    }
    
    // Convert canvas to blob and resolve
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        throw new Error('Failed to create image blob');
      }
    }, 'image/png');
  });
};

// Draw a preview of the tiled image on a given canvas element
export const drawPreview = (
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  targetWidth: number,
  targetHeight: number,
  verticalCenter: boolean = false
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Set canvas dimensions
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  
  // Calculate tiling
  const { tilesCount, finalImageWidth, finalImageHeight, verticalOffset } = calculateTiling(
    img.width,
    img.height,
    targetWidth,
    targetHeight
  );
  
  // Clear the canvas
  ctx.clearRect(0, 0, targetWidth, targetHeight);
  
  // Draw checkerboard pattern as background (for transparency)
  const squareSize = 10;
  for (let y = 0; y < targetHeight; y += squareSize) {
    for (let x = 0; x < targetWidth; x += squareSize) {
      const isEven = (Math.floor(x / squareSize) + Math.floor(y / squareSize)) % 2 === 0;
      ctx.fillStyle = isEven ? '#f0f0f0' : '#ffffff';
      ctx.fillRect(x, y, squareSize, squareSize);
    }
  }
  
  // Draw the tiled images
  for (let i = 0; i < tilesCount; i++) {
    ctx.drawImage(
      img,
      i * finalImageWidth,
      verticalCenter ? verticalOffset : 0, // Apply vertical centering if requested
      finalImageWidth,
      finalImageHeight
    );
  }
};
