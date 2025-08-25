import React, { useState } from 'react';
import { 
  Crop, 
  RotateCw, 
  RotateCcw, 
  FlipHorizontal, 
  FlipVertical, 
  Eraser,
  Scissors
} from 'lucide-react';

const CropAndRotate = () => {
    const [rotate, setRotate] = useState(0);
    const [flipX, setFlipX] = useState(false);
    const [flipY, setFlipY] = useState(false);

    const rotateLeft = () => {
        setRotate((prev) => prev - 90);
    }

    const rotateRight = () => {
        setRotate((prev) => prev + 90);
    }

    const toggleFlipX = () => {
        setFlipX(prev => !prev);
    }

    const toggleFlipY = () => {
        setFlipY(prev => !prev);
    }

    const resetAll = () => {
        setRotate(0);
        setFlipX(false);
        setFlipY(false);
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-black flex items-center gap-2">
                    <Scissors size={20} className="text-green-600" />
                    Crop & Transform
                </h3>
            </div>

            <div className="p-4 space-y-4">
                {/* Current Transform Values */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <span className="text-sm font-medium text-black">Status</span>
                    <div className="flex items-center gap-4 text-xs">
                        <div className="text-black">
                            <span className="font-medium">Rotation:</span> 
                            <span className="text-gray-700 ml-1">{rotate}°</span>
                        </div>
                        <div className="text-black">
                            <span className="font-medium">Flip:</span> 
                            <span className="text-gray-700 ml-1">
                                {flipX ? 'H' : ''}{flipX && flipY ? '+' : ''}{flipY ? 'V' : ''}
                                {!flipX && !flipY ? 'None' : ''}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Crop Section */}
                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-black">Crop</h4>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-black hover:bg-green-50 hover:text-green-700 border border-gray-300 rounded-md transition-colors">
                        <Crop size={16} />
                        Start Cropping
                    </button>
                </div>

                {/* Transform Section */}
                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-black">Transform</h4>
                    
                    {/* Rotation Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                        <button 
                            className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-black hover:bg-green-50 hover:text-green-700 border border-gray-300 rounded-md transition-colors"
                            onClick={rotateLeft}
                        >
                            <RotateCcw size={14} />
                            Rotate Left
                        </button>
                        <button 
                            className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-black hover:bg-green-50 hover:text-green-700 border border-gray-300 rounded-md transition-colors"
                            onClick={rotateRight}
                        >
                            <RotateCw size={14} />
                            Rotate Right
                        </button>
                    </div>

                    {/* Flip Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                        <button 
                            className={`flex items-center justify-center gap-2 px-3 py-2 text-sm border rounded-md transition-colors ${
                                flipX 
                                    ? 'bg-green-50 text-green-700 border-green-300' 
                                    : 'text-black hover:bg-green-50 hover:text-green-700 border-gray-300'
                            }`}
                            onClick={toggleFlipX}
                        >
                            <FlipHorizontal size={14} />
                            Flip H
                        </button>
                        <button 
                            className={`flex items-center justify-center gap-2 px-3 py-2 text-sm border rounded-md transition-colors ${
                                flipY 
                                    ? 'bg-green-50 text-green-700 border-green-300' 
                                    : 'text-black hover:bg-green-50 hover:text-green-700 border-gray-300'
                            }`}
                            onClick={toggleFlipY}
                        >
                            <FlipVertical size={14} />
                            Flip V
                        </button>
                    </div>
                </div>

                {/* Reset Button */}
                <button 
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-black hover:bg-gray-50 border border-gray-300 rounded-md transition-colors"
                    onClick={resetAll}
                >
                    <Eraser size={16} />
                    Reset All
                </button>
            </div>
        </div>
    );
}

export default CropAndRotate;
