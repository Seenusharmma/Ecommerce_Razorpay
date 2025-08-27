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
    <div className="px-4 py-6">
      {/* Desktop / Tablet View */}
      <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-blue-50 text-gray-800 text-sm uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-center">Price</th>
              <th className="px-4 py-3 text-center">Qty</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cart?.items?.map((product) => (
              <tr
                key={product._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Product Image */}
                <td className="px-4 py-3">
                  <img
                    src={product.imgSrc}
                    alt={product.title}
                    className="w-16 h-16 object-contain rounded border"
                  />
                </td>

                {/* Title */}
                <td className="px-4 py-3 font-medium text-gray-800 max-w-[220px] truncate">
                  {product.title}
                </td>

                {/* Price */}
                <td className="px-4 py-3 text-green-600 font-semibold text-center">
                  ₹{product.price}
                </td>

                {/* Qty */}
                <td className="px-4 py-3 text-center font-semibold">
                  {product.qty}
                </td>

                {/* Action Buttons */}
                <td className="px-4 py-3 flex justify-center gap-2">
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
                    className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => decreaseQty(product?.productId, 1)}
                    className="px-3 py-1 text-xs font-semibold text-orange-700 bg-orange-100 rounded-full hover:bg-orange-200 transition"
                  >
                    -
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to remove this item?")) {
                        removeFromCart(product?.productId);
                      }
                    }}
                    className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full hover:bg-red-200 transition"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            {/* Total Row */}
            <tr className="bg-gray-50 font-bold border-t">
              <td></td>
              <td className="px-4 py-3">Total</td>
              <td className="px-4 py-3 text-green-600 text-center">₹{price}</td>
              <td className="px-4 py-3 text-blue-600 text-center">{qty}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile View (Card Style like Flipkart) */}
      <div className="md:hidden space-y-4 mt-6">
        {cart?.items?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md p-4 flex gap-4"
          >
            <img
              src={product.imgSrc}
              alt={product.title}
              className="w-20 h-20 object-contain border rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-800 truncate">
                {product.title}
              </h3>
              <p className="text-green-600 font-semibold mt-1">
                ₹{product.price}
              </p>
              <p className="text-sm text-gray-500">Qty: {product.qty}</p>

              <div className="flex gap-2 mt-3">
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
                  className="px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200"
                >
                  +
                </button>
                <button
                  onClick={() => decreaseQty(product?.productId, 1)}
                  className="px-3 py-1 text-sm font-semibold text-orange-700 bg-orange-100 rounded-full hover:bg-orange-200"
                >
                  -
                </button>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to remove this item?")) {
                      removeFromCart(product?.productId);
                    }
                  }}
                  className="px-3 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-full hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Mobile Total Card */}
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center font-bold">
          <span>Total</span>
          <span className="text-green-600">₹{price}</span>
          <span className="text-blue-600">Qty: {qty}</span>
        </div>
      </div>
    </div>
  );
};

export default TableProduct;
