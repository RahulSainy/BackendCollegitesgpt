const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['placed', 'cancelled', 'delivered'],
    default: 'placed',
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  selectedHub: {
    hubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hub', // Reference to the Hub model
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
  },
});

orderSchema.index({ location: '2dsphere' }); // Create a 2dsphere index for geolocation

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
