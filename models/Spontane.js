
const mongoose = require('mongoose');

const spontanechema = new mongoose.Schema({
  Cv: {
    type: String,
    required: true,
  },
  Nom : String ,
  Prenom : String ,
  email :   String ,
  DateNess : String,
  job :  String,
  Numtell  :  String,
  Famille  :  String,
  Deplacement  :  String,
  status: {
    type: String,
    default: 'waiting' // set default status to 'waiting'
  }  
    

  });
  
  module.exports = mongoose.model('spontane', spontanechema);