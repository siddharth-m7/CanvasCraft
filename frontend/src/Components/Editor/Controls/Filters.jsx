import React , { useState } from 'react';
import { Eraser } from 'lucide-react';

const Filters = () => {
    // Black & White, Retro, Food, Portrait
    const [ filter, setFilter ] = useState('none');

    const applyFilter = (filterType) => {
        setFilter(filterType);
        // Logic to apply filter to the image using fabric.js or any other library
    }   

    const resetFilter = () => {
        setFilter('none');
        // Logic to reset filter on the image
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='text-lg font-semibold'>Filters</div>
            <div className='grid grid-cols-2 gap-4'>
                <button 
                    className={`px-4 py-2 rounded ${filter === 'none' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => applyFilter('none')}>
                    None
                </button>
                <button 
                    className={`px-4 py-2 rounded ${filter === 'blackWhite' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => applyFilter('blackWhite')}>
                    Black & White
                </button>
                <button 
                    className={`px-4 py-2 rounded ${filter === 'retro' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => applyFilter('retro')}>
                    Retro
                </button>
                <button 
                    className={`px-4 py-2 rounded ${filter === 'food' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => applyFilter('food')}>
                    Food
                </button>
                <button 
                    className={`px-4 py-2 rounded ${filter === 'portrait' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => applyFilter('portrait')}>
                    Portrait
                </button>
            </div>
            <button 
                className='bg-green-500 text-white px-4 py-2 rounded mt-4'
                onClick={resetFilter}>
                Reset Filter
                <Eraser size={16} />
            </button>
        </div>
    );
}

export default Filters; 