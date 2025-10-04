// src/components/MovieGrid.jsx
import React from "react";

const MovieGrid = ({ movies, onSelect }) => {
  return (
    // MODIFIED: Added xl:grid-cols-5 for very large screens.
    // It already had breakpoints for small (sm), medium (md), and large (lg) screens.
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-8">
      {movies.map(movie => (
        <div
          key={movie.id} // Assuming movie.id is the unique key
          className="cursor-pointer rounded-2xl bg-white/10 backdrop-blur-md shadow-lg hover:shadow-purple-500/50 transition transform hover:-translate-y-2 hover:scale-105 p-4 border border-white/20"
          onClick={() => onSelect(movie)}
        >
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="rounded-xl w-full h-80 object-cover"
            onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }}
          />
          <h3
            className="mt-4 text-xl font-bold text-purple-300 text-center tracking-wide"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {movie.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;