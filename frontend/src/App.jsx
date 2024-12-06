import Home from "./pages/Home";
import { useState } from "react";
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from "./pages/Cart";
import Header from "./components/Header";

function App() {
  const [cart , setCart] = useState([]);

  console.log(cart)
  return (
    <Router>  

    <Header cart={cart}/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/products" element={<ProductList setCart={setCart}/>} />
    <Route path="/products/:category" element={<ProductList/>} />
    <Route path="/products/productId/:productId" element={<ProductDetails/>} />
    <Route path="/cart" element={<Cart cart={cart}/>} />
    </Routes>

    </Router>
  )
}

export default App
