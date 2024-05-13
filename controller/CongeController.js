

const CongeA = require('../models/CongeA');
const userdb = require('../models/user');
const LeaveModel = require('../models/Leave');
const nodemailer = require('nodemailer');
const Maladie = require('../models/CongeMaladie')


//parametere de email : 
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'belkahla420@gmail.com',// adresse email 
    pass: 'ydtwofztdrjmqgxf' // cle dapplication  not the mot de passe 
  }
});






//////CALENDRIE 

module.exports.getLeavePlanning = async (req, res) => {
  const { start, end } = req.query; // start and end are ISO-formatted dates

  try {
    // Find all annual leave requests within the given time period
    const annualLeave = await CongeA.find({
      $or: [
        { $and: [{ date_debut: { $gte: start } }, { date_debut: { $lte: end } }] },
        { $and: [{ date_fin: { $gte: start } }, { date_fin: { $lte: end } }] },
        { $and: [{ date_debut: { $lte: start } }, { date_fin: { $gte: end } }] },
      ],
      status: 'accepted'
    })
      .populate('userid', 'nom prenom')
      .lean();

    // Map the annual leave requests to a format suitable for rendering in a calendar
    const events = annualLeave.map((leave) => ({
      title: `${leave.userid.nom} ${leave.userid.prenom} - ${leave.motif}`,
      start: leave.date_debut.toISOString(),
      end: leave.date_fin.toISOString(),
    }));

    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};
//// conge annuel**********************************************
module.exports.CongeAnuel = async (req, res) => {
  console.log(req.body);

  const newLeave = new CongeA({
    date_fin: req.body.date_fin,
    date_debut: req.body.date_debut,
    solde: req.body.solde,
    email: req.body.email,
    motif: req.body.motif,
    days: req.body.days,
    debut: req.body.debut,
    fin: req.body.fin,
    status: req.body.status,
    userid: req.body.userid,
    planification: req.body.plan,
  });

  try { 
    const savedLeave = await newLeave.save();

    // Find the user in the database
    const user = await userdb.findOne({ _id: savedLeave.userid });

    // Subtract the days from the user's balance if planification is "oui"
    if (savedLeave.planification === "non") {
      user.solde -= savedLeave.days;
      await user.save(); // Save the user document
    }

    // Update the leave request document with the updated user balance
    const updatedLeave = await CongeA.findByIdAndUpdate(
      savedLeave._id,
      { solde: user.solde },
      { new: true }
    );

    res.status(201).json({ status: 201, leave: savedLeave });
  } catch (err) {
    res.send({ code: 500, message: "Error", error: err });
  }
};

module.exports.findcongeannuelEquipe = async (req, res) => {
  const nomPrenom = req.query.nomPrenom;

  try {
    const employees = await userdb.find({ Chefdequipe: nomPrenom });
    const userIds = employees.map(emp => emp._id);
    const comp = await CongeA.find({ userid: { $in: userIds } });


    res.json(comp);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


  
module.exports.reject = async (req, res) => {
  try {
    const updatedLeave = await CongeA.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });

    try {
      // Find the user in the database
      const user = await userdb.findOne({ _id : updatedLeave.userid });

      if (updatedLeave.planification === 'non') {
        // Update the user's balance by adding the previously requested days back
        user.solde += updatedLeave.days;
        const updatedUser = await user.save();

        // Update the solde field in the leave request document
        updatedLeave.solde = updatedUser.solde;
        updatedLeave.status = 'rejected'; // Update status in document
        await updatedLeave.save(); // Save updated document to database

        // Send a response indicating success and the updated balance
        res.json({ message: 'Leave request rejected successfully', solde : updatedUser.solde });
      } else if (updatedLeave.planification === 'oui') {
        // Send a response indicating success without updating any values
        updatedLeave.status = 'rejected'; // Update status in document
        await updatedLeave.save(); // Save updated document to database
        res.json({ message: 'Leave request rejected successfully' });
      } else {
        // If the planification value is invalid, send an error response
        res.status(400).json({ message: 'Invalid planification value' });
      }

    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the user balance' });
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the leave request status' });
  }
}


  module.exports.findCongeAnuel = async (req, res) => {
     try {
    const annualLeaves = await CongeA.find().populate('userid', 'Nom Prenom');
    res.json(annualLeaves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  };

  module.exports.accepted = async (req, res) => {
    try {
      const updatedLeave = await CongeA.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
  
      try {
        // Find the user in the database
        const user = await userdb.findOne({ _id : updatedLeave.userid });
  
        // Determine which special leave type was requested and update the corresponding field in the user document
        // ...
  
        if (updatedLeave.planification === 'non') {
          // If the leave request has a planification, do not subtract the days from the user's balance
        } else if (updatedLeave.planification === 'oui') {
          // If the leave request does not have a planification, subtract the days from the user's balance
          user.solde -= updatedLeave.days;
          const updatedUser = await user.save();
  
          // Update the solde of the user in the CongeA document
          const updatedLeaveWithSolde = await CongeA.findByIdAndUpdate(
            req.params.id,
            { solde: updatedUser.solde },
            { new: true }
          );
        }
  
        // Send a response indicating success and the updated balance
        res.json({ message: 'Leave request accepted successfully', solde: user.solde });
      } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the user balance' });
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the leave request status' });
    }
  };
module.exports.getLeaveRequests = async (req, res) => {
  try {
    // Find the user in the database
    const user = await userdb.findById(req.params.id);

    // Find the leave requests for the user and populate the 'userid' field with the user document
    const leaveRequests = await CongeA.find({ userid: user._id })
    .populate('userid', 'Nom Prenom email');


    res.status(200).json({ status: 200, leaveRequests });
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Error', error: err });
  }
};

//congeé special //////////////////////////////////////////////************************************************ */
module.exports.refuse = async (req, res) => {
  try {
    const updatedLeave = await LeaveModel.findByIdAndUpdate(req.params.id, { status: 'refused' }, { new: true });
    res.json(updatedLeave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.accepteS = async (req, res) => {
  
  try {
    const updatedLeave = await LeaveModel.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });

    const savedLeave = await updatedLeave.save();
    res.status(201).json({ status: 201, leave: savedLeave });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal server error' });
  }
};
module.exports.Leave = async (req, res) => {
  console.log(req.body);

  // Check if user has pending leave request with status "waiting"
  const pendingLeave = await LeaveModel.findOne({
    userid: req.body.userid,
    status: "waiting",
  });
  if (pendingLeave) {
    return res.status(403).json({
      status: 403,
      message: "You already have a pending leave request",
    });
  }

  const newLeave = new LeaveModel({
    date_fin: req.body.date_fin,
    date_debut: req.body.date_debut,
    option: req.body.option,
    email: req.body.email,
    motif: req.body.motif,
    days: req.body.days,
    motifCongeSpecial: req.body.motifCongeSpecial,

    status: req.body.status,
    userid: req.body.userid,
  });

  try {
    const user = await userdb.findById(req.body.userid);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    switch (newLeave.motifCongeSpecial) {
      case 'conge special naissance enfant 2 jours':
        if (2 >= newLeave.days) {
          const savedLeave = await newLeave.save();
          res.status(201).json({ status: 201, leave: savedLeave });
        } else {
          return res.status(401).json({status : 401 , message: 'Insufficient special leave days available' });
        }
        break;
    
      case 'conge special deces (frere ou soeur) 2 jours':
        if (2 >= newLeave.days) {
          const savedLeave = await newLeave.save();
          res.status(201).json({ status: 201, leave: savedLeave });
        } else {
          return res.status(401).json({ status : 401 , message: 'Insufficient special leave days available' });
        }
        break;
    
      case 'conge special deces (pere , mere ou fils) 3 jours':
        if (3 >= newLeave.days) {
          const savedLeave = await newLeave.save();
          res.status(201).json({ status: 201, leave: savedLeave });
        } else {
          return res.status(401).json({ status : 401 ,message: 'Insufficient special leave days available' });
        }
        break;
    
      case 'conge special mariage 3 jours':
        if (3 >= newLeave.days) {
          const savedLeave = await newLeave.save();
          res.status(201).json({ status: 201, leave: savedLeave });
        } else {
          return res.status(401).json({ status : 401 ,message: 'Insufficient special leave days available' });
        }
        break;
    
      case 'conge special mariage enfants 1 jour':
        if (1 >= newLeave.days) {
          const savedLeave = await newLeave.save();
          res.status(201).json({ status: 201, leave: savedLeave });
        } else {
          return res.status(401).json({ status : 401 ,message: 'Insufficient special leave days available' });
        }
        break;
    
      case 'conge special circoncision enfant 1 jour':
        if (1 >= newLeave.days) {
          const savedLeave = await newLeave.save();
          res.status(201).json({ status: 201, leave: savedLeave });
        } else {
          return res.status(401).json({ status : 401 ,message: 'Insufficient special leave days available' });
        }
        break;
    
      case 'conge special deces de conjoint 3 jours':
        if (3  >= newLeave.days) {
          const savedLeave = await newLeave.save();
          res.status(201).json({ status: 201, leave: savedLeave });
        } else {
          return res.status(401).json({status : 401 , message: 'Insufficient special leave days available' });
        }
        break;
    
      case 'conge special deces d un grand-pere ou grand-mere 2 jours':
        if (2 >= newLeave.days) {
          const savedLeave = await newLeave.save();
          res.status(201).json({ status: 201, leave: savedLeave });
         } else {
            return res.status(401).json({ status : 401 ,message: 'Insufficient special leave days available' });
          }
          break ;
                case 'conge special deces d un petit-fils ou d une petitr-fille 2 jours':
        if (2 >= newLeave.days) {
          const savedLeave = await newLeave.save();
          res.status(201).json({ status: 201, leave: savedLeave });
         } else {
            return res.status(401).json({ status : 401 ,message: 'Insufficient special leave days available' });
          }
          break ;


      // Add more cases for other types of special leave as needed

      default:
        const savedLeave = await newLeave.save();
        res.status(201).json({ status: 201, leave: savedLeave });
        break;
    }
  } catch (err) {
    res.send({ code: 500, message: 'Error', error: err });
  }
};
module.exports.findAllLeave = async (req, res) => {
  try {
    const leaves = await LeaveModel.find();
    res.json(leaves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
module.exports.speacialrequset = async (req, res) => {
  try {
    // Find the user in the database
    const user = await userdb.findById(req.params.id);

    // Find the leave requests for the user and populate the 'userid' field with the user document
    const leaveRequests = await LeaveModel.find({ userid: user._id })
    .populate('userid', 'Nom Prenom email');


    res.status(200).json({ status: 200, leaveRequests });
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Error', error: err });
  }
};
// Delete leave request by ID
module.exports.deletespec = async (req, res) => {

  try {
    const deletedLeave = await LeaveModel.findByIdAndDelete(req.params.id);
    if (!deletedLeave) {
      return res.status(404).json({ message: "Leave not found" });
    }
    res.json({ message: "Leave deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }


};
////////congee malaadie ************************************************************************************


module.exports.CongeMaladie = async (req, res) => {
  console.log(req.body);

  const newLeave = new Maladie({
    date_fin: req.body.date_fin,
    date_debut: req.body.date_debut,
    Smaladie: req.body.Smaladie,
    motif: req.body.motif,
    days: req.body.days,
    debut: req.body.debut,
    fin: req.body.fin,
    status: req.body.status,
    userid: req.body.userid,
  });

  try {
    const savedLeave = await newLeave.save();

    // Find the user in the database
    const user = await userdb.findOne({ _id: savedLeave.userid });

    // Subtract the days from the user's balance
    user.Smaladie -= savedLeave.days;
    await user.save(); // Save the user document

    // Update the leave request document with the updated user balance
    const updatedLeave = await Maladie.findByIdAndUpdate(
      savedLeave._id,
      { Smaladie: user.Smaladie },
      { new: true }
    );

    // Send the email notification
    const message = {
      from: `${user.email} `,
      to: 'belkahla420@gmail.com', // Replace with the recipient's email address
      subject: `Demande de congé maladie de la part : ${user.email} `,
      text: `Demande de congé maladie  de la part de ${user.Nom}   ${user.Prenom}`,
    };

    await transporter.sendMail(message);

    res.status(201).json({ status: 201, leave: savedLeave });
  } catch (err) {
    res.send({ code: 500, message: 'Error', error: err });
  }
};


module.exports.rejectMaladie = async (req, res) => {
  try {
    const updatedLeave = await Maladie.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });

    try {
      // Find the user in the database
      const user = await userdb.findOne({ _id : updatedLeave.userid });

     
        // Update the user's balance by adding the previously requested days back
        user.Smaladie += updatedLeave.days;
        const updatedUser = await user.save();

        // Update the solde field in the leave request document
        updatedLeave.Smaladie = updatedUser.Smaladie;
        await updatedLeave.save();

        // Send a response indicating success and the updated balance
        res.json({ message: 'Leave request rejected successfully', Smaladie : updatedUser.Smaladie });
     

    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the user balance' });
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the leave request status' });
  }
};

module.exports.findCongeMaladie = async (req, res) => {
  try {
    const le = await Maladie.find().populate('userid', 'Nom Prenom ');
    res.json(le);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
module.exports.getmaladiecalander = async (req ,res) =>{
  
    try {
      const annualLeaves = await Maladie.find().populate('userid', 'Nom Prenom ');
    res.json(annualLeaves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  };




module.exports.acceptedMaladie = async (req, res) => {
  try {
    const updatedLeave = await Maladie.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });

    try {
      // Find the user in the database
      const user = await userdb.findOne({ _id : updatedLeave.userid });

      // Send a response indicating success and the current balance
      res.json({ message: 'Leave request accepted successfully', Smaladie: user.Smaladie });
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching the user balance' });
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the leave request status' });
  }
};

module.exports.getMaladie = async (req, res) => {
try {
  // Find the user in the database
  const user = await userdb.findById(req.params.id);

  // Find the leave requests for the user and populate the 'userid' field with the user document
  const leaveRequests = await Maladie.find({ userid: user._id })
  .populate('userid', 'Nom Prenom email');


  res.status(200).json({ status: 200, leaveRequests });
} catch (err) {
  res.status(500).json({ status: 500, message: 'Error', error: err });
}
};




module.exports.CancelCongeAnnuel = async (req, res) => {
  try {
    const deletedLeave = await CongeA.findByIdAndDelete(req.params.id);

    if (!deletedLeave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    const user = await userdb.findOne({ _id: deletedLeave.userid });

    if (deletedLeave.planification === 'non') {
      // Update the user's balance by adding the previously requested days back
      user.solde += deletedLeave.days;
      await user.save();
    }

    res.json({ message: "Leave deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.CancelCongeSpecial = async (req, res) => {
  try {
    const deletedLeave = await LeaveModel.findByIdAndDelete(req.params.id);

    if (!deletedLeave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.json({ message: "Leave deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.CancelCongeMaladie = async (req, res) => {
  try {
    const deletedLeave = await Maladie.findByIdAndDelete(req.params.id);

    if (!deletedLeave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    const user = await userdb.findOne({ _id: deletedLeave.userid });

      user.Smaladie += deletedLeave.days;
      await user.save();
    

    res.json({ message: "Leave deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};