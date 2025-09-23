// src/components/Navbar.jsx
import React, { useState } from "react";
import { FiMenu, FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";

const Navbar = ({ setSelectedFeature, cartItems, searchQuery, setSearchQuery, goHome, openCart }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 bg-black bg-opacity-70 backdrop-blur-md shadow-md fixed w-full z-50">
      <div className="flex items-center gap-4">
        <FiMenu
          className="text-2xl cursor-pointer text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {menuOpen && (
          <div className="absolute top-14 left-4 bg-gray-900 text-white shadow-lg p-4 rounded-xl flex flex-col gap-2">
            <button onClick={() => { setSelectedFeature("clothing"); setMenuOpen(false); }}>Clothing</button>
            <button onClick={() => { setSelectedFeature("furniture"); setMenuOpen(false); }}>Furniture</button>
            <button onClick={() => { setSelectedFeature("places"); setMenuOpen(false); }}>Places</button>
          </div>
        )}
      </div>

      <h1
        className="text-4xl font-extrabold text-purple-400 tracking-widest drop-shadow-lg cursor-pointer"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
        onClick={() => goHome()}
      >
        Film Finder
      </h1>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-4 py-1 rounded-full border border-gray-300 focus:outline-none"
          />
          <FiSearch className="absolute left-2 top-1.5 text-gray-400" />
        </div>
        <FiUser className="text-2xl cursor-pointer text-white" />
        <FiShoppingCart className="text-2xl cursor-pointer text-white" onClick={() => openCart()} />
      </div>
    </nav>
  );
};

export default Navbar;
