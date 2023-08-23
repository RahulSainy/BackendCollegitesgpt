const mongoose = require('mongoose');
const slugify = require('slugify')
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 50,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: slugify('name'),
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
  },
  images: {
    type: [String],
    required: true,
  },
  tax: {
    type: Number,
  },
  expiry: {
    type: Date,
  },
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  brand: {
    type: String,
  },
  tags: {
    type: [String],
  },
  quantity: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
    },
    review: {
      type: String,
    },
  }],
  returnPolicy: {
    type: String,
  },
  discount: {
    type: Number,
  },
  salePrice: {
    type: Number,
  },
  saleStartDate: {
    type: Date,
  },
  saleEndDate: {
    type: Date,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: 'User',
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
