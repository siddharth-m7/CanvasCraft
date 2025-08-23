// utils/imageCompression.js (Enhanced to store original file)
export class ImageCompressionUtil {
  static async getImageDimensions(file) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
          aspectRatio: img.naturalWidth / img.naturalHeight
        });
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(file);
    });
  }

  static async compressImage(file, maxWidth = 2000, maxHeight = 2000, quality = 0.9) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        let { width, height } = img;
        const aspectRatio = width / height;
        
        // Calculate new dimensions while maintaining aspect ratio
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            width = maxWidth;
            height = width / aspectRatio;
          } else {
            height = maxHeight;
            width = height * aspectRatio;
          }
        }
        
        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;
        
        // Draw image with new dimensions
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob
        canvas.toBlob((blob) => {
          if (blob) {
            // Create a new File object from the blob
            const compressedFile = new File([blob], file.name, {
              type: blob.type,
              lastModified: Date.now()
            });
            
            resolve({
              file: compressedFile,
              originalSize: file.size,
              compressedSize: blob.size,
              originalDimensions: { width: img.width, height: img.height },
              newDimensions: { width, height },
              compressionRatio: ((file.size - blob.size) / file.size * 100).toFixed(2)
            });
          } else {
            reject(new Error('Failed to compress image'));
          }
        }, file.type, quality);
        
        // Clean up
        URL.revokeObjectURL(img.src);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = URL.createObjectURL(file);
    });
  }

  static needsCompression(width, height, threshold = 2000) {
    return width > threshold || height > threshold;
  }
}
