const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart'); 
// Place a new order
// Place a new order
exports.placeOrder = async (req, res) => {
  const { userId, products } = req.body;

  try {
    // Calculate total amount based on products' quantities and prices
    let totalAmount = 0;
    for (const product of products) {
      const productDetails = await Product.findById(product.productId);
      totalAmount += productDetails.price * product.quantity;
    }

    // Create an order document with the user's ID and calculated total amount
    const order = await Order.create({ userId, totalAmount });

    // Loop through the products and create order items for each
    for (const product of products) {
      const productDetails = await Product.findById(product.productId);

      if (productDetails) {
        // Create an order item and associate it with the order
        order.products.push({
          productId: product.productId,
          quantity: product.quantity,
        });
      }
    }

    // Save the order
    await order.save();

    // Remove items from the cart
    for (const product of products) {
      await Cart.findOneAndDelete({ productId: product.productId, userId });
    }

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get user's order history
exports.getOrderHistory = async (req, res) => {
  const userId = req.params.userId;
  try {
    const orders = await Order.find({ userId }).sort({ orderDate: 'desc' });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
