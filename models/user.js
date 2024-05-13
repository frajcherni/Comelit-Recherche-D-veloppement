const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cron = require('node-cron');
const keysecret = "fraj"

const userSchema = new mongoose.Schema({
  Matricule : {
    type :String  ,
    

},
Nom: {
  type : String ,
  
},
Prenom: {
  type : String ,
  
},
Cin : {
  type :Number ,
  
   
},
  email: {
    type: String,
    
   
  },
  password: {
    type: String,
  
  },
  Image: {
    type: String,
    
  },
  SituationFamille: {
    type: String

    },

Datedenaissance: {
type: String,


},

Nbenfants: {
type : Number ,
default: 0 ,

},
Ntell: {
type : Number ,

},
Npassport: {
type : Number ,

},
Rib: {
type : Number ,

},
Equipe: {
type: String,



},
SousEquipe: {
  type: String,
  
  
  
  },
role: {
type: String,

default: "colaborateur",


},
ChefFamille: {
type: String,


},
Daf: {
type: String,


},
Chefdequipe: {
type: String,


},
Activite: {
type: String,




},
Teletravail: {
type: String,

default: "non",


},
solde : {
type :Number ,



},

Sdautorisation : {
type :Number,
default : 0 


},
Scomposition : {
type :Number,
 

}
,
Smaladie : {
type :Number,
 

},

Souverture : {
type :Number,
 


},
DateOverture: {
type: String,


},

ValidatePassport: {
type: String,


},
Commentaire: {
type: String

},
sexe: {
   type: String,
   
} ,

  option: {
    type: String,
   
  },
  fin: {
    type: String,
    
  },
  dateemb: {
    type: String,
    
  },
  fincontrat :{
    type: String,
    
  },
  period: {
    type: String,
    
  },
  periode: {
    type: String,
    
  },
  salaireemb: {
    type: Number,
    
  },  
  tokens: [
    {
        token: {
            type: String,
            required: true,
        }
    }
] 
        
}, { 
  timestamps: true,
});


userSchema.statics.resetSdautorisation = async function () {
  try {
    await this.updateMany({}, { $set: { Sdautorisation: 3 } });
    console.log('Sdautorisation field reset to 3 successfully.');
  } catch (err) {
    console.error('Error resetting Sdautorisation field:', err);
  }
};


userSchema.pre("save", async function (next) {

  if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12);

  }
  next()
});




// hash password



// token generate
userSchema.methods.generateAuthtoken = async function () {
  try {
      let token23 = jwt.sign({ _id: this._id }, keysecret, {
          expiresIn: "1d"
      });

      this.tokens = this.tokens.concat({ token: token23 });
      await this.save();
      return token23;
  } catch (error) {
      res.status(422).json(error)
  }
}


// createing model
const userdb = new mongoose.model("users", userSchema);



// Schedule monthly reset of Sdautorisation field
cron.schedule('0 0 1 * *', async () => {
  await resetSdautorisationMonthly();
});

module.exports = userdb;

