const Book = require('../models/book');

// Add a book to a specific subject in a semester
exports.addBook = async (req, res) => {
  const { semester, branch, subject } = req.params;
  const { title, author, pdfLink, imageLink, type, price } = req.body;

  try {
    const newBook = new Book({
      semesterId: semester,
      branchId: branch,
      subjectId: subject,
      title: title,
      author: author,
      pdfLink: pdfLink,
      imageLink: imageLink,
      type: type,
      price: price
    });

    await newBook.save();

    return res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a book of a specific subject in a semester
exports.updateBook = async (req, res) => {
  const { semester, branch, subject, title } = req.params;
  const { author, pdfLink, imageLink, type, price } = req.body;

  try {
    const book = await Book.findOneAndUpdate(
      {
        semesterId: semester,
        branchId: branch,
        subjectId: subject,
        title: title
      },
      {
        author: author,
        pdfLink: pdfLink,
        imageLink: imageLink,
        type: type,
        price: price
      },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a book of a specific subject in a semester
exports.deleteBook = async (req, res) => {
  const { semester, branch, subject, title } = req.params;

  try {
    const book = await Book.findOneAndRemove({
      semesterId: semester,
      branchId: branch,
      subjectId: subject,
      title: title
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all books for a specific subject in a semester and branch
exports.getBooks = async (req, res) => {
  const { semester, branch, subject } = req.params;

  try {
    const books = await Book.find({
      semesterId: semester,
      branchId: branch,
      subjectId: subject
    });

    return res.status(200).json(books);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
