import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import TableProduct from "./TableProduct";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);
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

  const handlePayment = async () => {
    try {
      const orderRepons = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        qty: qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });

      const { orderId, amount: orderAmount } = orderRepons.data;

      var options = {
        key: "rzp_test_R9tXjAUkffPtIa",
        amount: orderAmount * 100,
        currency: "INR",
        name: "MyCart",
        description: "Secure Checkout",
        order_id: orderId,
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: user._id,
            userShipping: userAddress,
          };

          const api = await axios.post(
            `${url}/payment/verify-payment`,
            paymentData
          );

          if (api.data.success) {
            clearCart();
            navigate("/oderconfirmation");
          }
        },
        prefill: {
          name: user?.name || "Guest",
          email: user?.email || "guest@example.com",
          contact: userAddress?.phoneNumber || "",
        },
        theme: {
          color: "#4f46e5",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-indigo-700 mb-8 sm:mb-12">
        🛍️ Order Summary
      </h1>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        {/* Cart Section */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-2xl p-4 sm:p-6 border border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
            🛒 Your Cart
          </h2>
          <TableProduct cart={cart} />
        </div>

        {/* Address + Summary */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
              🚚 Shipping Address
            </h2>
            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              <li>
                <span className="font-semibold">Name:</span>{" "}
                {userAddress?.fullName}
              </li>
              <li>
                <span className="font-semibold">Phone:</span>{" "}
                {userAddress?.phoneNumber}
              </li>
              <li>
                <span className="font-semibold">Country:</span>{" "}
                {userAddress?.country}
              </li>
              <li>
                <span className="font-semibold">State:</span>{" "}
                {userAddress?.state}
              </li>
              <li>
                <span className="font-semibold">PinCode:</span>{" "}
                {userAddress?.pincode}
              </li>
              <li>
                <span className="font-semibold">Address:</span>{" "}
                {userAddress?.address}
              </li>
            </ul>
          </div>

          {/* Price Summary */}
          <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 border border-gray-100">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
              💰 Price Details
            </h2>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Total Items:</span>
              <span>{qty}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Cart Total:</span>
              <span>₹{price}</span>
            </div>
            <div className="flex justify-between text-green-600 font-semibold text-base sm:text-lg border-t pt-3 mt-3">
              <span>Amount Payable:</span>
              <span>₹{price}</span>
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-base sm:text-lg font-semibold rounded-xl shadow-md hover:from-indigo-700 hover:to-blue-700 transition duration-300"
          >
            💳 Proceed To Pay ₹{price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
