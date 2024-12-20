const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const exitingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (exitingItem) {
      exitingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
      });
    }

    await cart.save();
    await cart.populate("items.product");

    res
      .status(200)
      .json({ message: "Product successfully added to cart", cart });
  } catch (error) {
    console.log("error adding item to cart ", error);
    res.status(500).json({ error: "error adding item cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate("items.product");

    res
      .status(200)
      .json({ message: "product remove from cart successfully", cart });
  } catch (error) {
    console.error("Failed to remove the product from cart:", error);
    res.status(500).json({ error: "Failed to remove product from cart" });
  }
};

exports.viewCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart) {
      return res.status(400).json({ error: "Empty cart" });
    }

    res.status(200).json({ message: "Cart items", cart });
  } catch (error) {
    console.error("error to view cart products , ", error);
    res.status(500).json({ error: "failed to load cart product" });
  }
};

exports.updateQuantity = async (req, res) => {
  const { productId, action } = req.body;

  if (!["increase", "decrease"].includes(action)) {
    return res
      .status(400)
      .json({ error: "Invalid action, Use increase or decrease" });
  }

  try {
    // First find the cart
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(400).json({ error: "Cart not found" });
    }

    // Find the item in cart
    const cartItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!cartItem) {
      return res.status(400).json({ error: "Item not found in cart" });
    }

    // Update quantity
    if (action === "increase") {
      cartItem.quantity += 1;
    } else {
      if (cartItem.quantity <= 1) {
        cart.items = cart.items.filter(
          (item) => item.product.toString() !== productId
        );
      } else {
        cartItem.quantity -= 1;
      }
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({
      message:
        action === "increase"
          ? "Cart item quantity increased successfully"
          : cartItem.quantity === 0
          ? "Item removed from cart"
          : "Cart item quantity decreased successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
