const fs = require('fs');
const path = require('path');
const Product = require("../models/Product");
const imgbbUploader = require("imgbb-uploader"); // Import the imgbb-uploader package
const upload = require("../middlewares/uploadMiddleware"); // Update the path


exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      // Add other properties as needed
    } = req.body;

    // Handle image upload using multer middleware
    upload.array('images')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const imageUrls = [];

      // Upload each image to imgbb and collect the URLs
      for (const file of req.files) {
        const imageUrl = await imgbbUploader({
          apiKey: process.env.IMGBB_API_KEY,
          imagePath: file.path, // Use the file path directly
        });
        imageUrls.push(imageUrl.url); // Get the URL of the uploaded image
      // Remove the temporary image file from the server
      fs.unlinkSync(file.path);
    }

      const newProduct = new Product({
        name,
        price,
        // Add other properties
        images: imageUrls, // Use the image URLs
      });

      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("creator", "name email");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  console.log("why here");
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId)
      .populate("creator", "name email")
      .populate({
        path: "reviews.userId",
        select: "name",
      });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const updateData = req.body;

  try {
    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findByIdAndRemove(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getApprovedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      approvalStatus: "approved",
    }).populate("creator", "name email");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Filter products by category
exports.filterProductsByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const filteredProducts = await Product.find({
      category,
      approvalStatus: "approved",
    }).populate("creator", "name email");
    res.json(filteredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Sort products by price (ascending)
exports.sortProductsByPrice = async (req, res) => {
  try {
    const sortedProducts = await Product.find({ approvalStatus: "approved" })
      .sort({ price: 1 })
      .populate("creator", "name email");
    res.json(sortedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Search products by name or description
exports.searchProducts = async (req, res) => {
  const searchQuery = req.query.q;

  try {
    const searchResults = await Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ],
      approvalStatus: "approved",
    }).populate("creator", "name email");

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get unapproved products (admin only)
exports.getRejectedProducts = async (req, res) => {
  try {
    const unapprovedProducts = await Product.find({
      approvalStatus: "rejected",
    }).populate("creator", "name email");
    res.json(unapprovedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get unapproved products (admin only)
exports.getPendingProducts = async (req, res) => {
  try {
    const unapprovedProducts = await Product.find({
      approvalStatus: "pending",
    }).populate("creator", "name email");
    res.json(unapprovedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Approve a product (admin only)
exports.approveProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      { approvalStatus: "approved" },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
