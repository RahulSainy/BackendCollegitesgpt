const Hub = require('../models/Hub');
const Order = require('../models/Order');


// Update the inventory of a hub (add or remove products)
exports.updateHubInventory = async (req, res) => {
  const hubId = req.params.hubId;
  const { action, productId } = req.body;

  try {
    const hub = await Hub.findById(hubId);
    if (!hub) {
      return res.status(404).json({ message: 'Hub not found' });
    }

    if (action === 'add') {
      hub.availableProducts.push(productId);
    } else if (action === 'remove') {
      const index = hub.availableProducts.indexOf(productId);
      if (index !== -1) {
        hub.availableProducts.splice(index, 1);
      }
    }

    await hub.save();

    res.json({ message: 'Inventory updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Get orders assigned to the hub
exports.getOrdersForHub = async (req, res) => {
  const hubId = req.params.hubId;

  try {
    const hub = await Hub.findById(hubId);
    if (!hub) {
      return res.status(404).json({ message: 'Hub not found' });
    }

    // Find orders that are assigned to the current hub
    const orders = await Order.find({ 'selectedHub.hubId': hubId, status: 'placed' })
      .populate('user')
      .populate('products.product');

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mark an order as delivered
exports.markOrderDelivered = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findByIdAndUpdate(orderId, { status: 'delivered' }, { new: true });

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};