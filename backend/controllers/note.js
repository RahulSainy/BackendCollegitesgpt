const Note = require("../models/note");

// Admin operations
// Add a new source to the notes of a specific subject in a semester
exports.addNoteSource = async (req, res) => {
  const { semester, branch, subject } = req.params;
  const { source } = req.body;

  try {
    // Find the note based on the provided semester, branch, and subject
    const note = await Note.findOne({
      semesterId: semester,
      branchId: branch,
      subjectId: subject,
    });

    if (!note) {
      // If the note doesn't exist, create a new note with the source
      const newNote = new Note({
        semesterId: semester,
        branchId: branch,
        subjectId: subject,
        sources: [
          {
            sourceName: source,
            units: [],
          },
        ],
      });

      await newNote.save();

      return res.status(201).json(newNote);
    } else {
      // If the note exists, check if the source already exists
      const sourceIndex = note.sources.findIndex(
        (src) => src.sourceName === source
      );

      if (sourceIndex === -1) {
        // If the source doesn't exist, add the new source to the note
        note.sources.push({
          sourceName: source,
          units: [],
        });

        await note.save();

        return res.status(200).json(note);
      } else {
        return res.status(400).json({ error: "Source already exists" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update a specific source in the notes of a specific subject in a semester
exports.updateNoteSource = async (req, res) => {
  const { semester, branch, subject, source } = req.params;
  const { newSource } = req.body;

  try {
    // Find the note based on the provided semester, branch, and subject
    const note = await Note.findOne({
      semesterId: semester,
      branchId: branch,
      subjectId: subject,
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Find the specific source and update its sourceName
    const sourceIndex = note.sources.findIndex(
      (src) => src.sourceName === source
    );

    if (sourceIndex === -1) {
      return res.status(404).json({ error: "Source not found" });
    }

    note.sources[sourceIndex].sourceName = newSource;

    await note.save();

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};


exports.deleteSource = async (req, res) => {
  const { semester, branch, subject, source } = req.params;

  try {
    // Find the note based on the provided semester, branch, and subject
    const note = await Note.findOne({
      semesterId: semester,
      branchId: branch,
      subjectId: subject,
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Find the index of the source in the sources array
    const sourceIndex = note.sources.findIndex(
      (src) => src.sourceName === source
    );

    if (sourceIndex === -1) {
      return res.status(404).json({ error: "Source not found" });
    }

    // Remove the source from the sources array
    note.sources.splice(sourceIndex, 1);

    await note.save();

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Add units to an existing source of notes of a specific subject in a semester
exports.addNoteUnits = async (req, res) => {
  const { semester, branch, subject, source } = req.params;
  const units = req.body;

  try {
    // Find the note based on the provided semester, branch, subject, and source
    const note = await Note.findOne({
      semesterId: semester,
      branchId: branch,
      subjectId: subject,
      "sources.sourceName": source,
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    const sourceIndex = note.sources.findIndex(
      (src) => src.sourceName === source
    );

    if (sourceIndex === -1) {
      return res.status(400).json({ error: "Source not found" });
    }

    if (!Array.isArray(units) || units.length === 0) {
      return res.status(400).json({ error: "Invalid request. Please provide an array of units." });
    }

    const newUnits = units.map((unit) => {
      const { unitName, pdfLink, topics } = unit;

      if (!unitName || !pdfLink || !topics) {
        return null; // Skip invalid units
      }

      return { unitName, pdfLink, topics };
    }).filter(Boolean);

    if (newUnits.length === 0) {
      return res.status(400).json({ error: "Invalid request. Please provide valid units." });
    }

    note.sources[sourceIndex].units.push(...newUnits);

    await note.save();

    return res.status(200).json(note);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update a specific unit
exports.updateNoteUnit = async (req, res) => {
  const { semester, branch, subject, source, unit } = req.params;
  const {  pdfLink, topics } = req.body;

  try {
    // Find the note based on the provided semester, branch, subject, source, and unit
    const note = await Note.findOne({
      semesterId: semester,
      branchId: branch,
      subjectId: subject,
      "sources.sourceName": source,
      "sources.units.unitName": unit,
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Find the specific unit and update its pdfLink, and topics
    const sourceIndex = note.sources.findIndex(
      (src) => src.sourceName === source
    );
    const unitIndex = note.sources[sourceIndex].units.findIndex(
      (u) => u.unitName === unit
    );

    if (unitIndex === -1) {
      return res.status(404).json({ error: "Unit not found" });
    }

    const specificUnit = note.sources[sourceIndex].units[unitIndex];
   
    specificUnit.pdfLink = pdfLink;
    specificUnit.topics = topics;

    await note.save();

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a specific unit
exports.deleteNoteUnit = async (req, res) => {
  const { semester, branch, subject, source, unit } = req.params;

  try {
    // Find the note based on the provided semester, branch, subject, source, and unit
    const note = await Note.findOne({
      semesterId: semester,
      branchId: branch,
      subjectId: subject,
      "sources.sourceName": source,
      "sources.units.unitName": unit,
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Find the specific unit and remove it from the note
    const unitIndex = note.sources.findIndex(
      (src) => src.sourceName === source
    );
    note.sources[unitIndex].units = note.sources[unitIndex].units.filter(
      (u) => u.unitName !== unit
    );
    await note.save();

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// User operations

// Get all notes for a specific subject in a semester and branch
exports.getNotes = async (req, res) => {
  const { semester, branch, subject } = req.params;

  try {
    // Retrieve all notes for the given subject, semester, and branch from the database
    const notes = await Note.find({
      semesterId: semester,
      branchId: branch,
      subjectId: subject,
    });

    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get sources and units for notes of a specific subject in a semester and branch
exports.getNoteSources = async (req, res) => {
  const { semester, branch, subject } = req.params;

  try {
    // Retrieve distinct sources for the given subject, semester, and branch from the database
    const sources = await Note.distinct("sources.sourceName", {
      semesterId: semester,
      branchId: branch,
      subjectId: subject,
    });

    // Retrieve units for each source
    const noteSources = [];
    for (const source of sources) {
      const units = await Note.findOne({
        semesterId: semester,
        branchId: branch,
        subjectId: subject,
        "sources.sourceName": source,
      }).select("sources.units");

      noteSources.push({ source, units });
    }

    return res.status(200).json(noteSources);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get a specific unit for a subject, source, and unit
exports.getNoteUnit = async (req, res) => {
  const { semester, branch, subject, source, unit } = req.params;

  try {
    // Retrieve the specific note for the given subject, semester, branch, source, and unit from the database
    const note = await Note.findOne({
      semesterId: semester,
      branchId: branch,
      subjectId: subject,
      "sources.sourceName": source,
      "sources.units.unitName": unit,
    }).select("sources.$");

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res
      .status(200)
      .json(note.sources[0].units.find((u) => u.unitName === unit));
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
