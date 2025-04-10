const Project = require('../models/Project');
const mongoose = require('mongoose');
const ProjectReview = require('../models/ProjectReview');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().lean();
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public (with private check)
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate({
      path: 'owner',
      select: 'fullName username profileImage'
    });
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    // Check if private project is accessed by non-owner
    if (project.visibility === 'private' && 
        (!req.user || req.user.id !== project.owner.toString())) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this project'
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res, next) => {
  try {
    // Add owner to request body
    req.body.owner = req.user.id;
    
    const project = await Project.create(req.body);
    
    res.status(201).json({
      success: true,
      data: project
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    // Make sure user is project owner
    if (project.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this project'
      });
    }
    
    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (err) {
    next(err);
  }
};


exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    if (project.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this project'
      });
    }
    
    await project.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Store demo projects to ProjectReview collection
// @route   POST /api/projects/demo
// @access  Private (Admin only)
exports.storeDemoProjects = async (req, res, next) => {
  try {
    const demoProjects = [
      {
        name: 'E-Commerce Platform',
        description: 'A platform for online shopping with payment integration.',
        lastModified: new Date(),
        status: 'active',
        language: 'JavaScript',
        stars: 120,
        isGithubLinked: true,
        collaborators: [
          { id: '1', name: 'John Doe', avatar: 'https://example.com/avatar1.png' },
          { id: '2', name: 'Jane Smith', avatar: 'https://example.com/avatar2.png' }
        ],
        tags: ['e-commerce', 'shopping', 'web']
      },
      {
        name: 'Social Media App',
        description: 'A social media platform for connecting with friends.',
        lastModified: new Date(),
        status: 'completed',
        language: 'Python',
        stars: 200,
        isGithubLinked: false,
        collaborators: [
          { id: '3', name: 'Alice Brown', avatar: 'https://example.com/avatar3.png' }
        ],
        tags: ['social', 'media', 'app']
      }
    ];

    // Insert demo projects into the ProjectReview collection
    const insertedProjects = await ProjectReview.insertMany(demoProjects);

    res.status(201).json({
      success: true,
      data: insertedProjects
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get project details
// @route   GET /api/projects/:id
// @access  Public
exports.getProjectDetails = async (req, res, next) => {
  try {
    const projectId = req.params.id;

    const project = await ProjectReview.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const collaborators = await Collaborator.find({ projectId });
    const tags = await ProjectTag.find({ projectId });
    const commits = await ProjectCommit.find({ projectId });
    const suggestions = await ProjectSuggestion.find({ projectId });

    res.status(200).json({
      success: true,
      data: {
        project,
        collaborators,
        tags,
        commits,
        suggestions
      }
    });
  } catch (err) {
    next(err);
  }
};
