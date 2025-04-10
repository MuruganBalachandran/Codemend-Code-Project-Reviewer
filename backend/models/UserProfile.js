const mongoose = require('mongoose');

// Schema for user achievements
const AchievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  icon: {
    type: String,
    default: '🏆'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Schema for user stats
const StatsSchema = new mongoose.Schema({
  projects: {
    type: Number,
    default: 0
  },
  codeReviews: {
    type: Number,
    default: 0
  },
  suggestions: {
    type: Number,
    default: 0
  },
  reputation: {
    type: Number,
    default: 0
  },
  contributionStreak: {
    type: Number,
    default: 0
  },
  lastContribution: {
    type: Date
  }
});

// Schema for privacy settings
const PrivacySchema = new mongoose.Schema({
  email: {
    type: Boolean,
    default: false
  },
  location: {
    type: Boolean,
    default: true
  },
  activity: {
    type: Boolean,
    default: true
  },
  projects: {
    type: Boolean,
    default: true
  },
  contributions: {
    type: Boolean,
    default: true
  }
});

// Main UserProfile schema
const UserProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  profileImage: {
    type: String
  },
  location: {
    type: String
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL'
    ]
  },
  github: {
    type: String
  },
  twitter: {
    type: String
  },
  linkedin: {
    type: String
  },
  skills: [String],
  interests: [String],
  achievements: [AchievementSchema],
  stats: {
    type: StatsSchema,
    default: () => ({})
  },
  privacy: {
    type: PrivacySchema,
    default: () => ({})
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'system'],
    default: 'system'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-update the updatedAt field
UserProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the model
module.exports = mongoose.model('UserProfile', UserProfileSchema, 'UserProfiles');
