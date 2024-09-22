const errorHandler = (err, req, res, next) => {
  // Log the error details for debugging purposes
  console.error(err.stack);

  // Determine the response status code (default to 500 if not provided)
  const statusCode = err.status || 500;

  // Send the error response in JSON format
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    status: statusCode,
    // Optionally, you can include the error stack trace only in development mode
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
