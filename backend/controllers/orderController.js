const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const mongoose = require('mongoose');
const { handleServerError } = require("../utils/helper");

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.getOrdersByStatus = async (req, res) => {
  const { status } = req.params;
  const validStatuses = ['pending', 'processed', 'shipped', 'delivered', 'canceled'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const orders = await Order.find({ status })

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found with the specified status' });
    }

    res.status(200).json(orders);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    address,
    city,
    postalCode,
    country,
    deliveryOption,
    paymentOption,
    paymentStatus,
    products,
    totalOrderAmount
  } = req.body;

  const orderData = {
    firstName,
    lastName,
    email,
    shippingAddress: address,
    city,
    postalCode,
    country,
    deliveryOption,
    paymentMethod: paymentOption,
    paymentStatus,
    products,
    totalOrderAmount,
    orderDate: new Date
  };

  try {
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Create a new order and reduce stock in a transaction
exports.createOrderAndReduceStock = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const {
    firstName,
    lastName,
    email,
    address,
    city,
    postalCode,
    country,
    deliveryOption,
    paymentOption,
    paymentStatus,
    products,
    totalOrderAmount,
    orderDate
  } = req.body;

  try {
    const newOrder = new Order({
      firstName,
      lastName,
      email,
      address,
      city,
      postalCode,
      country,
      deliveryOption,
      paymentOption,
      paymentStatus,
      products,
      totalOrderAmount,
      orderDate: new Date()
    });

    const savedOrder = await newOrder.save();

    // Reduce stock for each product in the order
    for (const item of products) {
      await Product.updateOne(
        { _id: item._id },
        {
          $inc: { 
            stock: -item.quantity,
            sold: item.quantity
          }
        }
      );
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedOrder);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    handleServerError(res, error);
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { order } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, order, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    handleServerError(res, error);
  }
};
