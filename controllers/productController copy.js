const Product = require('../models/Product');
const { validateProductData } = require('../helpers/validationHelper');

// List all products
exports.listProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      message: 'Product List',
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving products',
      error: error.message,
    });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const errors = validateProductData(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors,
    });
  }

  // Proceed with product creation...
  const { name, price, stock } = req.body;
  try {
    const product = await Product.create({
      name,
      price,
      stock,
    });

    res.status(201).json({
      message: 'Product Created',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating product',
      error: error.message,
    });
  }
};

// Get product details by ID
exports.getProductDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    res.status(200).json({
      message: 'Product Detail',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving product details',
      error: error.message,
    });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.stock = stock || product.stock;

    await product.save();

    res.status(200).json({
      message: 'Product Updated successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating product',
      error: error.message,
    });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    // Save the product data to return after deletion
    const productData = {
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      sold: product.sold,
      created_at: product.createdAt,
      updated_at: product.updatedAt,
    };

    await product.destroy();
    res.status(200).json({
      message: 'Product Deleted successfully',
      data: productData,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting product',
      error: error.message,
    });
  }
};
