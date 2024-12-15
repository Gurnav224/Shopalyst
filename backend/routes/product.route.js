const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  updateProductQuantity,
  getProductsByCategory,
  getProductsBySelectedCategory,
} = require("../controllers/product.controller");
const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct);
router.put("/products/updateQuantity/:id", updateProductQuantity);
router.get("/products/category/:category", getProductsByCategory);


module.exports = router;
