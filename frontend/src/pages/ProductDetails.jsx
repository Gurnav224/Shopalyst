/* eslint-disable react/prop-types */
import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useWislist } from "../context/WishlistContext.jsx";
import api from '../services/clientAPI.js'

const ProductDetails = () => {

  const { handleAddToCart, isProductInCart} = useCart();
  const { handleAddToWishlist, isProductInWishlist, fetchWishlist, wishlist} = useWislist()

  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  const updateProduct = async (id, updatedQuantity) => {
    try {
      const response = await api.put(`/products/updateQuantity/${id}`,{quantity:updatedQuantity});

      if (response.status === 200) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          quantity: updatedQuantity,
        }));
      }
    } catch (error) {
      console.error(error?.response?.data?.error || "Failed to update the product quantity" );
    }
  };

  const fetchProductById = useCallback(async () => {
    const response = await api.get(`/products/${productId}`);
    setProduct(response?.data?.product);
  }, [productId]);

  useEffect(() => {
    fetchProductById();
  }, [fetchProductById]);

  useEffect(() => {
    fetchWishlist()
  },[fetchWishlist, wishlist.length])

  const handleIncrement = (id) => {
    const newQuantity = product.quantity + 1;
    updateProduct(id, newQuantity);
  };

  const handleDecrement = (id) => {
    const newQuantity = Math.max(0, product.quantity - 1);
    updateProduct(id, newQuantity);
  };

  const fetchCategoriesProduct = useCallback(async () => {
    try {
      const response = await api.get(`/products/category/${product?.category}`);
      setRelatedProducts(response?.data?.products || []);
    } catch (error) {
      console.error("Error details:",  error.response?.data?.message );
    }
  }, [product?.category]);

  useEffect(() => {
    if (product?.category) {
      fetchCategoriesProduct();
    }
  }, [fetchCategoriesProduct, product?.category]);


  const handleNavigateToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate("/cart");
  };

  const handleBuyNow = (product, e) => {
    handleAddToCart(product, e);
    setTimeout(() => {
      navigate("/cart");
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Product Images Slider */}
        <div className="p-4 relative">
          <div className="flex items-center justify-center ">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="max-w-full h-96 object-contain rounded-lg"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={(e) => handleBuyNow(product, e)}
              className="flex-1 flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Buy Now
            </button>

            {isProductInCart(product._id) ? (
              <button
                onClick={handleNavigateToCart}
                to="/cart"
                className="
               flex-1 flex items-center justify-center 
                        px-6 
                        py-3 
                        bg-transparent 
                        border-2 
                        border-blue-500 
                        text-blue-500
                        rounded-lg 
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
                <ShoppingCart className="mr-2" /> Go To Cart
              </button>
            ) : (
              <button
                onClick={(e) => handleAddToCart(product, e)}
                className="
            flex-1 flex items-center justify-center px-4 
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
                <ShoppingCart className="mr-2" /> Add to Cart
              </button>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center space-x-4">
            <div className="flex items-center text-yellow-500">
              <Star className="w-5 h-5 fill-current mr-1" />
              <span className="font-semibold">{product.rating} / 5</span>
            </div>
            <span className="text-gray-500">|</span>
            <span className="text-gray-600">Brand: {product.brand}</span>
          </div>

          <div className="text-4xl font-extrabold text-blue-600 my-4">
            Price: ${product.price}
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Quantity Control */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-gray-700 font-medium">Quantity:</span>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => handleDecrement(product._id)}
                disabled={product.quantity <= 0}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <span className="px-6 py-2 bg-white text-center min-w-[60px]">
                {product.quantity}
              </span>
              <button
                onClick={() => handleIncrement(product._id)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div>
              <span className="block text-sm text-gray-600">Category</span>
              <span className="font-medium">{product.category}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-600">Availability</span>
              <span
                className={`font-medium ${
                  product.quantity > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Related Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts?.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
              handleAddToWishlist={handleAddToWishlist}
              isProductInCart={isProductInCart}
              isProductInWishlist={isProductInWishlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
