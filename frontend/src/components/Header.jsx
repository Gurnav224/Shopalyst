/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Search, User, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useWislist } from "../context/WishlistContext";

const Header = ({ searchQuery, setSearchQuery }) => {
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { cart, fetchCart } = useCart();
  const { wishlist, fetchWishlist } = useWislist();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setUserDetails(false); // Close user details when opening menu
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleLogout = () => {
    if (user?.email) {
      toast.info("user logout successfully ");
      logout();
      navigate("/login");
    } else {
      toast.warn("user already logout");
    }
  };

  return (
    <header className="relative">
      <nav className="bg-slate-50 shadow-md py-4 px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={"/"} className="flex items-center text-2xl font-bold">
            Shopalyst
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-8">
            {/* Navigation Links */}
            <div className="flex space-x-6">
              <Link
                to="/"
                className="text-gray-800 hover:text-blue-600 transition"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-800 hover:text-blue-600 transition"
              >
                Products
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex items-center border rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="focus:outline-none w-64"
              />
              <Search className="text-gray-500 ml-2" size={20} />
            </div>

            {/* Desktop User Actions */}
            <div className="flex items-center space-x-4">
              {!user?.email && (
                <>
                  <Link to="/login" className="bg-gray-100 p-2 rounded-md">
                    Login
                  </Link>
                  <Link to="/signup" className="bg-gray-100 p-2 rounded-md">
                    Signup
                  </Link>
                </>
              )}

              <Link
                to="/wishlist"
                className="hover:bg-gray-100 p-2 rounded-full relative"
              >
                <Heart className="text-gray-700" size={24} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {wishlist?.length || 0}
                </span>
              </Link>
              {/* User Profile Wrapper */}
              <div className="relative">
                <button
                  onClick={() => setUserDetails((prev) => !prev)}
                  className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition duration-200 ease-in-out"
                >
                  <User className="text-gray-700" size={24} />
                </button>
                {userDetails && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 z-20">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">
                        {user && user.name}
                      </span>
                      <Link
                        to="/profile"
                        className="mt-2 text-gray-600 hover:text-blue-500 transition duration-200"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="mt-2 text-red-600 hover:text-red-500 transition duration-200"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <Link
                to="/cart"
                className="hover:bg-gray-100 p-2 rounded-full relative"
              >
                <ShoppingCart className="text-gray-700" size={24} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {cart?.length || 0}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-10">
            <div className="flex flex-col p-4 space-y-4">
              {/* Mobile Search */}
              <div className="flex items-center border rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="focus:outline-none w-full"
                />
                <Search className="text-gray-500 ml-2" size={20} />
              </div>

              {/* Mobile Navigation Links */}
              <Link
                to="/"
                className="text-gray-800 hover:text-blue-600 transition py-2"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-800 hover:text-blue-600 transition py-2"
              >
                Products
              </Link>

              {/* Mobile User Actions */}
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="bg-gray-100 p-2 rounded-md text-center"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gray-100 p-2 rounded-md text-center"
                >
                  Signup
                </Link>
              </div>

              {/* Mobile Icons */}
              <div className="flex justify-around py-2">
                <Link to="/wishlist" className="relative">
                  <Heart className="text-gray-700" size={24} />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {wishlist?.length || 0}
                  </span>
                </Link>
                <Link to="/cart" className="relative">
                  <ShoppingCart className="text-gray-700" size={24} />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {cart?.length || 0}
                  </span>
                </Link>
              </div>

              {/* Mobile User Profile */}
              {user && (
                <div className="border-t pt-2">
                  <span className="font-semibold text-gray-800">
                    {user.name}
                  </span>
                  <Link
                    to="/profile"
                    className="block mt-2 text-gray-600 hover:text-blue-500 transition duration-200"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left mt-2 text-red-600 hover:text-red-500 transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
