// src/components/Navbar.jsx
import React, { useState } from "react";
import { FiMenu, FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";

const Navbar = ({ setSelectedFeature, cartItems, searchQuery, setSearchQuery, goHome, openCart }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-purple-900 via-indigo-900 to-black shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        
        {/* Left menu */}
        <div className="flex items-center gap-4 relative">
          <FiMenu
            className="text-2xl text-white cursor-pointer hover:text-purple-400 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="absolute top-12 left-0 bg-black/90 text-white shadow-xl p-4 rounded-xl flex flex-col gap-2 min-w-[120px]">
              <button className="hover:text-purple-400 transition" onClick={() => { setSelectedFeature("clothing"); setMenuOpen(false); }}>Clothing</button>
              <button className="hover:text-purple-400 transition" onClick={() => { setSelectedFeature("furniture"); setMenuOpen(false); }}>Furniture</button>
              <button className="hover:text-purple-400 transition" onClick={() => { setSelectedFeature("places"); setMenuOpen(false); }}>Places</button>
            </div>
          )}
        </div>

        {/* Title */}
        <h1
          className="text-4xl font-extrabold text-white tracking-wider cursor-pointer hover:text-purple-400 transition"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          onClick={() => goHome()}
        >
          Film Finder
        </h1>

        {/* Right icons + search */}
        <div className="flex items-center gap-4 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                pl-10 pr-4 py-2 
                rounded-full 
                border border-gray-300 
                focus:outline-none 
                text-black 
                placeholder-gray-500 
                bg-white/80 
                backdrop-blur-sm
                focus:ring-2 
                focus:ring-purple-500 
                focus:border-transparent
                transition
                duration-300
                font-semibold
                text-lg
                w-48 sm:w-64
              "
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-600 text-xl" />
          </div>
          <FiUser className="text-white text-2xl cursor-pointer hover:text-purple-400 transition" />
          <FiShoppingCart className="text-white text-2xl cursor-pointer hover:text-purple-400 transition" onClick={openCart} />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
