const express = require('express');
const router = express.Router();
const orderController = require('../controllers/Order');

// Get a list of hubs with available products for a given product ID
router.get('/order/hubs-with-available-product/:productId', orderController.getHubsWithAvailableProduct);

// Create a new order with the selected hub
router.post('/order/create', orderController.createOrderWithSelectedHub);

// Get orders for a specific user
router.get('/order/user/:userId', orderController.getUserOrders);

// Cancel an order
router.patch('/order/cancel/:orderId', orderController.cancelOrder);

module.exports = router;
