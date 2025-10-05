// controllers/productController.js
const Product = require('../models/Product');


// Increase Stock
const increaseStock = async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Quantity must be a positive number'
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    product.stock_quantity += quantity;
    await product.save();

    res.status(200).json({
      success: true,
      data: product,
      message: `Stock increased by ${quantity}. New quantity: ${product.stock_quantity}`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Decrease Stock (with insufficient stock check)
const decreaseStock = async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Quantity must be a positive number'
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // Business logic: Check if sufficient stock is available
    if (product.stock_quantity < quantity) {
      return res.status(400).json({
        success: false,
        error: `Insufficient stock. Available: ${product.stock_quantity}, Requested: ${quantity}`
      });
    }

    product.stock_quantity -= quantity;
    await product.save();

    res.status(200).json({
      success: true,
      data: product,
      message: `Stock decreased by ${quantity}. New quantity: ${product.stock_quantity}`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get Low Stock Products
const lowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({
      $expr: { $lt: ['$stock_quantity', '$low_stock_threshold'] }
    });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports={increaseStock,decreaseStock,lowStockProducts};