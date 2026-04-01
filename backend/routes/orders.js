const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Book = require('../models/Book');

// POST /api/orders — place a new order
router.post('/', asyncHandler(async (req, res) => {
  const { customer, shippingAddress, items, paymentMethod } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No items in order' });
  }

  // Fetch book prices from DB to prevent tampering
  const bookIds = items.map((i) => i.bookId);
  const books = await Book.find({ _id: { $in: bookIds } });
  const bookMap = Object.fromEntries(books.map((b) => [b._id.toString(), b]));

  const orderItems = items.map((item) => {
    const book = bookMap[item.bookId];
    if (!book) throw Object.assign(new Error(`Book ${item.bookId} not found`), { statusCode: 404 });
    return { book: book._id, title: book.title, author: book.author, price: book.price, qty: item.qty };
  });

  const subtotal = orderItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingCost = subtotal >= 45 ? 0 : 4.99;
  const total = subtotal + shippingCost;

  const order = await Order.create({
    customer,
    shippingAddress,
    items: orderItems,
    subtotal,
    shippingCost,
    total,
    paymentMethod,
    paymentStatus: paymentMethod === 'sandbox' ? 'paid' : 'pending',
    sandboxMode: paymentMethod === 'sandbox',
  });

  res.status(201).json(order);
}));

// GET /api/orders/:orderNumber — look up by order number
router.get('/:orderNumber', asyncHandler(async (req, res) => {
  const order = await Order.findOne({ orderNumber: req.params.orderNumber }).populate('items.book', 'title author');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
}));

module.exports = router;
