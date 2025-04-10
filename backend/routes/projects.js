const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Import controller methods
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  storeDemoProjects
} = require('../controllers/projectController');

// Define routes
router.route('/')
  .get(getProjects)
  .post(protect, createProject);

router.route('/:id')
  .get(getProject)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

// Route to store demo projects
router.post('/demo', storeDemoProjects);

module.exports = router;
