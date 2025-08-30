const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new project
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Seed sample projects
router.post('/seed', async (req, res) => {
  try {
    const sampleProjects = [
      {
        name: "Neural Network Visualizer",
        description: "Interactive 3D visualization of neural network architectures with real-time training visualization",
        tech_stack: ["Python", "TensorFlow", "Three.js", "React", "WebGL"],
        github_url: "https://github.com/yourhandle/neural-viz",
        live_demo: "https://neural-viz.demo.com",
        category: "ai_ml",
        status: "completed",
        code_snippet: "def visualize_network(model):\n    layers = model.layers\n    for i, layer in enumerate(layers):\n        nodes = layer.units\n        render_layer_3d(nodes, i)\n    return network_graph",
        ascii_art: "    🧠 NEURAL NETWORK\n    ┌─○─○─○─┐\n    │ │ │ │ │\n    ├─○─○─○─┤\n    │ │ │ │ │\n    └─○─○─○─┘\n   INPUT → OUTPUT"
      },
      {
        name: "AI Code Assistant",
        description: "VS Code extension that provides intelligent code suggestions using GPT-4 and context awareness",
        tech_stack: ["TypeScript", "VS Code API", "OpenAI API", "Node.js"],
        github_url: "https://github.com/yourhandle/ai-code-assistant",
        category: "ai_ml",
        status: "in_progress",
        code_snippet: "async function generateCodeSuggestion(context) {\n  const response = await openai.chat.completions.create({\n    model: 'gpt-4',\n    messages: [{ role: 'user', content: context }]\n  });\n  return response.choices[0].message.content;\n}",
        ascii_art: "    💡 AI ASSISTANT\n    ┌─────────────┐\n    │ > function  │\n    │ > suggest() │\n    │ > optimize  │\n    └─────────────┘"
      }
    ];

    await Project.deleteMany({}); // Clear existing
    const projects = await Project.insertMany(sampleProjects);
    res.json({ message: 'Sample projects added', count: projects.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;