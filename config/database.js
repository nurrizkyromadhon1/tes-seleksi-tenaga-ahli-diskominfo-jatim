const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Create a new Sequelize instance using the environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Database host
    dialect: 'mysql', // We're using MySQL
    port: process.env.DB_PORT, // Port number for MySQL
    logging: false, // Disable SQL logging (optional)
  }
);

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Connection to the database has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
