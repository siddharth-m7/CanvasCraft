import React, { useState, useEffect } from 'react';
import { Filter, RotateCcw, Loader2 } from 'lucide-react';
import useCanvasStore from '../../../stores/canvasStore';
import { applyAllFiltersDebounced } from '../../../utils/glfxUtils';
import './control.css';

const Filters = () => {
  const fabricCanvas = useCanvasStore((state) => state.fabricCanvas);
  const originalImage = useCanvasStore((state) => state.originalImage);
  const currentFilters = useCanvasStore((state) => state.currentFilters);
  const updateFilters = useCanvasStore((state) => state.updateFilters);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeFilter, setActiveFilter] = useState(currentFilters.presetFilter || 'none');

  useEffect(() => {
    // Enhanced safety checks
    if (!fabricCanvas || !originalImage) {
      console.log("⏳ Waiting for canvas and image to be ready...");
      return;
    }

    if (typeof fabricCanvas.getObjects !== 'function') {
      console.log("⏳ Canvas not fully initialized...");
      return;
    }

    const objects = fabricCanvas.getObjects();
    if (!objects || objects.length === 0) {
      console.log("⏳ No objects on canvas yet...");
      return;
    }

    console.log("🎨 Applying preset filter:", activeFilter);
    setIsProcessing(true);

    const timeoutId = setTimeout(() => {
      applyAllFiltersDebounced({
        fabricCanvas,
        originalImage,
        filters: currentFilters
      })
      .then(() => {
        setIsProcessing(false);
        console.log("✅ Filter applied successfully");
      })
      .catch((error) => {
        console.error("❌ Filter application failed:", error);
        setIsProcessing(false);
      });
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [fabricCanvas, originalImage, currentFilters.presetFilter]);

  const applyPresetFilter = (filterType) => {
    setActiveFilter(filterType);
    
    // Define preset filter combinations
    const filterPresets = {
      'none': {
        presetFilter: 'none',
        // Reset to neutral values
        saturation: 50,
        brightness: 50,
        contrast: 50,
        vibrance: 50,
        hue: 50,
      },
      'blackwhite': {
        presetFilter: 'blackwhite',
        saturation: 0,
        brightness: 50,
        contrast: 60,
        vibrance: 0,
        hue: 50,
      },
      'sepia': {
        presetFilter: 'sepia',
        saturation: 30,
        brightness: 55,
        contrast: 45,
        vibrance: 40,
        hue: 35,
      },
      'vintage': {
        presetFilter: 'vintage',
        saturation: 40,
        brightness: 45,
        contrast: 65,
        vibrance: 35,
        hue: 45,
        vignette: 70,
      },
      'portrait': {
        presetFilter: 'portrait',
        saturation: 55,
        brightness: 52,
        contrast: 48,
        vibrance: 60,
        hue: 50,
        highlights: 45,
        shadows: 55,
      },
      'food': {
        presetFilter: 'food',
        saturation: 70,
        brightness: 55,
        contrast: 60,
        vibrance: 75,
        hue: 52,
      },
      'dramatic': {
        presetFilter: 'dramatic',
        saturation: 45,
        brightness: 40,
        contrast: 80,
        vibrance: 40,
        hue: 50,
        vignette: 65,
        shadows: 35,
        highlights: 35,
      }
    };

    updateFilters(filterPresets[filterType]);
  };

  const resetFilter = () => {
    applyPresetFilter('none');
  };

  const filterOptions = [
    { id: 'none', name: 'Original', description: 'No filter applied' },
    { id: 'blackwhite', name: 'B&W', description: 'Classic black & white' },
    { id: 'sepia', name: 'Sepia', description: 'Warm vintage tone' },
    { id: 'vintage', name: 'Vintage', description: 'Retro film look' },
    { id: 'portrait', name: 'Portrait', description: 'Flattering skin tones' },
    { id: 'food', name: 'Food', description: 'Vibrant & appetizing' },
    { id: 'dramatic', name: 'Dramatic', description: 'High contrast mood' }
  ];

  const isReady = fabricCanvas && originalImage && fabricCanvas?.getObjects?.()?.length > 0;

  return (
    <div className="control-panel">
      <div className="control-header">
        <div className="control-title">
          <Filter className="control-icon" />
          <span>Preset Filters</span>
        </div>
        <button 
          className="reset-btn" 
          onClick={resetFilter}
          disabled={!isReady}
          title="Reset to original"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {isProcessing && (
        <div className="processing-indicator">
          <Loader2 className="spinning" size={16} />
          <span>Applying filter...</span>
        </div>
      )}

      <div className="filter-grid">
        {filterOptions.map((filter) => (
          <button
            key={filter.id}
            className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => applyPresetFilter(filter.id)}
            disabled={!isReady}
            title={filter.description}
          >
            <span className="filter-name">{filter.name}</span>
            <span className="filter-description">{filter.description}</span>
          </button>
        ))}
      </div>

      <div className="control-note">
        <p>Quick preset filters for common photo styles. Use manual adjustments for fine-tuning.</p>
      </div>
    </div>
  );
};

export default Filters;
