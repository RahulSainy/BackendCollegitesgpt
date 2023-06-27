const express = require('express');
const router = express.Router();

const subjectsController = require('../controllers/subject');

// Create a new subject
router.post('/semester/:semesterId/branch/:branchId/subject', subjectsController.createSubject);

// Get all subjects
router.get('/', subjectsController.getAllSubjects);

// Get all subjects of a specific semester and branch
router.get('/semester/:semesterId/branch/:branchId', subjectsController.getSubjectsBySemesterAndBranch);

// Get a specific subject
router.get('/semester/:semesterId/branch/:branchId/subject/:subjectName', subjectsController.getSubject);

// Update a subject
router.put('/semester/:semesterId/branch/:branchId/subject/:subjectName', subjectsController.updateSubject);

// Delete a subject
router.delete('/semester/:semesterId/branch/:branchId/subject/:subjectName', subjectsController.deleteSubject);

module.exports = router;






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

