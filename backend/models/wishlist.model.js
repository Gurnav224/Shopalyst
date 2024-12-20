const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true,
    unique:true
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity:{
        type:Number,
        required:true,
        min:1,
      },
      price:{
        type:Number,
        required:true
      }
    },
  ],
},{
  timestamps:true
});

const Wislist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wislist;
