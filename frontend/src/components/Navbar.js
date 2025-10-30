import React from "react";

const Navbar = ({ cartCount, onCartClick }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">🛒 Mock E-Com Cart</h1>

      <button
        onClick={onCartClick}
        className="relative bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
      >
       🛒 Cart
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-2 py-0.5">
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
};

export default Navbar;
