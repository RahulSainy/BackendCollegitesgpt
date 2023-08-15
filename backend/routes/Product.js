const express = require("express");
const authMiddleware = require("../middlewares/auth");
const productController = require("../controllers/Product");

const router = express.Router();

router.post('/product',productController.addProduct);
router.get("/products", productController.getAllProducts);
router.get("/product/:productId", productController.getProductById);
router.put(
  "/product/:productId",
  authMiddleware,
  productController.updateProduct
);
router.delete(
  "/products/:productId",
  authMiddleware,
  productController.deleteProduct
);
router.get("/products/approved", productController.getApprovedProducts);
router.get(
  "/products/category/:category",
  productController.filterProductsByCategory
);
router.get("/products/sort/price", productController.sortProductsByPrice);
router.get("/products/search", productController.searchProducts);
router.get(
  "/products/pending",
  authMiddleware,
  productController.getPendingProducts
);
router.get(
  "/products/rejected",
  authMiddleware,
  productController.getRejectedProducts
);
router.patch(
  "/products/approve/:productId",
  authMiddleware,
  productController.approveProduct
);

module.exports = router;
