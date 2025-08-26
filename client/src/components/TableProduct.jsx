import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";

const TableProduct = ({ cart }) => {
  const { decreaseQty, addToCart, removeFromCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

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
    <div className="px-3 py-6">
      {/* Desktop / Tablet View */}
      <div className="hidden md:block bg-white rounded-lg shadow-md">
        <table className="w-full border border-gray-200 text-center text-sm sm:text-base">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Add</th>
              <th className="px-4 py-3">Reduce</th>
              <th className="px-4 py-3">Remove</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {cart?.items?.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-4 py-3 flex justify-center">
                  <img
                    src={product.imgSrc}
                    alt={product.title}
                    className="w-14 h-14 object-contain rounded-md border border-gray-200"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 truncate max-w-[160px]">
                  {product.title}
                </td>
                <td className="px-4 py-3 font-semibold text-gray-900">
                  ₹{product.price}
                </td>
                <td className="px-4 py-3 font-semibold text-gray-800">
                  {product.qty}
                </td>
                <td className="px-4 py-3">
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
                    className="px-2 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                  >
                    +
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => decreaseQty(product?.productId, 1)}
                    className="px-2 py-1 text-sm font-medium text-white bg-orange-500 rounded hover:bg-orange-600 transition"
                  >
                    -
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to remove this item?")) {
                        removeFromCart(product?.productId);
                      }
                    }}
                    className="px-2 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            {/* Total Row */}
            <tr className="bg-gray-50 font-bold">
              <td></td>
              <td className="px-4 py-3 text-left">Total</td>
              <td className="px-4 py-3 text-green-600">₹{price}</td>
              <td className="px-4 py-3 text-blue-600">{qty}</td>
              <td colSpan="3"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile View (Card Style) */}
      <div className="md:hidden space-y-4">
        {cart?.items?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow p-4 flex gap-4 items-center"
          >
            <img
              src={product.imgSrc}
              alt={product.title}
              className="w-16 h-16 object-contain border rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-800 truncate">
                {product.title}
              </h3>
              <p className="text-gray-600 font-semibold">₹{product.price}</p>
              <p className="text-sm text-gray-500">Qty: {product.qty}</p>

              <div className="flex gap-2 mt-2">
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
                  className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  +
                </button>
                <button
                  onClick={() => decreaseQty(product?.productId, 1)}
                  className="px-3 py-1 text-sm font-medium text-white bg-orange-500 rounded hover:bg-orange-600"
                >
                  -
                </button>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to remove this item?")) {
                      removeFromCart(product?.productId);
                    }
                  }}
                  className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Total Section for Mobile */}
        <div className="bg-white rounded-lg shadow p-4 flex justify-between font-bold">
          <span>Total</span>
          <span className="text-green-600">₹{price}</span>
          <span className="text-blue-600">Qty: {qty}</span>
        </div>
      </div>
    </div>
  );
};

export default TableProduct;
