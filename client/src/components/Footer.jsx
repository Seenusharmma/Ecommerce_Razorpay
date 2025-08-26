import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-10">
        
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
          <p className="text-sm leading-6">
            Your one-stop shop for the latest electronics, fashion, and more. 
            We bring the best deals at unbeatable prices.
          </p>
        </div>

        {/* Shop Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/laptops" className="hover:text-yellow-400">Laptops</Link></li>
            <li><Link to="/phones" className="hover:text-yellow-400">Smartphones</Link></li>
            <li><Link to="/headphones" className="hover:text-yellow-400">Headphones</Link></li>
            <li><Link to="/offers" className="hover:text-yellow-400">Offers</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/help" className="hover:text-yellow-400">Help Center</Link></li>
            <li><Link to="/returns" className="hover:text-yellow-400">Returns</Link></li>
            <li><Link to="/shipping" className="hover:text-yellow-400">Shipping Info</Link></li>
            <li><Link to="/faq" className="hover:text-yellow-400">FAQs</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-yellow-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-400"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-400"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-400"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-sm text-gray-400 mt-6">
        © {new Date().getFullYear()} Ecommerce Store. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
