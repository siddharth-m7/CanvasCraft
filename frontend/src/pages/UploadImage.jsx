import { useState } from "react";
import axios from "axios";
import api from "../utils/api";

function UploadImage() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setUrl(res.data.url);
  };

  return (
  <div className="max-w-lg mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
    <h2 className="text-xl font-bold text-emerald-700 mb-4">Upload New Image</h2>
    <input
      type="file"
      accept="image/*"
      onChange={e => setFile(e.target.files)}
      className="block w-full mb-4 text-gray-700"
    />
    <button
      onClick={handleUpload}
      className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold shadow hover:bg-emerald-500 transition-all focus:ring focus:ring-emerald-300"
    >
      Upload
    </button>
    {url && (
      <div className="mt-6 border rounded-lg overflow-hidden">
        <img src={url} alt="Preview" className="w-full h-48 object-cover" />
      </div>
    )}
  </div>
);

}

export default UploadImage;
