const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const authMiddleware = async (req, res, next) => {
    try {
        // Check if the Authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    // Verify the token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Retrieve the user based on the decoded token
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Attach the user object to the request
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = authMiddleware;
