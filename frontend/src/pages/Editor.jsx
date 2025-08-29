// components/Editor.jsx
import React, { useState, useCallback, useEffect } from "react";
import { Download, Trash2, Upload, CheckCircle } from "lucide-react";
import DropZone from "../components/editor/DropZone";
import ImageCanvas from "../components/editor/ImageCanvas";
import CompressionModal from "../components/editor/CompressionModal";
import { ImageCompressionUtil } from "../utils/imageCompression";
import ControlContainer from "../components/editor/ControlContainer";
import useCanvasStore from "../stores/canvasStore"; // ✅ Zustand store

const Editor = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  // Zustand canvas actions
  const downloadCanvas = useCanvasStore((state) => state.downloadCanvas);
  const clearCanvas = useCanvasStore((state) => state.clearCanvas);

  // Modal states
  const [showCompressionModal, setShowCompressionModal] = useState(false);
  const [imageInfo, setImageInfo] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionStats, setCompressionStats] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Auto-hide success message
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

      if (
        ImageCompressionUtil.needsCompression(
          dimensions.width,
          dimensions.height,
          2000
        )
      ) {
        setImageInfo({
          width: dimensions.width,
          height: dimensions.height,
          fileSize: file.size,
          fileName: file.name,
          originalFile: file,
        });
        setShowCompressionModal(true);
      } else {
        setUploadedFile(file);
        setCompressionStats(null);
        setShowSuccessMessage(false);
      }
    } catch (error) {
      console.error("Error processing file:", error);
      setUploadedFile(file);
    }
  }, []);

  const handleCompress = useCallback(
    async (settings) => {
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
        setShowSuccessMessage(true);
        setShowCompressionModal(false);
        setImageInfo(null);
      } catch (error) {
        console.error("Compression failed:", error);
        alert("Failed to compress image. Using original.");
        handleCancelCompression();
      } finally {
        setIsCompressing(false);
      }
    },
    [imageInfo]
  );

  const handleCancelCompression = useCallback(() => {
    if (imageInfo && imageInfo.originalFile) {
      setUploadedFile(imageInfo.originalFile);
    }

    setShowCompressionModal(false);
    setImageInfo(null);
    setCompressionStats(null);
    setShowSuccessMessage(false);
  }, [imageInfo]);

  return (
    <div className="bg-gray-50 p-6 mt-16">
      <div className="max-w-full mx-auto"> 

        {!uploadedFile && (
          <div className="mb-6">
            <DropZone onDropFile={handleFileUpload} />
          </div>
        )}

        {/* Success Message */}
        {compressionStats && showSuccessMessage && (
          <div
            className={`mb-6 bg-white border border-green-200 rounded-lg shadow-sm overflow-hidden transform transition-all duration-500 ${
              showSuccessMessage
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
          >
            <div className="bg-green-50 border-b border-green-200 p-4">
              <h4 className="font-semibold text-black flex items-center gap-2">
                <CheckCircle className="text-green-600" size={20} />
                Image Compressed Successfully
              </h4>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-black">
                  <span className="font-medium">Original:</span>{" "}
                  <span className="text-gray-700">
                    {(compressionStats.originalSize / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <div className="text-black">
                  <span className="font-medium">Compressed:</span>{" "}
                  <span className="text-gray-700">
                    {(compressionStats.compressedSize / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <div className="text-black">
                  <span className="font-medium">Saved:</span>{" "}
                  <span className="text-green-600 font-semibold">
                    {compressionStats.compressionRatio}%
                  </span>
                </div>
                <div className="text-black">
                  <span className="font-medium">New Size:</span>{" "}
                  <span className="text-gray-700">
                    {compressionStats.newDimensions.width}×
                    {compressionStats.newDimensions.height}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Responsive Layout: Column on mobile, Row on desktop */}
        {uploadedFile && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Control Container - Order 2 on mobile, Order 1 on desktop, Fixed width on desktop */}
            <div className="order-2 lg:order-1 w-full lg:w-96 flex-shrink-0">
              <ControlContainer />
            </div>

            {/* Canvas Section - Order 1 on mobile, Order 2 on desktop, Takes remaining space */}
            <div className="order-1 lg:order-2 flex-1 min-w-0">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden h-fit">
                {/* Canvas Actions Header */}
                <div className="border-b border-gray-200 p-4">
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={downloadCanvas}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm font-medium"
                    >
                      <Download size={16} />
                      Download Image
                    </button>
                    <button
                      onClick={() => {
                        clearCanvas();
                        setUploadedFile(null);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-black border border-gray-300 rounded-md hover:bg-gray-50 transition-colors shadow-sm font-medium"
                    >
                      <Trash2 size={16} />
                      Clear Canvas
                    </button>
                  </div>
                </div>

                {/* Canvas Area - Larger on desktop */}
                <div className="bg-gray-50 p-6">
                  <div className="w-full max-w-4xl mx-auto">
                    <ImageCanvas uploadedFile={uploadedFile} />
                  </div>
                </div>

                {/* File Info Footer */}
                {/* <div className="border-t border-gray-200 bg-gray-50 p-4">
                  <div className="text-sm text-black text-center space-y-1">
                    <div>
                      <span className="font-medium">File:</span> 
                      <span className="text-gray-700 ml-1">{uploadedFile.name}</span>
                    </div>
                    <div>
                      <span className="font-medium">Size:</span> 
                      <span className="text-gray-700 ml-1">{(uploadedFile.size / 1024).toFixed(2)} KB</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        )}

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
