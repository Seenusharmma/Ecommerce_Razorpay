import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import ShowOrderProduct from "../ShowOrderProduct";

const Profile = () => {
  const { user, userOrder } = useContext(AppContext);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Profile Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, <span className="text-indigo-600">{user?.name}</span>
        </h1>
        <h3 className="text-lg text-gray-600">{user?.email}</h3>
        <p className="text-gray-700 mt-2 font-semibold">
          Total Orders:{" "}
          <span className="text-indigo-600">{userOrder?.length}</span>
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-8">
        {userOrder && userOrder.length > 0 ? (
          userOrder.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white shadow-lg rounded-xl p-6"
            >
              {/* Order Items */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Order Items
                </h2>
                <ShowOrderProduct items={product?.orderItems} />
              </div>

              {/* Order Details */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Order Details & Shipping Address
                </h2>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <span className="font-semibold">Order ID:</span>{" "}
                    {product?.orderId}
                  </li>
                  <li>
                    <span className="font-semibold">Payment ID:</span>{" "}
                    {product?.paymentId}
                  </li>
                  <li>
                    <span className="font-semibold">Payment Status:</span>{" "}
                    {product?.payStatus}
                  </li>
                  <li>
                    <span className="font-semibold">Name:</span>{" "}
                    {product?.userShipping?.fullName}
                  </li>
                  <li>
                    <span className="font-semibold">Phone:</span>{" "}
                    {product?.userShipping?.phoneNumber}
                  </li>
                  <li>
                    <span className="font-semibold">Country:</span>{" "}
                    {product?.userShipping?.country}
                  </li>
                  <li>
                    <span className="font-semibold">State:</span>{" "}
                    {product?.userShipping?.state}
                  </li>
                  <li>
                    <span className="font-semibold">Pincode:</span>{" "}
                    {product?.userShipping?.pincode}
                  </li>
                  <li>
                    <span className="font-semibold">Address:</span>{" "}
                    {product?.userShipping?.address}
                  </li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg">
            You haven’t placed any orders yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
