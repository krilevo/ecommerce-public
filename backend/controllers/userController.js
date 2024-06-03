const User = require("../models/userModel");
const { handleServerError } = require("../utils/helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config');
const secretKey = config.secretKey;
const expirationTime = config.tokenExpirationTime;

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Login
exports.getUserByEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    // If the password is incorrect, return a 401 response
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Create a token 
    const { id, firstName, lastName, accessLevel } = user;
    const token = jwt.sign({ id, name: `${firstName} ${lastName}`, accessLevel }, secretKey, {
      expiresIn: expirationTime,
    });

    res.status(200).json(token);
  } catch ( error) {
    handleServerError(res, error);
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // User with the same email already exists, return an error response
      return res.status(400).json({ error: "User with this email already exists" });
    }
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully", email, password });
  } catch (error) {
    handleServerError(res, error);
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Add user details
exports.addUserDetails = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    handleServerError(res, error);
  }
};
