import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import useAuthStore from '../stores/authStore';

function ImageGeneratorComponent() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('stable-diffusion'); // Changed back to default
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    num_steps: 20,
    guidance: 7.5,
    strength: 1,
    width: 1024,
    height: 1024
  });

  // Static models list (no API call needed)
  const availableModels = [
    { id: 'stable-diffusion', name: 'Stable Diffusion XL' }, // Moved back to first position
    { id: 'flux-schnell', name: 'FLUX.1 Schnell' },
    { id: 'dreamshaper', name: 'DreamShaper 8 LCM' }
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
        setGeneratedImage(response.data.image);
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
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            🎨 AI Image Generator
          </h1>
          <div className="w-16 h-1 bg-green-500 mx-auto"></div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column - Input & Settings */}
          <div className="space-y-4">
            
            {/* Model Selection */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                AI Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full p-2.5 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-white text-sm"
              >
                {availableModels.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Prompts Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              {/* Main Prompt */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Prompt <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="w-full p-2.5 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 resize-none text-sm"
                  rows="3"
                />
              </div>

              {/* Negative Prompt */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Negative Prompt <span className="text-gray-500">(Optional)</span>
                </label>
                <textarea
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder="What to avoid in the image..."
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 resize-none text-sm"
                  rows="2"
                />
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Advanced Settings</h3>
              
              <div className="space-y-4">
                {/* Steps - Only for non-FLUX models */}
                {selectedModel !== 'flux-schnell' && (
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Steps: <span className="font-semibold text-green-600">{settings.num_steps}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={settings.num_steps}
                      onChange={(e) => setSettings({...settings, num_steps: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                  </div>
                )}

                {/* Guidance - Only for non-FLUX models */}
                {selectedModel !== 'flux-schnell' && (
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Guidance: <span className="font-semibold text-green-600">{settings.guidance}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="0.5"
                      value={settings.guidance}
                      onChange={(e) => setSettings({...settings, guidance: parseFloat(e.target.value)})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                  </div>
                )}

                {/* Dimensions for FLUX */}
                {selectedModel === 'flux-schnell' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Width</label>
                      <select
                        value={settings.width}
                        onChange={(e) => setSettings({...settings, width: parseInt(e.target.value)})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
                      >
                        <option value={512}>512px</option>
                        <option value={768}>768px</option>
                        <option value={1024}>1024px</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Height</label>
                      <select
                        value={settings.height}
                        onChange={(e) => setSettings({...settings, height: parseInt(e.target.value)})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
                      >
                        <option value={512}>512px</option>
                        <option value={768}>768px</option>
                        <option value={1024}>1024px</option>
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
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Generating...
                </div>
              ) : (
                '🎨 Generate Image'
              )}
            </button>
          </div>

          {/* Right Column - Generated Image & Profile Section */}
          <div className="space-y-4">
            
            {/* Generated Image */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Generated Image</h3>
              
              <div className="bg-gray-50 border-2 border-dashed border-green-300 rounded-lg p-4 min-h-[280px] flex items-center justify-center">
                {loading ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-3"></div>
                    <p className="text-gray-600 text-sm">Generating your image...</p>
                  </div>
                ) : generatedImage ? (
                  <div className="text-center w-full">
                    <img
                      src={generatedImage}
                      alt="Generated"
                      className="max-w-full max-h-[220px] rounded-lg shadow-lg mx-auto mb-3 object-contain"
                    />
                    <button
                      onClick={() => downloadImage(generatedImage)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                    >
                      📥 Download Image
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="text-5xl mb-3">🎨</div>
                    <p className="text-sm">Your generated image will appear here</p>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Navigation & Note */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-sm border border-blue-200 p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-2">View Your Creations</h3>
              <p className="text-gray-600 text-sm mb-3">
                All your generated images are saved in your profile gallery.
              </p>
              <button
                onClick={() => navigate('/profile')}
                className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
              >
                👤 View Profile & Gallery
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGeneratorComponent;
