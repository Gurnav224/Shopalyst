/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { Star, ShoppingCartIcon, Heart } from "lucide-react";

const ProductCard = ({
  product,
  handleAddToCart,
  handleAddToWishlist,
  isProductInCart,
  isProductInWishlist,
}) => {
  const navigate = useNavigate();
  const handleNavigateToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate("/cart");
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl group">
      <Link to={`/products/productId/${product._id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={(e) => handleAddToWishlist(product, e)}
              className="bg-white/70 p-2 rounded-full hover:bg-white/90 transition-all"
            >
              {isProductInWishlist(product?._id) ? (
                <Heart className="w-5 h-5  fill-red-500 text-red-500" />
              ) : (
                <Heart className="w-5 h-5 text-gray-700 hover:fill-red-500 hover:text-red-500" />
              )}
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

          {isProductInCart(product._id) ? (
            <button
              onClick={handleNavigateToCart}
              to="/cart"
              className="
               flex-1
                flex 
                items-center 
                justify-center 
                w-full
                        px-6 
                        py-3 
                        border-2 
                        border-blue-500 
                        text-white 
                        rounded-lg 
                        bg-blue-600
                        font-semibold 
                        uppercase 
                        tracking-wider 
                        transition 
                        duration-300 
                        ease-in-out 
                        transform 
                        focus:outline-none 
                      "
            >
              <ShoppingCartIcon
                className="
                        w-5 
                        h-5 
                        mr-2 
                        group-hover:animate-bounce
                      "
              />
              Go To Cart
            </button>
          ) : (
            <button
              onClick={(e) => handleAddToCart(product, e)}
              className="
            flex-1 flex items-center justify-center px-4 w-full
              py-2 
              border-2 
              border-blue-500 
              text-blue-500 
              rounded-lg 
              transition 
              duration-300 
              ease-in-out 
              text-center 
              font-semibold 
              uppercase 
              tracking-wider 
              hover:shadow-md 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              focus:ring-opacity-50
            "
            >
              <ShoppingCartIcon
                className="
                        w-5 
                        h-5 
                        mr-2 
                        group-hover:animate-bounce
                      "
              />{" "}
              Add to Cart
            </button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
