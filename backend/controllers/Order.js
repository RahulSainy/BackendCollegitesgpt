const Order = require('../models/Order');
const Hub = require('../models/Hub');
const calculateDistance = require('../utils/distanceCalculator');
// Update the getHubsWithAvailableProduct controller to accept user's location from the request body
exports.getHubsWithAvailableProduct = async (req, res) => {
  const productId = req.params.productId;
  const { latitude, longitude } = req.body; // Use req.body instead of req.query

  try {
    const hubsWithProduct = await Hub.find({
      availableProducts: productId
    });

    const hubsWithDistance = hubsWithProduct.map(hub => ({
      hub,
      distance: calculateDistance(latitude, longitude, hub.latitude, hub.longitude)
    }));
    hubsWithDistance.sort((a, b) => a.distance - b.distance);

    res.json(hubsWithDistance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching hubs with available product' });
  }
};


exports.createOrderWithSelectedHub = async (req, res) => {
  const { userId, productId, totalPrice, latitude, longitude, selectedHubId } = req.body;

  try {
    const selectedHub = await Hub.findById(selectedHubId);
    if (!selectedHub || !selectedHub.availableProducts.includes(productId)) {
      return res.status(400).json({ message: 'Selected hub does not have the required product' });
    }

    const distanceToSelectedHub = calculateDistance(latitude, longitude, selectedHub.latitude, selectedHub.longitude);

    const order = await Order.create({
      user: userId,
      products: [{ product: productId, quantity: 1 }],
      totalPrice,
      selectedHub: {
        hubId: selectedHub._id,
        distance: distanceToSelectedHub,
      },
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    });

    // Notify the selected hub about the order
    // Implement your notification mechanism here

    res.status(201).json({ order, distanceToSelectedHub });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order with selected hub' });
  }
};

exports.getUserOrders = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.find({ user: userId }).populate('selectedHub');

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user orders' });
  }
};

exports.cancelOrder = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findByIdAndUpdate(orderId, { status: 'cancelled' }, { new: true });

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error cancelling order' });
  }
};
