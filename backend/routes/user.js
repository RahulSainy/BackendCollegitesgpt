const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const  authMiddleware = require('../middlewares/auth');

// router.get('/profile', authMiddleware, userController.getProfile);
// router.put('/profile', authMiddleware, userController.updateProfile);


module.exports = router;
