const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subject");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/user");

// Get all subjects of a specific semester and branch
router.get(
  "/semester/:semester/branch/:branch/subjects",
  authMiddleware,
  subjectController.getSubjects
);

// Get a specific subject
router.get(
  "/semester/:semester/branch/:branch/subjects/:subject",
  authMiddleware,
  
  subjectController.getSubject
);

// Create a new subject
router.post(
  "/semester/:semester/branch/:branch/subjects",
  authMiddleware,
  isAdminMiddleware,
  subjectController.createSubject
);

// Update a specific subject
router.put(
  "/semester/:semester/branch/:branch/subjects/:subject",
  authMiddleware,
  isAdminMiddleware,
  subjectController.updateSubject
);

// Delete a specific subject
router.delete(
  "/semester/:semester/branch/:branch/subjects/:subject",
  authMiddleware,
  isAdminMiddleware,
  subjectController.deleteSubject
);

module.exports = router;
