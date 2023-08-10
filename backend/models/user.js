const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  enrollmentNo: {
    type: String,
    required: function () {
      return this.role === "User"; // Only required for users
    },
  },
  semester: {
    type: Number,
    required: function () {
      return this.role === "User"; // Only required for users
    },
  },
  branch: {
    type: String,
    required: function () {
      return this.role === "User"; // Only required for users
    },
  },
  isEmailConfirmed: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["Admin", "Moderator", "User"],
    default: "User",
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenExpiresAt: {
    type: Date,
  },
  // cart: [
  //   {
  //     item: { type: mongoose.Schema.Types.ObjectId, ref: 'ShopItem', required: true },
  //     quantity: { type: Number, default: 1 },
  //   },
  // ],
  // orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  // wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShopItem' }],

  // Cart information
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],



  // Order history
  orders: [
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },
      // ... other order-related information ...
    },
  ],


});

const User = mongoose.model("User", userSchema);

module.exports = User;
