const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    index: true, 
  },
  price: {
    type: Number,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  images: [{
    type: String, // Array of image URLs
    // required: true,
    
  }],
  tax: {
    type: Number, // Tax or commission percentage
  },
  expiry: {
    type: Date, // Expiry date of the product
  },
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  category: {
    type: String,
    index: true, // Index the product category
  },
  date: {
    type: Date, // Date of creation/modification
    default: Date.now,
    index: true,
  },
  brand: {
    type: String, // Brand of the product
    index: true,
  },
  tags: {
    type: [String], // Array of tags for the product
    index: true,
  },
  quantity: {
    type: Number, // Available quantity of the product

  },
  rating: {
    type: Number, // Average rating of the product
    index: true,

  },
  reviews: [
    {
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
    },
  ],
  returnPolicy: {
    type: String, // Return policy details
  },
  discount: {
    type: Number, // Discount percentage
    index: true,

  },
  salePrice: {
    type: Number, // Sale price of the product
  },
  saleStartDate: {
    type: Date, // Start date of the sale
  },
  saleEndDate: {
    type: Date, // End date of the sale
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
