import react from 'react';
import { useState } from 'react';

const LightAdjustment = () => {

    const [ brightness, setBrightness ] = useState(50);
    const [ contrast, setContrast ] = useState(50);
    const [ exposure, setExposure ] = useState(50);
    const [ highlights, setHighlights ] = useState(50);
    const [ shadows, setShadows ] = useState(50);

    const resetAll = () => {
        setBrightness(50);    
        setContrast(50);
        setExposure(50);
        setHighlights(50);
        setShadows(50);
    }

    return (
        <>
        <div>Brightness</div>
        <input
            type="range"
            min="0" 
            max="100" 
            step="1" 
            value={brightness}
            onChange={(e) => setBrightness(parseInt(e.target.value))} />

        <div>Contrast</div>
        <input type="range" 
        min="0" 
        max="100" 
        step="1" 
        value={contrast} 
        onChange={(e) => setContrast(parseInt(e.target.value))} />

        <div>Exposure</div>
        <input type="range" 
            min="0" 
            max="100" 
            step="1" 
            value={exposure} 
            onChange={(e) => setExposure(parseInt(e.target.value))}/>

        <div>Highlights</div>
        <input type="range" 
            min="0" 
            max="100" 
            step="1" 
            value={highlights} 
            onChange={(e) => setHighlights(parseInt(e.target.value))}/>

        <div>Shadows</div>
        <input type="range" 
            min="0" 
            max="100" 
            step="1" 
            value={shadows}
            onChange={(e) => setShadows(parseInt(e.target.value))} />

        <div>
            <button onClick={resetAll}>Reset</button>
        </div>
        </>
    )
}

export default LightAdjustment;