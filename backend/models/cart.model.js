const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartItemSchema = Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Method to calculate cart total
cartSchema.methods.calculateTotal = function () {
  this.totalAmount = this.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
};

// Middleware to update total amount before saving
cartSchema.pre("save", function (next) {
  this.calculateTotal(), next();
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
