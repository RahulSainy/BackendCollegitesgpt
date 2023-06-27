const Subject = require('../models/subject');

// Get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all subjects of a specific semester and branch
exports.getSubjectsBySemesterAndBranch = async (req, res) => {
  const { semesterId, branchId } = req.params;

  try {
    const subjects = await Subject.find({ semesterId, branchId });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Create a new subject
exports.createSubject = async (req, res) => {
  const { semesterId, branchId } = req.params;
  const { name } = req.body;

  try {
    const subject = new Subject({ semesterId, branchId, name });
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a specific subject
exports.getSubject = async (req, res) => {
  const { semesterId, branchId, subjectName } = req.params;

  try {
    const subject = await Subject.findOne({ semesterId, branchId, name: subjectName });
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a subject
exports.updateSubject = async (req, res) => {
  const { semesterId, branchId, subjectName } = req.params;
  const { name } = req.body;
  
  try {
    const subject = await Subject.findOneAndUpdate({ semesterId, branchId, name: subjectName }, { name }, { new: true });
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a subject
exports.deleteSubject = async (req, res) => {
  const { semesterId, branchId, subjectName } = req.params;
  
  try {
    const subject = await Subject.findOneAndDelete({ semesterId, branchId, name: subjectName });
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
