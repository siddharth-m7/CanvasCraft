// components/ImageCanvas.jsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, FabricImage } from 'fabric';

const ImageCanvas = ({ uploadedFile, onCanvasReady }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [canvasReady, setCanvasReady] = useState(false);

  // Calculate max dimensions based on viewport
  const getMaxCanvasDimensions = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    return {
      maxWidth: Math.floor(viewportWidth * 0.7),  // 70% of viewport width
      maxHeight: Math.floor(viewportHeight * 0.7)  // 70% of viewport height
    };
  };

  // Calculate scaled dimensions while maintaining aspect ratio
  const getScaledDimensions = (imageWidth, imageHeight) => {
    console.log('Calculating scaled dimensions for image:', imageWidth, imageHeight);
    const { maxWidth, maxHeight } = getMaxCanvasDimensions();
    
    // Calculate scaling ratios
    const widthRatio = maxWidth / imageWidth;
    const heightRatio = maxHeight / imageHeight;
    
    // Use the smaller ratio to maintain aspect ratio
    const scale = Math.min(widthRatio, heightRatio, 1); // Don't scale up
    
    return {
      width: Math.floor(imageWidth * scale),
      height: Math.floor(imageHeight * scale),
      scale: scale
    };
  };

  const handleCanvasReady = useCallback((canvas) => {
    if (onCanvasReady) {
      onCanvasReady(canvas);
    }
  }, [onCanvasReady]);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      fabricCanvasRef.current = new Canvas(canvasRef.current, {
        backgroundColor: '#ffffff',
        selection: false,
      });

      setCanvasReady(true);
      handleCanvasReady(fabricCanvasRef.current);
    }

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
        setCanvasReady(false);
      }
    };
  }, []);

  // Handle file upload with viewport constraints
  useEffect(() => {
    if (!uploadedFile || !fabricCanvasRef.current || !canvasReady) {
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const imgUrl = e.target.result;
      
      FabricImage.fromURL(imgUrl).then((fabricImg) => {
        if (!fabricCanvasRef.current) return;
        
        // Clear existing canvas content
        fabricCanvasRef.current.clear();
        
        // Get original image dimensions
        const originalWidth = fabricImg.width;
        const originalHeight = fabricImg.height;
        
        // Calculate scaled dimensions to fit viewport constraints
        const { width: canvasWidth, height: canvasHeight, scale } = 
          getScaledDimensions(originalWidth, originalHeight);
        
        // Set canvas size to scaled dimensions
        fabricCanvasRef.current.setDimensions({
          width: canvasWidth,
          height: canvasHeight
        });
        
        // Scale the image to fit the canvas
        fabricImg.set({
          left: 0,
          top: 0,
          scaleX: scale,
          scaleY: scale,
          selectable: false,
          evented: false,
          lockMovementX: true,
          lockMovementY: true,
          lockRotation: true,
          lockScalingX: true,
          lockScalingY: true,
          hasControls: false,
          hasBorders: false,
        });
        
        // Add image to canvas
        fabricCanvasRef.current.add(fabricImg);
        fabricCanvasRef.current.sendObjectToBack(fabricImg);
        fabricCanvasRef.current.renderAll();
        
      }).catch((error) => {
        console.error('Error loading image:', error);
      });
    };
    
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
    
    reader.readAsDataURL(uploadedFile);
  }, [uploadedFile, canvasReady]);

  // Handle window resize to recalculate canvas size
  useEffect(() => {
    const handleResize = () => {
      if (uploadedFile && fabricCanvasRef.current && canvasReady) {
        // Re-trigger the image loading with new viewport dimensions
        const currentObjects = fabricCanvasRef.current.getObjects();
        if (currentObjects.length > 0) {
          const imageObj = currentObjects[0]; // Assuming first object is the image
          
          // Get original image dimensions from the fabric object
          const originalWidth = imageObj.width / imageObj.scaleX;
          const originalHeight = imageObj.height / imageObj.scaleY;
          
          // Recalculate dimensions
          const { width: canvasWidth, height: canvasHeight, scale } = 
            getScaledDimensions(originalWidth, originalHeight);
          
          // Update canvas size
          fabricCanvasRef.current.setDimensions({
            width: canvasWidth,
            height: canvasHeight
          });
          
          // Update image scale
          imageObj.set({
            scaleX: scale,
            scaleY: scale
          });
          
          fabricCanvasRef.current.renderAll();
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [uploadedFile, canvasReady]);

  return (
    <div className="canvas-container flex justify-center">
      <div className="canvas-wrapper border border-gray-300 shadow-lg inline-block">
        <canvas 
          ref={canvasRef}
          className="block"
        />
      </div>
    </div>
  );
};

export default ImageCanvas;
