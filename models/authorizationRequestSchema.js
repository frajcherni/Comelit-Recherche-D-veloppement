const mongoose = require('mongoose');

const authorizationRequestSchema = new mongoose.Schema({
  dateAutorisation: {
    type:String,
    
  },
  tempsDu: {
    type: String,
    
  },
  tempsFin: {
    type: String,
    
  },
  
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
 
  natureMotif: {
    type: String,
    
  },
  status: {
    type: String,
    default: 'waiting' // set default status to 'waiting'
  }
});



module.exports = mongoose.model("AuthorizationRequest", authorizationRequestSchema);
