const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
  {
    semesterId: {
      type: String,
      required: true,
    },
    branchId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
