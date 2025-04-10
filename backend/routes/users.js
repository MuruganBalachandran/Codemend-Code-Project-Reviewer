const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Import controller methods
const { 
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMe,
  updateMe
} = require('../controllers/userController');

// Define routes
router.route('/')
  .get(protect, authorize('admin'), getUsers);

// Current user routes
router.route('/me')
  .get(protect, getMe)
  .put(protect, updateMe);

router.route('/:id')
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, authorize('admin'), deleteUser);

module.exports = router;
