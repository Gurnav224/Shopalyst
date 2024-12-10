/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";

const ProductCard = ({product , setCart, setWishlist}) => {


    const handleAddToCart = (product, e) => {
    // Stop event propagation to prevent link navigation
    e.stopPropagation();
    e.preventDefault();
    // Implement add to cart logic
    setCart((prev) => ([...prev,product]))
    console.log('Added to cart:', product);
  };

  const handleAddToWishlist = (product, e) => {
    // Stop event propagation to prevent link navigation
    e.stopPropagation();
    e.preventDefault();
    // Implement add to wishlist logic
    setWishlist((prev) => ([...prev , product]))
    console.log('Added to wishlist:', product);
  };

  
  return (
    <div
              className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl group"
            >
              <Link to={`/products/productId/${product._id}`} className="block">
                <div className="relative overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button onClick={(e) => handleAddToWishlist(product, e)} className="bg-white/70 p-2 rounded-full hover:bg-white/90 transition-all">
                      <Heart className="w-5 h-5 text-gray-700 hover:fill-red-500 hover:text-red-500" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-5 h-5 fill-current mr-1" />
                      <span className="text-gray-600 text-sm">
                        {product.rating} / 5
                      </span>
                    </div>
                    <span className="text-blue-600 font-bold text-xl">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <button  onClick={(e) => handleAddToCart(product, e)}className="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
                    <ShoppingCart className="mr-2" /> Add to Cart
                  </button>
                </div>
              </Link>
            </div>
  )
}

export default ProductCard
