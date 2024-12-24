const Address = require("../models/address.model");
const User = require("../models/user.model");

exports.createAddress = async (req, res) => {
  const {
    addressLine1,
    addressLine2,
    street,
    city,
    state,
    zipCode,
    label,
    country,
    type,
    isDefault,
  } = req.body;

  try {
    const address = new Address({
      user: req.user._id,
      addressLine1,
      addressLine2,
      street,
      city,
      state,
      zipCode,
      label,
      country,
      type,
      isDefault,
    });
    await address.save();

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { addresses: address._id } },
      { new: true }
    );

    await user.save();

    res.status(201).json({ message: "new address added succesfully", address });
  } catch (error) {
    console.error("failed to create new address", error);
    res.status(500).json({ error: "server error" });
  }
};

exports.getAddress = async (req, res) => {
  try {
    const address = await Address.find({ user: req.user._id });

    if (address.length === 0) {
      return res.status(400).json({ error: "Address not found" });
    }

    res.status(200).json({ message: "get address successfully", address });
  } catch (error) {
    console.error("failed to get user address", error);
    res.status(500).json({ error: "server error" });
  }
};

exports.updateAddress = async (req, res) => {
  const { addressId } = req.params;
  try {
    const address = await Address.findOneAndUpdate(
      { user: req.user._id, _id: addressId },
      req.body,
      { new: true }
    );

    if (!address) {
      return res.status(400).json({ error: "address not found" });
    }

    res.status(200).json({ message: "address updated successfully", address });
  } catch (error) {
    console.error("failed to update address", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deletetAddress = async (req, res) => {
  const { addressId } = req.params;
  try {
    const address = await Address.findByIdAndDelete(addressId);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { addresses: address._id } },
      { new: true }
    );

    await user.save();

    console.log("user address deleted", user);

    if (!address) {
      return res.status(400).json({ error: "address not found" });
    }

    res.status(500).json({ message: "address deleted successfully" });
  } catch (error) {
    console.error("failed to delete the address", error);
    res.status(500).json({ error: error.message });
  }
};
