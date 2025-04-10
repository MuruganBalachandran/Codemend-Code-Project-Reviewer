const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
    // Removed 'required: true' since we'll auto-generate this
  },
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: true,
    trim: true,
    maxlength: [30, 'Username cannot be more than 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate userId before saving
UserSchema.pre('save', async function(next) {
  // Always generate userId for new documents
  if (this.isNew) {
    try {
      // Get the count of documents to generate a sequential number
      const count = await mongoose.model('User').countDocuments();
      this.userId = `USR_${(1001 + count).toString()}`;
    } catch (error) {
      console.error('Error generating userId:', error);
      // Provide a fallback using timestamp to ensure uniqueness
      this.userId = `USR_${Date.now().toString().slice(-7)}`;
    }
  }
  next();
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match password
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export model with explicit collection name "Users" in the "CodeMend" database
module.exports = mongoose.model('User', UserSchema, 'Users');
