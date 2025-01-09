import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Banner = () => {
  const { currentTheme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerSlides = [
    {
      image: "https://t4.ftcdn.net/jpg/08/45/58/95/360_F_845589510_QmbsMXwCXhQG2jrEHLrhIzQqdo1EeFe3.jpg",
      title: "Luxury Fragrances",
      description: "Up to 40% Off on Premium Perfumes",
      buttonText: "Shop Now"
    },
    {
      image: "https://aromaperfume.lk/wp-content/uploads/web-banner-1-1.jpg",
      title: "New Arrivals",
      description: "Discover Latest Collections",
      buttonText: "Explore"
    },
    {
      image: "https://t4.ftcdn.net/jpg/06/20/96/41/360_F_620964103_8RJ2kCZzhHOsBVesNHhVurby1h5Uz0lm.jpg",
      title: "Exclusive Perfumes",
      description: "Limited Edition Fragrances",
      buttonText: "View More"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full bg-gray-50">
      {/* Main Banner */}
      <div className="relative h-[150px] sm:h-[250px] md:h-[350px] overflow-hidden">
        {/* Slides Container */}
        <div 
          className="flex transition-transform duration-500 h-full w-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerSlides.map((slide, index) => (
            <div 
              key={index} 
              className="min-w-full h-full relative flex-shrink-0"
            >
              <div className="w-full h-full relative overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center absolute inset-0"
                  loading="lazy"
                />
                {/* Modern gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent">
                  <div className="flex flex-col justify-center h-full max-w-lg px-6 md:px-16">
                    {/* Accent line */}
                    <div className="hidden md:flex items-center gap-3 mb-6">
                      <div className="w-12 h-[3px] bg-white rounded-full"></div>
                      <div className="w-3 h-[3px] bg-white/70 rounded-full"></div>
                    </div>
                    
                    <h2 className="text-lg sm:text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-sm sm:text-xl md:text-2xl text-white/90 mb-3 md:mb-6">
                      {slide.description}
                    </p>
                    <button className="w-fit px-4 py-1.5 sm:px-6 sm:py-2 md:px-8 md:py-3 
                      bg-white text-black text-sm sm:text-base md:text-lg font-medium 
                      rounded-full hover:bg-white/90 transition-all duration-300 
                      hover:translate-y-[-2px]">
                      {slide.buttonText}
                      <span className="ml-2 inline-block transform transition-transform duration-300">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modern Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'w-8 bg-white' 
                  : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner; 