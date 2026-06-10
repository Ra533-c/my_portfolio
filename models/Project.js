const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  techStack: {
    type: [String],
    default: []
  },
  imageUrl: {
    type: String,
    required: true
  },
  liveLink: {
    type: String,
    required: true
  },
  githubLink: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
