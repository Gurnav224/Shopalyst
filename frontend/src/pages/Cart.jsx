/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Cart = ({
  cart,
  removeItemFromCart,
  totalCart,
  fetchCart,
  updateQuantity,
  handleAddToWishlist,
  isProductInWishlist,
}) => {
  const totalPrice =
    cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  useEffect(() => {
    if (cart?.length > 0) {
      fetchCart();
    }
  }, [fetchCart, cart?.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">
          MY CART ({cart?.length || 0})
        </h2>
        <ToastContainer />

        {cart?.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Takes up 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {cart?.map((item) => (
                <div key={item._id} className="bg-white rounded-lg p-6">
                  <div className="flex gap-6">
                    <div className="w-48 h-48">
                      <img
                        src={
                          item.thumbnail ||
                          (item.product && item.product.thumbnail)
                        }
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <h3 className="text-xl font-medium">
                        {item.product?.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-semibold">
                          ${item.price}
                        </span>
                        <span className="text-gray-400 line-through">
                          ${item.price * 2}
                        </span>
                        <span className="text-green-600">50% off</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Quantity :</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item, "decrease")}
                            className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item, "increase")}
                            className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => removeItemFromCart(item.product._id)}
                          className="w-full py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
                        >
                          Remove From Cart
                        </button>
                        <button
                          onClick={(e) => handleAddToWishlist(item.product, e)}
                          className="w-full py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        >
                          {isProductInWishlist(item?.product?._id) ? (
                            <Link
                              to="/wishlist"
                              className="flex justify-center gap-2"
                            >
                              <Heart className="w-5 h-5  fill-red-500 text-red-500" />
                              Go To Wishlist
                            </Link>
                          ) : (
                            <div className="flex justify-center gap-2">
                              <Heart className="w-5 h-5 text-gray-700 hover:fill-red-500 hover:text-red-500" />
                              Move to Wishlist
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Details - Takes up 1 column */}
            {cart.length > 0 && (
              <div className="bg-white rounded-lg p-6 h-fit">
                <h3 className="text-lg font-semibold mb-4">PRICE DETAILS</h3>
                <div className="space-y-3 border-b pb-4 mb-4">
                  <div className="flex justify-between">
                    <span>Price ({cart?.length || 0} item)</span>
                    <span>
                      $
                      {totalPrice.toLocaleString() ||
                        totalCart.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>- $10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span>$49</span>
                  </div>
                </div>
                <div className="flex justify-between font-semibold text-lg mb-6">
                  <span>TOTAL AMOUNT</span>
                  <span>
                    $
                    {(totalPrice - 10 + 49).toLocaleString() ||
                      (totalCart - 10 + 49).toLocaleString()}
                  </span>
                </div>
                <p className="text-green-600 mb-4">
                  You will save $1000 on this order
                </p>
                <Link
                  to="/address"
                  className="w-full block text-center  py-3 bg-blue-500 text-white  rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Checkout
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
