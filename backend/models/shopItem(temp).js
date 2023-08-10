const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const shopItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  size: { type: String, required: true },
  images: [{ type: String, required: true }],
  rating: { type: Number, default: 0 },
  reviews: [reviewSchema], // Embedding the review schema in the shop item schema
  shipping: { type: Number, default: 0 },
  availability: { type: Boolean, default: true },
  tags: [String],
  tax: { type: Number, default: 0 },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const ShopItem = mongoose.model('ShopItem', shopItemSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports = { ShopItem, Review };
