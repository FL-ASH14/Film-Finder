// src/pages/FeaturePage.jsx
import React, { useMemo } from "react";
import MovieGrid from "../components/MovieGrid";

const FeaturePage = ({ feature, movies, onSelectMovie, onBackToHome }) => {
  // Capitalize first letter for display (e.g., "clothing" -> "Clothing")
  const featureTitle = feature.charAt(0).toUpperCase() + feature.slice(1);

  // --- Core Filtering Logic ---
  const filteredMoviesByFeature = useMemo(() => {
    if (!feature || !movies) return [];

    // The filter checks if AT LEAST ONE scene in the movie contains an item
    // whose 'type' matches the selected 'feature'.
    return movies.filter(movie => 
      movie.scenes.some(scene => 
        scene.items.some(item => item.type === feature)
      )
    );
  }, [feature, movies]);
  // --- End Filtering Logic ---

  return (
    <div className="pt-28 p-8">
      
      {/* Back Button to go back to the Home/main movie grid */}
      <button
        onClick={onBackToHome}
        className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
      >
        ← Back to Home
      </button>

      {/* Heading for the selected feature */}
      <h1 className="text-4xl font-extrabold text-purple-300 mb-8 drop-shadow-md">
        Movies Featuring {featureTitle}
      </h1>

      {filteredMoviesByFeature.length > 0 ? (
        <MovieGrid movies={filteredMoviesByFeature} onSelect={onSelectMovie} />
      ) : (
        <p className="text-gray-400 text-xl mt-12">
          No movies found that feature {featureTitle}.
        </p>
      )}
    </div>
  );
};

export default FeaturePage;
