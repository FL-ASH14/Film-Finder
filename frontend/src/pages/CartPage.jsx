// src/pages/CartPage.jsx
import React from "react";

const CartPage = ({ cartItems, onBack, onRemoveItem }) => {
  return (
    <div className="p-8 pt-28 relative z-10">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition font-semibold"
      >
        ← Back
      </button>
      
      <h1 className="text-4xl font-bold text-purple-300 mb-8">Your Saved Items</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cartItems.map((item, idx) => (
            <div 
              key={idx} 
              className="p-4 bg-gray-800/80 rounded-2xl shadow-lg flex flex-col items-center text-center backdrop-blur-sm"
            >
              {item.itemThumbnail && (
                  <img 
                      src={item.itemThumbnail} 
                      alt={item.name} 
                      className="w-full h-40 object-cover rounded-xl mb-4 border-2 border-purple-400"
                      onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }} 
                  />
              )}
              <h3 className="font-semibold text-xl text-purple-300">{item.name}</h3>
              {item.description && <p className="text-gray-400 text-sm mt-1">{item.description}</p>}
              {item.timestamp && (
                  <p className="text-yellow-400 text-xs mt-2">
                      Appears at: {item.timestamp}
                  </p>
              )}
              
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {item.buyLink && (
                      <a 
                          href={item.buyLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          // --- MODIFIED: Size reverted ---
                          className="px-3 py-1 bg-pink-500 text-white rounded-full hover:bg-pink-600 text-sm transition"
                      >
                          Buy Link
                      </a>
                  )}
                  {item.mapLink && (
                      <a 
                          href={item.mapLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          // --- MODIFIED: Size reverted ---
                          className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 text-sm transition"
                      >
                          Map Link
                      </a>
                  )}
              </div>
              
              {/* --- MODIFIED: Size reverted and color changed to orange --- */}
              <button 
                onClick={() => onRemoveItem(idx)}
                className="mt-4 w-full px-4 py-2 bg-blue-700 text-white font-semibold rounded-full hover:bg-orange-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-gray-400 mt-8">
          You haven't saved any items yet. Go explore some scenes!
        </p>
      )}
    </div>
  );
};

export default CartPage;