import react from 'react';
import { useState } from 'react';

const ColorAdjustment = () => {

    const [ vibrance, setVibrance ] = useState(50);
    const [ saturation, setSaturation ] = useState(50);
    const [ temperature, setTemperature ] = useState(50);
    const [ tint, setTint ] = useState(50);
    const [ hue, setHue ] = useState(50);

    const resetAll = () => {
        setVibrance(50);    
        setSaturation(50);
        setTemperature(50);
        setTint(50);
        setHue(50);
    }

    return (
        <>
        <div>Vibrance</div>
        <input
            type="range"
            min="0" 
            max="100" 
            step="1" 
            value={vibrance}
            onChange={(e) => setVibrance(parseInt(e.target.value))} />

        <div>Saturation</div>
        <input type="range" 
        min="0" 
        max="100" 
        step="1" 
        value={saturation} 
        onChange={(e) => setSaturation(parseInt(e.target.value))} />

        <div>Temperature</div>
        <input type="range" 
            min="0" 
            max="100" 
            step="1" 
            value={temperature} 
            onChange={(e) => setTemperature(parseInt(e.target.value))}/>

        <div>Tint</div>
        <input type="range" 
            min="0" 
            max="100" 
            step="1" 
            value={tint} 
            onChange={(e) => setTint(parseInt(e.target.value))}/>

        <div>Hue</div>
        <input type="range" 
            min="0" 
            max="100" 
            step="1" 
            value={hue} 
            onChange={(e) => setHue(parseInt(e.target.value))}/>
        <div>
        <button className='bg-green-500 text-white px-4 py-2 rounded mt-4'
        onClick={resetAll}> 
            Reset All
        </button>
        </div>
        
        </>
    )
}

export default ColorAdjustment;