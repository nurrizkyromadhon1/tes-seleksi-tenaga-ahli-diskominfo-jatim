const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure this points to your Sequelize instance
const Product = require('./Product'); // Correctly import the Product model

// Define the Order model
const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
});

// Define the association between Order and Product
Order.belongsToMany(Product, {
  through: 'OrderProducts',
  foreignKey: 'orderId',
  otherKey: 'productId',
  as: 'products',
});

module.exports = Order;
