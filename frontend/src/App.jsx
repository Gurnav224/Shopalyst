import Home from "./pages/Home";
import { useState } from "react";
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
import Address from "./pages/Address";
import Checkout from "./pages/Checkout";

import { ToastContainer } from "react-toastify";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <ToastContainer  />

      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            }
          />

          <Route
            path=":category"
            element={
              <ProductList
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            }
          />

          <Route path="productId/:productId" element={<ProductDetails />} />
        </Route>

        <Route path="/cart" element={<PrivateRoute />}>
          <Route index element={<Cart />} />
        </Route>

        <Route path="/wishlist">
          <Route index element={<Wishlist />} />
        </Route>

        <Route path="/address">
          <Route index element={<Address />} />
        </Route>
        <Route path="/checkout">
          <Route index element={<Checkout />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
