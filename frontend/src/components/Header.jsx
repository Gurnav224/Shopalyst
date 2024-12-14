/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Search, User, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = ({cart , wishlist}) => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <header >
       <nav className="bg-slate-50 shadow-md py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <img 
          src="/api/placeholder/150/50" 
          alt="Store Logo" 
          className="h-10"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link to="/" className="text-gray-800 hover:text-blue-600 transition">Home</Link>
        <Link to="/products" className="text-gray-800 hover:text-blue-600 transition">Products</Link>
        <Link href="/products/Tops" className="text-gray-800 hover:text-blue-600 transition">Categories</Link>
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

      {/* User Actions */}
      <div className="flex items-center space-x-4">
        <Link to='/wishlist' className="hover:bg-gray-100 p-2 rounded-full relative">
          <Heart className="text-gray-700" size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
            {wishlist.length}
          </span>
        </Link>
        <button className="hover:bg-gray-100 p-2 rounded-full">
          <User className="text-gray-700" size={24} />
        </button>
        <Link to="/cart" className="hover:bg-gray-100 p-2 rounded-full relative">
          <ShoppingCart className="text-gray-700" size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
            {cart.length}
          </span>
        </Link>
      </div>
    </nav>
    </header>
  );
};

export default Header;