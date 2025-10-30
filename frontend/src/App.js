import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";
import { getCart } from "./Api";

function App() {
  const [view, setView] = useState("products"); // products | cart
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const refreshCart = async () => {
    const data = await getCart();
    setCart(data.items || []);
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={cart.length} onCartClick={() => setView("cart")} />

      {view === "products" && <ProductList onCartChange={refreshCart} />}
      {view === "cart" && (
        <Cart
          items={cart}
          onCheckout={() => setShowCheckout(true)}
          onBack={() => setView("products")}
          onCartChange={refreshCart}
        />
      )}

      {showCheckout && (
        <CheckoutModal
          items={cart}
          onClose={() => {
            setShowCheckout(false);
            setView("products");
            refreshCart();
          }}
        />
      )}
    </div>
  );
}

export default App;
