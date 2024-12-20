const Product = require("../models/product.model");
const Wishlist = require("../models/wishlist.model");

exports.addToWishlist = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // find wislisht by user
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    // if wishlist is null create new wislist
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, items: [] });
    }

    // find product by id
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({ error: "proudct not found" });
    }

    // check product is already in the wislist
    const exitingItem = wishlist.items.find(
      (item) => item.product.toString() === productId
    );

    // if product is already in the wishlist increase it's quantity
    if (exitingItem) {
      exitingItem.quantity += 1;
    }
    // else push the product into wishlist
    else {
      wishlist.items.push({
        product: productId,
        quantity,
        price: product.price,
      });
    }

    await wishlist.save();

    res.status(200).json({ message: "Product added to wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.body;
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(400).json({ error: "wishlist not found" });
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== productId
    );

    if (wishlist.items.length === 0) {
      return res.status(200).json({ message: "no items in the wishlist" });
    }

    await wishlist.save();
    await wishlist.populate("items.product");

    res.status(200).json({ message: "product remove the wishlist", wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
};

exports.viewWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(400).json({ error: "wishlist not found" });
    }

    res
      .status(200)
      .json({ message: "get wishlist item successfully", wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "An error occurred while fetching your wishlist. Please try again later.",
    });
  }
};
