const express = require('express');
const router = express.Router();

const notesController = require('../controllers/note');

// Get all notes of a specific semester, branch, subject
router.get('/semester/:semesterId/branch/:branchId/subjects/:subjectName/notes', notesController.getAllNotes);

// Get units of a specific note source
router.get('/semester/:semesterId/branch/:branchId/subjects/:subjectName/notes/:sourceName/units', notesController.getUnitsBySource);

// Create a new note
router.post('/semester/:semesterId/branch/:branchId/subjects/:subjectName/notes', notesController.createNote);

// Update a note
router.put('/semester/:semesterId/branch/:branchId/subjects/:subjectName/notes/:sourceName/:unitName', notesController.updateNote);

// Delete a note
router.delete('/semester/:semesterId/branch/:branchId/subjects/:subjectName/notes/:sourceName/:unitName', notesController.deleteNote);

module.exports = router;
