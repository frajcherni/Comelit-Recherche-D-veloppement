const mongoose = require('mongoose');

const SortieSchema = new mongoose.Schema({
  Code: {
    type: String,
    required: true
  },
  Designation: {
    type: String,
    required: true
  },
  Department :{
    type: String,
    required: true,
    
  },
  Quantite: {
    type: Number,
    required: true
  },
  QuantitySortie: {
    type: Number,
    required: true
  },
  Motif: {
    type: String,
    required: true
  },
  DateDeSortie: {
    type: Date,
    required: true
  }
});

const Sortie = mongoose.model('Sortie', SortieSchema);

module.exports = Sortie;