import { useEffect, useState } from "react";
import api from "../utils/api";

function UserImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await api.get("/images/my-images", {
        withCredentials: true,
      });
      setImages(res.data.images);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  const handleDelete = async (imageId) => {
    try {
      setLoading(true);
      await api.delete(`/images/${imageId}`, { withCredentials: true });
      
      // remove deleted image from UI immediately
      setImages((prev) => prev.filter((img) => img._id !== imageId));
    } catch (err) {
      console.error("Error deleting image:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 md:p-4">
      {images.length === 0 ? (
        <p className="text-gray-600 italic">No images generated yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img._id}
              className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl hover:scale-[1.02] transition"
            >
              <img
                src={img.imageUrl}
                alt="user upload"
                className="w-full h-44 object-cover"
              />

              {/* Delete Button (shown on hover) */}
              <button
                onClick={() => handleDelete(img._id)}
                disabled={loading}
                className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
              >
                {loading ? "..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserImages;
