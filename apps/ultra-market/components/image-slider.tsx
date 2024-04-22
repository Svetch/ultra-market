'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface ImageSliderProps {
    images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="flex flex-col items-center">
            <Image src={images[currentIndex]} width={300} height={300} alt={`Slide ${currentIndex}`} className="h-[225px] sm:h-[475px] w-auto mt-[30px] rounded-md shadow-md" />
            <div className="flex mt-4">
                <button
                    onClick={goToPrevious}
                    className="bg-blue-500 hover:bg-slate-800 transition duration-300 text-white min-w-40 p-2 rounded-md mr-2"
                >
                    ◄
                </button>
                <button
                    onClick={goToNext}
                    className="bg-blue-500 hover:bg-slate-800 transition duration-300 text-white min-w-40 p-2 rounded-md"
                >
                    ►
                </button>
            </div>
        </div>
    );
};

export default ImageSlider;
