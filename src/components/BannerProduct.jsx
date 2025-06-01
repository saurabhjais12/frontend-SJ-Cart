import React, { useEffect, useState } from 'react';
import image1 from '../assets/banner/img1.webp';
import image2 from '../assets/banner/img2.webp';
import image3 from '../assets/banner/img3.jpg';
import image4 from '../assets/banner/img4.jpg';
import image5 from '../assets/banner/img5.webp';

import image1Mobile from '../assets/banner/img1_mobile.jpg';
import image2Mobile from '../assets/banner/img2_mobile.webp';
import image3Mobile from '../assets/banner/img3_mobile.jpg';
import image4Mobile from '../assets/banner/img4_mobile.jpg';
import image5Mobile from '../assets/banner/img5_mobile.png';

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % desktopImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? desktopImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-56 md:h-72 w-full bg-slate-200 relative overflow-hidden">

        {/* Navigation Buttons (Desktop Only) */}
        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl">
            <button onClick={prevImage} className="bg-white shadow-md rounded-full p-1">
              <FaAngleLeft />
            </button>
            <button onClick={nextImage} className="bg-white shadow-md rounded-full p-1">
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Desktop Slider */}
        <div className="hidden md:flex h-full w-full">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            {desktopImages.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`slide-${index}`}
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Mobile Slider */}
        <div className="flex md:hidden h-full w-full">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            {mobileImages.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`mobile-slide-${index}`}
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
