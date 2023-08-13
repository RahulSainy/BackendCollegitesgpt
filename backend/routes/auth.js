const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const  authMiddleware = require('../middlewares/auth');

// User sign-up route
router.post('/signup', authController.signUp);

// User login route
router.post('/login', authController.login);

// User email confirmation route
router.get('/confirm-email', authController.confirmEmail);

// Route to fetch user details by ID
router.get('/profile/:userId', authController.getUserById);
// Update user profile
router.put("/profile/:userId", authMiddleware, authController.updateProfile);

// Forget password route
router.post('/forget-password', authController.forgetPassword);

// Reset password route
router.post('/reset-password', authController.resetPassword);



// Protected route example
router.get('/protected-route', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

// User promotion to moderator route
router.patch('/promote-to-moderator/:userId', authMiddleware, authController.promoteToModerator);
router.post('/users/:userId/promote-to-hub', authController.promoteToHub);

router.get('/is-logged-in', authMiddleware, (req, res) => {
  res.json(true); // User is logged in
});
router.post('/logout', authMiddleware, authController.logout);


module.exports = router;
