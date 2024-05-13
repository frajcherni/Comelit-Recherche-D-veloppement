const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  Code: {
    type: String,
    
  },
  Designation: {
    type: String,
    
  },
  Quantite: {
    type: Number,
    default : 0 ,
    
  },
  QteReste: {
    type: Number,
    default : 0 ,

    
  },
  DateDepot: {
    type: String,
  },
  VIP: {
    type: Number , 
    default : 0 ,

  },
  SAFE: {
    type: Number,
    default : 0 ,

  },
  TOOLS: {
    type: Number,
    default : 0 ,

  },
  DOMO: {
    type: Number,
    default : 0 ,

  },
  support: {
    type: Number , 
    default : 0 ,

  },
  Principale : {
    type: Number , 
    default : 0 ,

  }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
