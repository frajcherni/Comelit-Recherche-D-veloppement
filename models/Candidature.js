
const mongoose = require('mongoose');

const candidature = new mongoose.Schema({
  jobid :  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jobs',
    required: true
  },
  Cv: {
    type: String,
    required: true,
  },
    Nom : String ,
    Prenom : String ,
    email :  String ,
    DateNess : String,
    
   
    Numtell  :  String,
    Famille  :  String,
    Deplacement  :  String,
    status: {
      type: String,
      default: 'waiting' // set default status to 'waiting'
    }
  });
  
  module.exports = mongoose.model('condidature', candidature);