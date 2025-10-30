import React, { useState } from "react";
import { checkout } from "../Api";

const CheckoutModal = ({ items, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await checkout(items, form.name, form.email);
    setReceipt(data);
  };

  
  const handleBackgroundClick = (e) => {
    if (e.target.id === "modal-background") {
      onClose();
    }
  };

  return (
    <div
      id="modal-background"
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()} 
      >
        
        
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl font-bold"
        >
          ×
        </button>

        {!receipt ? (
          <>
            <h2 className="text-lg font-bold mb-4">Checkout</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Confirm Checkout
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-lg font-bold mb-2">Receipt</h2>
            <p>Total: ₹{receipt.total}</p>
            <p>{new Date(receipt.timestamp).toLocaleString()}</p>
            <button
              onClick={onClose}
              className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
