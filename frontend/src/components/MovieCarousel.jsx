// src/components/Carousel.jsx
import React, { useEffect, useRef, useState } from "react";

const Carousel = () => {
  const carouselRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // List all image filenames in your public/images folder
    const imageFiles = [
      "inception.jpg",
      "land.jpg",
      "Matrix.jpg",
      "titanic.jpg",
      // Add more filenames here
    ];

    // Prepend "/images/" to each filename
    const imgPaths = imageFiles.map((img) => `/images/${img}`);
    setImages(imgPaths);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollAmount = 0;

    const scrollStep = () => {
      if (!carousel) return;
      scrollAmount += 1; // pixels per frame
      if (scrollAmount >= carousel.scrollWidth / 2) {
        scrollAmount = 0; // reset for seamless loop
      }
      carousel.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    };

    const interval = setInterval(scrollStep, 30); // adjust speed
    return () => clearInterval(interval);
  }, [images]);

  // Duplicate images for seamless scrolling
  const loopedImages = [...images, ...images];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={carouselRef}
        className="flex space-x-4 overflow-x-auto scrollbar-none"
        style={{ scrollBehavior: "smooth" }}
      >
        {loopedImages.map((src, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-lg relative"
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
  );
};

export default Carousel;

