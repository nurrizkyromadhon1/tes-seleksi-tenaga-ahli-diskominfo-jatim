const logger = (req, res, next) => {
  const method = req.method;        // HTTP method (GET, POST, etc.)
  const url = req.url;              // Requested URL
  const timestamp = new Date().toISOString(); // Current timestamp in ISO format

  console.log(`[${timestamp}] ${method} request to ${url}`);

  // Call the next middleware or route handler
  next();
};

module.exports = logger;
