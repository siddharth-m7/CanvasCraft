import { create } from "zustand";

const useCanvasStore = create((set, get) => ({
  fabricCanvas: null,
  originalImage: null,
  
  // Filter states
  currentFilters: {
    // Color
    vibrance: 50,
    saturation: 50,
    hue: 50,
    // Light
    brightness: 50,
    contrast: 50,
    exposure: 50,
    highlights: 50,
    shadows: 50,
    // Details
    sharpness: 50,
    structure: 50,
    clarity: 50,
    dehaze: 50,
    vignette: 50,
    grain: 0,
  },

  setFabricCanvas: (canvas) => {
    console.log("Setting fabricCanvas in store:", canvas);
    set({ fabricCanvas: canvas });
  },

  setOriginalImage: (imgDataUrl) => set({ originalImage: imgDataUrl }),

  // Update filter values
  updateFilters: (newFilters) => set((state) => ({
    currentFilters: { ...state.currentFilters, ...newFilters }
  })),

  // Reset all filters
  resetFilters: () => set({
    currentFilters: {
      vibrance: 50, saturation: 50, hue: 50,
      brightness: 50, contrast: 50, exposure: 50, highlights: 50, shadows: 50,
      sharpness: 50, structure: 50, clarity: 50, dehaze: 50, vignette: 50, grain: 0,
    }
  }),

  clearCanvas: () => set((state) => {
    if (state.fabricCanvas) {
      state.fabricCanvas.clear();
    }
    return { fabricCanvas: state.fabricCanvas };
  }),

  downloadCanvas: () => set((state) => {
    if (!state.fabricCanvas) return {};
    try {
      const dataURL = state.fabricCanvas.toDataURL({
        format: "png",
        quality: 1.0,
      });
      const link = document.createElement("a");
      link.download = "edited-image.png";
      link.href = dataURL;
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    }
    return {};
  }),
}));

export default useCanvasStore;
