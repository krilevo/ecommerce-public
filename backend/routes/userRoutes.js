const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../utils/auth");

// GET all users
router.get("/", userController.getAllUsers);

// GET user by ID
router.get("/:id", userController.getUserById);

// GET user by email
router.post("/login", userController.getUserByEmail);

// POST create a new user
router.post("/create-user", userController.createUser);

// PUT update a user
router.put("/:id", authMiddleware, userController.updateUser);

// PUT add user details
router.put("/details/:id", userController.addUserDetails);

// DELETE a user
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
