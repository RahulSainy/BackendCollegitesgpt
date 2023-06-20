const bcrypt = require('bcrypt');

// Hashes the provided password
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

// Compares the provided password with the hashed password
const comparePassword = async (password, hashedPassword) => {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  return isPasswordValid;
};

module.exports = { hashPassword, comparePassword };
