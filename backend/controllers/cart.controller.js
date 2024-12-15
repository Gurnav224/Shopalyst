const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");

exports.addToCart = async (req, res) => {
  const { productId, quantity, price } = req.body;
  console.log(productId, quantity, price);
  try {
    if (!req.session.cart) {
      req.session.cart = { items: [] };
    }

    const itemIndex = req.session.cart.items.findIndex(
      (item) => item.productId === productId
    );
    console.log(itemIndex);

    if (itemIndex !== -1) {
      req.session.cart.items[itemIndex].quantity += quantity;
    } else {
      req.session.cart.items.push({ productId, quantity, price });
    }
    console.log(req.session.cart);

    res.status(200).json({ message: "cart successfully " });
  } catch (error) {
    console.log("error adding item to cart ", error);
    res.status(500).json({ error: "error adding item cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.params; // Assuming itemId in request params
  try {
    if (!req.session.cart) {
      return res.status(404).json({ error: "Cart is Empty" });
    }

    const itemIndex = req.session.cart.items.findIndex((item) => {
      // Check data type match for product ID
      return item.productId === productId;
    });

    console.log(itemIndex);

    if (itemIndex !== -1) {
      req.session.cart.items.splice(itemIndex, 1);
      req.session.save(); // Save the updated cart, regardless of item found
      res.status(200).json({ message: "Item removed from cart" });
    } else {
      res.status(404).json({ error: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Failed to remove the product from cart:", error);
    res.status(500).json({ error: "Failed to remove product from cart" });
  }
};

exports.updateCart = async (req , res) => {
  const {productId , quantity} = req.body;
  try {
    if(!req.session.cart) {
      return res.status(404).json({error:"Cart Is Empty"})
    }
    const itemIndex = req.session.cart.items.findIndex((item) => item.productId === productId);

    if(itemIndex !== -1){
      req.session.cart.items[itemIndex].quantity = quantity
      req.session.save();
      res.status(200).json({message:"Cart updated Successfully"})
    }
    else{
      res.status(404).json({message:"Item not found in the cart"})
    }
  } catch (error) {
    console.error('failed to update the item in cart');
    res.status(500).json({error:"failed to update the item in cart"})
  }
}

exports.viewCart = async (req, res) => {
  try {
    if (req.session.cart) {
      res.send("Your cart items: " + JSON.stringify(req.session.cart));
    } else {
      req.session.cart = { items: [] };
      res.send("Welcome!, Your Cart is empty");
    }
  } catch (error) {
    console.error("error to view cart products , ", error);
    res.status(500).json({ error: "failed to load cart product" });
  }
};
