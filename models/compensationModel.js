const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  Nom: {
    type: String,
    required: true
  },
  nbJourInCommon : {
    type : Number ,
    required : true
  }, 
  Prenom: {
    type: String,
    required: true
  },
  finmission: {
    type: String,
    required: true
  },
  debutmission: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  status: {
    type: String,
    default: 'waiting' // set default status to 'waiting'
  },
  nb :{
    type:Number,
    required :true 
  } 
});

module.exports = mongoose.model('compensation', taskSchema);