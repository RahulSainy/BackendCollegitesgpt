const Note = require('../models/note');

// Get all notes of a specific semester, branch, subject, source, and unit
exports.getNotes = async (req, res) => {
  const { semesterId, branchId, subjectName, sourceName, unitName } = req.params;

  try {
    const notes = await Note.find({
      semesterId,
      branchId,
      subjectName,
      'source.name': sourceName,
      'source.units.name': unitName
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all notes of a specific semester, branch, and subject
exports.getAllNotes = async (req, res) => {
  const { semesterId, branchId, subjectName } = req.params;

  try {
    const notes = await Note.find({
      semesterId,
      branchId,
      subjectName
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all units of a specific note source
exports.getUnitsBySource = async (req, res) => {
  const { semesterId, branchId, subjectName, sourceName } = req.params;

  try {
    const note = await Note.findOne({
      semesterId,
      branchId,
      subjectName,
      'source.name': sourceName
    });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    const units = note.source[0].units;
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new note
exports.createNote = async (req, res) => {
  const { semesterId, branchId, subjectName } = req.params;
  const { sourceName, unitName, content } = req.body;

  try {
    const note = new Note({
      semesterId,
      branchId,
      subjectName,
      source: {
        name: sourceName,
        units: [
          {
            name: unitName,
            content
          }
        ]
      }
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a note
exports.updateNote = async (req, res) => {
  const { semesterId, branchId, subjectName, sourceName, unitName } = req.params;
  const { content } = req.body;

  try {
    const note = await Note.findOneAndUpdate(
      {
        semesterId,
        branchId,
        subjectName,
        'source.name': sourceName,
        'source.units.name': unitName
      },
      { $set: { 'source.units.$.content': content } },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  const { semesterId, branchId, subjectName, sourceName, unitName } = req.params;

  try {
    const note = await Note.findOneAndUpdate(
      {
        semesterId,
        branchId,
        subjectName,
        'source.name': sourceName,
        'source.units.name': unitName
      },
      { $pull: { 'source.units': { name: unitName } } }
    );
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
