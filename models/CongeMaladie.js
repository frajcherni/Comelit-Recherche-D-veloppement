const mongoose = require('mongoose');

module.exports = mongoose.model('LeaveM', {
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },

  date_debut: String,
  date_fin: String,
  debut : String,
  fin : String ,
  motif: String,
  days: Number,
  
  Smaladie: Number,
  
  
  status: {
    type: String,
    default: 'waiting' // set default status to 'waiting'
  }
});