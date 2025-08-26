import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  const { filteredData, addToCart } = useContext(AppContext);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Title */}
      <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center tracking-wide">
        Explore Our Products
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {filteredData?.map((product) => (
          <div
            key={product._id}
            className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Product Image */}
            <Link to={`/product/${product._id}`} className="block relative">
              <img
                src={product.imgSrc}
                alt={product.title}
                className="w-full h-64 object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl"></div>
            </Link>

            {/* Card Content */}
            <div className="p-5 flex flex-col items-center text-center">
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                {product.title}
              </h3>

              {/* Price & Button */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full justify-center">
                <span className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold shadow hover:bg-indigo-700 transition">
                  ₹{product.price}
                </span>
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
                  className="flex-1 px-4 py-2 bg-yellow-400 text-gray-900 rounded-xl font-semibold shadow hover:bg-yellow-500 transition"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProduct;
