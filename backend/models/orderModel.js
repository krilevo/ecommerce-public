const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  deliveryOption: {
    type: String,
    required: true
  },
  paymentOption: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    default: 'pending'
  },
  status: {
    type: String,
    default: 'pending'
  },
  products: {
    type: Object,
    required: true
  },
  totalOrderAmount: {
    type: Number
  },
  orderDate: {
    type: Date
  }
});

const Order = mongoose.model("Order", orderSchema, "order");

module.exports = Order;
