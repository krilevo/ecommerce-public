const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../utils/auth");

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get top categories
router.get("/top", categoryController.getTopCategories);

// Get bottom categories
router.get("/bottom", categoryController.getBottomCategories);

// Get sub categories
router.get("/sub/:parent", categoryController.getSubCategories);

// GET category by ID
router.get("/:id", categoryController.getCategoryById);

// POST create a new category
router.post("/", authMiddleware, categoryController.createCategory);

// // PUT update a category
// router.put("/:id", categoryController.updateCategory);

// DELETE a category
router.delete("/:category", authMiddleware, categoryController.deleteCategory);

module.exports = router;