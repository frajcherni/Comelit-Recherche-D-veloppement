const Task = require('../models/compensationModel');
const nodemailer = require('nodemailer');
const UserModel = require('../models/user');
const JourFrier =require ('../models/JourFrier')

const CongeCompensation = require("../models/Congecompensation");
exports.createCompensation = async (req, res) => {
  const { description, startDate, endDate, Nom, Prenom, debutmission, finmission } = req.body;
  const nb = req.body.nb;
  const userid = req.get('userid');

  try {
    const newTask = new Task({
      description,
      startDate,
      endDate,
      Nom,
      Prenom,
      nb,
      userid,
      debutmission,
      finmission
    });

    // Compare the compensation dates with jourfriers
    const user = await UserModel.findById(userid); // Assuming you have a User model
    const jourFriers = await JourFrier.find({ department: user.Equipe }); // Fetch jourfriers with the same department as the user
    let nbJourInCommon = 0;
    let hasSunday = false;
    let hasSaturday = false;

    // Calculate the number of days in the compensation period
    const compensationStartDate = new Date(startDate);
    const compensationEndDate = new Date(endDate);

    // Iterate over jourfriers
    jourFriers.forEach((jourFrier) => {
      const jourFrierStartDate = new Date(jourFrier.startDate);
      const jourFrierEndDate = new Date(jourFrier.duration);

      // Check if jourfrier falls within the compensation interval
      if (jourFrierStartDate <= compensationEndDate && jourFrierEndDate >= compensationStartDate) {
        // Calculate the overlap between dates
        const overlapStartDate = jourFrierStartDate > compensationStartDate ? jourFrierStartDate : compensationStartDate;
        const overlapEndDate = jourFrierEndDate < compensationEndDate ? jourFrierEndDate : compensationEndDate;

        // Calculate the number of days in common
        const timeDifference = Math.abs(overlapEndDate.getTime() - overlapStartDate.getTime());
        const nbDaysInCommon = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;

        // Add the number of days in common
        nbJourInCommon += nbDaysInCommon;

        // Check if Sunday and Saturday are present in the common days
        let currentDay = new Date(overlapStartDate);
        while (currentDay <= overlapEndDate) {
          const dayOfWeek = currentDay.getDay();
          if (dayOfWeek === 0) {
            hasSunday = true;
          } else if (dayOfWeek === 6) {
            hasSaturday = true;
          }
          currentDay.setDate(currentDay.getDate() + 1);
        }
      }
    });

    // Subtract 1 if both Sunday and Saturday are present
    if (hasSunday && hasSaturday) {
      nbJourInCommon -= 1;
    }

    newTask.nbJourInCommon = nbJourInCommon;

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

  module.exports.deletecomp = async (req, res) => {

    try {
      const deletedLeave = await Task.findByIdAndDelete(req.params.id);
      if (!deletedLeave) {
        return res.status(404).json({ message: "Leave not found" });
      }
      res.json({ message: "Compensation deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  
  
  };

 
    module.exports.refusecomp = async (req, res) => {
      try {
        const updatedLeave = await Task.findByIdAndUpdate(req.params.id, { status: 'refused' }, { new: true });
      
    
        try {
          // Find the user in the database
          const user = await UserModel.findOne({ _id : updatedLeave.userid });
    
          // Send a response indicating success and the current balance
          res.json({ message: 'Leave request accepted successfully', Scomposition: user.Scomposition });
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
    module.exports.acceptecomp = async (req, res) => {
   
      try {
        const updatedLeave = await Task.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
    
        try {
          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: 'belkahla420@gmail.com',
              pass: 'ydtwofztdrjmqgxf'
            }
          });
    
          // Compose the email message
          const message = {
            from: 'belkahla420@gmail.com',
            to: 'olfa.basly@comelit.it',
            subject: 'Votre demande de congé éte accepter  ',
            text: 'Votre demande de congé éte accepter'
          };
    
          // Send the email
          await transporter.sendMail(message);
          // Find the user in the database
          const user = await UserModel.findOne({ _id : updatedLeave.userid });
            // Update the user's balance by adding the previously requested days back
            user.Scomposition += updatedLeave.nbJourInCommon;
            const updatedUser = await user.save();
    
            // Update the solde field in the leave request document
            updatedLeave.Scomposition = updatedUser.Scomposition;
            
            await updatedLeave.save(); // Save updated document to database
    
            // Send a response indicating success and the updated balance
            res.json({ message: 'Leave request rejected successfully', soScompositionlde : updatedUser.Scomposition });
          
    
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


  module.exports.findcomp = async (req, res) => {
    try {
      const comp = await Task.find();
      res.json(comp);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  ////////////
  
////////congee malaadie **********************************************************************************



module.exports.compensationRequest = async (req, res) => {
  console.log(req.body);

  const newCompensation = new CongeCompensation({
    date_fin: req.body.date_fin,
    date_debut: req.body.date_debut,
    motif: req.body.motif,
    days: req.body.days,
    debut: req.body.debut,
    fin: req.body.fin,
    status: req.body.status,
    userid: req.body.userid,
  });

  try {
    const savedCompensation = await newCompensation.save();

    // Find the user in the database
    const user = await UserModel.findOne({ _id: savedCompensation.userid });

    // Subtract the days from the user's balance
    user.Scomposition -= savedCompensation.days;
    await user.save(); // Save the user document

    // Update the compensation request document with the updated user balance
    const updatedCompensation = await CongeCompensation.findByIdAndUpdate(
      savedCompensation._id,
      { Scomposition: user.Scomposition },
      { new: true }
    );

    res.status(201).json({ status: 201, compensation: savedCompensation });
  } catch (err) {
    res.send({ code: 500, message: "Error", error: err });
  }
};

  
  
  module.exports.rejectCompensation = async (req, res) => {
    try {
      const updatedLeave = await CongeCompensation.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
  
      try {
        // Find the user in the database
        const user = await UserModel.findOne({ _id : updatedLeave.userid });
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'belkahla420@gmail.com',
            pass: 'ydtwofztdrjmqgxf'
          }
        });
  
        // Compose the email message
        const message = {
          from: 'belkahla420@gmail.com',
          to: 'olfa.basly@comelit.it',
          subject: 'Votre demande de congé éte refusé  ',
          text: 'Votre demande de congé éte refusé'
        };
  
        // Send the email
        await transporter.sendMail(message);
       
          // Update the user's balance by adding the previously requested days back
          user.Scomposition += updatedLeave.days;
          const updatedUser = await user.save();
  
          // Update the solde field in the leave request document
          updatedLeave.Scomposition = updatedUser.Scomposition;
          await updatedLeave.save();
  
          // Send a response indicating success and the updated balance
          res.json({ message: 'Leave request rejected successfully', Scomposition : updatedUser.Scomposition });
       
  
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
  
  module.exports.FindCongeCompensation = async (req, res) => {
    try {
      const leaveRequests = await CongeCompensation.find().populate('userid', 'Nom Prenom email Scomposition ');
      res.json(leaveRequests);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  
 
  
  /////
  module.exports.acceptedCompensation = async (req, res) => {
    try {
      const updatedLeave = await CongeCompensation.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
  
      try {
        // Find the user in the database
        const user = await UserModel.findOne({ _id : updatedLeave.userid });
  
        // Create a transporter for sending emails
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'belkahla420@gmail.com',
            pass: 'ydtwofztdrjmqgxf'
          }
        });
  
        // Compose the email message
        const message = {
          from: 'belkahla420@gmail.com',
          to: 'olfa.basly@comelit.it',
          subject: 'Votre demande de congé éte accepter  ',
          text: 'Votre demande de congé éte accepter'
        };
  
        // Send the email
        await transporter.sendMail(message);
  
        // Send a response indicating success and the current balance
        res.json({ message: 'Leave request accepted successfully', Scompensation: user.Scompensation });
      } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the user balance or sending the email' });
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the leave request status' });
    }
  };
  ////
  module.exports.getCompensationRequests = async (req, res) => {
  try {
    // Find the user in the database
    const user = await UserModel.findById(req.params.id);
  
    // Find the leave requests for the user and populate the 'userid' field with the user document
    const leaveRequests = await CongeCompensation.find({ userid: user._id })
    .populate('userid', 'Nom Prenom email');
  
  
    res.status(200).json({ status: 200, leaveRequests });
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Error', error: err });
  }
  };

  module.exports.getCompensation = async (req, res) => {
    try {
      // Find the user in the database
      const user = await UserModel.findById(req.params.id);
    
      // Find the leave requests for the user and populate the 'userid' field with the user document
      const leaveRequests = await Task.find({ userid: user._id })
      .populate('userid', 'Nom Prenom email');
    
    
      res.status(200).json({ status: 200, leaveRequests });
    } catch (err) {
      res.status(500).json({ status: 500, message: 'Error', error: err });
    }
    };




    module.exports.CancelCongeCompensation = async (req, res) => {
      try {
        const deletedLeave = await CongeCompensation.findByIdAndDelete(req.params.id);
    
        if (!deletedLeave) {
          return res.status(404).json({ message: "Leave not found" });
        }
    
        const user = await UserModel.findOne({ _id: deletedLeave.userid });
    
          // Update the user's balance by adding the previously requested days back
          user.Scomposition += deletedLeave.days;
          await user.save();
        
    
        res.json({ message: "Leave deleted successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
    };
  
  

    
   module.exports.CancelCompensation = async (req, res) => {
    try {
      const deletedLeave = await Task.findByIdAndDelete(req.params.id);
  
      if (!deletedLeave) {
        return res.status(404).json({ message: "Leave not found" });
      }
      res.json({ message: "Leave deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  module.exports.compensationEquipe = async (req, res) => {
    const nomPrenom = req.query.nomPrenom;
  
    try {
      const employees = await UserModel.find({ Chefdequipe: nomPrenom });
      const userIds = employees.map(emp => emp._id);
      const comp = await Task.find({ userid: { $in: userIds } });


      res.json(comp);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };