import React from 'react';
import { useState } from 'react';
import { ChevronDown, ChevronRight, Settings } from 'lucide-react';
import ColorAdjustment from './controls/ColorAdjustment';
import LightAdjustment from './controls/LightAdjustment';
import DetailsAdjustment from './controls/DetailsAdjustment';
import Filters from './controls/Filters';

const ControlContainer = () => {
    const [activeColorTab, setActiveColorTab] = useState(false);
    const [activeLightTab, setActiveLightTab] = useState(false);
    const [activeDetailsTab, setActiveDetailsTab] = useState(false);
    const [activeFilterTab, setActiveFilterTab] = useState(false);

    const toggleColorTab = () => {
        setActiveColorTab(prev => !prev);
        setActiveLightTab(false);
        setActiveDetailsTab(false);
        setActiveFilterTab(false);
    }
    const toggleLightTab = () => {
        setActiveLightTab(prev => !prev);
        setActiveColorTab(false);
        setActiveDetailsTab(false);
        setActiveFilterTab(false);
    }
    const toggleDetailsTab = () => {
        setActiveDetailsTab(prev => !prev);
        setActiveColorTab(false);       
        setActiveLightTab(false);
        setActiveFilterTab(false);
    }
    const toggleFilterTab = () => {
        setActiveFilterTab(prev => !prev);
        setActiveColorTab(false);      
        setActiveLightTab(false);
        setActiveDetailsTab(false);
    }

    const controlTabs = [
        {
            label: 'Color Adjustments',
            isActive: activeColorTab,
            toggle: toggleColorTab,
            component: <ColorAdjustment />
        },
        {
            label: 'Light Adjustments',
            isActive: activeLightTab,
            toggle: toggleLightTab,
            component: <LightAdjustment />
        },
        {
            label: 'Details Adjustments',
            isActive: activeDetailsTab,
            toggle: toggleDetailsTab,
            component: <DetailsAdjustment />
        },
        {
            label: 'Filters',
            isActive: activeFilterTab,
            toggle: toggleFilterTab,
            component: <Filters />
        }
    ];

    return (
        <div className='bg-white border border-gray-200 rounded-lg shadow-sm m-4 w-96 h-fit overflow-hidden'>
            {/* Header */}
            <div className='bg-white border-b border-gray-200 p-4'>
                <h2 className='text-lg font-semibold text-black flex items-center gap-2'>
                    <Settings size={20} className="text-green-600" />
                    Controls
                </h2>
            </div>

            {/* Control Tabs */}
            <div className='bg-white'>
                {controlTabs.map((tab, index) => (
                    <div key={index} className={`border-b border-gray-100 ${index === controlTabs.length - 1 ? 'border-b-0' : ''}`}>
                        <button
                            className={`
                                w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200 ease-in-out
                                flex items-center justify-between hover:bg-green-50
                                ${tab.isActive 
                                    ? 'bg-green-50 text-green-700 border-r-2 border-green-600' 
                                    : 'text-black hover:text-green-700'
                                }
                            `}
                            onClick={tab.toggle}
                        >
                            <span>{tab.label}</span>
                            {tab.isActive ? (
                                <ChevronDown size={16} className="text-green-600" />
                            ) : (
                                <ChevronRight size={16} className="text-gray-400" />
                            )}
                        </button>
                        
                        {/* Animated Panel */}
                        <div 
                            className={`
                                overflow-hidden transition-all duration-300 ease-in-out bg-gray-50
                                ${tab.isActive ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
                            `}
                        >
                            <div className='p-3'>
                                {tab.component}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ControlContainer;
