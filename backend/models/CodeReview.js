const mongoose = require('mongoose');

const CodeReviewSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  review: { 
    type: String,
    required: true 
  },
  codeSnippet: { 
    type: String 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('CodeReview', CodeReviewSchema, 'CodeReview');
