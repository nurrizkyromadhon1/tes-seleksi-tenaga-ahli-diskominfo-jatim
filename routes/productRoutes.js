const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to list all products
router.get('/products', productController.listProducts);

// Route to create a new product
router.post('/products', productController.createProduct);

// Route to get details of a specific product by ID
router.get('/products/:id', productController.getProductDetail);

// Route to update a specific product by ID
router.put('/products/:id', productController.updateProduct);

// Route to delete a specific product by ID
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
