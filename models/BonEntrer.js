const mongoose = require('mongoose');

const BonEntrerSchema = new mongoose.Schema({
  numFacture: {
    type: String,
  },
  dateFacture: {
    type: String,
  },
  societe: {
    type: String,
  },
  unite: {
    type: String,
  },
  coursDeChange: {
    type: Number,
  },
  articles: [
    {
      codeArticle: {
        type: String,
      },
      designation: {
        type: String,
      },
      qte: {
        type: Number,
      },
      prix: {
        type: Number,
      },
      coutAchat: {
        type: Number,
      },
      pourcentage: {
        type: Number,
      },
      coutStocks: {
        type: Number,
      },
      fraisImporation: {
        type: Number,
      },
      valeurAchat: {
        type: Number,
      },
      date : {
        type : Date ,
        default : Date.now,
      },
    }
  ],
  coutStocks: {
    type: Number,
  },
  fraisDouane: {
    type: Number,
  },
  fraisTransitaire: {
    type: Number,
  },
  fraisTransport: {
    type: Number,
  },
  fraisCert: {
    type: Number,
  },
  autreCharge1: {
    type: Number,
  },
  autreCharge2: {
    type: Number,
  },
  autreCharge3: {
    type: Number,
  },
  TotalCoursStocks: {
    type: Number,
  },
  totalValeurAchat: {
    type: Number,
  },
  totalCoutAchat: {
    type: Number,
  },
  totalFrais: {
    type: Number,
  },
  NumBonEntrer: {
    type: String,
  },
});

module.exports = mongoose.model('BonEntrer', BonEntrerSchema);