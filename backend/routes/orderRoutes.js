const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../utils/auth");

// GET all orders
router.get("/", orderController.getAllOrders);

// GET order by ID
router.get("/:id", orderController.getOrderById);

// GET orders by status
router.get("/status/:status", orderController.getOrdersByStatus);

// POST create a new order
// router.post("/", orderController.createOrder);

// POST create a new order
router.post("/create-order", orderController.createOrderAndReduceStock);

// PUT update an order
router.put("/:id", authMiddleware, orderController.updateOrder);

// DELETE an order
router.delete("/:id", authMiddleware, orderController.deleteOrder);

module.exports = router;
