// src/components/TrendingItems.jsx
import React from "react";

// Component to render a single group of trending items
const TrendingGroup = ({ title, items, onAddToCart }) => {
  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto mt-12 mb-12">
      <h2
        className="text-3xl font-bold text-yellow-300 mb-6"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => (
          <div
            key={`${item.movieTitle}-${item.name}-${idx}`}
            className="p-4 bg-gray-800/80 rounded-2xl shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition flex flex-col items-center text-center backdrop-blur-sm border-2 border-yellow-500"
          >
            {/* Item Image */}
            {item.itemThumbnail && (
              <img
                src={item.itemThumbnail}
                alt={item.name}
                className="w-full h-40 object-cover rounded-xl mb-4 border-2 border-gray-600"
                onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }}
              />
            )}

            {/* Name and Origin */}
            <h3 className="font-semibold text-xl text-yellow-300">{item.name}</h3>
            <p className="text-gray-400 text-sm mt-1">from {item.movieTitle}</p>

            {/* Save Button */}
            <button
              onClick={() => onAddToCart(item)}
              className="mt-4 px-4 py-2 bg-pink-500 rounded-full hover:bg-pink-600 text-white font-bold transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


const TrendingItems = ({ items, onAddToCart }) => {
  return (
    <div className="w-full">
      <TrendingGroup 
        title="Trending Clothing" 
        items={items.clothing} 
        onAddToCart={onAddToCart} 
      />
      
      <TrendingGroup 
        title="Trending Furniture" 
        items={items.furniture} 
        onAddToCart={onAddToCart} 
      />
      
      <TrendingGroup 
        title="Trending Places (Locations)" 
        items={items.places} 
        onAddToCart={onAddToCart} 
      />
    </div>
  );
};

export default TrendingItems;