const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');

// Admin routes
router.post('/semester/:semester/branch/:branch/subjects/:subject/books', bookController.addBook);
router.put('/semester/:semester/branch/:branch/subjects/:subject/books/:title', bookController.updateBook);
router.delete('/semester/:semester/branch/:branch/subjects/:subject/books/:title', bookController.deleteBook);

// User routes
router.get('/semester/:semester/branch/:branch/subjects/:subject/books', bookController.getBooks);

module.exports = router;
