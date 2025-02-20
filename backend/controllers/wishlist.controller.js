const Product = require("../models/product.model");
const Wishlist = require("../models/wishlist.model");
const User = require("../models/user.model");

exports.addToWishlist = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  try {
    // find wislisht by user
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({ error: "product not found" });
    }

    // if wishlist is null create new wishlist
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, items: [] });
    }

    // check product is already in the wishlist
    const exitingItem = wishlist.items.find(
      (item) => item.product._id.toString() === productId
    );

    // if product is already in the wishlist increase it's quantity
    if (exitingItem) {
      // Increase quantity if the product is already in the wishlist
      exitingItem.quantity += 1;
    } else {
      // else push the product into wishlist
      wishlist.items.push({
        product: productId,
        quantity,
        thumbnail: product.thumbnail || null,
        price: product.price || 0,
      });
    }

    await wishlist.save();

    // Update user wishlist reference if not already linked

    if (!wishlist._id.equals(req.user.wishlist)) {
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $set: { wishlist: wishlist._id },
        },
        { new: true }
      );
    }
    else{
      console.log('wishlist is associated with the authenticated  user')
    }

    res.status(200).json({ message: "Product added to wishlist", wishlist });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ error: "server error" });
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

    if(wishlist === null){
      return res.status(400).json({error:'no item in the wishlist', wishlist:[]})
    }

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
