// components/DropZone.jsx
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

const DropZone = ({ onDropFile }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onDropFile(acceptedFiles[0]); // pass the first file to parent
      }
    },
    [onDropFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] }, // only images
    multiple: false, // only one file at a time
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 cursor-pointer transition 
      ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-400 bg-gray-100/40"} 
      hover:border-blue-400 hover:bg-blue-50`}
    >
      <input {...getInputProps()} />
      <Upload className="w-10 h-10 text-gray-500 mb-2" />
      {isDragActive ? (
        <p className="text-blue-600 font-medium">Drop the image here...</p>
      ) : (
        <p className="text-gray-600">
          Drag & drop an image here, or{" "}
          <span className="text-blue-600 font-medium">click to upload</span>
        </p>
      )}
    </div>
  );
};

export default DropZone;
