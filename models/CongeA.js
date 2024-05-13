const mongoose = require('mongoose');

module.exports = mongoose.model('LeaveA', {
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
  motifCongeSpecial: String,
  solde: Number,
  planification : {type : String ,  required: true}  ,
  
  status: {
    type: String,
    default: 'waiting' // set default status to 'waiting'
  }
});