// src/pages/FeaturePage.jsx
import React from "react";
import MovieGrid from "../components/MovieGrid";

const FeaturePage = ({ feature, movies, onSelectMovie }) => {
  // Capitalize first letter for display
  const featureTitle = feature.charAt(0).toUpperCase() + feature.slice(1);

  return (
    <div className="pt-28 p-8">
      {/* Heading for the selected feature */}
      <h1 className="text-4xl font-bold text-purple-700 mb-6">{featureTitle}</h1>

      {/* Back button (optional, can reuse from SceneResults if needed) */}
      {/* <button onClick={() => setSelectedFeature(null)} className="mb-4 px-4 py-2 bg-purple-500 text-white rounded-full">Back</button> */}

      {movies.length > 0 ? (
        <MovieGrid movies={movies} onSelect={onSelectMovie} />
      ) : (
        <p className="text-gray-500 text-lg">No movies found for {featureTitle}.</p>
      )}
    </div>
  );
};

export default FeaturePage;
