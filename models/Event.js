const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  event: { type: String, required: true },
  description: { type: String },
  image: {
    type: String,
    
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;