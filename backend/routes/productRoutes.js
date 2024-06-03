const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../utils/auth');
const { upload, uploadToS3 } = require('../utils/multer');

// GET all products
router.get('/allProducts', productController.getProducts);

// GET best-selling products
router.get('/best-selling', productController.getBestSellingProducts);

// GET discounted products
router.get('/discounted', productController.getDiscountedProducts);

// GET product by ID
router.get('/:productId', productController.getProductById);

// GET products by category
router.get('/category/:category', productController.getProductsByCategory);

// GET products by name
router.get('/search/:name', productController.getProductsByName);

// POST create a new product
router.post('/add', [upload.single('image'), uploadToS3], productController.createProduct);

// PUT update a product
router.put('/:productId', authMiddleware, productController.updateProduct);

// PUT reduce product stock
// router.put('/reduce-stock', productController.reduceProductStock);

// DELETE product by ID
router.delete('/delete/:productId', authMiddleware, productController.deleteProduct);

module.exports = router;
