const express = require("express");
const {
  getCategoryById,
  getAllCategories,
} = require("../controllers/category.controller");
const router = express.Router();

router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);

module.exports = router;
