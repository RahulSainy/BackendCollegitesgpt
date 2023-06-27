const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject');

// Get all subjects of a specific semester and branch
router.get('/semester/:semester/branch/:branch/subjects', subjectController.getSubjects);

// Get a specific subject
router.get('/semester/:semester/branch/:branch/subjects/:subject', subjectController.getSubject);

// Create a new subject
router.post('/semester/:semester/branch/:branch/subjects', subjectController.createSubject);

// Update a specific subject
router.put('/semester/:semester/branch/:branch/subjects/:subject', subjectController.updateSubject);

// Delete a specific subject
router.delete('/semester/:semester/branch/:branch/subjects/:subject', subjectController.deleteSubject);

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const subjectController = require('../controllers/subject');

// // Get all subjects of a specific semester and branch
// router.get('/semester/:semester/branch/:branch/subjects', subjectController.getSubjects);

// // Get a specific subject
// router.get('/semester/:semester/branch/:branch/subjects/:subject', subjectController.getSubject);

// // Create a new subject
// router.post('/semester/:semester/branch/:branch/subjects', subjectController.createSubject);

// // Update a specific subject
// router.put('/semester/:semester/branch/:branch/subjects/:subject', subjectController.updateSubject);

// // Delete a specific subject
// router.delete('/semester/:semester/branch/:branch/subjects/:subject', subjectController.deleteSubject);

// module.exports = router;







// const express = require('express');
// const router = express.Router();

// const subjectsController = require('../controllers/subject');

// // Get all subjects
// router.get('/', subjectsController.getAllSubjects);

// // Get a specific subject
// router.get('/semester/:semesterId/branch/:branchId/subject/:subjectName', subjectsController.getSubject);


// // Create a new subject
// router.post('/semester/:semesterId/branch/:branchId/subject', subjectsController.createSubject);


// // Update a subject
// router.put('/:semesterId/branch/:branchId/subject/:subjectId', subjectsController.updateSubject);

// // Delete a subject
// router.delete('/:semesterId/branch/:branchId/subject/:subjectId', subjectsController.deleteSubject);

// module.exports = router;

