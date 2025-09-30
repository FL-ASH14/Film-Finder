// src/components/SceneResults.jsx
import React, { useMemo } from "react";

const SceneResults = ({ movie, onSelectScene, onBack, selectedFeature }) => {
  
  // Use useMemo to filter scenes based on the selected feature
  const filteredScenes = useMemo(() => {
    if (!selectedFeature) {
      // If no feature is selected (e.g., coming from the home page), show all scenes
      return movie.scenes;
    }

    // Filter scenes: keep only scenes that have at least one item
    // whose type matches the selectedFeature (e.g., "clothing")
    return movie.scenes.filter(scene => 
      scene.items.some(item => item.type === selectedFeature)
    );
  }, [movie.scenes, selectedFeature]);

  const featureTitle = selectedFeature 
    ? selectedFeature.charAt(0).toUpperCase() + selectedFeature.slice(1) 
    : "Scenes";

  return (
    <div className="p-8 pt-24">
      {/* Back button at the top of the page */}
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition font-semibold"
      >
        ← Back to Movies
      </button>

      {/* Movie title */}
      <h1 className="text-4xl font-bold text-purple-300 mb-6">
        {movie.title} - {featureTitle}
      </h1>

      {/* Scenes grid */}
      {filteredScenes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredScenes.map((scene) => (
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
      ) : (
        <p className="text-xl text-gray-400 mt-8">
          No scenes found in this movie that contain {selectedFeature}.
        </p>
      )}
    </div>
  );
};

export default SceneResults;
