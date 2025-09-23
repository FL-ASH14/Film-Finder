// src/App.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MovieCarousel from "./components/MovieCarousel";
import MovieGrid from "./components/MovieGrid";
import SceneResults from "./components/SceneResults";
import ShoppingCart from "./components/ShoppingCart";
import FeaturePage from "./pages/FeaturePage";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedScene, setSelectedScene] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/movies")
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Failed to load movies:", err));
  }, []);

  const filteredMovies = movies.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goHome = () => {
    setSelectedFeature(null);
    setSelectedMovie(null);
    setSelectedScene(null);
  };

  const openCart = () => setCartOpen(true);

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundImage: "linear-gradient(135deg, #1e3c72, #2a5298, #000000)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed"
      }}
    >
      <Navbar
        setSelectedFeature={setSelectedFeature}
        cartItems={cartItems}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        goHome={goHome}
        openCart={openCart}
      />

      {selectedFeature && !selectedMovie && !selectedScene && (
        <FeaturePage
          feature={selectedFeature}
          movies={filteredMovies}
          onSelectMovie={setSelectedMovie}
        />
      )}

      {!selectedFeature && !selectedMovie && !selectedScene && (
        <div className="pt-24 p-8 text-center">
          <h1
            className="text-6xl font-extrabold text-purple-300 mb-8 drop-shadow-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Welcome to Film Finder
          </h1>
          <MovieCarousel movies={filteredMovies} />
          <h2
            className="text-3xl font-bold text-pink-300 mt-12 mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Popular Movies
          </h2>
          <MovieGrid movies={filteredMovies} onSelect={setSelectedMovie} />
        </div>
      )}

      {selectedMovie && !selectedScene && (
        <SceneResults
          movie={selectedMovie}
          onSelectScene={setSelectedScene}
          onBack={() => setSelectedMovie(null)}
        />
      )}

      {selectedScene && (
        <div className="p-8 pt-28">
          <h2
            className="text-3xl font-bold text-purple-200 mb-6"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {selectedScene.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedScene.items.map((item, idx) => (
              <div key={idx} className="p-4 bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                {item.buyLink && <a href={item.buyLink} target="_blank" className="text-pink-400 hover:underline">Buy Link</a>}
                {item.mapLink && <a href={item.mapLink} target="_blank" className="text-pink-400 hover:underline ml-2">Map Link</a>}
                <button onClick={() => setCartItems(prev => [...prev, item])} className="mt-2 px-2 py-1 bg-yellow-400 rounded-full hover:bg-yellow-500">Save</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <ShoppingCart open={cartOpen} setOpen={setCartOpen} cartItems={cartItems} />
    </div>
  );
}

export default App;
