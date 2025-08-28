import React, { useState, useEffect } from 'react';
import { RotateCcw, Lightbulb, Loader2 } from 'lucide-react';
import useCanvasStore from '../../../stores/canvasStore';
import { applyAllFiltersDebounced } from '../../../utils/glfxUtils';
import './control.css';

const LightAdjustment = () => {
  const fabricCanvas = useCanvasStore((state) => state.fabricCanvas);
  const originalImage = useCanvasStore((state) => state.originalImage);
  const currentFilters = useCanvasStore((state) => state.currentFilters);
  const updateFilters = useCanvasStore((state) => state.updateFilters);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get only light-related filters
  const lightFilters = {
    contrast: currentFilters.contrast,
    exposure: currentFilters.exposure,
    highlights: currentFilters.highlights,
    shadows: currentFilters.shadows,
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

    console.log("💡 Applying ALL filters:", currentFilters);
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
  }, [fabricCanvas, originalImage, currentFilters.contrast, currentFilters.exposure, currentFilters.highlights, currentFilters.shadows]); // ✅ Only light-specific dependencies

  const updateLightSetting = (setting, value) => {
    updateFilters({ [setting]: value });
  };

  const resetLightFilters = () => {
    updateFilters({
      contrast: 50,
      exposure: 50,
      highlights: 50,
      shadows: 50,
    });
  };

  const lightControls = [
    { key: 'contrast', label: 'Contrast' },
    { key: 'exposure', label: 'Exposure' },
    { key: 'highlights', label: 'Highlights' },
    { key: 'shadows', label: 'Shadows' },
  ];

  const isReady = fabricCanvas && originalImage && fabricCanvas?.getObjects?.()?.length > 0;

  return (
    <div className="control-panel">
      <div className="control-header">
        <div className="control-title">
          <Lightbulb className="control-icon" />
          <span>Light Adjustment</span>
        </div>
        <button 
          className="reset-btn" 
          onClick={resetLightFilters}
          disabled={!isReady}
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {isProcessing && (
        <div className="processing-indicator">
          <Loader2 className="spinning" size={16} />
          <span>Adjusting lighting...</span>
        </div>
      )}

      <div className="control-content">
        {lightControls.map(({ key, label }) => (
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
              onChange={(e) => updateLightSetting(key, parseInt(e.target.value))}
              className="slider"
              disabled={!isReady}
            />
          </div>
        ))}
      </div>

      <div className="control-note">
        <p>Note: Brightness control is available in Color Adjustments. Use contrast for depth and exposure for dramatic lighting effects.</p>
      </div>
    </div>
  );
};

export default LightAdjustment;

