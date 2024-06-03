const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categoryPath: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  sold: {
    type: Number,
    required: true,
    default: 0
  },
  imageName: {
    type: String,
    required: true,
    default: "default.png"
  },
  discountAmount: {
    type: Number,
    default: 0
  }
});

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
