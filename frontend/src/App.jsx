import Home from "./pages/Home";
import { useState } from "react";
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from "./pages/Cart";
import Header from "./components/Header";
import Wishlist from "./pages/Wishlist";

function App() {
  const [cart , setCart] = useState([]);
  const [wishlist , setWishlist] = useState([]);

  console.log(cart)
  console.log(wishlist)

  return (
    <Router>  

    <Header cart={cart}/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/products" element={<ProductList setCart={setCart} setWishlist={setWishlist}/>} />
    <Route path="/products/:category" element={<ProductList setCart={setCart} setWishlist={setWishlist}/> } />
    <Route path="/products/productId/:productId" element={<ProductDetails setCart={setCart} setWishlist={setWishlist}/>} />
    <Route path="/cart" element={<Cart cart={cart} />} />
    <Route path="/wishlist" element={<Wishlist wishlist={wishlist} />} />
    </Routes>

    </Router>
  )
}

export default App
