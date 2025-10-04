// src/pages/ComingSoonPage.jsx
import React from "react";
import { FiCamera } from "react-icons/fi";

const ComingSoonPage = ({ onBackToHome }) => {
  return (
    <div className="pt-28 p-8 flex flex-col items-center justify-center text-center h-full">
      <FiCamera className="text-8xl text-purple-400 mb-6 animate-pulse" />
      <h1 
        className="text-6xl font-extrabold text-purple-300 mb-4" 
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        Coming Soon!
      </h1>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto">
        This feature will allow you to use your camera to scan a scene from a movie, and our AI will identify the film and tag objects you can shop for.
      </p>
      <button
        onClick={onBackToHome}
        className="mt-12 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold text-lg"
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default ComingSoonPage;