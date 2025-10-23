// src/App.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import MovieCarousel from "./components/MovieCarousel";
import MovieGrid from "./components/MovieGrid";
import SceneResults from "./components/SceneResults";
import FeaturePage from "./pages/FeaturePage";
import AuthModal from "./components/AuthModal";
import TrendingItems from "./components/TrendingItems";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";
import Notification from "./components/Notifications";
import ComingSoonPage from "./pages/ComingSoonPage";
import Pagination from "./components/Pagination";
import MusicPlayer from "./components/MusicPlayer";

// SVGs
const FiStar = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);
const FiMessageSquare = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const useTrendingItemsLogic = () => {
  return useCallback((moviesData) => {
    const trending = { clothing: [], furniture: [], places: [] };
    const itemTypes = ['clothing', 'furniture', 'places'];
    for (let i = 0; i < Math.min(moviesData.length, 4); i++) {
      const movie = moviesData[i];
      for (const scene of movie.scenes) {
        for (const type of itemTypes) {
          const item = scene.items.find(it => it.type === type);
          if (item && trending[type].length < 4) {
            const trendingItem = { ...item, movieTitle: movie.title };
            if (!trending[type].find(ti => ti.itemThumbnail === trendingItem.itemThumbnail)) {
              trending[type].push(trendingItem);
            }
          }
        }
      }
    }
    return {
      clothing: trending.clothing.slice(0, 4),
      furniture: trending.furniture.slice(0, 4),
      places: trending.places.slice(0, 4),
    };
  }, []);
};

function App() {
  const [movies, setMovies] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedScene, setSelectedScene] = useState(null);
  const [isCartPageVisible, setIsCartPageVisible] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedSort, setSelectedSort] = useState('rating');
  const [trendingItems, setTrendingItems] = useState({ clothing: [], furniture: [], places: [] });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isComingSoonVisible, setIsComingSoonVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  // Music Player State
  const [isMusicGloballyEnabled, setIsMusicGloballyEnabled] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  const communityPosts = [
    { id: 1, user: "NeoFan123", comment: "Just bought the red pill jacket! Amazing quality.", stars: 5 },
    { id: 2, user: "MiaLover", comment: "The La La Land dress is sold out everywhere!", stars: 4 },
  ];
  const calculateTrendingItems = useTrendingItemsLogic();

  useEffect(() => {
    const isHomepage = !selectedMovie && !selectedScene && !selectedFeature && !isCartPageVisible && !isComingSoonVisible;
    if (isHomepage) {
      setTimeout(() => window.scrollTo(0, scrollPosition), 0);
    }
  }, [selectedMovie, selectedScene, selectedFeature, isCartPageVisible, isComingSoonVisible, scrollPosition]);

  // Music Control Effects
  useEffect(() => {
    if (selectedMovie && selectedMovie.themeMusic && isMusicGloballyEnabled) {
      if (currentTrack?.url !== selectedMovie.themeMusic.url) {
        setCurrentTrack(selectedMovie.themeMusic);
      }
      setIsPlaying(true);
    } else {
      setCurrentTrack(null);
      setIsPlaying(false);
    }
  }, [selectedMovie, isMusicGloballyEnabled]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && currentTrack) {
        audioRef.current.play().catch(error => console.log("Playback was prevented by the browser.", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Music Handler Functions
  const handlePlayPause = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleClosePlayer = () => {
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  const handleToggleGlobalMusic = () => {
    const newIsEnabled = !isMusicGloballyEnabled;
    setIsMusicGloballyEnabled(newIsEnabled);
    if (!newIsEnabled) {
      handleClosePlayer();
    }
  };

  // General App Functions
  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  const goHome = () => {
    setCurrentPage(1);
    setSelectedFeature(null);
    setSelectedMovie(null);
    setSelectedScene(null);
    setSelectedLetter(null);
    setSelectedSort('rating');
    setIsCartPageVisible(false);
    setMenuOpen(false);
    setIsComingSoonVisible(false);
  };

  const addItemToCart = (item) => {
    const isAlreadyInCart = cartItems.some(
      cartItem => cartItem.name === item.name && cartItem.description === item.description
    );
    if (isAlreadyInCart) {
      showNotification(`"${item.name}" is already in your cart.`);
    } else {
      setCartItems(prev => [...prev, item]);
      showNotification(`"${item.name}" added to cart!`);
    }
  };

  const removeItemFromCart = (itemIndex) => {
    const itemName = cartItems[itemIndex]?.name || 'Item';
    setCartItems(prev => prev.filter((_, index) => index !== itemIndex));
    showNotification(`"${itemName}" removed from cart.`);
  };

  // Auth & Data Persistence
  const loadSavedCart = useCallback(async (userId) => {
    try {
      const res = await fetch(`http://localhost:4000/api/cart/${userId}`);
      if (!res.ok) throw new Error("Failed to load cart.");
      const data = await res.json();
      setCartItems(Array.isArray(data.savedCart) ? data.savedCart : []);
    } catch (err) {
      console.error("Error loading cart:", err.message);
      setCartItems([]);
    }
  }, []);

  const saveCart = useCallback(async (userId, currentCart) => {
    if (!userId) return;
    try {
      await fetch(`http://localhost:4000/api/cart/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: currentCart }),
      });
    } catch (err) {
      console.error("Failed to save cart:", err);
    }
  }, []);

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    loadSavedCart(user.id);
    setAuthModalOpen(false);
  };

  const handleSignOut = () => {
    saveCart(currentUser.id, cartItems);
    setCurrentUser(null);
    setCartItems([]);
    goHome();
  };
  
  // Navigation Handlers
  const handleMovieSelectFromSearch = (movie) => {
    setScrollPosition(window.scrollY);
    setSelectedMovie(movie);
    setSelectedScene(null);
    setSelectedFeature(null);
    setSearchQuery("");
    setIsCartPageVisible(false);
    setMenuOpen(false);
  };

  const handleFeatureSelect = (feature) => {
    setScrollPosition(window.scrollY);
    setSelectedFeature(feature);
    setSelectedMovie(null);
    setSelectedScene(null);
    setIsCartPageVisible(false);
    setMenuOpen(false);
  };

  const handleSelectMovie = (movie) => {
    setScrollPosition(window.scrollY);
    setSelectedMovie(movie);
    setMenuOpen(false);
  };
  
  const handleOpenCart = () => {
    setScrollPosition(window.scrollY);
    handleClosePlayer();
    setIsCartPageVisible(true);
  };

  const handleSelectScene = (scene) => {
    setSelectedScene(scene);
    setMenuOpen(false);
  };

  const handleBackToMovies = () => {
    setSelectedMovie(null);
    setMenuOpen(false);
  };

  const handleBackToScenes = () => {
    setSelectedScene(null);
    setMenuOpen(false);
  };

  const handleOpenCameraPage = () => {
    setScrollPosition(window.scrollY);
    setIsComingSoonVisible(true);
    setMenuOpen(false);
  };

  // Initial Data Fetch
  useEffect(() => {
    fetch("http://localhost:4000/api/movies")
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setTrendingItems(calculateTrendingItems(data));
      })
      .catch(err => console.error("Failed to load movies:", err));
  }, [calculateTrendingItems]);

  // Filtering & Pagination Logic
  const filteredMovies = movies.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const itemsToDisplay = selectedScene ? selectedFeature ? selectedScene.items.filter(item => item.type === selectedFeature) : selectedScene.items : [];
  const itemPageTitle = selectedFeature ? `${selectedFeature.charAt(0).toUpperCase() + selectedFeature.slice(1)} Items from: ${selectedScene?.title}` : `Items from: ${selectedScene?.title}`;

  return (
    <div className="min-h-screen text-white relative z-20 flex flex-col" style={{'--bg-color-start': '#051025', '--bg-color-mid': '#102A5A', '--bg-color-end': '#000000',}}>
      <style>{`@keyframes twinkle { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.6); } } .min-h-screen::after { content: ""; position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: radial-gradient(1.5px 1.5px at 20px 30px, #FFFFFF, rgba(255, 255, 255, 0)), radial-gradient(2px 2px at 100px 70px, #E0FFFF, rgba(255, 255, 255, 0)), radial-gradient(1px 1px at 50px 150px, #FFFFFF, rgba(255, 255, 255, 0)), radial-gradient(2.5px 2.5px at 90px 200px, #FFFFF0, rgba(255, 255, 255, 0)), radial-gradient(1.5px 1.5px at 180px 180px, #E0FFFF, rgba(255, 255, 255, 0)), radial-gradient(1px 1px at 300px 50px, #FFFFFF, rgba(255, 255, 255, 0)), radial-gradient(2px 2px at 450px 100px, #E0FFFF, rgba(255, 255, 255, 0)), radial-gradient(1.5px 1.5px at 600px 30px, #FFFFFF, rgba(255, 255, 255, 0)), radial-gradient(2.5px 2.5px at 750px 150px, #FFFFF0, rgba(255, 255, 255, 0)), radial-gradient(1px 1px at 850px 220px, #E0FFFF, rgba(255, 255, 255, 0)), radial-gradient(2px 2px at 950px 80px, #FFFFFF, rgba(255, 255, 255, 0)), radial-gradient(1.5px 1.5px at 1100px 120px, #E0FFFF, rgba(255, 255, 255, 0)); background-repeat: repeat; background-size: 1200px 1200px; opacity: 0.8; animation: twinkle 5s infinite alternate; z-index: -5; pointer-events: none; } .min-h-screen::before { content: ""; position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: linear-gradient(135deg, var(--bg-color-start), var(--bg-color-mid), var(--bg-color-end)); z-index: -10; pointer-events: none; }`}</style>
      
      <AnimatePresence>
        {currentTrack && (
          <MusicPlayer 
            key="music-player"
            track={currentTrack}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            volume={volume}
            onVolumeChange={handleVolumeChange}
            onClose={handleClosePlayer}
          />
        )}
      </AnimatePresence>
      
      <audio 
        ref={audioRef} 
        src={currentTrack?.url} 
        loop
        onEnded={() => setIsPlaying(false)}
      />

      <Notification message={notification.message} show={notification.show} />

      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onSelectFeature={handleFeatureSelect}
        cartItems={cartItems}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        goHome={goHome}
        onOpenCart={handleOpenCart}
        onOpenCameraPage={handleOpenCameraPage}
        currentUser={currentUser}
        openAuthModal={() => setAuthModalOpen(true)}
        handleSignOut={handleSignOut}
        movies={filteredMovies}
        onSelectMovieFromSearch={handleMovieSelectFromSearch}
        isMusicEnabled={isMusicGloballyEnabled}
        onToggleMusic={handleToggleGlobalMusic}
      />
      
      <main className="flex-grow pt-24">
        {isCartPageVisible ? (
          <CartPage 
            cartItems={cartItems} 
            onBack={() => setIsCartPageVisible(false)} 
            onRemoveItem={removeItemFromCart} 
            onCloseMusic={handleClosePlayer}
          />
        ) : isComingSoonVisible ? (
          <ComingSoonPage onBackToHome={goHome} />
        ) : (
          <>
            {selectedFeature && !selectedMovie && !selectedScene && (
              <FeaturePage feature={selectedFeature} movies={filteredMovies} onSelectMovie={handleSelectMovie} onBackToHome={goHome} selectedLetter={selectedLetter} setSelectedLetter={setSelectedLetter} selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
            )}
            {!selectedFeature && !selectedMovie && !selectedScene && (
              <div className="p-8 text-center relative z-10">
                <h1 className="text-6xl font-extrabold text-purple-300 mb-8 drop-shadow-lg" style={{ fontFamily: "'Poppins', sans-serif", textShadow: '0 0 10px rgba(100, 100, 255, 0.6)' }}>Welcome to Film Finder</h1>
                <MovieCarousel movies={filteredMovies} />
                <h2 className="text-3xl font-bold text-pink-300 mt-12 mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>Popular Movies</h2>
                <div>
                  <MovieGrid movies={currentMovies} onSelect={handleSelectMovie} />
                </div>

                <Pagination
                  moviesPerPage={moviesPerPage}
                  totalMovies={filteredMovies.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />

                <TrendingItems items={trendingItems} onAddToCart={addItemToCart} />
                <h2 className="text-4xl font-extrabold text-pink-300 mt-20 mb-8 drop-shadow-lg">Community Hub</h2>
                <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 mb-12">
                  {communityPosts.map((post) => (
                    <div key={post.id} className="text-left p-4 bg-gray-700/60 rounded-xl backdrop-blur-sm shadow-xl border-l-4 border-pink-500">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-pink-300 flex items-center"><FiMessageSquare className="mr-2"/>{post.user}</span>
                        <div className="flex space-x-0.5 text-yellow-400">
                          {[...Array(post.stars)].map((_, i) => <FiStar key={i} size={14}/>)}
                        </div>
                      </div>
                      <p className="text-gray-200 mt-1 text-base italic">"{post.comment}"</p>
                    </div>
                  ))}
                  <button onClick={handleOpenCameraPage} className="mt-4 py-2 px-4 text-lg font-semibold bg-pink-500 text-white rounded-full hover:bg-pink-600 transition">View All Discussions</button>
                </div>
              </div>
            )}
            {selectedMovie && !selectedScene && (
              <SceneResults movie={selectedMovie} onSelectScene={handleSelectScene} onBack={handleBackToMovies} selectedFeature={selectedFeature} />
            )}
            {selectedScene && (
              <div className="p-8 pt-28 relative z-10">
                <button onClick={handleBackToScenes} className="mb-6 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">← Back to Scenes</button>
                <h2 className="text-3xl font-bold text-purple-200 mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>{itemPageTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {itemsToDisplay.map((item, idx) => (<div key={idx} className="p-4 bg-gray-800/80 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition flex flex-col items-center text-center backdrop-blur-sm">{item.itemThumbnail && ( <img src={item.itemThumbnail} alt={item.name} className="w-full h-40 object-cover rounded-xl mb-4 border-2 border-purple-400" onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }} /> )}<h3 className="font-semibold text-xl text-purple-300">{item.name}</h3>{item.description && <p className="text-gray-400 text-sm mt-1">{item.description}</p>}{item.timestamp && ( <p className="text-yellow-400 text-xs mt-2">Appears at: {item.timestamp}</p> )}<div className="mt-4 flex flex-wrap justify-center gap-2">{item.buyLink && ( <a href={item.buyLink} target="_blank" rel="noopener noreferrer" onClick={handleClosePlayer} className="px-3 py-1 bg-pink-500 text-white rounded-full hover:bg-pink-600 text-sm transition">Buy Link</a> )}{item.mapLink && ( <a href={item.mapLink} target="_blank" rel="noopener noreferrer" onClick={handleClosePlayer} className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 text-sm transition">Map Link</a> )}</div><button onClick={() => addItemToCart(item)} className="mt-4 px-4 py-2 bg-yellow-400 rounded-full hover:bg-yellow-500 text-gray-900 font-bold transition">Save</button></div>))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} onAuthSuccess={handleAuthSuccess} />
      <Footer />
    </div>
  );
}

export default App;