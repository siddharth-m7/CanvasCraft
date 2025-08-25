// components/ImageCanvas.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, FabricImage } from "fabric";
import useCanvasStore from "../../stores/canvasStore"; // ✅ Zustand store

const ImageCanvas = ({ uploadedFile }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [canvasReady, setCanvasReady] = useState(false);

  const setFabricCanvas = useCanvasStore((state) => state.setFabricCanvas);
  const setOriginalImage = useCanvasStore((state) => state.setOriginalImage);

  // Calculate max dimensions based on viewport
  const getMaxCanvasDimensions = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    return {
      maxWidth: Math.floor(viewportWidth * 0.7),
      maxHeight: Math.floor(viewportHeight * 0.7),
    };
  };

  // Calculate scaled dimensions while maintaining aspect ratio
  const getScaledDimensions = (imageWidth, imageHeight) => {
    const { maxWidth, maxHeight } = getMaxCanvasDimensions();

    const widthRatio = maxWidth / imageWidth;
    const heightRatio = maxHeight / imageHeight;
    const scale = Math.min(widthRatio, heightRatio, 1);

    return {
      width: Math.floor(imageWidth * scale),
      height: Math.floor(imageHeight * scale),
      scale: scale,
    };
  };

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      fabricCanvasRef.current = new Canvas(canvasRef.current, {
        backgroundColor: "#ffffff",
        selection: false,
      });

      setCanvasReady(true);
      setFabricCanvas(fabricCanvasRef.current); // ✅ save in store
    }

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
        setCanvasReady(false);
        setFabricCanvas(null); // ✅ cleanup store
        setOriginalImage(null);
      }
    };
  }, [setFabricCanvas, setOriginalImage]);

  // Handle file upload with viewport constraints
  useEffect(() => {
    if (!uploadedFile || !fabricCanvasRef.current || !canvasReady) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const imgUrl = e.target.result;

      // ✅ Save original image once
      setOriginalImage(imgUrl);

      FabricImage.fromURL(imgUrl)
        .then((fabricImg) => {
          if (!fabricCanvasRef.current) return;

          fabricCanvasRef.current.clear();

          const originalWidth = fabricImg.width;
          const originalHeight = fabricImg.height;

          const { width: canvasWidth, height: canvasHeight, scale } =
            getScaledDimensions(originalWidth, originalHeight);

          fabricCanvasRef.current.setDimensions({
            width: canvasWidth,
            height: canvasHeight,
          });

          fabricImg.set({
            left: 0,
            top: 0,
            scaleX: scale,
            scaleY: scale,
            selectable: false,
            evented: false,
            hasControls: false,
            hasBorders: false,
          });

          fabricCanvasRef.current.add(fabricImg);
          fabricCanvasRef.current.sendObjectToBack(fabricImg);
          fabricCanvasRef.current.renderAll();
        })
        .catch((error) => console.error("Error loading image:", error));
    };

    reader.onerror = (error) => console.error("Error reading file:", error);

    reader.readAsDataURL(uploadedFile);
  }, [uploadedFile, canvasReady, setOriginalImage]);

  return (
    <div className="canvas-container flex justify-center">
      <div className="canvas-wrapper border border-gray-300 shadow-lg inline-block">
        <canvas ref={canvasRef} className="block" />
      </div>
    </div>
  );
};

export default ImageCanvas;
