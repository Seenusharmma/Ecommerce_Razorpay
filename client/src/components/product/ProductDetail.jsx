import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
import AppContext from "../../context/AppContext";
import { AiFillStar } from "react-icons/ai";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const { addToCart } = useContext(AppContext);
  const navigate = useNavigate();
  const url = "https://ecommerce-razorpay.onrender.com/api";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/product/${id}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setProduct(api.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product._id, product.title, product.price, 1, product.imgSrc);
    }
  };

  if (!product) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Product Detail */}
      <div className="flex flex-col md:flex-row items-start gap-12">
        {/* Left: Product Images */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="border rounded-xl p-4 shadow-lg hover:shadow-2xl transition">
            <img
              src={product.imgSrc}
              alt={product.title}
              className="w-full h-96 object-contain rounded-xl"
            />
          </div>
          {/* Optional thumbnails */}
          <div className="flex gap-3 mt-2 overflow-x-auto">
            {[product.imgSrc, product.imgSrc, product.imgSrc].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.title}-${i}`}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-gray-200 hover:border-yellow-400 transition"
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>

          {/* Ratings */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <AiFillStar key={i} />
              ))}
            </div>
            <span className="text-gray-600">(120 ratings)</span>
          </div>

          <p className="text-gray-700">{product.description}</p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">₹{product.price}</h2>

          {/* Stock & Offers */}
          <p className="text-sm text-gray-500 mt-1">
            {product.inStock ? "In Stock" : "In Stock"}
          </p>
          <div className="bg-yellow-100 p-3 rounded-md mt-2">
            <h3 className="text-gray-800 font-semibold mb-1">Offers:</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>10% off on first purchase</li>
              <li>Buy 1 Get 1 on select items</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={() => navigate("/checkout")}
              className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition w-full md:w-auto"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg shadow-md hover:bg-yellow-500 transition w-full md:w-auto"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <RelatedProduct category={product.category} />
      </div>
    </div>
  );
};

export default ProductDetail;
