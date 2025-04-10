const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hash a password using bcrypt
exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

// Compare a password with its hashed version
exports.comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

// Generate a JWT token
exports.generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};
