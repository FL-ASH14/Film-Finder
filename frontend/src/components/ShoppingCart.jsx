import React, { useState } from "react";

const ShoppingCart = ({ cartItems }) => {
  const [open, setOpen] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed top-16 right-4 w-80 bg-white shadow-lg p-4 rounded-2xl z-50">
      <h2 className="text-xl font-bold text-purple-700 mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">No items saved yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {cartItems.map((item, idx) => (
            <li key={idx} className="p-2 bg-gray-100 rounded-lg">
              {item.name}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => setOpen(false)}
        className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-full"
      >
        Close
      </button>
    </div>
  );
};

export default ShoppingCart;
