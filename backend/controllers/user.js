const User = require('../models/user');

  // userController.js
  exports.getProfile = async (req, res) => {
    try {
      // Get the user ID from the authenticated user
      const userId = req.userId;
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Return the user profile data
      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  exports.updateProfile = async (req, res) => {
    try {
      // Get the user ID from the authenticated user
      const userId = req.userId;
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Extract the updated user data from the request body
      const { name, email, phone } = req.body;
  
      // Update the user's profile data
      user.name = name || user.name;
      user.email = email || user.email;
      user.phone = phone || user.phone;
  
      // Save the updated user data
      await user.save();
  
      // Return a success response
      res.json({ message: 'User profile updated successfully', user });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };