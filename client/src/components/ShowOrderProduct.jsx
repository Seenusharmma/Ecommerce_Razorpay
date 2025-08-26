import React, { useEffect, useState } from "react";

const ShowOrderProduct = ({ items }) => {
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (items) {
      for (let i = 0; i < items?.length; i++) {
        qty += items[i].qty;
        price += items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [items]);

  return (
    <div className="w-full px-3 py-6">
      {/* Responsive table wrapper */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full border border-gray-700 text-center">
          <thead className="bg-gray-900 text-gray-200 text-sm sm:text-base">
            <tr>
              <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">Product</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">Title</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">Price</th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">Qty</th>
            </tr>
          </thead>

          <tbody className="bg-gray-800 text-gray-100 divide-y divide-gray-700 text-sm sm:text-base">
            {items?.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="px-3 sm:px-4 py-2 sm:py-3 flex justify-center">
                  <img
                    src={product.imgSrc}
                    alt={product.title}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md shadow-md"
                  />
                </td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 font-medium truncate max-w-[150px] sm:max-w-xs">
                  {product.title}
                </td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 font-semibold text-green-400">
                  ₹{product.price}
                </td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">
                  {product.qty}
                </td>
              </tr>
            ))}

            {/* Total Row */}
            <tr className="bg-gray-900 text-white">
              <td></td>
              <td className="px-3 sm:px-4 py-2 sm:py-3 font-bold text-left text-base sm:text-lg">
                Total
              </td>
              <td className="px-3 sm:px-4 py-2 sm:py-3 font-bold text-green-400 text-base sm:text-lg">
                ₹{price}
              </td>
              <td className="px-3 sm:px-4 py-2 sm:py-3 font-bold text-blue-400 text-base sm:text-lg">
                {qty}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowOrderProduct;
