const UserModel =require('../models/User');
const fs = require("fs");

//ajout
exports.ajoutUser = async (req,res,   ) => {
 
   
    const  {
        Matricule  ,  Nom   , Prenom  ,
        Cin  , Email  , Password ,Gender ,
        SituationFamille ,Datedenaissance  , Nbenfants  ,
        Ntell  ,Npassport ,Rib ,Equipe  ,Roles  ,Directeur  ,
        Daf ,Chefdequipe  ,Activite ,Teletravail  ,
        Sconge ,Sdautorisation  ,Scomposition  ,
        Smaladie  , Souverture  ,DateOverture ,
        ValidatePassport  , Commentaire  ,Profile } = req.body;
        
try {
    
    const user = new UserModel( { Matricule  ,  Nom   , Prenom  ,
        Cin  , Email  , Password ,Gender ,
        SituationFamille ,Datedenaissance  , Nbenfants  ,
        Ntell  ,Npassport ,Rib ,Equipe  ,Roles  ,Directeur  ,
        Daf ,Chefdequipe  ,Activite ,Teletravail  ,
        Sconge ,Sdautorisation  ,Scomposition  ,
        Smaladie  , Souverture  ,DateOverture ,
        ValidatePassport  , Commentaire,
        Profile ,
        });
// insert data
await user.save();
res.status(200).json(user);
    }catch  (error) {
        res.status(401).json(error);
        console.log("catch block error")
    }
};
// fonction modifier 
exports.modifierUser = (req ,res) => {
   
    const param = req.params.iduser;
    
    const modifiedObj = {
        
        Matricule : req.body.Matricule ,
        Nom : req.body.Nom ,
        Prenom : req.body.Prenom ,
        Cin : req.body.Cin ,
        Email : req.body.Email ,
        Password : req.body.Password ,
        Gender : req.body.Gender ,
        SituationFamille :req.body.SituationFamille,
        Datedenaissance : req.body.Datedenaissance ,
        Nbenfants : req.body.Nbenfants ,
        Ntell : req.body.Ntell ,
        Npassport : req.body.Npassport ,
        Rib : req.body.Rib ,
        Equipe : req.body.Equipe ,
        Roles : req.body.Roles ,
        Directeur : req.body.Directeur ,
        Daf : req.body.Daf,
        Chefdequipe : req.body.chefdequipe ,
        Activite : req.body.Activite ,
        Teletravail : req.body.teletravail ,
        Sconge : req.body.Sconge ,
        Sdautorisation : req.body.Sdautorisation ,
        Scomposition : req.body.Scomposition ,
        Smaladie : req.body.Smaladie ,
        Souverture : req.body.Souverture ,
        DateOverture : req.body.DateOverture ,
        ValidatePassport : req.body.ValidatePassport ,
        Commentaire : req.body.Commentaire ,
        image: req.body.Profile,
      
}

    UserModel.findByIdAndUpdate(param ,modifiedObj).exec ((error ,modifiedUser) => {
                if (error) return res.status(400).json({error})
                if (modifiedUser){
                    return res.status(200).json({ "message":"user modified" })
                }
    })
}
//SUPPRIMER USER
exports.supprimerUser =  (req,res)=> {
    const param = req.params.iduser;
    UserModel.findByIdAndDelete(param).exec((error , deletedUser)=>{
         if (error) return res.status(400).json({error})
         if (deletedUser){
            return res.status(200).json({ "message":"user deleted"})
         }
    })
}
// AFFICHER USER
exports.listerUser = (req ,res) => {
    UserModel.find({}).exec((error ,userList) => {
        if (error ) return res.status(400).json({error})
        if(userList){
            return res.status(200).json({userList})
        }
    })
}