const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.log("Connection failed", error);
  }
};

module.exports = connectToDatabase;
