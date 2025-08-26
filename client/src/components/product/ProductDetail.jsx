import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const url = "https://ecommerce-razorpay.onrender.com/api";

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setProduct(api.data.product);
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      {/* Product Detail Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-10 max-w-6xl mx-auto">
        {/* Left: Product Image */}
        <div className="flex-shrink-0">
          <img
            src={product?.imgSrc}
            alt={product?.title}
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-xl border-2 border-yellow-400 shadow-lg"
          />
        </div>

        {/* Right: Product Info */}
        <div className="text-center md:text-left max-w-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {product?.title}
          </h1>
          <p className="text-gray-600 mb-4">{product?.description}</p>

          <h2 className="text-2xl font-semibold text-green-600 mb-6">
            ₹{product?.price}
          </h2>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition">
              Buy Now
            </button>
            <button className="px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg shadow-md hover:bg-yellow-500 transition">
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProduct category={product?.category} />
    </>
  );
};

export default ProductDetail;
