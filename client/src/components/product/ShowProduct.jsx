import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  const { filteredData, addToCart } = useContext(AppContext);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 border-b pb-3">
        Explore Our Products
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredData?.map((product) => (
          <div
            key={product._id}
            className="border rounded-md bg-white hover:shadow-md transition cursor-pointer flex flex-col"
          >
            {/* Product Image */}
            <Link
              to={`/product/${product._id}`}
              className="flex justify-center items-center p-4 h-48"
            >
              <img
                src={product.imgSrc}
                alt={product.title}
                className="max-h-40 object-contain"
              />
            </Link>

            {/* Product Details */}
            <div className="p-3 flex flex-col gap-1 flex-grow">
              {/* Title */}
              <h3 className="text-sm sm:text-base font-medium text-gray-800 truncate">
                {product.title}
              </h3>

              {/* Price */}
              <span className="text-lg font-semibold text-green-600">
                ₹{product.price}
              </span>

              {/* Add to Cart */}
              <button
                onClick={() =>
                  addToCart(
                    product._id,
                    product.title,
                    product.price,
                    1,
                    product.imgSrc
                  )
                }
                className="mt-3 w-full py-2 bg-yellow-400 text-gray-900 rounded-sm text-sm font-semibold hover:bg-yellow-500 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProduct;
