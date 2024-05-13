
const jobSchema = require('../models/Job');
const candidature = require('../models/Candidature');
const Contact = require('../models/Contact');
const spontane = require('../models/Spontane')
const Event = require("../models/Event");
const Stage = require("../models/Stage")
const candidatureStage = require("../models/CandidatureStage")
const Department = require('../models/Departement');
const JourFrier = require('../models/JourFrier');


//contact 
module.exports.getContact = async (req, res) => {
    try {
      const jobs = await Contact.find({});
      res.status(200).json(jobs);
    } catch (err) {
      console.error('Error retrieving jobs:', err);
      res.status(500).json({ message: 'Error retrieving jobs' });
    }
  };

  module.exports.deleteContact = async (req, res) => {
    try {
      const { id } = req.params;
      await Contact.findByIdAndDelete(id);
      res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ message: "Error deleting contact" });
    }
  };
  

// Handle contact form submission
exports.ContactInern = async (req, res) => {
  const { name, email, subject, description } = req.body;

  try {
    // Create a new contact document using the Contact model
    const contact = new Contact({
      name,
      email,
      subject,
      description,
    });

    // Save the contact document to the database
    await contact.save();

    // Send a response back to the client
    res.json({ message: 'Form data received and saved successfully!' });
  } catch (error) {
    console.error('Error saving contact form data:', error);
    res.status(500).json({ error: 'An error occurred while saving the form data.' });
  }
};


module.exports.AddJob = async (req, res) => {
    const { jobDescription, contract, profile, date,Exigence,
        nbPost,
        Experience,
        Netude,
        Langue,
        Genre,
        dateExp  } = req.body;
    
    const job = new jobSchema({ jobDescription, contract, profile, date ,Exigence,
        nbPost,
        Experience,
        Netude,
        Langue,
        Genre,
        dateExp});
  
    try {
      await job.save();
      res.status(201).json({ message: 'Job added successfully' });
    } catch (err) {
      console.error('Error adding job:', err);
      res.status(500).json({ message: 'Error adding job' });
    }
  };





 //emplois 

module.exports.getJob = async (req, res) => {
    try {
      const jobs = await jobSchema.find({});
      res.status(200).json(jobs);
    } catch (err) {
      console.error('Error retrieving jobs:', err);
      res.status(500).json({ message: 'Error retrieving jobs' });
    }
  };





  module.exports.getJobById = async (req, res) => {
    try {
      const jobId = req.params.id;
      const job = await jobSchema.findById(jobId);
      if (!job) {
        return res.status(404).send("Job not found");
      }
      res.send(job);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  };



  

  module.exports.DeleteJob = async (req, res) => {
    try {
      const job = await jobSchema.findByIdAndDelete(req.params.id);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err) {
      console.error('Error deleting job:', err);
      res.status(500).json({ message: 'Error deleting job' });
    }
  };

module.exports.UpdateOFFREStage = async (req ,res)=> {
  const { id } = req.params;
  const {
    jobDescription,
    contract,
    profile,
    date,
    nbPost,
    Experience,
    Netude,
    Langue,
    Genre,
    dateExp,
    Exigence
  } = req.body;

  try {
    const updatedJob = await Stage.findByIdAndUpdate(
      id,
      {
        jobDescription,
        contract,
        profile,
        date,
        nbPost,
        Experience,
        Netude,
        Langue,
        Genre,
        dateExp,
        Exigence
      },
      { new: true }
    );

    res.json(updatedJob);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
};

module.exports.UpdateOFFREdemploi = async (req ,res)=> {
  const { id } = req.params;
  const {
    jobDescription,
    contract,
    profile,
    date,
    nbPost,
    Experience,
    Netude,
    Langue,
    Genre,
    dateExp,
    Exigence
  } = req.body;

  try {
    const updatedJob = await jobSchema.findByIdAndUpdate(
      id,
      {
        jobDescription,
        contract,
        profile,
        date,
        nbPost,
        Experience,
        Netude,
        Langue,
        Genre,
        dateExp,
        Exigence
      },
      { new: true }
    );

    res.json(updatedJob);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
};









  const multer = require('multer');
  const path = require('path');
const CandidatureStage = require('../models/CandidatureStage');
const Candidature = require('../models/Candidature');


  const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: function(req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Initialize upload
  const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000000 }, // set the file size limit (in bytes)
    fileFilter: function(req, file, callback) {
      checkFileType(file, callback);
    }
  }).single('image');
  
  // Check file type
  function checkFileType(file, callback) {
    // Allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;
    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check MIME type
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return callback(null, true);
    } else {
      callback('Error: Images only!');
    }
  }
  
  
  // candidature de offre demploi

  
  
  const storages = multer.diskStorage({
    destination: './uploads/images',
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
  // Initialize upload
  const uploads = multer({
    storage: storages,
    limits: { fileSize: 10000000000 }, // set the file size limit (in bytes)
    fileFilter: function (req, file, callback) {
      checkFileType(file, callback);
    },
  }).single('Cv');
  
  // Check file type
  function checkFileType(file, callback) {
    // Allowed extensions
    const filetypes = /pdf|doc|docx/;
    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check MIME type
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return callback(null, true);
    } else {
      callback('Error: CV should be in PDF, DOC, or DOCX format!');
    }
  }
  
  module.exports.condidature = async (req, res) => {
    try {
      uploads(req, res, async function (error) {
        if (error) {
          console.log(error);
          return res.status(400).json({ message: 'Error uploading file' });
        }
  
        const { Nom, Prenom, email, DateNess, Numtell, Famille, Deplacement, jobid } = req.body;
  
        // create a new job application object
        const jobApplication = new Candidature({
          Nom,
          Prenom,
          email,
          DateNess,
          Numtell,
          Famille,
          Deplacement,
          jobid,
          Cv: req.file.filename, // Store the filename in the database
        });
  
        // save the job application object to the database
        await jobApplication.save();
  
        res.status(201).json({ message: 'Submitted successfully' });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'An error occurred while submitting the form' });
    }
  };

  module.exports.getCandidatureDoffre= async (req, res) => {
    try {
      const condidatures = await Candidature.find();
  
      const populatedCondidatures = await Promise.all(
        condidatures.map(async (application) => {
          const jobId = application.jobid;
          const job = await jobSchema.findById(jobId);
          return { application, job };
        })
      );
  
      res.json(populatedCondidatures);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to retrieve condidatures' });
    }
  };


  module.exports.getCandidatureStage = async (req, res) => {

    try {
      const applications = await CandidatureStage.find();
      
      // Retrieve job information for each application
      const populatedApplications = await Promise.all(
        applications.map(async (application) => {
          const jobId = application.jobid;
          const job = await Stage.findById(jobId);
          return { application, job };
        })
      );
      res.json(populatedApplications );
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to retrieve applications' });
    }
  };
  
  
  module.exports.accepteCandidaturedoffre = async (req, res) => {
    try {
      const updatedLeave = await candidature.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
  
      const savedLeave = await updatedLeave.save();
      res.status(201).json({ status: 201, leave: savedLeave });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: 'Internal server error' });
    }
  };
  
  module.exports.refuseCondidatureDoffre = async (req, res) => {
    try {
      const updatedLeave = await candidature.findByIdAndUpdate(req.params.id, { status: 'refused' }, { new: true });
      res.json(updatedLeave);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  module.exports.deleteCandidaturedoffre= async (req, res) => {
    try {
      const { id } = req.params;
      await candidature.findByIdAndDelete(id);
      res.status(200).json({ message: "Candidature deleted successfully" });
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ message: "Error deleting Candidature" });
    }
  };
  



  module.exports.ajoutEvent = (req, res) => {
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
        const newEvent = new Event({
          image: imagePath ,
          date : req.body.date ,
           event : req.body.event ,
           description : req.body.description  // store the image path in the database

        });
    
        newEvent.save().then(() => {
          res.send({ code: 200, message: 'Signup success' });
        }).catch((err) => {
          console.log(err);
          res.send({ code: 500, message: 'Signup error' });
        });
      }
    });
  }

 module.exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//stage 
module.exports.AddStage = async (req, res) => {
  const { jobDescription, profile, date,Exigence,
      nbPost,
      
      Netude,
      Langue,
      Genre,
      dateExp  } = req.body;
  
  const job = new Stage({ jobDescription, profile, date ,Exigence,
      nbPost,
     
      Netude,
      Langue,
      Genre,
      dateExp});

  try {
    await job.save();
    res.status(201).json({ message: 'Job added successfully' });
  } catch (err) {
    console.error('Error adding job:', err);
    res.status(500).json({ message: 'Error adding job' });
  }
};


module.exports.getStage = async (req, res) => {
  try {
    const jobs = await Stage.find({});
    res.status(200).json(jobs);
  } catch (err) {
    console.error('Error retrieving jobs:', err);
    res.status(500).json({ message: 'Error retrieving jobs' });
  }
};





module.exports.getStageById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Stage.findById(jobId);
    if (!job) {
      return res.status(404).send("Job not found");
    }
    res.send(job);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};





module.exports.DeleteStage = async (req, res) => {
  try {
    const job = await Stage.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ message: 'Error deleting job' });
  }
};






module.exports.candidatureStages =  async (req, res) => {
    
  try {
    uploads(req, res, async function (error) {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error uploading file' });
      }

      const { Nom, Prenom, email, DateNess, Numtell, Famille, Deplacement, jobid } = req.body;

      // create a new job application object
      const jobApplication = new CandidatureStage({
        Nom,
        Prenom,
        email,
        DateNess,
        Numtell,
        Famille,
        Deplacement,
        jobid,
        Cv: req.file.filename, // Store the filename in the database
      });

      // save the job application object to the database
      await jobApplication.save();

      res.status(201).json({ message: 'Submitted successfully' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred while submitting the form' });
  }
};
//candidature stage 

module.exports.getCandidatureStage = async (req, res) => {
  try {
    const applications = await CandidatureStage.find();
    
    // Retrieve job information for each application
    const populatedApplications = await Promise.all(
      applications.map(async (application) => {
        const jobId = application.jobid;
        const job = await Stage.findById(jobId);
        return { application, job };
      })
    );

    res.json(populatedApplications );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve applications' });
  }
};









module.exports.accepteCandidatureStage = async (req, res) => {
  try {
    const updatedLeave = await candidatureStage.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });

    const savedLeave = await updatedLeave.save();
    res.status(201).json({ status: 201, leave: savedLeave });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal server error' });
  }
};

module.exports.refuseCondidatureStage = async (req, res) => {
  try {
    const updatedLeave = await candidatureStage.findByIdAndUpdate(req.params.id, { status: 'refused' }, { new: true });
    res.json(updatedLeave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports.deleteCandidatureStage= async (req, res) => {
  try {
    const { id } = req.params;
    await candidatureStage.findByIdAndDelete(id);
    res.status(200).json({ message: "Candidature deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Error deleting Candidature" });
  }
};







// jour frier 


exports.createData = async (req, res) => {
  try {
    const { designation, startDate, department, duration, departmentLocation } = req.body;
    
    // Create a new instance of JourFrier with the provided data
    const newData = new JourFrier({
      designation,
      startDate,
      department,
      duration,
      departmentLocation,
    });
    
    await newData.save();
    
    res.status(201).json({ message: 'Data created successfully', newData });
  } catch (error) {
    console.error('Error creating data:', error);
    res.status(500).json({ message: 'Error creating data' });
  }
};






module.exports.getJourFrier = async (req, res) => {
  try {
    const data = await JourFrier.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports.deletejourfrier = async (req, res) => {
  try {
    const job = await JourFrier.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'JourFrier not found' });
    }
    res.status(200).json({ message: 'JourFrier deleted successfully' });
  } catch (err) {
    console.error('Error deleting JourFrier:', err);
    res.status(500).json({ message: 'Error deleting JourFrier' });
  }
};










// POST /api/departments
exports.createDepartment = async (req, res) => {
  try {
    const { department, lieu } = req.body;

    const newDepartment = new Department({
      department,
      lieu,
    });

    const savedDepartment = await newDepartment.save();

    res.status(201).json(savedDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// GET /api/departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports.deletedepartement = async (req, res) => {
  try {
    const job = await Department.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'departement deleted successfully' });
  } catch (err) {
    console.error('Error deleting departement:', err);
    res.status(500).json({ message: 'Error deleting departement' });
  }
};





module.exports.updatedDepartment = async (req, res) => {
  try {
    const departmentId = req.params.id;
    const { department, lieu } = req.body;

    const updatedDepartment = await Department.findByIdAndUpdate(
      departmentId,
      { department, lieu },
      { new: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json(updatedDepartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.conditatureSpontane = async (req, res) => {
  try {
    uploads(req, res, async function (error) {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: 'Error uploading file' });
      }

      const { Nom, Prenom, email, DateNess, Numtell, Famille, Deplacement } = req.body;

      // Check if the CV file is present
      if (!req.file) {
        return res.status(400).json({ message: 'CV file is missing' });
      }

      try {
        const foundSpontanee = await spontane.findOne({ email });
        if (foundSpontanee) {
          // Email exists in the "spontanee" collection
          return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
        }

        // Create a new job application object
        const jobApplication = new spontane({
          Nom,
          Prenom,
          email,
          DateNess,
          Numtell,
          Famille,
          Deplacement,
          Cv: req.file.filename, // Store the filename in the database
        });

        // Save the job application object to the database
        await jobApplication.save();

        res.status(201).json({ message: 'Submitted successfully' });
      } catch (error) {
        console.log(error);
        res.status(505).json({ message: 'An error occurred while submitting the form' });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred while submitting the form' });
  }

};

module.exports.getSpontane= async (req, res) => {
  try {
    const jobs = await spontane.find({});
    res.status(200).json(jobs);
  } catch (err) {
    console.error('Error retrieving jobs:', err);
    res.status(500).json({ message: 'Error retrieving jobs' });
  }
};


module.exports.accepteSpontane = async (req, res) => {
  try {
    const updatedLeave = await spontane.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });

    const savedLeave = await updatedLeave.save();
    res.status(201).json({ status: 201, leave: savedLeave });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal server error' });
  }
};

module.exports.refuseSpontane = async (req, res) => {
  try {
    const updatedLeave = await spontane.findByIdAndUpdate(req.params.id, { status: 'refused' }, { new: true });
    res.json(updatedLeave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports.deleteSpontane= async (req, res) => {
  try {
    const { id } = req.params;
    await spontane.findByIdAndDelete(id);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Error deleting contact" });
  }
};




