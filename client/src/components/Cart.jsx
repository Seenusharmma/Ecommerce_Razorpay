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
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Empty Cart */}
      {cart?.items?.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Your cart is empty 🛒
          </h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart?.items?.map((product) => (
              <div
                key={product._id}
                className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-lg p-4"
              >
                {/* Product Image */}
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="w-28 h-28 object-cover rounded-lg border"
                />

                {/* Product Info */}
                <div className="flex-1 text-center md:text-left px-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    {product.title}
                  </h2>
                  <p className="text-gray-600">₹{product.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  <button
                    onClick={() => decreaseQty(product?.productId, 1)}
                    className="w-8 h-8 flex items-center justify-center border rounded-full text-xl bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="px-3 font-semibold">{product.qty}</span>
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
                    className="w-8 h-8 flex items-center justify-center border rounded-full text-xl bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => {
                    if (confirm("Remove this item from cart?")) {
                      removeFromCart(product?.productId);
                    }
                  }}
                  className="mt-4 md:mt-0 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Right: Price Summary */}
          <div className="bg-white rounded-lg shadow-md p-5 h-fit">
            <h2 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">
              PRICE DETAILS
            </h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Price ({qty} items)</span>
                <span>₹{price}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">− ₹0</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-3">
                <span>Total Amount</span>
                <span>₹{price}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate("/shipping")}
              className="w-full mt-6 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow hover:bg-orange-600 transition"
            >
              Place Order
            </button>

            {/* Clear Cart */}
            <button
              onClick={() => {
                if (confirm("Are you sure you want to clear the cart?")) {
                  clearCart();
                }
              }}
              className="w-full mt-3 px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
