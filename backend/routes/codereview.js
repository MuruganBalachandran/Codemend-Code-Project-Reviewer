const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createReview, getReviews } = require('../controllers/codeReviewController');

// Define routes for code reviews
router.route('/')
  .post(protect, createReview)
  .get(protect, getReviews);

module.exports = router;
