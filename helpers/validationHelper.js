// Helper function to validate product data
exports.validateProductData = (data) => {
  const errors = {};

  // Check if name is provided and is a string
  if (!data.name) {
    errors.name = errors.name || [];
    errors.name.push('The name field is required.');
  } else if (typeof data.name !== 'string') {
    errors.name = errors.name || [];
    errors.name.push('The name field must be a string.');
  }

  // Check if price is provided and is a number
  if (!data.price && data.price !== 0) {
    errors.price = errors.price || [];
    errors.price.push('The price field is required.');
  } else if (typeof data.price !== 'number') {
    errors.price = errors.price || [];
    errors.price.push('The price field must be a number.');
  }

  // Check if stock is provided and is a number
  if (!data.stock && data.stock !== 0) {
    errors.stock = errors.stock || [];
    errors.stock.push('The stock field is required.');
  } else if (typeof data.stock !== 'number') {
    errors.stock = errors.stock || [];
    errors.stock.push('The stock field must be a number.');
  }

  return errors;
};

// Helper function to validate order data
exports.validateOrderData = (data) => {
  const errors = {};

  // Check if productId is provided and is a number
  if (!data.productId) {
    errors.productId = errors.productId || [];
    errors.productId.push('The productId field is required.');
  } else if (typeof data.productId !== 'number') {
    errors.productId = errors.productId || [];
    errors.productId.push('The productId field must be a number.');
  }

  // Check if quantity is provided and is a number
  if (!data.quantity && data.quantity !== 0) {
    errors.quantity = errors.quantity || [];
    errors.quantity.push('The quantity field is required.');
  } else if (typeof data.quantity !== 'number') {
    errors.quantity = errors.quantity || [];
    errors.quantity.push('The quantity field must be a number.');
  }

  return errors;
};
