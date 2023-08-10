const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add a product to the cart
exports.addToCart = async (req, res) => {
  const { productId, userId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cartItem = await Cart.findOne({ productId, userId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      await Cart.create({ productId, userId, quantity });
    }

    res.status(201).json({ message: 'Product added to cart' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Remove a product from the cart
exports.removeFromCart = async (req, res) => {
  const cartItemId = req.params.cartItemId;
  try {
    const cartItem = await Cart.findById(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    await cartItem.remove();
    res.json({ message: 'Product removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// View the user's cart
exports.viewCart = async (req, res) => {
  const userId = req.params.userId;
  try {
    const cartItems = await Cart.find({ userId }).populate('productId');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
