const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  semesterId: {
    type: String,
    required: true
  },
  branchId: {
    type: String,
    required: true
  },
  subjectId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  pdfLink: {
    type: String,
    required: true
  },
  imageLink: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
