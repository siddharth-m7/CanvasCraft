// src/pages/Editor.jsx
import React from 'react';
import Navbar from '../Components/Navbar';

const Editor = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar />
      
      {/* Editor Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">PixelNext Editor</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Untitled Project</span>
              <span>•</span>
              <span>Auto-saved</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium">
              Export
            </button>
            <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium">
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex h-[calc(100vh-116px)]"> {/* Adjusted height to account for navbar */}
        {/* Sidebar - Tools Panel */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Tools</h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded flex flex-col items-center text-xs">
                  <div className="w-6 h-6 bg-blue-500 rounded mb-1"></div>
                  Brush
                </button>
                <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded flex flex-col items-center text-xs">
                  <div className="w-6 h-6 bg-green-500 rounded mb-1"></div>
                  Pencil
                </button>
                <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded flex flex-col items-center text-xs">
                  <div className="w-6 h-6 bg-red-500 rounded mb-1"></div>
                  Eraser
                </button>
                <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded flex flex-col items-center text-xs">
                  <div className="w-6 h-6 bg-yellow-500 rounded mb-1"></div>
                  Text
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Layers</h3>
              <div className="space-y-1">
                <div className="p-2 bg-gray-700 rounded text-xs">
                  Background
                </div>
                <div className="p-2 bg-blue-600 rounded text-xs">
                  Layer 1
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Properties</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-400">Brush Size</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    defaultValue="10"
                    className="w-full mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Opacity</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    defaultValue="100"
                    className="w-full mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Color</label>
                  <div className="flex space-x-1 mt-1">
                    <div className="w-6 h-6 bg-black rounded border border-gray-600"></div>
                    <div className="w-6 h-6 bg-white rounded border border-gray-600"></div>
                    <div className="w-6 h-6 bg-red-500 rounded"></div>
                    <div className="w-6 h-6 bg-blue-500 rounded"></div>
                    <div className="w-6 h-6 bg-green-500 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center bg-gray-700 p-8">
          <div className="bg-white rounded-lg shadow-lg" style={{ width: '800px', height: '600px' }}>
            <canvas 
              width="800" 
              height="600" 
              className="w-full h-full rounded-lg cursor-crosshair"
              style={{ background: 'white' }}
            >
              Your browser does not support the canvas element.
            </canvas>
          </div>
        </div>

        {/* Right Panel - Assets/History */}
        <div className="w-64 bg-gray-800 border-l border-gray-700 p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">History</h3>
              <div className="space-y-1 text-xs">
                <div className="p-2 bg-gray-700 rounded">Initial canvas</div>
                <div className="p-2 bg-gray-700 rounded">Added text</div>
                <div className="p-2 bg-blue-600 rounded">Brush stroke</div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Assets</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square bg-gray-700 rounded"></div>
                <div className="aspect-square bg-gray-700 rounded"></div>
                <div className="aspect-square bg-gray-700 rounded"></div>
                <div className="aspect-square bg-gray-700 rounded"></div>
                <div className="aspect-square bg-gray-700 rounded"></div>
                <div className="aspect-square bg-gray-700 rounded flex items-center justify-center text-xs">
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
