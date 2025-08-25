import React, { useState, useEffect } from "react";
import { RotateCcw, Palette, Loader2 } from "lucide-react";
import useCanvasStore from "../../../stores/canvasStore";
import { applyAllFiltersDebounced } from "../../../utils/glfxUtils";
import './control.css';

const ColorAdjustment = () => {
  const fabricCanvas = useCanvasStore((state) => state.fabricCanvas);
  const originalImage = useCanvasStore((state) => state.originalImage);
  const currentFilters = useCanvasStore((state) => state.currentFilters);
  const updateFilters = useCanvasStore((state) => state.updateFilters);

  const [isProcessing, setIsProcessing] = useState(false);

  // Get only color-related filters
  const colorFilters = {
    vibrance: currentFilters.vibrance,
    saturation: currentFilters.saturation,
    brightness: currentFilters.brightness,
    contrast: currentFilters.contrast,
    hue: currentFilters.hue,
  };

  useEffect(() => {
    // 🔑 Enhanced safety checks
    if (!fabricCanvas || !originalImage) {
      console.log("⏳ Waiting for canvas and image to be ready...");
      return;
    }

    // Check if canvas has getObjects method
    if (typeof fabricCanvas.getObjects !== 'function') {
      console.log("⏳ Canvas not fully initialized...");
      return;
    }

    // Check if objects exist on canvas
    const objects = fabricCanvas.getObjects();
    if (!objects || objects.length === 0) {
      console.log("⏳ No objects on canvas yet...");
      return;
    }

    console.log("🎨 Applying ALL filters:", currentFilters);
    setIsProcessing(true);

    // Add small delay to ensure canvas is ready
    const timeoutId = setTimeout(() => {
      applyAllFiltersDebounced({
        fabricCanvas,
        originalImage,
        filters: currentFilters
      })
        .then(() => {
          setIsProcessing(false);
          console.log("✅ All filters applied successfully");
        })
        .catch((error) => {
          console.error("❌ Filter application failed:", error);
          setIsProcessing(false);
        });
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [fabricCanvas, originalImage, currentFilters]);

  const updateColorSetting = (setting, value) => {
    updateFilters({ [setting]: value });
  };

  const resetColorFilters = () => {
    updateFilters({
      vibrance: 50,
      saturation: 50,
      brightness: 50,
      contrast: 50,
      hue: 50,
    });
  };

  const sliders = [
    { key: 'vibrance', label: 'Vibrance' },
    { key: 'saturation', label: 'Saturation' },
    { key: 'brightness', label: 'Brightness' },
    { key: 'contrast', label: 'Contrast' },
    { key: 'hue', label: 'Hue' },
  ];

  const isReady = fabricCanvas && originalImage && fabricCanvas?.getObjects?.()?.length > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-black flex items-center gap-2">
            <Palette size={20} className="text-green-600" />
            Color Adjustments
          </h3>
          <button
            onClick={resetColorFilters}
            disabled={isProcessing}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-black hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 rounded-md transition-colors"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Processing Indicator */}
        {isProcessing && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
            <Loader2 size={16} className="text-green-600 animate-spin" />
            <span className="text-black text-sm">Applying filters...</span>
          </div>
        )}

        {/* Status Indicator */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
          <span className="text-sm font-medium text-black">Status</span>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${fabricCanvas ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-black">Canvas</span>
            </div>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${originalImage ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-black">Image</span>
            </div>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isReady ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-black">Ready</span>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          {sliders.map(({ key, label }) => {
            const value = colorFilters[key];
            const adjustedValue = value - 50;
            
            return (
              <div key={key}>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-black">
                    {label}
                  </label>
                  <span className="text-xs text-black bg-gray-100 px-2 py-1 rounded font-mono">
                    {adjustedValue > 0 ? '+' : ''}{adjustedValue}
                  </span>
                </div>
                
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => updateColorSetting(key, parseInt(e.target.value))}
                    disabled={isProcessing}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed slider-green"
                  />
                </div>
                
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>-50</span>
                  <span>0</span>
                  <span>+50</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ColorAdjustment;
