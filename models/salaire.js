const mongoose = require("mongoose");

const salaireSchema = new mongoose.Schema({
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  salaireemb: {
    type: Number,
  },
  dateemb: {
    type: String,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  salaires: [
    {
      new_salary: {
        type: Number,
      },
      change_date: {
        type: String,
      },
      taux: {
        type: String,
      },
    },
  ],
});

const Salaire = mongoose.model("Salaire", salaireSchema);
module.exports = Salaire ;