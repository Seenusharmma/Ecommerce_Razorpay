import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import { FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { setFilteredData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);

  const filterbyCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category.toLowerCase() === cat.toLowerCase()
      )
    );
  };

  const filterbyPrice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        {/* Logo */}
        <Link
          to={"/"}
          className="text-xl md:text-2xl font-extrabold text-white tracking-tight"
        >
          Ekart
        </Link>

        {/* Search (desktop only) */}
        <form
          onSubmit={submitHandler}
          className="hidden md:flex items-center bg-white rounded-lg px-3 py-2 w-1/2 max-w-lg"
        >
          <span className="material-symbols-outlined text-gray-500">search</span>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search for products, brands and more"
            className="ml-2 bg-transparent outline-none text-gray-800 w-full placeholder-gray-500"
          />
        </form>

        {/* Right Section (desktop only) */}
        <div className="hidden md:flex items-center space-x-5">
          {isAuthenticated ? (
            <>
              {/* Cart */}
              <Link to={"/cart"} className="relative flex items-center gap-1 text-white">
                <FaShoppingBag className="text-2xl" />
                <span className="text-sm font-medium">Cart</span>
                {cart?.items?.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-xs text-white rounded-full px-2 py-0.5">
                    {cart.items.length}
                  </span>
                )}
              </Link>

              {/* Profile */}
              <Link
                to={"/profile"}
                className="px-3 py-1 rounded-md bg-white text-blue-600 font-medium hover:bg-gray-200 transition"
              >
                Profile
              </Link>

              {/* Logout */}
              <button
                className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-md bg-white text-blue-600 font-medium hover:bg-gray-200 transition"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="px-3 py-1 rounded-md bg-yellow-400 text-blue-900 font-semibold hover:bg-yellow-500 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Right Icons */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Cart Icon - always visible on mobile */}
          <Link to={"/cart"} className="relative text-white">
            <FaShoppingBag className="text-2xl" />
            {cart?.items?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-2 py-0.5">
                {cart.items.length}
              </span>
            )}
          </Link>

          {/* Menu Button */}
          <button
            className="text-2xl text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-4">
          {/* Search (mobile) */}
          <form
            onSubmit={submitHandler}
            className="flex items-center bg-gray-100 rounded-lg px-3 py-2"
          >
            <span className="material-symbols-outlined text-gray-400">search</span>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search for products..."
              className="ml-2 bg-transparent outline-none text-gray-800 w-full placeholder-gray-500"
            />
          </form>

          {/* Links */}
          <div className="flex flex-col space-y-3">
            {isAuthenticated ? (
              <>
                <Link
                  to={"/profile"}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition text-center"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                    setMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to={"/login"}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition text-center"
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 rounded-md bg-yellow-400 text-blue-900 font-semibold hover:bg-yellow-500 transition text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Filter Bar (only on Home) */}
      {location.pathname === "/" && (
        <div className="flex flex-wrap justify-center gap-3 px-4 py-2 bg-blue-50 text-xs sm:text-sm md:text-base">
          <button
            onClick={() => setFilteredData(products)}
            className="px-3 py-1 bg-white text-blue-700 font-medium rounded-md shadow hover:bg-gray-100 transition"
          >
            No Filter
          </button>
          <button
            onClick={() => filterbyCategory("mobiles")}
            className="px-3 py-1 bg-white text-blue-700 font-medium rounded-md shadow hover:bg-gray-100 transition"
          >
            Mobiles
          </button>
          <button
            onClick={() => filterbyCategory("laptops")}
            className="px-3 py-1 bg-white text-blue-700 font-medium rounded-md shadow hover:bg-gray-100 transition"
          >
            Laptops
          </button>
          <button
            onClick={() => filterbyCategory("cameras")}
            className="px-3 py-1 bg-white text-blue-700 font-medium rounded-md shadow hover:bg-gray-100 transition"
          >
            Cameras
          </button>
          <button
            onClick={() => filterbyCategory("headphones")}
            className="px-3 py-1 bg-white text-blue-700 font-medium rounded-md shadow hover:bg-gray-100 transition"
          >
            Headphones
          </button>
          {[15999, 25999, 49999, 69999, 89999].map((price) => (
            <button
              key={price}
              onClick={() => filterbyPrice(price)}
              className="px-3 py-1 bg-white text-blue-700 font-medium rounded-md shadow hover:bg-gray-100 transition"
            >
              ₹{price}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
