const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'completed'],
    default: 'active'
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
  projectImage: {
    type: String
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  collection: 'projects' // Explicitly set the collection name
});

module.exports = mongoose.model('Project', ProjectSchema);
