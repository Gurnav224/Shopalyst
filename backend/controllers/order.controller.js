const Cart = require("../models/cart.model.js");
const Order = require("../models/orders.model.js");
const User = require("../models/user.model.js");

exports.createOrder = async (req, res) => {
  console.log("create Order");
  const { addressId, paymentMethod } = req.body;
  console.log(addressId, paymentMethod);
  try {
    // fetch the cart
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );

    // add the cart items to order
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.product.quantity,
      thumbnail: item.product.thumbnail,
    }));

    // create new order ;

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      shippingAddress: addressId,
      paymentInfo: {
        method: paymentMethod,
        status: "pending",
      },
      totalAmount: cart.totalAmount,
      shippingFee: 50,
      tax: cart.totalAmount * 0.1,
      discount: 0,
    });

    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] },
      { new: true },
    );

    const savedOrder = await order.save();

    // Update user's order field if not already set
    if (!req.user.order || !savedOrder._id.equals(req.user.order)) {
      await User.findByIdAndUpdate(
        req.user._id,
        { $set: { order: savedOrder._id } },
        { new: true },
      );
    }

    res.json(savedOrder);
  } catch (error) {
    console.log("error while creating order", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findOne({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("shippingAddress");

    res
      .status(200)
      .json({ message: "order details getting successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
