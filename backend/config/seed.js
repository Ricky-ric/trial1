require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Book = require('../models/Book');

const books = [
  { title: 'The Midnight Library', author: 'Matt Haig', price: 18.99, originalPrice: 24.99, genre: 'Fiction', coverColor: '#2C3E50', coverAccent: '#A8C5D8', badge: 'Bestseller', isFeatured: true, description: 'Between life and death there is a library, and within that library, the shelves go on forever.' },
  { title: 'Lessons in Chemistry', author: 'Bonnie Garmus', price: 16.50, genre: 'Fiction', coverColor: '#5D4037', coverAccent: '#D4A96A', badge: 'Staff Pick', isFeatured: true, description: 'A female chemist becomes a cooking show host in 1960s America.' },
  { title: 'The Name of the Wind', author: 'Patrick Rothfuss', price: 14.99, genre: 'Fantasy', coverColor: '#1A237E', coverAccent: '#90CAF9', isFeatured: true, description: 'The tale of Kvothe, a legendary figure in his own time.' },
  { title: 'Sapiens', author: 'Yuval Noah Harari', price: 19.99, originalPrice: 26.00, genre: 'Non-Fiction', coverColor: '#263238', coverAccent: '#CFD8DC', badge: 'Popular', isFeatured: true, description: 'A brief history of humankind from the Stone Age to the present.' },
  { title: 'Normal People', author: 'Sally Rooney', price: 13.50, genre: 'Fiction', coverColor: '#880E4F', coverAccent: '#F8BBD9', isNew: true, description: 'An exquisite love story about how one person can change another.' },
  { title: 'The Alchemist', author: 'Paulo Coelho', price: 11.99, genre: 'Philosophy', coverColor: '#E65100', coverAccent: '#FFCC80', isNew: true, description: 'A journey of self-discovery and the pursuit of one\'s Personal Legend.' },
  { title: 'Dune', author: 'Frank Herbert', price: 15.99, genre: 'Sci-Fi', coverColor: '#3E2723', coverAccent: '#D7CCC8', badge: 'Classic', isNew: true, description: 'The greatest science fiction novel of all time, set on the desert planet Arrakis.' },
  { title: 'Educated', author: 'Tara Westover', price: 14.50, genre: 'Memoir', coverColor: '#37474F', coverAccent: '#B0BEC5', isNew: true, description: 'A memoir about growing up in a survivalist family and the pursuit of knowledge.' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    await Book.deleteMany({});
    const inserted = await Book.insertMany(books);
    console.log(`✅ Seeded ${inserted.length} books`);
  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
