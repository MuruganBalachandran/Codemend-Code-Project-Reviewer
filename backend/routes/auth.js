const express = require('express');
const { register, login, getMe, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { check } = require('express-validator');

const router = express.Router();

// Register a new user
router.post('/register', [
  check('fullName', 'Name is required').not().isEmpty(),
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], register);

// Login user
router.post('/login', login);

// Get current userzzzzz
router.get('/me', protect, getMe);

// Logout user
router.get('/logout', logout);

module.exports = router;
