const express = require('express');
const router = express.Router();
const orderController = require('../controllers/Order');

// Place a new order
router.post('/order/place', orderController.placeOrder);

// Get user's order history
router.get('/orders/history/:userId', orderController.getOrderHistory);

module.exports = router;
