
const mongoose = require('mongoose');

const StageSchema = new mongoose.Schema({

    jobDescription: String,
    
    profile: String,
    date:  String,
    Exigence:  String,
    nbPost :  String,
   
    Netude:  String,
    Langue:  String,
    Genre:  String,
    dateExp:  String,
      
    

  });
  
  module.exports = mongoose.model('Stage', StageSchema);