import { useState } from 'react';
import api from '../utils/api';

function ImageGeneratorComponent() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('stable-diffusion');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [settings, setSettings] = useState({
    num_steps: 20,
    guidance: 7.5,
    strength: 1,
    width: 1024,
    height: 1024
  });

  // Static models list (no API call needed)
  const availableModels = [
    { id: 'stable-diffusion', name: 'Stable Diffusion XL' },
    { id: 'dreamshaper', name: 'DreamShaper 8 LCM' },
    { id: 'flux-schnell', name: 'FLUX.1 Schnell' }
  ];

  const generateImage = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt.');
      return;
    }

    try {
      setLoading(true);
      setGeneratedImage(null);

      const response = await api.post('/generate-image', {
        prompt,
        negative_prompt: negativePrompt,
        model: selectedModel,
        ...settings
      });

      if (response.data.success) {
        const newImage = {
          id: Date.now(),
          image: response.data.image,
          prompt,
          model: selectedModel,
          timestamp: new Date().toLocaleString()
        };
        setGeneratedImage(response.data.image);
        setHistory(prev => [newImage, ...prev.slice(0, 9)]); // Keep last 10 images
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error generating image: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (imageData, filename = 'generated-image.png') => {
    const link = document.createElement('a');
    link.href = imageData;
    link.download = filename;
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white mt-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center border-b-2 border-green-500 inline-block pb-2">
        🎨 AI Image Generator
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Left Column - Input & Settings */}
        <div className="xl:col-span-1 space-y-6">
          {/* Model Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              AI Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              {availableModels.map(model => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Prompt *
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              rows="4"
            />
          </div>

          {/* Negative Prompt */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Negative Prompt (Optional)
            </label>
            <textarea
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="What to avoid in the image..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              rows="2"
            />
          </div>

          {/* Advanced Settings */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Advanced Settings</h3>
            
            <div className="space-y-4">
              {/* Steps */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Steps: {settings.num_steps}
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={settings.num_steps}
                  onChange={(e) => setSettings({...settings, num_steps: parseInt(e.target.value)})}
                  className="w-full accent-green-600"
                />
              </div>

              {/* Guidance */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Guidance: {settings.guidance}
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={settings.guidance}
                  onChange={(e) => setSettings({...settings, guidance: parseFloat(e.target.value)})}
                  className="w-full accent-green-600"
                />
              </div>

              {/* Dimensions for FLUX */}
              {selectedModel === 'flux-schnell' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Width</label>
                    <select
                      value={settings.width}
                      onChange={(e) => setSettings({...settings, width: parseInt(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value={512}>512</option>
                      <option value={768}>768</option>
                      <option value={1024}>1024</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Height</label>
                    <select
                      value={settings.height}
                      onChange={(e) => setSettings({...settings, height: parseInt(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value={512}>512</option>
                      <option value={768}>768</option>
                      <option value={1024}>1024</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateImage}
            disabled={loading || !prompt.trim()}
            className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Generating...' : '🎨 Generate Image'}
          </button>
        </div>

        {/* Middle Column - Generated Image */}
        <div className="xl:col-span-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Generated Image</h3>
          
          <div className="bg-white border-2 border-dashed border-green-300 rounded-2xl p-6 min-h-[400px] flex items-center justify-center">
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-600">Generating your image...</p>
              </div>
            ) : generatedImage ? (
              <div className="text-center">
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="max-w-full max-h-96 rounded-lg shadow-lg mx-auto mb-4"
                />
                <button
                  onClick={() => downloadImage(generatedImage)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  📥 Download
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">🎨</div>
                <p>Your generated image will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - History */}
        <div className="xl:col-span-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Generations</h3>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {history.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>No images generated yet</p>
              </div>
            ) : (
              history.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition">
                  <img
                    src={item.image}
                    alt="Generated"
                    className="w-full h-32 object-cover rounded mb-2 cursor-pointer"
                    onClick={() => setGeneratedImage(item.image)}
                  />
                  <p className="text-sm text-gray-700 truncate">{item.prompt}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">{item.model}</span>
                    <button
                      onClick={() => downloadImage(item.image, `generated-${item.id}.png`)}
                      className="text-green-600 hover:text-green-700 text-sm"
                    >
                      📥
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGeneratorComponent;
