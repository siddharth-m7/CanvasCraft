import fx from "glfx";
import { FabricImage } from "fabric";

export const applyAllFilters = ({
  fabricCanvas,
  originalImage,
  filters
}) => {
  if (!fabricCanvas || !originalImage) {
    console.warn("❌ Missing fabricCanvas or originalImage");
    return Promise.reject("Missing required parameters");
  }

  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      try {
        // 🔑 Safe check for canvas and objects
        if (!fabricCanvas || typeof fabricCanvas.getObjects !== 'function') {
          console.error("❌ Canvas not ready or invalid");
          reject("Canvas not ready");
          return;
        }

        const objects = fabricCanvas.getObjects();
        
        // 🔑 Check if objects exist before processing
        if (!objects || objects.length === 0) {
          console.error("❌ No objects found on canvas");
          reject("No objects found on canvas");
          return;
        }

        console.log("✅ Canvas has", objects.length, "objects");

        const fxCanvas = fx.canvas();
        if (!fxCanvas) {
          reject("WebGL not supported");
          return;
        }

        const texture = fxCanvas.texture(img);

        // Apply ALL filters with safe defaults
        fxCanvas
          .draw(texture)
          // Color adjustments
          .hueSaturation(
            (filters.hue - 50) / 50, 
            (filters.saturation - 50) / 50
          )
          .brightnessContrast(
            (filters.brightness - 50) / 50, 
            (filters.contrast - 50) / 50
          )
          .vibrance((filters.vibrance - 50) / 50)
          // Advanced effects (safely mapped)
          .unsharpMask(20, Math.max(0, (filters.sharpness - 50) / 25), 2)
          .vignette(0.5, Math.max(0, (filters.vignette - 50) / 100))
          .noise(Math.max(0, filters.grain / 100))
          .update();

        const newDataURL = fxCanvas.toDataURL();
        console.log("✅ GLFX processing completed");

        const imageObj = objects.find((obj) => obj.type === "image");

        if (imageObj) {
          const { left, top, scaleX, scaleY } = imageObj;
          
          FabricImage.fromURL(newDataURL)
            .then((updatedImg) => {
              updatedImg.set({
                left,
                top,
                scaleX,
                scaleY,
                selectable: false,
                evented: false,
                hasControls: false,
                hasBorders: false,
              });

              fabricCanvas.remove(imageObj);
              fabricCanvas.add(updatedImg);
              fabricCanvas.sendObjectToBack(updatedImg);
              fabricCanvas.renderAll();
              
              console.log("🎉 All filters applied successfully!");
              resolve();
            })
            .catch((error) => {
              console.error("❌ FabricImage creation failed:", error);
              reject(error);
            });
        } else {
          console.error("❌ No image object found on canvas");
          reject("No image object found on canvas");
        }
      } catch (err) {
        console.error("❌ GLFX error:", err);
        reject(err);
      }
    };

    img.onerror = (error) => {
      console.error("❌ Image load failed:", error);
      reject(error);
    };

    img.src = originalImage;
  });
};

// Enhanced debounced version with safety checks
let debounceTimer;
export const applyAllFiltersDebounced = (params) => {
  return new Promise((resolve, reject) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      // Extra safety check before applying
      if (!params.fabricCanvas || !params.originalImage) {
        reject("Missing required parameters");
        return;
      }
      
      applyAllFilters(params)
        .then(resolve)
        .catch(reject);
    }, 200);
  });
};
