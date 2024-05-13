const mongoose = require('mongoose');

module.exports = mongoose.model('Leave', {
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  description: String,
  date_debut: Date,
  date_fin: Date,
  option: String,
  email: String,
  motif: String,
  days: Number,
  motifCongeSpecial: String,
  solde: Number,
  
  status: {
    type: String,
    default: 'waiting' // set default status to 'waiting'
  }
});