// controllers/Cart.js
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add a product to the cart
exports.addToCart = async (req, res) => {
  const userId = req.user._id; // Assuming you have authentication middleware that attaches user data to req.user
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cartItem = {
      productId: product._id,
      quantity: quantity || 1,
    };

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        products: [cartItem],
        totalPrice: product.price * cartItem.quantity,
      });
    } else {
      const existingCartItem = cart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingCartItem) {
        existingCartItem.quantity += quantity || 1;
      } else {
        cart.products.push(cartItem);
      }

      cart.totalPrice += product.price * (quantity || 1);
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get the user's cart
exports.getCart = async (req, res) => {
  const userId = req.user._id; // Assuming you have authentication middleware that attaches user data to req.user

  try {
    const cart = await Cart.findOne({ userId })
      .populate({
        path: 'products.productId',
        select: 'name price',
      })
      .exec();

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update the quantity of a product in the cart
exports.updateCartItemQuantity = async (req, res) => {
  const userId = req.user._id; // Assuming you have authentication middleware that attaches user data to req.user
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartItem = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const previousQuantity = cartItem.quantity;
    cartItem.quantity = quantity || 1;
    cart.totalPrice += (cartItem.quantity - previousQuantity) * product.price;
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Remove a product from the cart
exports.removeCartItem = async (req, res) => {
  const userId = req.user._id; // Assuming you have authentication middleware that attaches user data to req.user
  const productId = req.params.productId;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartItemIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const removedCartItem = cart.products.splice(cartItemIndex, 1)[0];
    cart.totalPrice -= removedCartItem.quantity * product.price;
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Clear the user's cart
exports.clearCart = async (req, res) => {
  const userId = req.user._id; // Assuming you have authentication middleware that attaches user data to req.user

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = [];
    cart.totalPrice = 0;
    await cart.save();

    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
