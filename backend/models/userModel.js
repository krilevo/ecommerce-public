const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  postalCode: {
    type: String
  },
  country: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessLevel: {
    type: String,
    default: 'customer',
    required: true
  }
});

const User = mongoose.model("User", userSchema, "user");

module.exports = User;
