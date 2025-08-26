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
    <nav className="sticky top-0 z-50 w-full bg-gray-900 text-white shadow-md">
      {/* Main Navbar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Logo */}
        <Link
          to={"/"}
          className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400"
        >
          MERN E-Commerce
        </Link>

        {/* Search (hidden on small screens) */}
        <form
          onSubmit={submitHandler}
          className="hidden md:flex items-center bg-gray-800 rounded-lg px-3 py-1 w-1/2 max-w-md"
        >
          <span className="material-symbols-outlined text-gray-400">search</span>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="ml-2 bg-transparent outline-none text-white w-full placeholder-gray-400"
          />
        </form>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* Cart */}
              <Link to={"/cart"} className="relative">
                <FaShoppingBag className="text-2xl" />
                {cart?.items?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2 py-0.5">
                    {cart.items.length}
                  </span>
                )}
              </Link>

              {/* Profile */}
              <Link
                to={"/profile"}
                className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 transition"
              >
                Profile
              </Link>

              {/* Logout */}
              <button
                className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 transition"
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
                className="px-3 py-1 rounded-md bg-gray-600 hover:bg-gray-700 transition"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="px-3 py-1 rounded-md bg-green-600 hover:bg-green-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 space-y-4">
          {/* Search */}
          <form
            onSubmit={submitHandler}
            className="flex items-center bg-gray-700 rounded-lg px-3 py-1"
          >
            <span className="material-symbols-outlined text-gray-400">search</span>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search products..."
              className="ml-2 bg-transparent outline-none text-white w-full placeholder-gray-400"
            />
          </form>

          {/* Links */}
          <div className="flex flex-col space-y-3">
            {isAuthenticated ? (
              <>
                <Link
                  to={"/cart"}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <FaShoppingBag /> Cart
                  {cart?.items?.length > 0 && (
                    <span className="bg-red-500 text-xs rounded-full px-2 py-0.5">
                      {cart.items.length}
                    </span>
                  )}
                </Link>
                <Link
                  to={"/profile"}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 transition"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                    setMenuOpen(false);
                  }}
                  className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to={"/login"}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-1 rounded-md bg-gray-600 hover:bg-gray-700 transition"
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-1 rounded-md bg-green-600 hover:bg-green-700 transition"
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
        <div className="flex flex-wrap justify-center gap-3 px-4 py-2 bg-gray-800 text-xs sm:text-sm md:text-base">
          <button
            onClick={() => setFilteredData(products)}
            className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 transition"
          >
            No Filter
          </button>
          <button
            onClick={() => filterbyCategory("mobiles")}
            className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 transition"
          >
            Mobiles
          </button>
          <button
            onClick={() => filterbyCategory("laptops")}
            className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 transition"
          >
            Laptops
          </button>
          <button
            onClick={() => filterbyCategory("cameras")}
            className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 transition"
          >
            Cameras
          </button>
          <button
            onClick={() => filterbyCategory("headphones")}
            className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 transition"
          >
            Headphones
          </button>
          {[15999, 25999, 49999, 69999, 89999].map((price) => (
            <button
              key={price}
              onClick={() => filterbyPrice(price)}
              className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 transition"
            >
              {price}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
