import React, { useEffect, useRef } from "react";
import { Canvas, FabricImage } from "fabric";

const ImageCanvas = ({ imageFile }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    // Initialize Fabric.js canvas
    fabricCanvasRef.current = new Canvas(canvasRef.current, {
      backgroundColor: "#f9fafb",
      selection: true,
    });

    return () => {
      fabricCanvasRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (imageFile && fabricCanvasRef.current) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          // In Fabric.js v6, FabricImage.fromURL is async and returns a Promise
          const img = await FabricImage.fromURL(e.target.result);
          
          img.set({
            left: 100,
            top: 100,
            scaleX: 0.5,
            scaleY: 0.5,
          });
          
          fabricCanvasRef.current.add(img);
          fabricCanvasRef.current.setActiveObject(img);
          fabricCanvasRef.current.renderAll();
        } catch (error) {
          console.error("Error loading image:", error);
        }
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="w-full flex justify-center">
      <canvas ref={canvasRef} width={800} height={600} className="border" />
    </div>
  );
};

export default ImageCanvas;