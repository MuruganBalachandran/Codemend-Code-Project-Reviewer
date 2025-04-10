require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

const app = express();

// Connect to MongoDB
(async () => {
  try {
    await connectDB();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Add middleware to check DB connection on routes that need it
const dbConnectionCheck = (req, res, next) => {
  const isConnected = mongoose.connection.readyState === 1;
  if (!isConnected) {
    return res.status(503).json({
      success: false,
      error: 'Database service unavailable. Please try again later.'
    });
  }
  next();
};

// Apply database check middleware to specific routes
app.use(['/api/auth', '/api/users', '/api/projects'], dbConnectionCheck);

// Routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/reviews', require('./routes/codereview'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/admin', require('./routes/admin'));

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CodeMend API' });
});

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});
