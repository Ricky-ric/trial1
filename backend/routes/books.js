const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/books  — list with optional filters
router.get('/', asyncHandler(async (req, res) => {
  const { genre, search, featured, isNew, page = 1, limit = 20 } = req.query;
  const filter = {};

  if (genre) filter.genre = genre;
  if (featured === 'true') filter.isFeatured = true;
  if (isNew === 'true') filter.isNew = true;
  if (search) filter.$text = { $search: search };

  const skip = (Number(page) - 1) * Number(limit);
  const [books, total] = await Promise.all([
    Book.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
    Book.countDocuments(filter),
  ]);

  res.json({ books, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
}));

// GET /api/books/genres — unique genre list
router.get('/genres', asyncHandler(async (req, res) => {
  const genres = await Book.distinct('genre');
  res.json(genres);
}));

// GET /api/books/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
}));

// POST /api/books  — admin only
router.post('/', protect, adminOnly, asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
}));

// PUT /api/books/:id  — admin only
router.put('/:id', protect, adminOnly, asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
}));

// DELETE /api/books/:id  — admin only
router.delete('/:id', protect, adminOnly, asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json({ message: 'Book deleted' });
}));

module.exports = router;
