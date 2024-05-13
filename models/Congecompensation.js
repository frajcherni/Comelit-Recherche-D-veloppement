
const mongoose = require('mongoose');

module.exports = mongoose.model('Congecompensaton', {
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },

  date_debut: Date,
  date_fin: Date,
debut : String,
fin : String ,
  email: String,
  motif: String,
  days: Number,
  
  status: {
    type: String,
    default: 'waiting' // set default status to 'waiting'
  }
});
