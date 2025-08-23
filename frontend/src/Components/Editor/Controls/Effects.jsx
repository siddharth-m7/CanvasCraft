import react from 'react';
import { useState } from 'react';

// Placeholder component for various effects adjustments
// blur sharpen vignette b&w sepia retro portrait ye sab ka adjustment yaha hoga

const Effects = () => {

    const [ effect1, setEffect1 ] = useState(50);
    const [ effect2, setEffect2 ] = useState(50);
    const [ effect3, setEffect3 ] = useState(50);
    const [ effect4, setEffect4 ] = useState(50);
    const [ effect5, setEffect5 ] = useState(50);

    const resetAll = () => {
        setEffect1(50);    
        setEffect2(50);
        setEffect3(50);
        setEffect4(50);
        setEffect5(50);
    }

    return (
        <>
        <div>Effect 1</div>
        <input
            type="range"
            min="0" 
            max="100" 
            step="1" 
            value={effect1}
            onChange={(e) => setEffect1(parseInt(e.target.value))} />

        <div>Effect 2</div>
        <input type="range" 
        min="0" 
        max="100" 
        step="1" 
        value={effect2} 
        onChange={(e) => setEffect2(parseInt(e.target.value))} />

        <div>Effect 3</div>
        <input type="range" 
            min="0" 
            max="100" 
            step="1" 
            value={effect3} 
            onChange={(e) => setEffect3(parseInt(e.target.value))}/>

        <div>Effect 4</div>
        <input type="range" 
            min="0" 
            max="100" 
            step="1" 
            value={effect4} 
            onChange={(e) => setEffect4(parseInt(e.target.value))}/>

        <div>Effect 5</div>
        <input type="range" 
            min="0" 
            max="100" 
            step="1" 
            value={effect5}
            onChange={(e) => setEffect5(parseInt(e.target.value))} />

        <div>
            <button onClick={resetAll}>Reset All</button>
        </div>
        </>
    )
}