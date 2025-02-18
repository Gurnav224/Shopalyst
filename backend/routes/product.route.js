const express = require("express");
const {
  getProducts,
  getSingleProduct,
  updateProductQuantity,
  getProductsByCategory,
} = require("../controllers/product.controller");
const auth = require('../middlewares/auth')
const router = express.Router();




router.get("/products",  getProducts);
router.get("/products/:id", getSingleProduct);
router.put("/products/updateQuantity/:id", auth, updateProductQuantity);
router.get("/products/category/:category", getProductsByCategory);



module.exports = router;
