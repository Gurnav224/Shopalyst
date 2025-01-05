const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
},
email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
  ],
  wishlist: [{ type: Schema.Types.ObjectId, ref: "Wishlist" }],
  addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
  order:[{type:Schema.Types.ObjectId,ref:'Order'}],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// hash password before saving in database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords

userSchema.methods.comparePassword = async function (candiatePassword) {
  return await bcryptjs.compare(candiatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
