
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({

    jobDescription: String,
    contract: String,
    profile: String,
    date:  String,
    Exigence:  String,
    nbPost :  String,
    Experience :  String,
    Netude:  String,
    Langue:  String,
    Genre:  String,
    dateExp:  String,
      
    

  });
  
  module.exports = mongoose.model('Job', jobSchema);