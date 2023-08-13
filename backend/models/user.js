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
    enum: ['Admin', 'Moderator', 'User', 'Hub', 'PrimeUser'],
    default: 'User',
  },

  hubInfo: {
    hubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hub',
    },
    latitude: Number,
    longitude: Number,
  },
  
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenExpiresAt: {
    type: Date,
  },


});

const User = mongoose.model("User", userSchema);

module.exports = User;
