// routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController.js');
const {createProduct,getAllProducts,getProductById,updateProduct,deleteProduct}=require('../Controllers/productController.js')
const {increaseStock,decreaseStock,lowStockProducts} = require('../Controllers/StockController.js');


// CRUD routes
router.post('/create',createProduct);
router.get('/getAllProducts',getAllProducts);
router.get('/getProductById/:id',getProductById);
router.put('/updateProduct/:id',updateProduct);
router.delete('/deleteProduct/:id',deleteProduct);


// Inventory management routes
router.patch('/:id/increaseStock',increaseStock);
router.patch('/:id/decreaseStock',decreaseStock);

// Low stock alert route
router.get('/lowStockProducts',lowStockProducts);

module.exports = router;