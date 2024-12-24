const Product = require("../models/product.model");
const Wishlist = require("../models/wishlist.model");
const User = require("../models/user.model");

exports.addToWishlist = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // find wislisht by user
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    // if wishlist is null create new wislist
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, items: [] });
    }

    const updateUser = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { wishlist: wishlist._id } },
      { new: true }
    );

    await updateUser.save();

    // find product by id
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({ error: "proudct not found" });
    }

    // check product is already in the wislist
    const exitingItem = wishlist.items.find(
      (item) => item.product._id.toString() === productId
    );

    // if product is already in the wishlist increase it's quantity
    if (exitingItem) {
      exitingItem.quantity += 1;
    } else {
      // else push the product into wishlist
      wishlist.items.push({
        product: productId,
        quantity,
        thumbnail: product.thumbnail,
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
      return res.status(404).json({ error: "Wishlist not found" });
    }

    // Convert ObjectId to string for comparison
    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== productId
    );

    await wishlist.save();

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {$pull:{wishlist:wishlist._id}},
      {new:true}
    );

    await user.save()
 
    return res.status(200).json({
      message: "product remove the wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Wishlist removal error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.viewWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
      "items.product"
    );

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
