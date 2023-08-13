const Product = require('../models/Product');

// Add a new product
exports.addProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    tax,
    expiry,
    category,
    brand,
    tags,
    quantity,
    returnPolicy,
    discount,
    salePrice,
    saleStartDate,
    saleEndDate,
    createdBy,
  } = req.body;

  try {
    const product = await Product.create({
      name,
      price,
      description,
      image,
      tax,
      expiry,
      category,
      brand,
      tags,
      quantity,
      returnPolicy,
      discount,
      salePrice,
      saleStartDate,
      saleEndDate,
      creator: createdBy, // Use the creator's ID
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('creator', 'name email');
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  console.log("why here")
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId)
      .populate('creator', 'name email')
      .populate({
        path: 'reviews.userId',
        select: 'name',
      });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const updateData = req.body;

  try {
    const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findByIdAndRemove(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getApprovedProducts = async (req, res) => {
  try {
    const products = await Product.find({ approvalStatus: 'approved' })
      .populate('creator', 'name email');
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
  



// Filter products by category
exports.filterProductsByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const filteredProducts = await Product.find({ category, approvalStatus: 'approved' })
      .populate('creator', 'name email');
    res.json(filteredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Sort products by price (ascending)
exports.sortProductsByPrice = async (req, res) => {
  try {
    const sortedProducts = await Product.find({ approvalStatus: 'approved' })
      .sort({ price: 1 })
      .populate('creator', 'name email');
    res.json(sortedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Search products by name or description
exports.searchProducts = async (req, res) => {
  const searchQuery = req.query.q;

  try {
    const searchResults = await Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
      ],
      approvalStatus: 'approved',
    }).populate('creator', 'name email');
    
    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get unapproved products (admin only)
exports.getRejectedProducts = async (req, res) => {
  try {
    const unapprovedProducts =  await Product.find({ approvalStatus: 'rejected' })
      .populate('creator', 'name email');
    res.json(unapprovedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get unapproved products (admin only)
exports.getPendingProducts = async (req, res) => {
  try {
    const unapprovedProducts =  await Product.find({ approvalStatus: 'pending' })
      .populate('creator', 'name email');
    res.json(unapprovedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Approve a product (admin only)
exports.approveProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findByIdAndUpdate(productId, { approvalStatus: 'approved' }, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
