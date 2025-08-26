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
        name: "Roshan Sharma",
        description: "Roshan Sharma",
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
          name: "Roshan Sharma",
          email: "roshansharma7250@gmail.com",
          contact: "9000090000",
        },
        notes: {
          address: "Bhubaneswar",
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
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-700 mb-10">
        Order Summary
      </h1>

      {/* Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Summary */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            🛒 Your Cart
          </h2>
          <TableProduct cart={cart} />
        </div>

        {/* Shipping Info */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            🚚 Shipping Address
          </h2>
          <ul className="space-y-3 text-gray-700 font-medium">
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
              <span className="font-semibold">Near By:</span>{" "}
              {userAddress?.address}
            </li>
          </ul>
        </div>
      </div>

      {/* Payment Button */}
      <div className="text-center mt-12">
        <button
          onClick={handlePayment}
          className="px-10 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-indigo-700 active:scale-95 transition duration-300"
        >
          💳 Proceed To Pay ₹{price}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
