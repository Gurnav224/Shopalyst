const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  updateProductQuantity,
  getProductsByCategory,
} = require("../controllers/product.controller");
const auth = require('../middlewares/auth')
const router = express.Router();

router.get("/products", auth, getAllProducts);
router.get("/products/:id", auth, getSingleProduct);
router.put("/products/updateQuantity/:id", auth, updateProductQuantity);
router.get("/products/category/:category", auth, getProductsByCategory);


module.exports = router;
