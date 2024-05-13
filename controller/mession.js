const UserModel = require('../models/user');
const MissionModel = require('../models/Messionmodel');

module.exports.createMission = (req, res) => {
  const { id,passport,vpassport,nom,prenom, dateDebut, dateFin, destination, villeDestination,nb, objetMission,frais,devise, totalFrais, adresseEtrange, personneAContacter } = req.body;

  const newMission = new MissionModel({
    
    nom,
    prenom,
    id ,
    passport ,
    vpassport,
   
    dateDebut,
    dateFin,
    destination,
    nb,
    villeDestination,
    objetMission,
    adresseEtrange,
    personneAContacter,
    frais,
    devise,
    totalFrais,
  });

  newMission.save()
    .then(() => res.status(201).json({ success: true, message: 'Mission created successfully' }))
    .catch(err => res.status(500).json({ success: false, message: err.message }));
};

// Update a mission by ID


exports.updateMission = async (req, res) => {
  try {
    const mission = await MissionModel.findById(req.params.id);

    if (!mission) {
      return res.status(404).json({ message: 'Mission not found' });
    }

    mission.nom = req.body.nom;
    mission.prenom = req.body.prenom;
    mission.dateDebut = req.body.dateDebut;
    mission.dateFin = req.body.dateFin;
    mission.objetMission = req.body.objetMission;
    mission.adresseEtrange = req.body.adresseEtrange;
    mission.personneAContacter = req.body.personneAContacter;
    mission.destination = req.body.destination;
    
    mission.frais = req.body.frais;
    mission.devise = req.body.devise;
    mission.nb = req.body.nb;
    
    const updatedMission = await mission.save();

    res.status(200).json(updatedMission);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports.getAllNomsAndPrenoms = (req, res) => {
  UserModel.find({}, '_id Nom Prenom Npassport ValidatePassport') // Find all users and select the _id, Nom, and Prenom fields
  .then(users => {
    const nomsEtPrenoms = users.map(user => {
      return {
        id: user._id,
        nom: user.Nom,
        prenom: user.Prenom,
        passport: user.Npassport,
        vpassport :user.ValidatePassport,
      }
    }); // Map the user objects to an array of objects with id, nom, and prenom fields
    res.status(200).json({
      nomsEtPrenoms: nomsEtPrenoms
    });
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({
      error: error
    });
  });
};

module.exports.findAllMession = async (req, res) => {
    try {
      const mession = await MissionModel.find();
      res.json(mession);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  module.exports.deletemession = (req, res) => {
    const objectId = req.params.id;
    MissionModel.findOneAndRemove({_id: objectId})
      .then((result) => {
      if (result) {
        res.status(200).send(`Mission  deleted successfully.`);
      } else {
        res.status(404).send(`Mission  not found.`);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Error deleting mission  .`);
    });
   
  };
  
    
    
    exports.getMissionById = async(req, res) => {
      try {
        const mission = await MissionModel.findById(req.params.id);
        if (!mission) {
          return res.status(404).json({ message: 'Mission not found' });
        }
        res.status(200).json(mission);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
    