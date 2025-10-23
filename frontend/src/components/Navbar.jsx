// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";

// SVGs are included here for brevity
const FiMenu = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg> );
const FiShoppingCart = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> );
const FiUser = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> );
const FiSearch = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> );
const FiCamera = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg> );
const FiVolume2 = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg> );
const FiVolumeX = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg> );


const Navbar = ({ 
  menuOpen, setMenuOpen, onSelectFeature, cartItems, 
  searchQuery, setSearchQuery, goHome, onOpenCart, onOpenCameraPage,
  currentUser, openAuthModal, handleSignOut, movies, onSelectMovieFromSearch,
  isMusicEnabled, onToggleMusic
}) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null); 
  const menuRef = useRef(null);
  const menuIconRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target) && menuIconRef.current && !menuIconRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => { document.removeEventListener("mousedown", handleClickOutside); };
  }, [menuOpen, setMenuOpen]);

  const handleSearchIconClick = () => { if (searchInputRef.current) { searchInputRef.current.focus(); } };

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-purple-900 via-indigo-900 to-black shadow-lg">
      <div className="flex items-center justify-between px-2 sm:px-6 py-4">
        <div className="flex items-center gap-4 relative">
          <FiMenu ref={menuIconRef} className="text-2xl text-white cursor-pointer hover:text-purple-400 transition" onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && (
            <div ref={menuRef} className="absolute top-12 left-0 bg-black/90 text-white shadow-xl p-4 rounded-xl flex flex-col gap-2 min-w-[120px]">
              <button className="hover:text-purple-400 transition" onClick={() => onSelectFeature("clothing")}>Clothing</button>
              <button className="hover:text-purple-400 transition" onClick={() => onSelectFeature("furniture")}>Furniture</button>
              <button className="hover:text-purple-400 transition" onClick={() => onSelectFeature("places")}>Places</button>
            </div>
          )}
        </div>
        
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-wider cursor-pointer hover:text-purple-400 transition whitespace-nowrap" style={{ fontFamily: "'Orbitron', sans-serif" }} onClick={() => goHome()}>
          Film Finder
        </h1>
        
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <div className="relative">
            <input ref={searchInputRef} type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setIsSearchFocused(true)} onBlur={() => setIsSearchFocused(false)} className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none text-black placeholder-gray-500 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 font-semibold text-lg w-28 sm:w-40 md:w-64" style={isSearchFocused && searchQuery === "" ? { paddingRight: '2.5rem' } : {}} />
            <FiSearch className="absolute left-3 top-2.5 text-gray-600 text-xl cursor-pointer hover:text-purple-500 transition" onClick={handleSearchIconClick} />
            {isSearchFocused && searchQuery === "" && (
              <FiCamera className="absolute right-3 top-2.5 text-gray-600 text-xl cursor-pointer hover:text-purple-500 transition" onMouseDown={onOpenCameraPage} />
            )}
            {isSearchFocused && searchQuery && movies.length > 0 && (
              <div className="absolute top-full mt-2 w-full max-h-80 overflow-y-auto bg-white/95 backdrop-blur-md rounded-lg shadow-2xl z-[60]">
                <ul>
                  {movies.map(movie => (
                    <li key={movie.id} onMouseDown={() => onSelectMovieFromSearch(movie)} className="flex items-center p-3 cursor-pointer hover:bg-purple-200 transition">
                      <img src={movie.posterUrl} alt={movie.title} className="w-12 h-16 object-cover rounded-md mr-4" onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }} />
                      <span className="text-black font-semibold text-lg">{movie.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
           <button onClick={onToggleMusic} title={isMusicEnabled ? "Mute All Music" : "Unmute All Music"} className="text-white hover:text-purple-400 transition">
            {isMusicEnabled ? <FiVolume2 /> : <FiVolumeX />}
          </button>
          <div className="relative">
            {currentUser ? (
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
                <img src={currentUser.profileAvatar} alt={currentUser.profileName} className="w-10 h-10 rounded-full object-cover border-2 border-purple-400"/>
                <span className="text-white font-semibold hidden sm:block">{currentUser.profileName}</span>
              </div>
            ) : ( <FiUser className="text-white text-2xl cursor-pointer hover:text-purple-400 transition" onClick={openAuthModal} /> )}
            {currentUser && profileMenuOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white text-black rounded-lg shadow-xl p-2">
                <button onClick={() => { handleSignOut(); setProfileMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md">Sign Out</button>
              </div>
            )}
          </div>
          <div className="relative cursor-pointer group" onClick={onOpenCart}>
            <FiShoppingCart className="text-white text-2xl group-hover:text-purple-400 transition" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center pointer-events-none">{cartItems.length}</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;