// src/components/SceneResults.jsx
import React from "react";

const SceneResults = ({ movie, onSelectScene, onBack }) => {
  return (
    <div className="p-8 pt-24">
      {/* Back button at the top of the page */}
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
      >
        ← Back to Movies
      </button>

      {/* Movie title */}
      <h1 className="text-4xl font-bold text-purple-700 mb-6">
        {movie.title} - Scenes
      </h1>

      {/* Scenes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {movie.scenes.map((scene) => (
          <div
            key={scene.sceneId}
            className="cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition"
            onClick={() => onSelectScene(scene)}
          >
            <img
              src={scene.thumbnail}
              alt={scene.title}
              className="rounded-t-2xl w-full h-64 object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/images/placeholder.jpg";
              }}
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-purple-700">{scene.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SceneResults;
