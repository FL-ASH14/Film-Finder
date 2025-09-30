// src/App.jsx
import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import MovieCarousel from "./components/MovieCarousel";
import MovieGrid from "./components/MovieGrid";
import SceneResults from "./components/SceneResults";
import ShoppingCart from "./components/ShoppingCart";
import FeaturePage from "./pages/FeaturePage";
import AuthModal from "./components/AuthModal"; // Import for Authentication

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null); // e.g., "clothing", "furniture", or "places"
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedScene, setSelectedScene] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  
  // State for Authentication
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Stores { id, username }

  // 1. Load Movies on Mount
  useEffect(() => {
    fetch("http://localhost:4000/api/movies")
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Failed to load movies:", err));
  }, []);

  // Utility function to go back to the home screen
  const goHome = () => {
    setSelectedFeature(null);
    setSelectedMovie(null);
    setSelectedScene(null);
  };

  const openCart = () => setCartOpen(true);

  // --- Cart Persistence and Auth Logic ---

  // Load Cart on User Login (using useCallback for stability)
  const loadSavedCart = useCallback(async (userId) => {
    try {
      const res = await fetch(`http://localhost:4000/api/cart/${userId}`);
      if (!res.ok) throw new Error("Failed to load cart.");
      const data = await res.json();
      // Ensure data.savedCart is an array before setting state
      setCartItems(Array.isArray(data.savedCart) ? data.savedCart : []);
    } catch (err) {
      console.error("Error loading cart:", err.message);
      setCartItems([]);
    }
  }, []);

  // Save Cart on User Sign Out (using useCallback for stability)
  const saveCart = useCallback(async (userId, currentCart) => {
    if (!userId) return;
    try {
      await fetch(`http://localhost:4000/api/cart/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: currentCart }),
      });
      console.log("Cart saved successfully for user:", userId);
    } catch (err) {
      console.error("Failed to save cart:", err);
    }
  }, []);

  // Handler for successful sign-in/sign-up
  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    loadSavedCart(user.id);
  };

  // Handler for sign out
  const handleSignOut = () => {
    // 1. Save the current cart state before clearing the user
    saveCart(currentUser.id, cartItems); 
    // 2. Clear user state and cart state locally
    setCurrentUser(null);
    setCartItems([]);
    goHome();
  };
  
  // Handler for adding an item to the cart
  const addItemToCart = (item) => {
    setCartItems(prev => [...prev, item]);
  };
  
  // --- Filtering and Navigation ---

  // Filter movies by search query (used on Home/Feature pages)
  let filteredMovies = movies.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate the items to display in the selected scene view
  // CRITICAL: Filters items based on selectedFeature, if active
  const itemsToDisplay = selectedScene 
    ? selectedFeature 
      ? selectedScene.items.filter(item => item.type === selectedFeature) 
      : selectedScene.items 
    : [];

  // Determine the title of the item page based on feature selection
  const itemPageTitle = selectedFeature 
    ? `${selectedFeature.charAt(0).toUpperCase() + selectedFeature.slice(1)} Items from: ${selectedScene?.title}` 
    : `Items from: ${selectedScene?.title}`;


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
        currentUser={currentUser} 
        openAuthModal={() => setAuthModalOpen(true)} 
        handleSignOut={handleSignOut}
      />

      {/* View 1: Feature Filter Page */}
      {selectedFeature && !selectedMovie && !selectedScene && (
        <FeaturePage
          feature={selectedFeature}
          movies={filteredMovies}
          onSelectMovie={setSelectedMovie}
          onBackToHome={goHome} // <-- Passes the function to navigate back to home
        />
      )}

      {/* View 2: Home Page (Default) */}
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

      {/* View 3: Scene Results Page (Back button included in SceneResults.jsx) */}
      {selectedMovie && !selectedScene && (
        <SceneResults
          movie={selectedMovie}
          onSelectScene={setSelectedScene}
          onBack={() => setSelectedMovie(null)}
          selectedFeature={selectedFeature} // <--- NEW: Pass the active feature filter to SceneResults
        />
      )}

      {/* View 4: Scene Item Detail Page (Filters items and shows back button) */}
      {selectedScene && (
        <div className="p-8 pt-28">
            
          {/* Back Button for Item View */}
          <button
            onClick={() => setSelectedScene(null)} // Navigates back to SceneResults
            className="mb-6 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            ← Back to Scenes
          </button>
            
          <h2
            className="text-3xl font-bold text-purple-200 mb-6"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {itemPageTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Renders the filtered itemsToDisplay array */}
            {itemsToDisplay.map((item, idx) => (
              <div 
                key={idx} 
                className="p-4 bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition flex flex-col items-center text-center"
              >
                
                {/* 1. Item Image (using itemThumbnail) */}
                {item.itemThumbnail && (
                    <img 
                        src={item.itemThumbnail} 
                        alt={item.name} 
                        className="w-full h-40 object-cover rounded-xl mb-4 border-2 border-purple-400"
                        onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }} 
                    />
                )}

                {/* 2. Name and Description */}
                <h3 className="font-semibold text-xl text-purple-300">{item.name}</h3>
                {item.description && <p className="text-gray-400 text-sm mt-1">{item.description}</p>}

                {/* 3. Details (Timestamp) */}
                {item.timestamp && (
                    <p className="text-yellow-400 text-xs mt-2">
                        Appears at: {item.timestamp}
                    </p>
                )}

                {/* 4. Links and Save Button */}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {item.buyLink && (
                        <a 
                            href={item.buyLink} 
                            target="_blank" 
                            className="px-3 py-1 bg-pink-500 text-white rounded-full hover:bg-pink-600 text-sm transition"
                        >
                            Buy Link
                        </a>
                    )}
                    {item.mapLink && (
                        <a 
                            href={item.mapLink} 
                            target="_blank" 
                            className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 text-sm transition"
                        >
                            Map Link
                        </a>
                    )}
                </div>

                {/* Save Button */}
                <button 
                  onClick={() => addItemToCart(item)} 
                  className="mt-4 px-4 py-2 bg-yellow-400 rounded-full hover:bg-yellow-500 text-gray-900 font-bold transition"
                >
                    Save
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals and Sidebars */}
      <ShoppingCart open={cartOpen} setOpen={setCartOpen} cartItems={cartItems} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;
