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
  }, [fabricCanvas, originalImage, currentFilters.vibrance, currentFilters.saturation, currentFilters.brightness, currentFilters.contrast, currentFilters.hue]); // ✅ Only color-specific dependencies

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
    <div className="control-panel">
      <div className="control-header">
        <div className="control-title">
          <Palette className="control-icon" />
          <span>Color Adjustment</span>
        </div>
        <button 
          className="reset-btn" 
          onClick={resetColorFilters}
          disabled={!isReady}
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {isProcessing && (
        <div className="processing-indicator">
          <Loader2 className="spinning" size={16} />
          <span>Applying color filters...</span>
        </div>
      )}

      <div className="control-content">
        {sliders.map(({ key, label }) => (
          <div key={key} className="slider-container">
            <label className="slider-label">
              {label}
              <span className="slider-value">
                {currentFilters[key] - 50 > 0 ? '+' : ''}
                {currentFilters[key] - 50}
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={currentFilters[key]}
              onChange={(e) => updateColorSetting(key, parseInt(e.target.value))}
              className="slider"
              disabled={!isReady}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorAdjustment;
