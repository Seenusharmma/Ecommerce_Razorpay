import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Empty Cart */}
      {cart?.items?.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Your cart is empty 🛒
          </h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg shadow hover:bg-yellow-500 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Summary */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-8 text-center">
            <span className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow">
              Total Qty: {qty}
            </span>
            <span className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold shadow">
              Total Price: ₹{price}
            </span>
          </div>

          {/* Cart Items */}
          <div className="space-y-6">
            {cart?.items?.map((product) => (
              <div
                key={product._id}
                className="flex flex-col md:flex-row items-center justify-between bg-white shadow rounded-lg p-4"
              >
                {/* Product Image */}
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="w-24 h-24 object-cover rounded-lg border"
                />

                {/* Product Info */}
                <div className="flex-1 text-center md:text-left px-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    {product.title}
                  </h2>
                  <p className="text-gray-600">₹{product.price}</p>
                  <p className="text-sm text-gray-500">Qty: {product.qty}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4 md:mt-0">
                  <button
                    onClick={() => decreaseQty(product?.productId, 1)}
                    className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-500 transition"
                  >
                    -
                  </button>

                   <button
                    onClick={() => {
                      if (confirm("Are you sure you want to remove this item?")) {
                        removeFromCart(product?.productId);
                      }
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    Remove
                  </button>

                  <button
                    onClick={() =>
                      addToCart(
                        product?.productId,
                        product.title,
                        product.price / product.qty,
                        1,
                        product.imgSrc
                      )
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    +
                  </button>
                 
                </div>
              </div>
            ))}
          </div>

          {/* Checkout & Clear Buttons */}
          <div className="flex justify-center gap-6 mt-10">
            <button
              onClick={() => navigate("/shipping")}
              className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700 transition"
            >
              Checkout
            </button>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to clear the cart?")) {
                  clearCart();
                }
              }}
              className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
