const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to list all orders
router.get('/orders', orderController.listOrders);

// Route to create a new order
router.post('/orders', orderController.createOrder);

// Route to get details of a specific order by ID
router.get('/orders/:id', orderController.getOrderDetail);

// Route to delete an order by ID
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;
