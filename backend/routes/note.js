const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note');

// Admin routes
//make this name to addNoteUnit to source unit as it is adding with source 
router.post('/semester/:semester/branch/:branch/subjects/:subject/notes/source', noteController.addNoteSource);
router.post('/semester/:semester/branch/:branch/subjects/:subject/notes/source/:source/unit', noteController.addNoteUnits);

// User routes
router.get('/semester/:semester/branch/:branch/subjects/:subject/notes', noteController.getNotes);
router.get('/semester/:semester/branch/:branch/subjects/:subject/notes/sources', noteController.getNoteSources);
router.get('/semester/:semester/branch/:branch/subjects/:subject/notes/:source/:unit', noteController.getNoteUnit);
router.put('/semester/:semester/branch/:branch/subjects/:subject/notes/:source/:unit', noteController.updateNoteUnit);
router.delete('/semester/:semester/branch/:branch/subjects/:subject/notes/:source/:unit', noteController.deleteNoteUnit);

module.exports = router;



// const Note = require('../models/note');
// const express = require('express');
// const router = express.Router();

// const noteController = require('../controllers/note');

// // Admin routes
// router.post('/notes/:semester/:branch/:subject/:source', noteController.addNoteUnit);

// // User routes
// router.get('/notes/:semester/:branch/:subject', noteController.getNotes);
// router.get('/notes/:semester/:branch/:subject/sources', noteController.getNoteSources);
// router.get('/notes/:semester/:branch/:subject/:source/:unit', noteController.getNoteUnit);
// router.put('/notes/:semester/:branch/:subject/:source/:unit', noteController.updateNoteUnit);
// router.delete('/notes/:semester/:branch/:subject/:source/:unit', noteController.deleteNoteUnit);

// module.exports = router;
