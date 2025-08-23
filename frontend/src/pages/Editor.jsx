// components/ImageEditor.jsx
import React, { useState, useCallback, useEffect } from 'react';
import DropZone from '../Components/Editor/DropZone';

import ImageCanvas from '../Components/Editor/ImageCanvas';
import CompressionModal from '../Components/Editor/CompressionModal';
import { ImageCompressionUtil } from '../utils/imageCompression';
import ControlContainer from '../Components/Editor/ControlContainer';

const Editor = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  
  // Modal states
  const [showCompressionModal, setShowCompressionModal] = useState(false);
  const [imageInfo, setImageInfo] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionStats, setCompressionStats] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Auto-hide success message after 2 seconds
  useEffect(() => {
    if (compressionStats && showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [compressionStats, showSuccessMessage]);

  const handleFileUpload = useCallback(async (file) => {
    try {
      const dimensions = await ImageCompressionUtil.getImageDimensions(file);
      
      if (ImageCompressionUtil.needsCompression(dimensions.width, dimensions.height, 2000)) {
        setImageInfo({
          width: dimensions.width,
          height: dimensions.height,
          fileSize: file.size,
          fileName: file.name,
          originalFile: file // Store the original file
        });
        setShowCompressionModal(true);
      } else {
        setUploadedFile(file);
        setCompressionStats(null);
        setShowSuccessMessage(false);
      }
    } catch (error) {
      console.error('Error processing file:', error);
      setUploadedFile(file);
    }
  }, []);

  const handleCompress = useCallback(async (settings) => {
    if (!imageInfo || !imageInfo.originalFile) return;
    
    setIsCompressing(true);
    
    try {
      const result = await ImageCompressionUtil.compressImage(
        imageInfo.originalFile, 
        settings.maxWidth, 
        settings.maxHeight, 
        settings.quality
      );
      
      setUploadedFile(result.file);
      setCompressionStats(result);
      setShowSuccessMessage(true); // Show success message
      setShowCompressionModal(false);
      setImageInfo(null);
    } catch (error) {
      console.error('Compression failed:', error);
      alert('Failed to compress image. Using original.');
      handleCancelCompression();
    } finally {
      setIsCompressing(false);
    }
  }, [imageInfo]);

  const handleCancelCompression = useCallback(() => {
    if (imageInfo && imageInfo.originalFile) {
      setUploadedFile(imageInfo.originalFile);
    }
    
    setShowCompressionModal(false);
    setImageInfo(null);
    setCompressionStats(null);
    setShowSuccessMessage(false);
  }, [imageInfo]);

  const handleCanvasReady = useCallback((canvas) => {
    setFabricCanvas(canvas);
  }, []);

  const downloadImage = useCallback(() => {
    if (fabricCanvas) {
      try {
        const dataURL = fabricCanvas.toDataURL({
          format: 'png',
          quality: 1.0
        });
        
        const link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading image:', error);
      }
    }
  }, [fabricCanvas]);

  const clearCanvas = useCallback(() => {
    if (fabricCanvas) {
      fabricCanvas.clear();
    }
    setUploadedFile(null);
    setCompressionStats(null);
    setShowSuccessMessage(false);
  }, [fabricCanvas]);

  return (
    <div className="image-editor p-6 min-h-screen bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Image Canvas Editor</h2>

        {/* DropZone */}
        {!uploadedFile && (
          <div className="mb-6">
            <DropZone onDropFile={handleFileUpload} />
          </div>
        )}

        {/* Compression Success Message with Fade Animation */}
        {compressionStats && showSuccessMessage && (
          <div className={`mb-4 p-4 bg-green-50 border border-green-200 rounded-lg transform transition-all duration-500 ${
            showSuccessMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}>
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              ✅ Image Compressed Successfully
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-green-700">
              <div>
                <span className="font-medium">Original:</span> {(compressionStats.originalSize / 1024 / 1024).toFixed(2)} MB
              </div>
              <div>
                <span className="font-medium">Compressed:</span> {(compressionStats.compressedSize / 1024 / 1024).toFixed(2)} MB
              </div>
              <div>
                <span className="font-medium">Saved:</span> {compressionStats.compressionRatio}%
              </div>
              <div>
                <span className="font-medium">New Size:</span> {compressionStats.newDimensions.width}×{compressionStats.newDimensions.height}
              </div>
            </div>
          </div>
        )}

        {uploadedFile && <ControlContainer />}

        {/* Canvas section */}
        {uploadedFile && (
          <div className="canvas-section">
            <div className="mb-4 flex gap-4 justify-center">
              <button
                onClick={downloadImage}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors shadow-sm"
              >
                Download Image
              </button>
              <button
                onClick={clearCanvas}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors shadow-sm"
              >
                Clear Canvas
              </button>
            </div>
            
            <ImageCanvas 
              uploadedFile={uploadedFile}
              onCanvasReady={handleCanvasReady}
            />

            {/* Image info */}
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>File: {uploadedFile.name}</p>
              <p>Size: {(uploadedFile.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
        )}

        {/* Compression Modal */}
        <CompressionModal
          isOpen={showCompressionModal}
          onClose={() => setShowCompressionModal(false)}
          imageInfo={imageInfo}
          onCompress={handleCompress}
          onCancel={handleCancelCompression}
          isCompressing={isCompressing}
        />
      </div>
    </div>
  );
};

export default Editor;
