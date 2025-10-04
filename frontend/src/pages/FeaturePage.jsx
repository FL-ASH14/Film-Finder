// src/pages/FeaturePage.jsx
import React, { useMemo } from "react";
import MovieGrid from "../components/MovieGrid";
import { FiStar, FiClock, FiTrendingUp } from "react-icons/fi"; // Icons for creative sort

const AlphabetBar = ({ selectedLetter, setSelectedLetter }) => {
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  return (
    <div className="flex justify-center flex-wrap gap-1 md:gap-2 mt-4 mb-8">
      {/* Clear Filter Button */}
      <button
        onClick={() => setSelectedLetter(null)}
        className={`px-3 py-1 text-sm rounded-lg transition ${
          !selectedLetter
            ? 'bg-pink-500 text-white shadow-md'
            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
        }`}
      >
        ALL
      </button>
      
      {alphabet.map(letter => (
        <button
          key={letter}
          onClick={() => setSelectedLetter(letter)}
          className={`px-3 py-1 text-sm font-semibold rounded-lg transition ${
            selectedLetter === letter
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-gray-800 text-purple-300 hover:bg-gray-700'
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};


const FeaturePage = ({ 
    feature, 
    movies, 
    onSelectMovie, 
    onBackToHome,
    selectedLetter, 
    setSelectedLetter,
    selectedSort,
    setSelectedSort,
}) => {
  
  const featureTitle = feature.charAt(0).toUpperCase() + feature.slice(1);

  // --- Filtering & Sorting Logic ---
  const sortedAndFilteredMovies = useMemo(() => {
    if (!feature || !movies) return [];

    let result = movies.filter(movie => 
      movie.scenes.some(scene => 
        scene.items.some(item => item.type === feature)
      )
    );

    // 1. Apply Alphabetical Filter
    if (selectedLetter) {
      result = result.filter(movie => movie.title.toUpperCase().startsWith(selectedLetter));
    }
    
    // 2. Apply Custom Sorting (Simulated)
    switch (selectedSort) {
      case 'rating':
        // Sort by simulated rating (highest first)
        result.sort((a, b) => (b.rating || 5) - (a.rating || 5)); 
        break;
      case 'year':
        // Sort by year (newest first)
        result.sort((a, b) => (b.year || 2025) - (a.year || 2025));
        break;
      case 'trending':
        // Sort by a simulated "trending" property (random for now)
        result.sort(() => Math.random() - 0.5); 
        break;
      // Default uses API/natural order
    }


    return result;
  }, [feature, movies, selectedLetter, selectedSort]);
  // --- End Filtering & Sorting Logic ---


  // --- Creative Tabs Data ---
  const creativeSorts = [
      { key: 'rating', label: 'Top Rated', icon: FiStar, color: 'text-yellow-400' },
      { key: 'year', label: 'Newest', icon: FiClock, color: 'text-indigo-400' },
      { key: 'trending', label: 'Trending', icon: FiTrendingUp, color: 'text-pink-400' },
  ];

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
      <h1 className="text-4xl font-extrabold text-purple-300 mb-4 drop-shadow-md">
        Movies Featuring {featureTitle}
      </h1>
      
      {/* 1. Creative Sorting Tabs (Visual Appeal) */}
      <div className="flex justify-center gap-4 flex-wrap mb-6">
        {creativeSorts.map(sort => (
            <button
                key={sort.key}
                onClick={() => setSelectedSort(sort.key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition transform hover:scale-105 border-2 ${
                    selectedSort === sort.key
                        ? 'bg-purple-700/50 border-pink-400 shadow-lg'
                        : 'bg-gray-800/50 border-gray-600 hover:border-pink-500/50'
                } ${sort.color}`}
            >
                <sort.icon className="text-xl" />
                <span>{sort.label}</span>
            </button>
        ))}
      </div>


      {/* 2. Alphabetical Filter Bar */}
      <AlphabetBar 
        selectedLetter={selectedLetter} 
        setSelectedLetter={setSelectedLetter} 
      />


      {sortedAndFilteredMovies.length > 0 ? (
        <MovieGrid movies={sortedAndFilteredMovies} onSelect={onSelectMovie} />
      ) : (
        <p className="text-gray-400 text-xl mt-12">
          No movies found that feature {featureTitle} under the current filter/sort settings.
        </p>
      )}
    </div>
  );
};

export default FeaturePage;
