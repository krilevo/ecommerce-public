const Product = require('../models/productModel');
// const authMiddleware = require('../utils/auth');
// const { v4: uuidv4 } = require('uuid'); // To generate a unique file name
// const multer = require('multer');
// const path = require('path');
const { s3, bucketName } = require('.././aws-config');
const { handleServerError } = require('../utils/helper');

// const storage = multer.memoryStorage(); // Use memory storage for file upload

// const upload = multer({ storage });

// Retrieve all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Retrieve best-selling products
exports.getBestSellingProducts = async (req, res) => {
  try {
    const bestSellingProducts = await Product.find()
      .sort({ sold: -1 })
      .limit(10);

    res.json(bestSellingProducts);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Retrieve discounted products
exports.getDiscountedProducts = async (req, res) => {
  try {
    const discountedProducts = await Product.find({ discountAmount: { $exists: true, $ne:0 } })
      .limit(10);

    res.json(discountedProducts);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Retrieve a product by ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    res.json(product);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Retrieve products by category
exports.getProductsByCategory = async (req, res) => {
  const category = req.params.category;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 0;
  const sort = req.query.sort || 'default';
  const skip = (page - 1) * limit; // Calculate the number of products to skip

  try {
    let query = Product.find({ categoryPath: { $regex: `.*${category}.*` }  });

    if (sort === 'priceAsc') {
      query = query.sort({ price: 1 });
    } else if (sort === 'priceDesc') {
      query = query.sort({ price: -1 });
    } else if (sort === 'mostSold') {
      query = query.sort({ sold: -1 });
    }

    const products = await query
      .skip(skip)
      .limit(limit)
      .exec();

    // Count the total number of products in the category for pagination
    const totalCount = await Product.countDocuments({ categoryPath: { $regex: `.*${category}.*` } });

    // Check if there are any products in the category
    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found in this category.' });
    }

    res.status(200).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalProducts: totalCount
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

// Get products by name, search
exports.getProductsByName = async (req, res) => {
  const query = req.params.name;

  try {
    // Use a regular expression to perform a case-insensitive search
    const products = await Product.find({ name: { $regex: query, $options: 'i' } }).limit(10);
    res.json(products);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, categoryPath, price, stock, description } = req.body;

    // Check if an image file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const product = await Product.create({
      name,
      categoryPath,
      price,
      stock,
      description,
      imageName: req.uniqueFileName
    });

    res.status(201).json(product.name);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, price, discountAmount, description, stock } = req.body;

    const product = await Product.findById(productId);

    // Check if product exists
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update product properties
    product.name = name;
    product.price = price;
    product.discountAmount = discountAmount;
    product.description = description;
    product.stock = stock;

    // Save the updated product
    const updatedProduct = await product.save();

    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.reduceProductStock = async (req, res) => {
  try {
    const cart = req.body.cart;
    for (const item of cart) {
      const product = await Product.findById(item._id);

      if (!product) {
        return res.status(404).json({ error: `Product with ID ${item._id} not found.` });
      }

      // Check if there's enough stock to reduce
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for product ${product.name}.` });
      }

      // Reduce the stock of the product
      product.stock -= item.quantity;

      // Save the updated product
      await product.save();
    }

  res.json({ message: 'Product stock updated successfully.' });
  } catch (error) {
    handleServerError(res, error);
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findByIdAndRemove(productId);

    // Check if product exists
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // Delete the image from S3 using the product's image name
    const s3Params = {
      Bucket: bucketName,
      Key: product.imageName
    };

    // Delete the image from S3
    s3.deleteObject(s3Params, (err, data) => {
      if (err) {
        console.error('Error deleting image from S3:', err);
        return res.status(500).json({ error: 'Failed to delete image from S3.' });
      }

      res.status(200).json({ message: 'Product deleted successfully.' });
    });
  } catch (error) {
    handleServerError(res, error);
  }
};
