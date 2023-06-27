// models/subject.js

const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  semesterId: {
    type: Number,
    required: true
  },
  branchId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subject', subjectSchema);
