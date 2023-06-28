const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');

// Admin routes
router.post('/semester/:semester/branch/:branch/subjects/:subject/courses', courseController.addCourse);
router.put('/semester/:semester/branch/:branch/subjects/:subject/courses/:title', courseController.updateCourse);
router.delete('/semester/:semester/branch/:branch/subjects/:subject/courses/:title', courseController.deleteCourse);

// User routes
router.get('/semester/:semester/branch/:branch/subjects/:subject/courses', courseController.getCourses);

module.exports = router;
