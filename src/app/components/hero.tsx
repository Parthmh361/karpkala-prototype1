"use client"
import React, {useState} from "react";

const Hero = () => {

    const [slideIndex, setSlideIndex] = useState(0);

    // Slide through the indicators
    const nextSlide = () => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % 4);
    };

    return (
      <div>
        {/* Hero Section */}
        <div className="w-full h-[250px] bg-gradient-to-r from-[#318CE7] to-[#3A8DFF] text-white rounded-xl flex items-center justify-center mt-8">
          <h2 className="text-3xl font-bold">Karp Kala</h2>
        </div>

        {/* Progress Indicator (Slideshow) */}
        <div
          className="w-full flex justify-center space-x-2 mt-6 cursor-pointer"
          onClick={nextSlide}
        >
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className={`w-10 h-2 ${
                slideIndex === idx ? "bg-[#318CE7]" : "bg-[#d3d3d3]"
              } rounded-md`}
            />
          ))}
        </div>
      </div>
    );
}

export default Hero