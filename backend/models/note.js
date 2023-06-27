// note.js (model file)

const mongoose = require('mongoose');
const { Schema } = mongoose;

const unitSchema = new Schema({
  unitName: {
    type: String,
    required: true
  },
  topics: {
    type: String,
    required: true
  },
  pdfLink: {
    type: String,
    required: true
  },

});

const sourceSchema = new Schema({
  sourceName: {
    type: String,
    required: true
  },
  units: [unitSchema]
});

const noteSchema = new Schema({
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
  sources: [sourceSchema]
});

module.exports = mongoose.model('Note', noteSchema);
