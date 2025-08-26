import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const RelatedProduct = ({ category }) => {
  const { products } = useContext(AppContext);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    setRelatedProduct(
      products.filter(
        (data) => data?.category?.toLowerCase() === category?.toLowerCase()
      )
    );
  }, [category, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Related Products
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {relatedProduct?.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center hover:shadow-xl transition duration-300"
          >
            {/* Product Image */}
            <Link to={`/product/${product._id}`} className="mb-4">
              <img
                src={product.imgSrc}
                alt={product.title}
                className="w-48 h-48 object-cover rounded-xl border-2 border-yellow-400 hover:scale-105 transition-transform"
              />
            </Link>

            {/* Product Info */}
            <h5 className="text-lg font-semibold text-gray-800 mb-3 text-center">
              {product.title}
            </h5>

            {/* Buttons */}
            <div className="flex space-x-3">
              <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition">
                ₹{product.price}
              </span>
              <button className="px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow hover:bg-yellow-600 transition">
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
