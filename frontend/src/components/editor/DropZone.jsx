// components/DropZone.jsx (Enhanced)
import React, { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

const DropZone = ({ onDropFile }) => {
  const originalFileRef = useRef(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        originalFileRef.current = file; // Store original file
        onDropFile(file);
      }
    },
    [onDropFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": []
    },
    multiple: false,
  });

  // Expose original file for parent component
  React.useImperativeHandle(originalFileRef, () => ({
    getOriginalFile: () => originalFileRef.current
  }));

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg max-w-3xl m-auto min-h-80 text-center justify-center p-20 mt-28 cursor-pointer transition-colors ${
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-gray-400"
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      {isDragActive ? (
        <p className="text-blue-600 font-medium">Drop the image here...</p>
      ) : (
        <p className="text-gray-600">
          Drag & drop an image here, or{" "}
          <span className="text-blue-600 font-medium">click to upload</span>
        </p>
      )}
      <p className="text-sm text-gray-500 mt-2">
        Images larger than 2000×2000px will be compressed
      </p>
    </div>
  );
};

export default DropZone;
