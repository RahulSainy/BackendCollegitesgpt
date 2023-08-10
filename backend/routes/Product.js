const express = require('express');
const router = express.Router();
const productController = require('../controllers/Product');

// Get all products
router.get('/products', productController.getAllProducts);

// Get product by ID
router.get('/product/:productId', productController.getProductById);

// Add a new product
router.post('/product', productController.addProduct);

// Update product by ID
router.put('/product/:productId', productController.updateProduct);

// Delete product by ID
router.delete('/product/:productId', productController.deleteProduct);

module.exports = router;
