const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
    default: null
  },
  fullPath: {
    type: String
  }
});

const Category = mongoose.model("Category", categorySchema, "categories");

module.exports = Category;
