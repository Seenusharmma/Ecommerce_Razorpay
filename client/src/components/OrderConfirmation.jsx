import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import ShowOrderProduct from "./ShowOrderProduct";
import { Link } from "react-router-dom";


const OrderConfirmation = () => {
  const { userOrder } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState({});

  useEffect(() => {
    if (userOrder) {
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Title Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          🎉 Your order has been confirmed!
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Sit tight, it will be delivered soon 🚚
        </p>
      </div>

      {/* Order Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Items */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Order Items
          </h2>
          <ShowOrderProduct items={latestOrder?.orderItems} />
        </div>

        {/* Shipping & Order Details */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Order Details & Shipping Address
          </h2>
          <ul className="space-y-3 text-gray-700 font-medium">
            <li>
              <span className="font-semibold">Order ID:</span>{" "}
              {latestOrder?.orderId}
            </li>
            <li>
              <span className="font-semibold">Payment ID:</span>{" "}
              {latestOrder?.paymentId}
            </li>
            <li>
              <span className="font-semibold">Payment Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded text-white text-sm ${
                  latestOrder?.payStatus === "Paid"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {latestOrder?.payStatus}
              </span>
            </li>
            <li>
              <span className="font-semibold">Name:</span>{" "}
              {latestOrder?.userShipping?.fullName}
            </li>
            <li>
              <span className="font-semibold">Phone:</span>{" "}
              {latestOrder?.userShipping?.phoneNumber}
            </li>
            <li>
              <span className="font-semibold">Country:</span>{" "}
              {latestOrder?.userShipping?.country}
            </li>
            <li>
              <span className="font-semibold">State:</span>{" "}
              {latestOrder?.userShipping?.state}
            </li>
            <li>
              <span className="font-semibold">Pin Code:</span>{" "}
              {latestOrder?.userShipping?.pincode}
            </li>
            <li>
              <span className="font-semibold">Address:</span>{" "}
              {latestOrder?.userShipping?.address}
            </li>
          </ul>
        </div>
      </div>

      {/* Proceed to Pay Button */}
      <div className="flex justify-center mt-10">
  <Link to={"/"}>
            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300">
      Continue Shopung
    </button>
          </Link>
</div>
    </div>
  );
};

export default OrderConfirmation;
