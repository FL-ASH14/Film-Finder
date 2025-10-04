// src/components/MovieCarousel.jsx
import React, { useEffect, useState } from "react";

const MovieCarousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imageFiles = [
      "inception.jpg",
      "land.jpg",
      "Matrix.jpg",
      "titanic.jpg",
      "forest.jpg",
    ];

    const imgPaths = imageFiles.map((img) => `/images/${img}`);
    setImages(imgPaths);
  }, []);

  const loopedImages = [...images, ...images];

  return (
    <>
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      <div className="relative w-full overflow-hidden">
        {/*
          MODIFIED: Replaced 'animate-reverse' with 'animate-alternate'.
          This makes the animation play forwards, then backwards, creating a smooth
          back-and-forth "ping-pong" effect.
        */}
        <div 
          className="flex flex-nowrap space-x-4 will-change-transform animate-[scroll_24s_linear_infinite] animate-alternate"
        >
          {loopedImages.map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieCarousel;