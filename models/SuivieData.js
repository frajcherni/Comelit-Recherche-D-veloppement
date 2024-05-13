const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
    name: {
        type: String,
      
      },
      demandeDate: {
        type: String,
      
      },
      validationDate: {
        type: String,
      
      },
      facturationDate: {
        type: String,
      
      },
      numFacture: {
        type: String,
      
      },
      expeditionDate: {
        type: String,
      
      },
      numDHL: {
        type: String,
      
      },
      receptionDate: {
        type: String,
      
      },
      douanementDate: {
        type: String,
      
      },
      remarque: {
        type: String,
      
      },
      articleSoumis: {
        type: String,
      
      },
      vide: {
        type: String,
      
      },
      autorisationPrelevement: {
        type: String,
      
      },
      attestationConformite: {
        type: String,
      },
    
}, { timestamps: true });

module.exports = mongoose.model("Suiviedata", DataSchema);
