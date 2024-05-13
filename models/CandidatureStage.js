
const mongoose = require('mongoose');

const candidatureStage = new mongoose.Schema({
  jobid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stages',
   
  },
  Cv: {
    type: String,
    
  },
    Nom : String ,
    Prenom : String ,
    email : String ,
    DateNess : String,
    
    Numtell  :  String,
    Famille  :  String,
    Deplacement  :  String,
    status: {
      type: String,
      default: 'waiting' // set default status to 'waiting'
    }
  });
  
  module.exports = mongoose.model('condidatureStage', candidatureStage);