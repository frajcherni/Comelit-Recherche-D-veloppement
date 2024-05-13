const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
 
  id: {
    type : String,
    
   },
   passport: {
    type : String,
    
   },
   vpassport: {
    type : String,
    
   },
  nom: {
   type : String,
   
  },
  prenom: {
    type : String,
    
   },
  dateDebut: {
    type: String,
  },
  dateFin: {
    type: String,
    
  },
  nb: {
    type : Number,
  },
  destination: {
    type: String,
   
  },
  villeDestination: {
    type: String,
   
  },
  objetMission: {
    type: String,
   
  },
  adresseEtrange: {
    type: String,
   
  },
  personneAContacter: {
    type: String,
   
  },
  frais: {
    type: Number,
    
  }
  ,
  devise: {
    type: String,
    
  },
  totalFrais: {
    type: Number,
 
  },
});


module.exports = mongoose.model('Mission', missionSchema);
