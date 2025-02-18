const Product = require("../models/product.model");

exports.getProducts = async (req, res) => {
  let query = {};
  const searchTerm = req.query.search
  if(searchTerm){
    query.name = { $regex: searchTerm, $options: 'i' }
  }
  try {
    const products = await Product.find(query);

    if(products.length === 0) {
      return res.status(400).json({error:'No products found with this name'})
    }

    res.json({ message: "get all products", products });
  } catch (error) {
    console.error("error getting products", error);
    res.status(500).json({ error: "server error" });
  }
};

exports.getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(400).json({ error: "product not found" });
    }

    res.status(200).json({ message: "get product by id", product });
  } catch (error) {
    console.error("failed to get single product", error);
    res.status(500).json({ message: "error to get single product" });
  }
};

exports.updateProductQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const updateProductQuantity = await Product.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "product updated successfully", updateProductQuantity });
  } catch (error) {
    res.status(500).json({error:'failed to update the product quantity'});
  }
};

// product details page category related controller function
exports.getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category: category });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "failed to get related category" });
    }
    res
      .status(200)
      .json({ message: "get product by related category", products });
  } catch (error) {
    console.error("failed get category related product");
    res.status(500).json({ message: "failed get category related product" });
  }
};

