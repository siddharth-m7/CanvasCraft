import React, { useState, useEffect } from 'react';
import { RotateCcw, Eye, Loader2 } from 'lucide-react';
import useCanvasStore from '../../../stores/canvasStore';
import { applyAllFiltersDebounced } from '../../../utils/glfxUtils';

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
    if (fabricCanvas && originalImage && fabricCanvas.getObjects().length > 0) {
      console.log("🔍 Applying ALL filters:", currentFilters);
      setIsProcessing(true);

      applyAllFiltersDebounced({
        fabricCanvas,
        originalImage,
        filters: currentFilters // Apply ALL filters from store
      })
        .then(() => {
          setIsProcessing(false);
        })
        .catch((error) => {
          console.error("❌ Filter application failed:", error);
          setIsProcessing(false);
        });
    }
  }, [fabricCanvas, originalImage, currentFilters]);

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
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-black flex items-center gap-2">
            <Eye size={20} className="text-green-600" />
            Details & Effects
          </h3>
          <button
            onClick={resetDetailFilters}
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
            <span className="text-black text-sm">Enhancing details...</span>
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
          {detailControls.map(({ key, label, centerAt }) => {
            const value = detailFilters[key];
            const adjustedValue = centerAt === 0 ? value : value - centerAt;
            
            return (
              <div key={key}>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-black">
                    {label}
                  </label>
                  <span className="text-xs text-black bg-gray-100 px-2 py-1 rounded font-mono">
                    {centerAt === 0 ? 
                      adjustedValue : 
                      (adjustedValue > 0 ? '+' : '') + adjustedValue
                    }
                  </span>
                </div>
                
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => updateDetailSetting(key, parseInt(e.target.value))}
                    disabled={isProcessing}
                    className="w-full slider-green"
                    style={{ 
                      '--slider-progress': `${value}%` 
                    }}
                  />
                  {/* Center line indicator for sliders that don't start at 0 */}
                  {centerAt !== 0 && (
                    <div 
                      className="absolute top-1/2 transform -translate-y-1/2 w-0.5 h-3 bg-gray-400 pointer-events-none rounded"
                      style={{ left: `${(centerAt / 100) * 100}%` }}
                    />
                  )}
                </div>
                
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  {centerAt === 0 ? (
                    <>
                      <span>0</span>
                      <span>50</span>
                      <span>100</span>
                    </>
                  ) : (
                    <>
                      <span>-50</span>
                      <span>0</span>
                      <span>+50</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pro Tips */}
        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="text-sm text-black">
            <span className="font-medium">Pro Tips:</span>
            <ul className="mt-1 space-y-1 text-xs">
              <li><span className="font-medium">Structure:</span> Enhances texture and detail</li>
              <li><span className="font-medium">Clarity:</span> Adds punch and definition</li>
              <li><span className="font-medium">Vignette:</span> Darkens edges for focus</li>
              <li><span className="font-medium">Grain:</span> Adds film texture</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsAdjustment;
