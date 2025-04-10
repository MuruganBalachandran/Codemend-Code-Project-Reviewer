const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { 
  getUserProfile, 
  updateUserProfile,
  getUserActivities
} = require('../controllers/profileController');

// Define routes
router.route('/')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/activity')
  .get(protect, getUserActivities);

module.exports = router;
