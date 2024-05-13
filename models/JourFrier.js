const mongoose = require('mongoose');

const jourfrier = new mongoose.Schema({
  designation: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  departmentLocation: {
    type: String,
    required: true,
  },
});

// Create and export the model
module.exports = mongoose.model('JourFrier', jourfrier);