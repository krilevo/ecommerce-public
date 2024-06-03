const formatPrice = (price) => {
  // Format the price as needed
  return `$${price.toFixed(2)}`;
};

// Helper function to handle server errors
const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "Server error" });
};

module.exports = {
  formatPrice,
  handleServerError
};
