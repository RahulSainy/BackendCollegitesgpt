const Course = require('../models/course');

// Add a course to a specific subject in a semester
exports.addCourse = async (req, res) => {
  const { semester, branch, subject } = req.params;
  const { title, author, courseLink, imageLink, source, price } = req.body;

  try {
    const newCourse = new Course({
      semesterId: semester,
      branchId: branch,
      subjectId: subject,
      title: title,
      author: author,
      courseLink: courseLink,
      imageLink: imageLink,
      source: source,
      price: price
    });

    await newCourse.save();

    return res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a course of a specific subject in a semester
exports.updateCourse = async (req, res) => {
  const { semester, branch, subject, title } = req.params;
  const { author, courseLink, imageLink, source, price } = req.body;

  try {
    const course = await Course.findOneAndUpdate(
      {
        semesterId: semester,
        branchId: branch,
        subjectId: subject,
        title: title
      },
      {
        author: author,
        courseLink: courseLink,
        imageLink: imageLink,
        source: source,
        price: price
      },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    return res.status(200).json(course);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a course of a specific subject in a semester
exports.deleteCourse = async (req, res) => {
  const { semester, branch, subject, title } = req.params;

  try {
    const course = await Course.findOneAndRemove({
      semesterId: semester,
      branchId: branch,
      subjectId: subject,
      title: title
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    return res.status(200).json(course);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all courses for a specific subject in a semester and branch
exports.getCourses = async (req, res) => {
  const { semester, branch, subject } = req.params;

  try {
    const courses = await Course.find({
      semesterId: semester,
      branchId: branch,
      subjectId: subject
    });

    return res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
