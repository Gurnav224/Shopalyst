import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import Wishlist from "./pages/Wishlist";
import LoginForm from "./pages/LoginForm";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import SignForm from "./pages/SignupForm";
import api from "./api/api";

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

  const fetchWishlist = async () => {
    try {
      setWishlist((prev) => (prev.length ? prev : []));

      const {
        wishlist: { items },
      } = await api.getItemFromWishlist();

      setWishlist([...items]);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => {
      return item?.product?._id === productId;
    });
  };

  const handleAddToWishlist = async (product, e) => {
    e.stopPropagation();
    e.preventDefault();
  
    const { _id } = product; // Destructure product for easier access
    const previousWishlist = [...wishlist]; // Backup current state
  
    // Check if the product is already in the wishlist
    const existingProduct = wishlist.find((item) => item?.product?._id === _id);
  
    // Create updated wishlist state
    const updatedWishlist = existingProduct
      ? wishlist.map((item) =>
          item.product._id === _id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...wishlist, { ...product, quantity: 1 }];
  
    setWishlist(updatedWishlist); // Optimistically update the state
  
    try {
      // API call to update the wishlist on the server
      const response = await api.AddToWishlist(_id, 1);
  
      // Validate the API response
      if (!response || response.message !== "Product added to wishlist") {
        throw new Error(response?.message || "Unknown server error");
      }
  
      // Refresh the wishlist from the server
      await fetchWishlist();
    } catch (error) {
      console.error("Failed to add item to the wishlist:", error);
  
      // Revert state to the previous backup
      setWishlist(previousWishlist);
    } finally {
      console.log("Add to wishlist attempt completed for:", product);
    }
  };
  
  
  const isProductInCart = (productId) => {
    return cart.some((item) => item._id === productId);
  };

  const handleRemoveProductFromWishlist = async (productId) => {
    // Store the previous wishlist state
    const previousWishlist = [...wishlist];

    // Optimistically update the UI
    setWishlist((prev) =>
      prev.filter((item) => item?.product?._id !== productId)
    );

    try {
      // Make the API call
      const response = await api.removeFromWishlist(productId);
      console.log("respnose", response);

      // If the API call fails, revert the state
      if (response.message !== "product remove the wishlist") {
        console.error("Failed to remove item from wishlist");
        setWishlist(previousWishlist); // Revert to the old state
      }
    } catch (error) {
      // On error, revert the state
      console.error("Error removing item from wishlist:", error);
      setWishlist(previousWishlist);
    }
  };

  return (
    <Router>
      <Header cart={cart} wishlist={wishlist} />
      <Routes>
        <Route path="/signup" element={<SignForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}
        <Route path="/profile" element={<PrivateRoute />}>
          <Route index element={<Profile />} />
        </Route>

        <Route path="/products" element={<PrivateRoute />}>
          <Route
            index
            element={
              <ProductList
                handleAddToCart={handleAddToCart}
                isProductInCart={isProductInCart}
                handleAddToWishlist={handleAddToWishlist}
                isProductInWishlist={isProductInWishlist}
              />
            }
          />

          <Route
            path=":category"
            element={
              <ProductList
                handleAddToCart={handleAddToCart}
                handleAddToWishlist={handleAddToWishlist}
                isProductInCart={isProductInCart}
                isProductInWishlist={isProductInWishlist}
                cart={cart}
              />
            }
          />

          <Route
            path="productId/:productId"
            element={
              <ProductDetails
                handleAddToCart={handleAddToCart}
                handleAddToWishlist={handleAddToWishlist}
                isProductInCart={isProductInCart}
                isProductInWishlist={isProductInWishlist}
              />
            }
          />
        </Route>

        <Route path="/cart" element={<PrivateRoute />}>
          <Route index element={<Cart cart={cart} />} />
        </Route>

        <Route path="/wishlist">
          <Route
            index
            element={
              <Wishlist
                wishlist={wishlist}
                setWishlist={setWishlist}
                handleRemoveProductFromWishlist={
                  handleRemoveProductFromWishlist
                }
                handleAddToCart={handleAddToCart}
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
