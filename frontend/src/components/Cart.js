import React from "react";
import { removeFromCart } from "../Api";

const Cart = ({ items, onCheckout, onBack, onCartChange }) => {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleRemove = async (id) => {
    await removeFromCart(id);
    onCartChange();
  };

  return (
    <div className="p-6">
      <button onClick={onBack} className="text-blue-600 mb-4">
        ← Back to Products
      </button>

      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-600">
                  ₹{item.price} × {item.qty}
                </p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <p className="text-lg font-semibold mt-4">Total: ₹{total}</p>
          <button
            onClick={onCheckout}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
