const UserModel = require('../models/user')
const bcrypt = require("bcryptjs");
const LeaveModel = require('../models/Leave')
const multer = require('multer');
const path = require('path');
const user = require('../models/user');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const SidebarItem = require('../models/sidebarItem');
const Salaire = require('../models/salaire');
// Set storage engine


// Signup function
module.exports.signup = (req, res) => {
  // Handle image upload using Multer
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.send({ code: 500, message: 'Image upload error' });
    } else {
      // Check if a file was uploaded
      const imagePath = req.file ? req.file.path : null;
  
      console.log(imagePath);
      // Save user data to database
      const newUser = new UserModel({
        Image: imagePath , // store the image path in the database
        email: req.body.email,
        password: req.body.password,
        Matricule : req.body.Matricule ,
        Nom : req.body.Nom ,
        Prenom : req.body.Prenom ,
        Cin : req.body.Cin ,
        sexe : req.body.sexe ,
        SituationFamille :req.body.Situation,
        Datedenaissance : req.body.Datenaissence ,
        Nbenfants : req.body.Nbenfants ,
        Ntell : req.body.Ntell ,
        Npassport : req.body.Npassport ,
        Rib : req.body.Rib ,
        Equipe : req.body.Equipe ,
        SousEquipe : req.body.SousEquipe ,
        role : req.body.role ,
        Directeur : req.body.Directeur ,
        ChefFamille: req.body.ChefFamille,
        Daf : req.body.Daf,
        Chefdequipe : req.body.ChefDequipe ,
        Activite : req.body.Activite ,
        Teletravail : req.body.teletravail ,
        solde: req.body.solde,
        Sdautorisation : req.body.Sdautorisation ,
        Scomposition : req.body.Scomposition ,
        Smaladie : req.body.Smaladie ,
        Souverture : req.body.Souverture ,
        DateOverture : req.body.Dateoverture ,
        ValidatePassport : req.body.Validatepassport ,
        Commentaire : req.body.Comentaire,
        option : req.body.option ,
        fin : req.body.fin ,
        dateemb :req.body.dateemb,
        fincontrat: req.body.fincontrat,
        period : req.body.period,
        periode : req.body.periode,
        salaireemb :req.body.salaireemb,
      });
  
      newUser.save().then(() => {
        res.send({ code: 200, message: 'Signup success' });
      }).catch((err) => {
        console.log(err);
        res.send({ code: 500, message: 'Signup error' });
      });
    }
  });
}





module.exports.GetEquipe = async (req, res) => {
  try {
    const nomPrenom = req.query.nomPrenom;
    const employees = await UserModel.find({ Chefdequipe: nomPrenom });

    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports.accept = async (req, res) => {
  try {
    const updatedLeave = await LeaveModel.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });

    // Update the user's solde attribute
    const user = await UserModel.findOne({ email: updatedLeave.email });
    if (!user) {
      res.status(500).json({ message: 'User not found' });
    } else {
      let daysToSubtract = updatedLeave.days;
      if (updatedLeave.motif === 'conge special naissance enfant 2 jours' && updatedLeave.days > 2) {
        daysToSubtract = updatedLeave.days - 2;
      } else if (updatedLeave.motif === 'conge special naissance enfant 2 jours' && updatedLeave.days <= 2) {
        daysToSubtract = 0;
      } else if (updatedLeave.motif === 'conge special deces (frere ou soeur) 2 jours' && updatedLeave.days > 2) {
        daysToSubtract = updatedLeave.days - 2;
      } else if (updatedLeave.motif === 'conge special deces (frere ou soeur) 2 jours' && updatedLeave.days <= 2) {
        daysToSubtract = 0;
      } else if (updatedLeave.motif === 'conge special deces (pere , mere ou fils) 3 jours' && updatedLeave.days > 3) {
        daysToSubtract = updatedLeave.days - 3;
      } else if (updatedLeave.motif === 'conge special deces (pere , mere ou fils) 3 jours' && updatedLeave.days <= 3) {
        daysToSubtract = 0;
      } else if (updatedLeave.motif === 'conge special mariage 3 jours' && updatedLeave.days > 3) {
        daysToSubtract = updatedLeave.days - 3;
      } else if (updatedLeave.motif === 'conge special mariage 3 jours' && updatedLeave.days <= 3) {
        daysToSubtract = 0;
      } else if (updatedLeave.motif === 'conge special mariage enfants 1 jour' && updatedLeave.days > 1) {
        daysToSubtract = updatedLeave.days - 1;
      } else if (updatedLeave.motif === 'conge special mariage enfants 1 jour' && updatedLeave.days <= 1) {
        daysToSubtract = 0;
      } else if (updatedLeave.motif === 'circoncision enfant 1 jour' && updatedLeave.days > 1) {
        daysToSubtract = updatedLeave.days - 1;
      } else if (updatedLeave.motif === 'circoncision enfant 1 jour' && updatedLeave.days <= 1) {
        daysToSubtract = 0;
      } else if (updatedLeave.motif === 'deces de conjoint 3 jours' && updatedLeave.days > 3) {
        daysToSubtract = updatedLeave.days - 3;
      } else if (updatedLeave.motif === 'deces de conjoint 3 jours' && updatedLeave.days <= 3) {
        daysToSubtract = 0;
      } else if (updatedLeave.motif === 'circoncision enfant 1 jour' && updatedLeave.days > 1) {
        daysToSubtract = updatedLeave.days - 1;
      } else if (updatedLeave.motif === 'circoncision enfant 1 jour' && updatedLeave.days <= 1) {
        daysToSubtract = 0;
      } else if (updatedLeave.motif === 'deces d un grand-pere ou grand-mere 2 jours' && updatedLeave.days > 2) {
        daysToSubtract = updatedLeave.days - 2;
      } else if (updatedLeave.motif === 'deces d un grand-pere ou grand-mere 2 jours' && updatedLeave.days <= 2) {
        daysToSubtract = 0;
      } else if (updatedLeave.motif === 'deces d un petit-fils ou d une petitr-fille 2 jours' && updatedLeave.days > 1) {
        daysToSubtract = updatedLeave.days - 1;
      } else if (updatedLeave.motif === 'deces d un petit-fils ou d une petitr-fille 2 jours' && updatedLeave.days <= 1) {
        daysToSubtract = 0;
      }else {
        daysToSubtract = updatedLeave.days;
      }
    
      if (updatedLeave.option === 'maladie') {

        const updatedUserWithSoldemaladie = await UserModel.findByIdAndUpdate(user._id, { soldemaladie: user.soldemaladie - updatedLeave.days }, { new: true });
        const updatedLeaveWithSoldemaladie = await LeaveModel.findByIdAndUpdate(req.params.id, { soldemaladie: updatedUserWithSoldemaladie.soldemaladie }, { new: true });
        res.json(updatedLeaveWithSoldemaladie);
      }
      else if (updatedLeave.option === 'compensation')  {
        res.json(updatedLeave);
      }
      else {
        const updatedUser = await UserModel.findByIdAndUpdate(user._id, { solde: user.solde - daysToSubtract }, { new: true });
        const updatedLeaveWithSolde = await LeaveModel.findByIdAndUpdate(req.params.id, { solde: updatedUser.solde }, { new: true });
        res.json(updatedLeaveWithSolde);
      }
    
  
    } 

  } catch (err) {
      res.status(400).json({ message: err.message });
  }
}


  // Update a leave request with refuse status
module.exports.refuse = async (req, res) => {
    try {
      const updatedLeave = await LeaveModel.findByIdAndUpdate(req.params.id, { status: 'refused' }, { new: true });
      res.json(updatedLeave);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };



  module.exports.signin = (req, res) => {
    console.log(req.body.email)

    // email and password match

    UserModel.findOne({ email: req.body.email })
        .then(result => {
            console.log(result, '11')
             // match password with req.body.password
            if (result.password !== req.body.password) {
                res.send({ code: 404, message: 'password wrong' })
            } else {
                res.send({
                    email: result.email,
                    code: 200,
                    message: 'user Found',
                    
                    solde : result.solde,
                    soldemaladie : result.soldemaladie

                })
            }
        })
        .catch(err => {
            res.send({ code: 500, message: 'user not found' })
        })
}


module.exports.findleave = (req, res) => {
    LeaveModel.find({email : req.params.email }, (err, leave) => {
      if (err) {
        res.status(500).send(err);
      } else if (!leave) {
        res.status(404).send('User not found');
      } else {
        res.send(leave);
      }
    });
  };

  module.exports.findsoldeconge = (req, res) => {
    UserModel.findOne({ email: req.params.email }, 'solde', (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else if (!user) {
        res.status(404).send('User not found');
      } else {
        res.send(user.solde.toString());
      }
    });
  };
 
  
  
  module.exports.finduser = (req, res) => { // verification ... rana badelna methode normalment maash hajetna beha alahou a3alem 
    UserModel.find({email : req.params.email }, (err, user) => {
      if (err) {
        res.status(500).send(err);
      } else if (!user) {
        res.status(404).send('User not found');
      } else {
        res.send(user);
      }
    });
  };
   module.exports.Finduserbyid = (req, res) => {
    const ObjectId = req.params.id;
    UserModel.findById({_id: ObjectId }, (err,user) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        res.status(200).send();
      }
    });
  };

module.exports.DeleteUsers = (req, res) => {
    const objectId = req.params.id;
    UserModel.findOneAndRemove({_id: objectId}, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        res.status(200).send();
      }
    });
  };





  module.exports.delete = (req, res) => {
    const objectId = req.params.id;
    LeaveModel.findOneAndRemove({_id: objectId}, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        res.status(200).send();
      }
    });
  };



// verification 
  module.exports.updateUser = async (req, res) => {
     const object = req.params.id
    const obj = { 
         description: req.body.description,
        date_fin: req.body.date_fin,
        date_debut: req.body.date_debut,
        option: req.body.option,
        email: req.body.email,
        motif: req.body.motif,
        days: req.body.days,
        motifCongeSpecial: req.body.motifCongeSpecial
     
        } 
    try {
        const updateduser = await LeaveModel.findByIdAndUpdate(object, obj); 

        res.status(200).json(updateduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}





module.exports.findAllLeave = async (req, res) => {
    try {
      const leaves = await LeaveModel.find();
      res.json(leaves);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };


  
module.exports.findAllUser = async (req, res) => {
    try {
      const User = await UserModel.find();
      res.json(User);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  //


  module.exports.modifierUser = (req, res) => {
    const id = req.params.id; // get the user id from the request parameters
  
    
  
        // Set the updated user data
        const updatedUser = {
          email: req.body.email,
          password: req.body.password,
          Matricule : req.body.Matricule ,
          Nom : req.body.Nom ,
          Prenom : req.body.Prenom ,
          Cin : req.body.Cin ,
          sexe : req.body.sexe ,
          SituationFamille :req.body.Situation,
          Datedenaissance : req.body.Datenaissence ,
          Nbenfants : req.body.Nbenfants ,
          Ntell : req.body.Ntell ,
          Npassport : req.body.Npassport ,
          Rib : req.body.Rib ,
          Equipe : req.body.Equipe ,
          SousEquipe : req.body.SousEquipe ,
          role : req.body.role ,
          Directeur : req.body.Directeur ,
          ChefFamille: req.body.ChefFamille,
          Daf : req.body.Daf,
          Chefdequipe : req.body.UpChefDequipe ,
          Activite : req.body.Activite ,
          Teletravail : req.body.teletravail ,
          solde: req.body.solde,
          Sdautorisation : req.body.Sdautorisation ,
          Scomposition : req.body.Scomposition ,
          Smaladie : req.body.Smaladie ,
          Souverture : req.body.Souverture ,
          DateOverture : req.body.Dateoverture ,
          ValidatePassport : req.body.Validatepassport ,
          Commentaire : req.body.Comentaire,
           option : req.body.option ,
        fin : req.body.fin ,
        dateemb :req.body.dateemb,
        period : req.body.period,
        periode : req.body.periode,
        salaireemb :req.body.salaireemb,
        };
    
        // If there is a new image, add the updated image path to the user data
      
  
        // Update the user data in the database
        UserModel.findByIdAndUpdate(id, updatedUser, { new: true }).then((user) => {
          res.send({ code: 200, message: 'User data updated successfully', user: user });
        }).catch((err) => {
          console.log(err);
          res.send({ code: 500, message: 'User data update error' });
        });
      
    
  }

/////forget password 


exports.forgotPassword = async (req, res, next) => {
  try {
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const user = await UserModel.findOne({ email: req.body.email });
    
    if (!user) {
      return res.status(404).json({ message: 'No user found with that email' });
    }
    
    // Save reset token and expiration date to user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();
    
    // Send password reset email to user
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'belkahla420@gmail.com',
        pass: 'Belkahla@1999'
      }
    });
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USERNAME,
      subject: 'Password Reset',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n`
        + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
        + `http://${req.headers.host}/reset-password/${resetToken}\n\n`
        + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({ message: 'Password reset email sent' });
  } catch (err) {
    return next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { resetToken } = req.params;
    const user = await UserModel.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }
    
    // Update user password and clear reset token
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    
    // Send confirmation email to user
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USERNAME,
      subject: 'Your password has been changed',
      text: `Hello,\n\n`
        + `This is a confirmation that the password for your account ${user.email} has just been changed.\n`
    };
    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    return next(err);
  }
};




















// Endpoint to retrieve user role




exports.role = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userRole = user.role;
    res.json({ role: userRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Endpoint to retrieve sidebar items based on user role
  module.exports.permission = async (req, res) => {
  const userRole = req.params.role;
  
  // Your code here to retrieve sidebar items based on user role
  try {
    const sidebarItems = await SidebarItem.find({ role: userRole });
    res.json(sidebarItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports.page = async (req, res) => {
  // Your code here to retrieve sidebar items based on user role
  try {
    const sidebarItems = await SidebarItem.find();
    res.json(sidebarItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports.PagePermission = async (req, res) => {
  const { role, path } = req.query;

  try {
    // Find the page with the given path and role in the database
    const page = await SidebarItem.find({ path, role });

    if (!page) {
      // Page not found
      return res.status(404).json({ message: 'Page not found' });
    }

    // Return the page's permission status
    res.json({ permission: page.permission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//delete page 


//ajout page

module.exports.updatepermission = async (req, res) => {
  const { permission } = req.body;

  try {
    // Find the page by its ID
    const page = await SidebarItem.findById(req.params.id);

    // If the page doesn't exist, return a 404 error
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    // Update the permission field of the page
    page.permission = permission;
    await page.save();

    // Return the updated page
    res.json(page);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.getPassportByUser = async (req, res) => {
 

  try {
    const { userId } = req.params;
    const passport = await UserModel.findOne({ userId });
    res.json(passport);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
/////

exports.getUserssalaire = async (req, res) => {
  try {
    const users = await UserModel.find({}, { salaireemb: 1, _id: 1, Nom: 1, Prenom: 1, dateemb: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getUserssalairee = async (req, res) => {
try {
  const { nom, prenom } = req.body;
  const user = await UserModel.findOne({ Nom: nom, Prenom: prenom }, { salaireemb: 1, dateemb: 1 });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

exports.createSalaire = async (req, res) => {
  const { iduser, salaireemb, dateemb, newsalaire, newdate,taux, nom, prenom } = req.body;
  try {
    let salaire = await Salaire.findOne({ userid: iduser }); // find the latest salary for this user
    if (!salaire) { // if no salary exists, create a new record with all fields
      salaire = new Salaire({
        userid: iduser,
        nom,
        prenom,
        salaireemb,
        dateemb,
        salaires: [{ new_salary: newsalaire, change_date: newdate,taux : taux }]
      });
    } else { // if a salary exists, update the existing record
      salaire.salaires.push({ new_salary: newsalaire, change_date: newdate ,taux : taux });
    }
    const newSalaire = await salaire.save();
    res.status(201).json(newSalaire);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getAllSalaires = async (req, res) => {
  try {
    const salaires = await Salaire.find();
    res.json(salaires);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
exports.getLastSalaire = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.iduser); // find user by iduser
    const lastSalaire = await Salaire.findOne({ user: user }); // find last salaire by user _id
    res.json(lastSalaire);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
exports.getSalaryById = async (req, res) => {
  try {
    // Get salary ID from request parameters
    const salaryId = req.params.id;

    // Find salary details by ID in database
    const salary = await Salaire.findById(salaryId);

    // Return salary details in response
    res.status(200).json(salary);
  } catch (error) {
    // Handle errors and send error response
    console.error(error);
    res.status(500).json({ message: 'Error fetching salary details' });
  }
};





module.exports.updateDropdownOptionPermission = async (req, res) => {
  const { permission } = req.body;
  const { value } = req.params;

  try {
    // Find the sidebar item by its ID
    const sidebarItem = await SidebarItem.findById(req.params.id);

    // If the sidebar item doesn't exist, return a 404 error
    if (!sidebarItem) {
      return res.status(404).json({ message: 'Sidebar item not found' });
    }

    // Find the dropdown option by its value
    const option = sidebarItem.dropdownOptions.find(
      (option) => option.value === value
    );

    // If the dropdown option doesn't exist, return a 404 error
    if (!option) {
      return res.status(404).json({ message: 'Dropdown option not found' });
    }

    // Update the permission field of the dropdown option
    option.permission = permission;

    // Save the updated sidebar item
    await sidebarItem.save();

    // Check if any dropdown options have permission
    const hasPermission = sidebarItem.dropdownOptions.some(
      (option) => option.permission
    );

    // If at least one dropdown option has permission, set the permission of the page to true
    // Otherwise, set the permission of the page to false
    sidebarItem.permission = hasPermission;
    await sidebarItem.save();
    // Return the updated sidebar item and the new permission value
    res.json({ sidebarItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
