const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note');
const isAdminMiddleware = require('../middlewares/user');
const authMiddleware = require('../middlewares/auth');



// Admin routes
router.post('/semester/:semester/branch/:branch/subjects/:subject/notes/source',authMiddleware,isAdminMiddleware, noteController.addNoteSource);
router.delete('/semester/:semester/branch/:branch/subjects/:subject/notes/source/:source',authMiddleware,isAdminMiddleware, noteController.deleteSource);
router.put('/semester/:semester/branch/:branch/subjects/:subject/notes/sources/:source',authMiddleware,isAdminMiddleware, noteController.updateNoteSource);
router.post('/semester/:semester/branch/:branch/subjects/:subject/notes/source/:source/unit',authMiddleware,isAdminMiddleware, noteController.addNoteUnits);
router.put('/semester/:semester/branch/:branch/subjects/:subject/notes/sources/:source/:unit',authMiddleware,isAdminMiddleware, noteController.updateNoteUnit);
router.delete('/semester/:semester/branch/:branch/subjects/:subject/notes/sources/:source/:unit',authMiddleware,isAdminMiddleware, noteController.deleteNoteUnit);

// User routes
router.get('/semester/:semester/branch/:branch/subjects/:subject/notes', noteController.getNotes);
router.get('/semester/:semester/branch/:branch/subjects/:subject/notes/sources', noteController.getNoteSources);
router.get('/semester/:semester/branch/:branch/subjects/:subject/notes/sources/:source/:unit', noteController.getNoteUnit);


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
