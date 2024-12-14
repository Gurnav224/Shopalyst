import Home from "./pages/Home";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import Wishlist from "./pages/Wishlist";

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);



  const handleAddToCart = (product, e) => {
    // Stop event propagation to prevent link navigation
    e.stopPropagation();
    e.preventDefault();
    //exiting product cart ;

    if (isProductInCart(product._id)) {
      alert("Product is already in the cart!");
      return;
    }

    // implement add to cart logic
    setCart((prev) => [...prev, product]);
    console.log("Added to cart:", product);
  };

  const handleAddToWishlist = (product, e) => {
    // Stop event propagation to prevent link navigation
    e.stopPropagation();
    e.preventDefault();
    // Implement add to wishlist logic

    setWishlist((prev) => [...prev, product]);
    console.log("Added to wishlist:", product);
  };



  const isProductInCart = (productId) => {
    return cart.some((item) => item._id === productId);
  };

  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId)
  }


  const handleRemoveProductFromWishlist = (productId) => {
   setWishlist((prev) => prev.filter((item) => item._id !== productId))
  }


  return (
    <Router>
      <Header cart={cart} wishlist={wishlist} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <ProductList
              handleAddToCart={handleAddToCart}
              handleAddToWishlist={handleAddToWishlist}
              isProductInCart={isProductInCart}
              isProductInWishlist ={isProductInWishlist}
            />
          }
        />
        <Route
          path="/products/:category"
          element={
            <ProductList
              handleAddToCart={handleAddToCart}
              handleAddToWishlist={handleAddToWishlist}
              isProductInCart={isProductInCart}
              isProductInWishlist = {isProductInWishlist}
              cart={cart}
            />
          }
        />

        <Route
          path="/products/productId/:productId"
          element={
            <ProductDetails
              handleAddToCart={handleAddToCart}
              handleAddToWishlist={handleAddToWishlist}
              isProductInCart={isProductInCart}
              isProductInWishlist = {isProductInWishlist}
            />
          }
        />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route 
        path="/wishlist" 
        element={<Wishlist
         wishlist={wishlist} 
         setWishlist={setWishlist}
         handleRemoveProductFromWishlist ={handleRemoveProductFromWishlist}
         handleAddToCart = {handleAddToCart}
          />} />
      </Routes>
    </Router>
  );
}

export default App;
