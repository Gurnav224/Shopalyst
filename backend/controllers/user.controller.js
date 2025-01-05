const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // check if user already exists

    const exitingUser = await User.findOne({ email });

    if (exitingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // create new user

    const user = new User({
      name,
      email,
      password,
    });
    
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: "Registered successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("failed to register user");
    res.status(500).json({ error: "failed to register new user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(201).json({ error: "Invalid Credentials" });
    }

    // verify password;

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // generate token
    const token = generateToken(user._id);

    res.json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "login failed" });
  }
};

exports.user = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).populate("cart").populate("wishlist").populate('order');

    if (!user) {
      return res.status(400).json({ error: "No user found" });
    }

    res.status(200).json({ message: "all users get successfully", user });
  } catch (error) {
    console.error("failed to fetch all users from db", error);
    res.status(500).json({ error: "server error" });
  }
};
