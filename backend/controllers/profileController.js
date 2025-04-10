const User = require('../models/User');
const UserProfile = require('../models/UserProfile');
const Project = require('../models/Project');

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    let userProfile = await UserProfile.findOne({ user: req.user.id });
    if (!userProfile) {
      userProfile = await UserProfile.create({ user: req.user.id });
    }

    // Fetch user's projects
    const projects = await Project.find({ owner: req.user.id });

    const userData = {
      _id: user._id,
      userId: user.userId,
      name: user.name,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      bio: userProfile.bio || '',
      profileImage: userProfile.profileImage || '',
      location: userProfile.location || '',
      website: userProfile.website || '',
      github: userProfile.github || '',
      skills: userProfile.skills || [],
      interests: userProfile.interests || [],
      achievements: userProfile.achievements || [],
      stats: userProfile.stats || { projects: 0, codeReviews: 0, suggestions: 0, reputation: 0 },
      privacy: userProfile.privacy || { email: false, location: true, activity: true, projects: true },
      projects: projects
    };
    
    res.status(200).json({ success: true, data: userData });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
exports.updateUserProfile = async (req, res, next) => {
  try {
    // Exclude fields not meant for update
    delete req.body.recentActivity; // Do not update activity logs

    const userUpdateData = {};
    // Map fullName or name to user name
    if (req.body.fullName || req.body.name) {
      userUpdateData.name = req.body.fullName || req.body.name;
    }
    if (req.body.username) userUpdateData.username = req.body.username;
    if (req.body.email) userUpdateData.email = req.body.email;

    const profileUpdateData = {};
    if (req.body.bio !== undefined) profileUpdateData.bio = req.body.bio;
    if (req.body.website !== undefined) profileUpdateData.website = req.body.website;
    if (req.body.github !== undefined) profileUpdateData.github = req.body.github;
    if (req.body.skills) profileUpdateData.skills = req.body.skills;
    if (req.body.interests) profileUpdateData.interests = req.body.interests;
    if (req.body.privacy) profileUpdateData.privacy = req.body.privacy;
    if (req.body.theme) profileUpdateData.theme = req.body.theme;
    // Added update for profile image:
    if (req.body.profileImage !== undefined) profileUpdateData.profileImage = req.body.profileImage;
    
    if (Object.keys(userUpdateData).length > 0) {
      await User.findByIdAndUpdate(req.user.id, userUpdateData, { new: true, runValidators: true });
    }
    
    let userProfile = await UserProfile.findOne({ user: req.user.id });
    if (userProfile) {
      userProfile = await UserProfile.findOneAndUpdate({ user: req.user.id }, profileUpdateData, { new: true, runValidators: true });
    } else {
      profileUpdateData.user = req.user.id;
      userProfile = await UserProfile.create(profileUpdateData);
    }
    
    const user = await User.findById(req.user.id);
    const userData = {
      _id: user._id,
      userId: user.userId,
      name: user.name,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      bio: userProfile.bio || '',
      profileImage: userProfile.profileImage || '',
      location: userProfile.location || '',
      website: userProfile.website || '',
      github: userProfile.github || '',
      skills: userProfile.skills || [],
      interests: userProfile.interests || [],
      achievements: userProfile.achievements || [],
      stats: userProfile.stats || { projects: 0, codeReviews: 0, suggestions: 0, reputation: 0 },
      privacy: userProfile.privacy || { email: false, location: true, activity: true },
      updatedAt: userProfile.updatedAt
    };
    
    res.status(200).json({ success: true, data: userData });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user activities
// @route   GET /api/profile/activity
// @access  Private
exports.getUserActivities = async (req, res, next) => {
  try {
    // In a real implementation, this would fetch from an Activity model
    // For now, returning sample activities
    const sampleActivities = [
      {
        id: 'act1',
        type: 'project',
        title: 'Created a new project: E-Commerce Platform',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        projectId: 'p1',
        projectName: 'E-Commerce Platform'
      },
      {
        id: 'act2',
        type: 'review',
        title: 'Reviewed code for Shopping Cart component',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        projectId: 'p1',
        projectName: 'E-Commerce Platform'
      }
    ];
    
    res.status(200).json({
      success: true,
      count: sampleActivities.length,
      data: sampleActivities
    });
  } catch (err) {
    next(err);
  }
};
