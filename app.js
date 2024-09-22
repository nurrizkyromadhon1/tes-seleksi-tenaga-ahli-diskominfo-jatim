const express = require('express');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const sequelize = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');
require('dotenv').config();

const app = express();

// Middleware to log all requests
app.use(logger);

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Test the connection and sync the models with the database
sequelize.sync()
  .then(() => {
    console.log('Database connected and synchronized');
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

module.exports = app;
