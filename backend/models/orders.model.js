const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  }
});

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [orderItemSchema],
  shippingAddress: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    required: true
  },
  paymentInfo: {
    method: {
      type: String,
      required: true,
      enum: ['card', 'paypal', 'cod']
    },
    status: {
      type: String,
      default: "pending"
    },
    transactionId: {
      type: String
    }
  },
  orderStatus: {
    type: String,
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  shippingFee: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  }
}
  , { timestamps: true });


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;