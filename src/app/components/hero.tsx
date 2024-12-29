"use client";
import React, { useState, useEffect } from "react";

const Hero = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  // Automatically change slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [slideIndex]);

  // Change to the next slide
  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % 4);
  };

  // Manually change slides
  const goToSlide = (index: number) => {
    setSlideIndex(index);
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="w-full h-[300px] sm:h-[250px] md:h-[300px] lg:h-[350px] text-white rounded-xl flex flex-col items-center justify-center mt-8 transition-all duration-500 ease-in-out relative overflow-hidden px-4 text-center"
        style={{
          background: `linear-gradient(135deg, #A2F5AC, #3A8DFF, #318CE7, #FFFFFF)`, // Blue and Green swapped
          animation: "gradientAnimation 6s ease infinite",
        }}
      >
        {/* Applying a blur effect */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-indigo-700 opacity-50 backdrop-blur-md"
          style={{ zIndex: -1 }}
        />

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold z-10">
          {[  
            "Welcome to KARP KALA",
            "Explore Creativity",
            "Innovation at Its Best",
            "Join Our Journey",
          ][slideIndex]}
        </h2>
      </div>

      {/* Progress Indicator (Slideshow) */}
      <div className="w-full flex justify-center space-x-2 mt-6 cursor-pointer">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-6 h-2 sm:w-8 md:w-10 transition-all duration-300 ${
              slideIndex === idx ? "bg-[#318CE7]" : "bg-[#d3d3d3]"
            } rounded-md`}
          />
        ))}
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
