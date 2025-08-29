import React, { useState, useEffect } from 'react';
import { RotateCcw, Eye, Loader2 } from 'lucide-react';
import useCanvasStore from '../../../stores/canvasStore';
import { applyAllFiltersDebounced } from '../../../utils/glfxUtils';
import './control.css';

const DetailsAdjustment = () => {
  const fabricCanvas = useCanvasStore((state) => state.fabricCanvas);
  const originalImage = useCanvasStore((state) => state.originalImage);
  const currentFilters = useCanvasStore((state) => state.currentFilters);
  const updateFilters = useCanvasStore((state) => state.updateFilters);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get only detail-related filters
  const detailFilters = {
    sharpness: currentFilters.sharpness,
    structure: currentFilters.structure,
    clarity: currentFilters.clarity,
    dehaze: currentFilters.dehaze,
    vignette: currentFilters.vignette,
    grain: currentFilters.grain,
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

    console.log("🔍 Applying ALL filters:", currentFilters);
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
  }, [fabricCanvas, originalImage, currentFilters.sharpness, currentFilters.structure, currentFilters.clarity, currentFilters.dehaze, currentFilters.vignette, currentFilters.grain]); // ✅ Only detail-specific dependencies

  const updateDetailSetting = (setting, value) => {
    updateFilters({ [setting]: value });
  };

  const resetDetailFilters = () => {
    updateFilters({
      sharpness: 50,
      structure: 50,
      clarity: 50,
      dehaze: 50,
      vignette: 50,
      grain: 0,
    });
  };

  const detailControls = [
    { key: 'sharpness', label: 'Sharpness', centerAt: 50 },
    { key: 'structure', label: 'Structure', centerAt: 50 },
    { key: 'clarity', label: 'Clarity', centerAt: 50 },
    { key: 'dehaze', label: 'Dehaze', centerAt: 50 },
    { key: 'vignette', label: 'Vignette', centerAt: 50 },
    { key: 'grain', label: 'Film Grain', centerAt: 0 },
  ];

  const isReady = fabricCanvas && originalImage && fabricCanvas?.getObjects?.()?.length > 0;

  return (
    <div className="control-panel">
      <div className="control-header">
        <div className="control-title">
          <Eye className="control-icon" />
          <span>Details Adjustment</span>
        </div>
        <button 
          className="reset-btn" 
          onClick={resetDetailFilters}
          disabled={!isReady}
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {isProcessing && (
        <div className="processing-indicator">
          <Loader2 className="spinning" size={16} />
          <span>Adjusting details...</span>
        </div>
      )}

      <div className="control-content">
        {detailControls.map(({ key, label, centerAt }) => (
          <div key={key} className="slider-container">
            <label className="slider-label">
              {label}
              <span className="slider-value">
                {currentFilters[key] - centerAt > 0 ? '+' : ''}
                {currentFilters[key] - centerAt}
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={currentFilters[key]}
              onChange={(e) => updateDetailSetting(key, parseInt(e.target.value))}
              className="slider"
              disabled={!isReady}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsAdjustment;
