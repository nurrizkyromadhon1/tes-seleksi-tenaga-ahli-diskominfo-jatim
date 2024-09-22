const Order = require('../models/Order');
const Product = require('../models/Product');

// List all orders with their associated products
exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: Product,
        as: 'products',
        attributes: ['id', 'name', 'price', 'stock', 'sold', 'createdAt', 'updatedAt'],
        through: {
          attributes: ['quantity'], // Include the quantity from the pivot table (OrderProducts)
        },
      },
    });

    // Transform the orders into the desired format
    const orderData = orders.map(order => {
      const products = order.products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.OrderProducts.quantity, // Get the quantity from the pivot table
        stock: product.stock,
        sold: product.sold,
        created_at: product.createdAt,
        updated_at: product.updatedAt,
      }));

      return {
        id: order.id,
        products: products,
        created_at: order.createdAt,
        updated_at: order.updatedAt,
      };
    });

    res.status(200).json({
      message: 'Order List',
      data: orderData,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving orders',
      error: error.message,
    });
  }
};

// Create a new order with multiple products
exports.createOrder = async (req, res) => {
  try {
    const { products } = req.body; // Expecting products as an array of { id: productId, quantity: quantity }

    // Validate that the products array is provided and is not empty
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Products are required and must be an array.' });
    }

    // Create a new order entry in the Orders table
    const order = await Order.create({});

    const orderProducts = [];

    // Loop through each product in the request and process
    for (const item of products) {
      const { id: productId, quantity } = item;

      // Find the product by its ID
      const product = await Product.findByPk(productId);

      // Check if the product exists
      if (!product) {
        return res.status(404).json({ message: `Product with id ${productId} not found.` });
      }

      // Check if there's enough stock for the requested quantity
      if (product.stock < quantity) {
        return res.status(400).json({ message: `Insufficient stock for product ${product.name}` });
      }

      // Deduct the product stock and update the sold count
      product.stock -= quantity;
      product.sold += quantity;
      await product.save(); // Save the changes in the Products table

      // Add the product to the order through the pivot table with the quantity
      await order.addProduct(product, { through: { quantity } });

      // Push the product details to return in the response
      orderProducts.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        stock: product.stock,
        sold: product.sold,
        created_at: product.createdAt,
        updated_at: product.updatedAt,
      });
    }

    // Return the response after order creation
    res.status(201).json({
      message: 'Order created',
      data: {
        id: order.id,
        products: orderProducts,
        created_at: order.createdAt,
        updated_at: order.updatedAt,
      },
    });
  } catch (error) {
    // Handle errors and return the error response
    res.status(500).json({
      message: 'Error creating order',
      error: error.message,
    });
  }
};

// Get a single order with associated products
exports.getOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the order by its ID, including the associated products
    const order = await Order.findByPk(id, {
      include: {
        model: Product,
        as: 'products',
        attributes: ['id', 'name', 'price', 'stock', 'sold', 'createdAt', 'updatedAt'],
        through: {
          attributes: ['quantity'],
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    // Format the response
    const products = order.products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.OrderProducts.quantity,
      stock: product.stock,
      sold: product.sold,
      created_at: product.createdAt,
      updated_at: product.updatedAt,
    }));

    res.status(200).json({
      message: 'Order details',
      data: {
        id: order.id,
        products: products,
        created_at: order.createdAt,
        updated_at: order.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving order details',
      error: error.message,
    });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the order by its ID
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    // Delete the order
    await order.destroy();

    res.status(200).json({
      message: 'Order deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting order',
      error: error.message,
    });
  }
};
