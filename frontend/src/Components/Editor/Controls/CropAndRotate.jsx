import { Crop } from 'lucide-react';
import react from 'react';
import { useState } from 'react';

const CropAndRotate = () => {
    
    const [ rotate, setRotate ] = useState(0);
    const [ flipX, setFlipX ] = useState(false);
    const [ flipY, setFlipY ] = useState(false);

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
        <>
        <div>
            <div>
                <button onClick={rotateLeft}>Rotate Left</button>
            </div><div>
                <button onClick={rotateRight}>Rotate Right</button>
            </div><div>
                <button onClick={toggleFlipX}>Flip Horizontal</button>
            </div><div>
                <button onClick={toggleFlipY}>Flip Vertical</button>
            </div><div>
                <button onClick={resetAll}>Reset</button>
            </div>
        </div>
        </>
    )
}

export default CropAndRotate;