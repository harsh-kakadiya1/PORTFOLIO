const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  tech_stack: [{
    type: String
  }],
  github_url: {
    type: String
  },
  live_demo: {
    type: String
  },
  code_snippet: {
    type: String
  },
  category: {
    type: String,
    enum: ["ai_ml", "web_dev", "mobile", "data_science", "devtools", "other"],
    default: "other"
  },
  status: {
    type: String,
    enum: ["completed", "in_progress", "planning"],
    default: "planning"
  },
  ascii_art: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);