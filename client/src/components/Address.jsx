import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } =
    formData;

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );

    if (result.success) {
      navigate("/checkout");
    }

    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
  };

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Shipping Address
      </h1>

      <form onSubmit={submitHandler} className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={onChangerHandler}
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              name="country"
              value={formData.country}
              onChange={onChangerHandler}
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              name="state"
              value={formData.state}
              onChange={onChangerHandler}
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              name="city"
              value={formData.city}
              onChange={onChangerHandler}
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pincode
            </label>
            <input
              name="pincode"
              value={formData.pincode}
              onChange={onChangerHandler}
              type="number"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={onChangerHandler}
              type="number"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address / Nearby
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={onChangerHandler}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 h-24 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full md:w-1/2 bg-blue-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>

      {userAddress && (
        <div className="text-center mt-4">
          <button
            className="w-full md:w-1/2 bg-yellow-500 text-white font-semibold py-3 rounded-lg shadow hover:bg-yellow-600 transition"
            onClick={() => navigate("/checkout")}
          >
            Use Old Address
          </button>
        </div>
      )}
    </div>
  );
};

export default Address;
