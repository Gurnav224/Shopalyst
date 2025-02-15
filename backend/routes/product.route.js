const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  updateProductQuantity,
  getProductsByCategory,
  searchProducts,
} = require("../controllers/product.controller");
const auth = require('../middlewares/auth')
const router = express.Router();


router.get(/^\/products\/search$/,  searchProducts);


router.get("/products",  getAllProducts);
router.get("/products/:id", getSingleProduct);
router.put("/products/updateQuantity/:id", auth, updateProductQuantity);
router.get("/products/category/:category", getProductsByCategory);



module.exports = router;
