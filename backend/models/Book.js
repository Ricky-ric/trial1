const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, default: null },
    genre: { type: String, required: true },
    coverColor: { type: String, default: '#2C3E50' },
    coverAccent: { type: String, default: '#A8C5D8' },
    badge: { type: String, default: null },  // e.g. "Bestseller", "Staff Pick"
    stock: { type: Number, default: 100, min: 0 },
    isbn: { type: String, default: '' },
    isNew: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

bookSchema.index({ title: 'text', author: 'text', genre: 'text' });

module.exports = mongoose.model('Book', bookSchema);
