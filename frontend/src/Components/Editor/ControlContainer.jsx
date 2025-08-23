import React from 'react';
import { useState } from 'react';
import ColorAdjustment from './Controls/ColorAdjustment';
import CropAndRotate from './Controls/CropAndRotate';
import LightAdjustment from './Controls/LightAdjustment';

const ControlContainer = () => {

    const [activeColorTab, setActiveColorTab] = useState(false);
    const [activeCropTab, setActiveCropTab] = useState(false);
    const [activeLightTab, setActiveLightTab] = useState(false);

    const toggleColorTab = () => {
        setActiveColorTab(prev => !prev);
    }
    const toggleCropTab = () => {
        setActiveCropTab(prev => !prev);
    }
    const toggleLightTab = () => {
        setActiveLightTab(prev => !prev);
    }

    return (
        <>
        <div>Controls</div>

        <div>
        <button
        onClick={toggleCropTab}> Crop and Rotate</button>
        {activeCropTab && <CropAndRotate /> }
        </div>
        <div>
        <button
        onClick={toggleColorTab}> Color Adjustments</button>
        {activeColorTab && <ColorAdjustment /> }
        </div>
        <div>
        <button
        onClick={toggleLightTab}> Light Adjustments</button>
        {activeLightTab && <LightAdjustment /> }
        </div>
        </>


    )
}

export default ControlContainer;