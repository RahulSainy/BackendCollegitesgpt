const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    semesterId: {
      type: String,
      required: true,
    },
    branchId: {
      type: String,
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    source: [
      {
        name: {
          type: String,
          required: true,
        },
        units: [
          {
            name: {
              type: String,
              required: true,
            },
            content: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
