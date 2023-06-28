const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
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
  courseLink: {
    type: String,
    required: true
  },
  imageLink: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
