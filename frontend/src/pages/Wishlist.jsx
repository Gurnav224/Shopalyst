/* eslint-disable react/prop-types */
import { Trash2Icon, ShoppingCartIcon , Heart } from "lucide-react";

const Wishlist = ({
  wishlist,
  handleRemoveProductFromWishlist,
  handleAddToCart,
}) => {



  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-gray-800 text-center">
        My Wishlist ({wishlist.length || 0})
      </h1>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-600 mb-4">
            Your wishlist is empty
          </p>
          <p className="text-gray-500">
            Explore our products and add some items to your wishlist!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist?.map((item) => (
            <div 
              key={item._id} 
              className="
                bg-white 
                rounded-xl 
                shadow-lg 
                overflow-hidden 
                transform 
                transition 
                duration-300 
                hover:shadow-xl 
                hover:-translate-y-2
              "
            >
              {/* Product Image */}
              <div className="relative">
              <div className="absolute top-4 right-4 flex space-x-2">
              <button
              
              className="bg-white/70 p-2 rounded-full hover:bg-white/90 transition-all"
            >
                <Heart className="w-5 h-5  fill-red-500 text-red-500" />
            </button>
              </div>
             
                <img
                  src={item?.thumbnail}
                  alt={item?.product?.name}
                  className="
                    w-full 
                    h-48 
                    object-cover 
                    object-center 
                    transition 
                  "
                />
                {/* {item.product.discount && (
                  <span className="
                    absolute 
                    top-2 
                    right-2 
                    bg-red-500 
                    text-white 
                    px-2 
                    py-1 
                    rounded-full 
                    text-xs
                  ">
                    {item.product.discount}% OFF
                  </span>
                )} */}
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {item?.product?.name}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  {item?.product?.brand}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Quantity: {item.quantity}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gray-900">
                    ${item.price.toLocaleString()}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => handleAddToCart(item?.product, e)}
                    className="
                      flex-1 
                      flex 
                      items-center 
                      justify-center 
                      bg-blue-500 
                      text-white 
                      py-2 
                      rounded-lg 
                      hover:bg-blue-600 
                      transition 
                      duration-300 
                      group
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
                    Move to Cart
                  </button>
                  
                  <button
                    onClick={() => handleRemoveProductFromWishlist(item?.product?._id)}
                    className="
                      flex 
                      items-center 
                      justify-center 
                      bg-red-50 
                      text-red-500 
                      p-2 
                      rounded-lg 
                      hover:bg-red-100 
                      transition 
                      duration-300 
                      group
                    "
                    title="Remove from Wishlist"
                  >
                    <Trash2Icon 
                      className="
                        w-5 
                        h-5 
                        group-hover:text-red-700 
                        transition 
                        duration-300
                      " 
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;