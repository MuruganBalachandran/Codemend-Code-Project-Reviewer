const errorHandler = (err, req, res, next) => {
  // Log error for developer
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(404).json({ 
      success: false, 
      error: 'Resource not found' 
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {z
    return res.status(400).json({ 
      success: false, 
      error: 'Duplicate field value entered' 
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ 
      success: false, 
      error: message 
    });
  }

  // Default error response
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
};

module.exports = errorHandler;
