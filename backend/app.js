const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
// helmet will protect the app from common security vulnerabilities.
const helmet = require("helmet");
const dotenv = require("dotenv");
const connectToDatabase = require("./conifg/database");

dotenv.config();

// const notesRoute = require("./routes/notes");
const userRoute = require("./routes/user");
const subjectRoute = require("./routes/subject");
const noteRoute = require("./routes/note");
const bookRoute = require("./routes/book");
const courseRoute = require("./routes/course");
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Call the function to connect to the database
connectToDatabase();

// app.use("/api/notes", notesRoute);
app.use("/api/users", userRoute);
// Use the routes with the desired structure
app.use("/api", subjectRoute);
app.use("/api", noteRoute);
app.use("/api", bookRoute);
app.use("/api",courseRoute);
app.use("/static", express.static("public"));

module.exports = app;
