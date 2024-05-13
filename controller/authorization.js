const AuthorizationRequest = require('../models/authorizationRequestSchema');
const userdb = require('../models/user');
module.exports.createayth = async (req, res) => {
  const { dateAutorisation, tempsDu, tempsFin, natureMotif, userid } = req.body;

  try {
    // Check if the authorization request already exists for the given date and user
    const existingRequest = await AuthorizationRequest.findOne({
      dateAutorisation,
      userid,
    });

    if (existingRequest) {
      // Authorization request already exists for the given date and user
      return res.status(201).json({
        status: 201,
        message: "Authorization request already exists for the given date and user.",
      });
    }

    const newLeave = new AuthorizationRequest({
      dateAutorisation,
      tempsDu,
      tempsFin,
      userid,
      natureMotif,
    });

    const savedLeave = await newLeave.save();

    // Find the user in the database
    const user = await userdb.findOne({ _id: savedLeave.userid });

    // Subtract the days from the user's balance
    user.Sdautorisation -= 1;
    await user.save(); // Save the user document

    // Update the leave request document with the updated user balance
    const updatedLeave = await AuthorizationRequest.findByIdAndUpdate(
      savedLeave._id,
      { Sdautorisation: user.Sdautorisation },
      { new: true }
    );

    res.status(200).json({ status: 200, leave: savedLeave });
  } catch (err) {
    res.status(500).json({ status: 500, message: "Error", error: err });
  }
};

module.exports.deleteAuth = async (req, res) => {
  try {
    const deletedLeave = await AuthorizationRequest.findByIdAndDelete(req.params.id);

    if (!deletedLeave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    const user = await userdb.findOne({ _id: deletedLeave.userid });

    user.Sdautorisation += 1;
      await user.save();
    

    res.json({ message: "Leave deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.accepteauth = async (req, res) => {
  try {
    const updatedLeave = await AuthorizationRequest.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });

    try {
      // Find the user in the database
      const user = await userdb.findOne({ _id : updatedLeave.userid });

      // Send a response indicating success and the current balance
      res.json({ message: 'Leave request accepted successfully', Sdautorisation: user.Sdautorisation });
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
}


// Update a leave request with refuse status
module.exports.refuseeauthoriz = async (req, res) => {
  try {
    // Update the status of the authorization request to 'refused'
    const updatedauth = await AuthorizationRequest.findByIdAndUpdate(req.params.id, { status: 'refused' }, { new: true });

    // Find the user in the database
    const user = await userdb.findOne({ _id: updatedauth.userid });

    // Add one back to the user's balance
    user.Sdautorisation += 1;
    const updatedUser = await user.save();

    // Update the 'Sdautorisation' field in the authorization request document
    updatedauth.Sdautorisation = updatedUser.Sdautorisation;
    await updatedauth.save();

    // Send a response indicating success and the updated balance
    res.json({ message: 'Leave request rejected successfully', Sdautorisation: updatedUser.Sdautorisation });

  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the leave request status or user balance' });
  }
};

module.exports.findAuth = async (req, res) => {
  try {
    const auth = await AuthorizationRequest.find();
    res.json(auth);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
module.exports.getauthid = async (req, res) => {
  try {
    // Find the user in the database
    const user = await userdb.findById(req.params.id);

    // Find the leave requests for the user and populate the 'userid' field with the user document
    const leaveRequests = await AuthorizationRequest.find({ userid: user._id })
    .populate('userid', 'Nom Prenom email');


    res.status(200).json({ status: 200, leaveRequests });
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Error', error: err });
  }
};
module.exports.deleteauth = (req, res) => {
  const objectId = req.params.id;
  AuthorizationRequest.findOneAndRemove({_id: objectId}, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      res.status(200).send();
    }
  });
};
