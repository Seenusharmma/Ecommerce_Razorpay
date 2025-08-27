import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
import GaneshChaturthiSlider from "../offers/GaneshChaturthiSlider";
import Carousel from "../Carousel"

const ShowProduct = () => {
  const { filteredData, addToCart } = useContext(AppContext);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Carousal */}
      <Carousel />
      {/* Special Offers */}
      <GaneshChaturthiSlider />
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 border-b pb-3">
        ✨ Explore Our Products
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredData?.map((product) => (
          <div
            key={product._id}
            className="group border rounded-xl bg-white shadow-sm 
                       hover:shadow-xl hover:-translate-y-1 transition-all 
                       duration-300 flex flex-col"
          >
            {/* Product Image */}
            <Link
              to={`/product/${product._id}`}
              className="flex justify-center items-center p-5 h-48 relative overflow-hidden"
            >
              <img
                src={product.imgSrc}
                alt={product.title}
                className="max-h-40 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-black transition"></div>
            </Link>

            {/* Product Details */}
            <div className="p-4 flex flex-col flex-grow">
              {/* Title */}
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate mb-1">
                {product.title}
              </h3>

              {/* Price */}
              <span className="text-lg font-bold text-green-600 mb-3">
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
                className="mt-auto w-full py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 
                           text-gray-900 rounded-lg text-sm font-semibold shadow-md 
                           hover:from-yellow-500 hover:to-yellow-600 
                           hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProduct;
