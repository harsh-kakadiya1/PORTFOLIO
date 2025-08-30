const express = require('express');
const projects = require('../data/projects');
const router = express.Router();

// Get all projects
router.get('/', (req, res) => {
  try {
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get project by ID
router.get('/:id', (req, res) => {
  try {
    const project = projects.find(p => p.id === req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get projects by category
router.get('/category/:category', (req, res) => {
  try {
    const categoryProjects = projects.filter(p => p.category === req.params.category);
    res.json(categoryProjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;