const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Product = require('../models/Product');
require('dotenv').config();

beforeAll(async () => {
await mongoose.connect(process.env.MONGODB_URI_TEST);
});
  //--verbose --coverage
afterEach(async () => {
  await Product.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Inventory Management System', () => {
  let productId;

  beforeEach(async () => {
    // Create a test product
    const product = await Product.create({
      name: 'Test Product',
      description: 'Test Description',
      stock_quantity: 50,
      low_stock_threshold: 10
    });
    productId = product._id;
  });

  describe('Stock Management', () => {
    test('Should increase stock successfully', async () => {
      const response = await request(app)
        .patch(`/products/${productId}/increaseStock`)
        .send({ quantity: 25 });

      expect(response.status).toBe(200);
      expect(response.body.data.stock_quantity).toBe(75);
      expect(response.body.success).toBe(true);
    });

    test('Should decrease stock successfully', async () => {
      const response = await request(app)
        .patch(`/products/${productId}/decreaseStock`)
        .send({ quantity: 20 });

      expect(response.status).toBe(200);
      expect(response.body.data.stock_quantity).toBe(30);
      expect(response.body.success).toBe(true);
    });

    test('Should return error when decreasing more stock than available', async () => {
      const response = await request(app)
        .patch(`/products/${productId}/decreaseStock`)
        .send({ quantity: 100 }); // More than available stock

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('Insufficient stock');
    });

    test('Should prevent negative quantity in stock operations', async () => {
      const response = await request(app)
        .patch(`/products/${productId}/decreaseStock`)
        .send({ quantity: -5 });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('positive number');
    });

    test('Should prevent setting negative stock in update', async () => {
      const response = await request(app)
        .put(`/products/updateProduct/${productId}`)
        .send({ stock_quantity: -10 });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('cannot be negative');
    });
  });

  describe('Low Stock Alerts', () => {
    test('Should return products below low stock threshold', async () => {
      // Create a low stock product
      await Product.create({
        name: 'Low Stock Product',
        stock_quantity: 5,
        low_stock_threshold: 10
      });

      const response = await request(app)
        .get('/products/lowStockProducts');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.some(p => p.stock_quantity < p.low_stock_threshold)).toBe(true);
    });
  });
});