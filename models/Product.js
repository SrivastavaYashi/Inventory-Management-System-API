// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  stock_quantity: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Stock quantity cannot be negative']
  },
  low_stock_threshold: {
    type: Number,
    default: 10,
    min: [0, 'Low stock threshold cannot be negative']
  }
}, {
  timestamps: true
});

// Index for efficient low stock queries
productSchema.index({ stock_quantity: 1, low_stock_threshold: 1 });

module.exports = mongoose.model('Product', productSchema);