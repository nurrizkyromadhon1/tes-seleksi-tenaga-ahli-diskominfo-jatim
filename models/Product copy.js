const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define Product model
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sold: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Export the Product model
module.exports = Product;
