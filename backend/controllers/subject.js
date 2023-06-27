// subjectController.js

const Subject = require('../models/subject');

// Get all subjects of a specific semester and branch
exports.getSubjects = async (req, res) => {
  const { semester, branch } = req.params;
  try {
    const subjects = await Subject.find({ semesterId: semester, branchId: branch });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve subjects' });
  }
};
// Get a specific subject
exports.getSubject = async (req, res) => {
  const { semester, branch, subject: subjectName } = req.params;
  try {
    const subject = await Subject.findOne({ semesterId: semester, branchId: branch, name: subjectName });
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve subject' });
  }
};


// Create a new subject
exports.createSubject = async (req, res) => {
  const { semester, branch } = req.params;
  const { subjectName } = req.body;
  try {
    const newSubject = await Subject.create({
      semesterId: semester,
      branchId: branch,
      name: subjectName
    });
    res.json(newSubject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create subject' });
  }
};

// Update a specific subject
exports.updateSubject = async (req, res) => {
  const { semester, branch, subject } = req.params;
  const { updatedSubjectName } = req.body;
  try {
    const subjectToUpdate = await Subject.findOneAndUpdate(
      { semesterId: semester, branchId: branch, name: subject },
      { name: updatedSubjectName },
      { new: true }
    );
    if (!subjectToUpdate) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.json(subjectToUpdate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update subject' });
  }
};

// Delete a specific subject
exports.deleteSubject = async (req, res) => {
  const { semester, branch, subject } = req.params;
  try {
    const deletedSubject = await Subject.findOneAndDelete({ semesterId: semester, branchId: branch, name: subject });
    if (!deletedSubject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete subject' });
  }
};
