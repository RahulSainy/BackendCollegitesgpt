// routes/cartRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/auth');
const cartController = require('../controllers/Cart');

const router = express.Router();

// Add a product to the cart
router.post('/cart/add', authMiddleware, cartController.addToCart);

// Get the user's cart
router.get('/cart', authMiddleware, cartController.getCart);

// Update the quantity of a product in the cart
router.put('/cart/update/:productId', authMiddleware, cartController.updateCartItemQuantity);

// Remove a product from the cart
router.delete('/cart/remove/:productId', authMiddleware, cartController.removeCartItem);

// Clear the user's cart
router.delete('/cart/clear', authMiddleware, cartController.clearCart);

module.exports = router;
