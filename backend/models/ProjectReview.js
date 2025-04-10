const mongoose = require('mongoose');

const ProjectReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'archived'],
    required: true
  },
  language: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    default: 0
  },
  isGithubLinked: {
    type: Boolean,
    default: false
  },
  collaborators: [
    {
      id: String,
      name: String,
      avatar: String
    }
  ],
  tags: [String]
});

module.exports = mongoose.model('ProjectReview', ProjectReviewSchema);