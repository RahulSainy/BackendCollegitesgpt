const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

// User sign-up route
router.post('/signup', userController.signUp);

// User login route
router.post('/login', userController.login);

// User email confirmation route
router.get('/confirm-email', userController.confirmEmail);

// Protected route example
router.get('/protected-route', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

// User promotion to moderator route
router.patch('/promote-to-moderator/:userId', authMiddleware, userController.promoteToModerator);

module.exports = router;
