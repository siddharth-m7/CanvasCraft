// components/CompressionModal.jsx
import React, { useState } from 'react';
import { X, FileImage, Info } from 'lucide-react';

const CompressionModal = ({ 
  isOpen, 
  onClose, 
  imageInfo, 
  onCompress, 
  onCancel,
  isCompressing = false 
}) => {
  const [compressionQuality, setCompressionQuality] = useState(0.9);
  const [maxResolution, setMaxResolution] = useState(2000);

  if (!isOpen || !imageInfo) return null;

  const handleCompress = () => {
    onCompress({
      maxWidth: maxResolution,
      maxHeight: maxResolution,
      quality: compressionQuality
    });
  };

  const estimatedNewWidth = imageInfo.width > imageInfo.height 
    ? maxResolution 
    : Math.floor((maxResolution / imageInfo.height) * imageInfo.width);
    
  const estimatedNewHeight = imageInfo.height > imageInfo.width 
    ? maxResolution 
    : Math.floor((maxResolution / imageInfo.width) * imageInfo.height);

  return (
    <>
      <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <FileImage className="text-orange-500" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">Large Image Detected</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isCompressing}
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Warning Message */}
            <div className="flex items-start gap-3 mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <Info className="text-amber-600 mt-0.5" size={16} />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Image size is too large!</p>
                <p>Your image is {imageInfo.width}×{imageInfo.height}px. We recommend compressing it to improve performance.</p>
              </div>
            </div>

            {/* Current vs New Dimensions */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Current Size</p>
                <p className="font-semibold text-red-600">
                  {imageInfo.width}×{imageInfo.height}
                </p>
                <p className="text-xs text-gray-500">
                  {(imageInfo.fileSize / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">After Compression</p>
                <p className="font-semibold text-green-600">
                  {estimatedNewWidth}×{estimatedNewHeight}
                </p>
                <p className="text-xs text-gray-500">~50-80% smaller</p>
              </div>
            </div>

            {/* Compression Settings */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Resolution: {maxResolution}px
                </label>
                <input
                  type="range"
                  min="1000"
                  max="2000"
                  step="100"
                  value={maxResolution}
                  onChange={(e) => setMaxResolution(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  disabled={isCompressing}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1000px</span>
                  <span>2000px</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quality: {Math.round(compressionQuality * 100)}%
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="1"
                  step="0.1"
                  value={compressionQuality}
                  onChange={(e) => setCompressionQuality(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  disabled={isCompressing}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              disabled={isCompressing}
            >
              Use Original
            </button>
            <button
              onClick={handleCompress}
              disabled={isCompressing}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300 flex items-center justify-center gap-2"
            >
              {isCompressing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Compressing...
                </>
              ) : (
                <>
                  {/* <Compress size={16} /> */}
                  Compress Image
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompressionModal;
