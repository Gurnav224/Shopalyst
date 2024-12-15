const Category = require('../models/category.model'); 

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.status(400).json({ error: "no categories not found" });
    }
    res.status(200).json({ data: { categories } });
  } catch (error) {
    console.error("failed to get categories", error);
    res.status(500).json({ error: "server error" });
  }
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(400).json({ message: "category not found" });
    }
    res.status(200).json({ message: "get category by Id", category });
  } catch (error) {
    console.error("failed to get category by id", error);
    res.status(500).json({ error: "server error" });
  }
};
