const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const hubController = require('../controllers/Hub');

// Create a new hub

// Update the inventory of a hub (add or remove products)
router.patch('/hub/:hubId/update-inventory', hubController.updateHubInventory);

router.get('/hub/:hubId/orders', hubController.getOrdersForHub);
router.put('/hub/order/:orderId/mark-delivered', hubController.markOrderDelivered);

module.exports = router;
