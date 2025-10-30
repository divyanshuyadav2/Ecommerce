import React, { useEffect, useState } from "react";
import { getProducts, addToCart } from "../Api";

const ProductList = ({ onCartChange }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleAdd = async (id) => {
    await addToCart(id);
    onCartChange();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="border rounded-lg shadow-md p-4 bg-white flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-gray-600">₹{p.price}</p>
          </div>
          <button
            onClick={() => handleAdd(p.id)}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
