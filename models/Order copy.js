const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product'); // Import Product model

// Define Order model
const Order = sequelize.define('Order', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Establish a relationship between Order and Product
Order.belongsTo(Product, { foreignKey: 'ProductId', as: 'product' });

// Export the Order model
module.exports = Order;
