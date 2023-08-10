const express = require('express');
const router = express.Router();
const cartController = require('../controllers/Cart');

// Add a product to the cart
router.post('/cart/add', cartController.addToCart);

// Remove a product from the cart
router.delete('/cart/remove/:cartItemId', cartController.removeFromCart);

// View the user's cart
router.get('/cart/view/:userId', cartController.viewCart);

module.exports = router;
