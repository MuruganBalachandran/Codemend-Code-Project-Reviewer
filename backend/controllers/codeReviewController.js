const CodeReview = require('../models/CodeReview');

// @desc    Create a new code review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res, next) => {
  try {
    const { review, codeSnippet } = req.body;
    if (!review) {
      return res.status(400).json({ success: false, error: 'Review text is required' });
    }
    const newReview = await CodeReview.create({
      user: req.user.id,
      review,
      codeSnippet
    });
    res.status(201).json({ success: true, data: newReview });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all code reviews (optionally filter by user)
// @route   GET /api/reviews
// @access  Private
exports.getReviews = async (req, res, next) => {
  try {
    // To fetch reviews for current user, replace {} with { user: req.user.id }
    const reviews = await CodeReview.find({});
    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (err) {
    next(err);
  }
};
