


const art = require('../models/Article');
const Sortie=require ('../models/SortieStock')
const Data =require('../models/SuivieData')
const Transfer =require('../models/Transfere')
const BonEntrerSchema  = require('../models/BonEntrer');


//bon entrer get article
exports.getDesignationByCode = async (req, res) => {
  try {
    const article = await art.findOne({ Code: req.params.code });
    if (article) {
      return res.status(200).json({ designation: article.Designation });
    } else {
      return res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};


// lajout taa  bon entrer

// POST route for adding a new bon entrer
// POST route for adding a new bon entrer
module.exports.addBonEntrer = async (req, res) => {
  try {
    // Find the latest document in the collection and get its numFacture value
    const latestDocument = await BonEntrerSchema.findOne().sort({ _id: -1 });
    const latestNumFacture = latestDocument ? latestDocument.NumBonEntrer : 'BE0000';

    // Extract the numerical portion of the latestNumFacture and increment it by one
    const numFactureCounter = parseInt(latestNumFacture.substring(2)) + 1;

    // Construct the new numFacture value by concatenating 'BE' with the incremented numerical portion
    const newNumFacture = 'BE' + numFactureCounter.toString().padStart(3, '0');

    // Create an array of article objects from the request body data
    const articles = req.body.articles.map((article) => {
      return {
        codeArticle: article.codeArticle,
        designation: article.designation,
        qte: article.qte,
        prix: article.prix,
        coutAchat: article.coutAchat,
        pourcentage: article.pourcentage,
        coutStocks: article.coutStocks,
        fraisImporation: article.fraisImporation,
        valeurAchat: article.valeurAchat
      };
    });

    // Loop through the articles array and update the corresponding article record with the new quantity
    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      const existingArticle = await art.findOne({ Code: article.codeArticle });
      if (existingArticle) {
        existingArticle.Quantite += parseInt(article.qte);
        existingArticle.Principale += parseInt(article.qte);
        existingArticle.QteReste += parseInt(article.qte);

        await existingArticle.save();
      }
    }

    // Create a new BonEntrer document with the incremented numFacture value and the article array
    const newBonEntrer = new BonEntrerSchema({
      numFacture: req.body.numFacture,
      NumBonEntrer: newNumFacture,
      dateFacture: req.body.dateFacture,
      societe: req.body.societe,
      unite: req.body.unite,
      coursDeChange: req.body.coursDeChange,
      fraisDouane: req.body.fraisDouane,
      fraisTransitaire: req.body.fraisTransitaire,
      fraisTransport: req.body.fraisTransport,
      fraisCert: req.body.fraisCert,
      autreCharge1: req.body.autreCharge1,
      autreCharge2: req.body.autreCharge2,
      autreCharge3: req.body.autreCharge3,
      TotalCoursStocks: req.body.TotalCoursStocks,
      totalValeurAchat: req.body.totalValeurAchat,
      totalCoutAchat: req.body.totalCoutAchat,
      totalFrais: req.body.totalFrais,
      articles: articles
    });

    // Save the new document to the database
    await newBonEntrer.save();

    // Send a success response with the new numFacture value
    res.json(`BonEntrer added with numFacture ${newNumFacture}!`);
  } catch (err) {
    // Send an error response if something goes wrong
    res.status(400).json(`Error: ${err}`);
  }
};


// Suivie :
exports.getAllData = async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//suivie
exports.editSuivie = async(req , res) => {
  try {
    const { id } = req.params;
    const editedRow = req.body;
    const updatedRow = await Data.findByIdAndUpdate(id, editedRow, { new: true });
    res.json(updatedRow);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error editing data." });
  }

}
//suivie
exports.addData = async (req, res) => {
 
    try {
      const newData = new Data(req.body);
      const savedData = await newData.save();
      res.status(201).json(savedData);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

//////



//ARTICLE 

module.exports.getDepartmentQuantities = async (req, res) => {
  const { Code } = req.params;
  try {
    const Qte = await art.findOne({ Code }, { Principale : 1 , Designation : 1 , support: 1, DOMO: 1, TOOLS: 1, SAFE: 1, VIP: 1 });
    res.status(200).json({ Qte });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports.addArticle = async (req, res) => {
  try {
    const { Code, Designation, Quantite, DateDepot } = req.body;
    const article = new art({
      Code,
      Designation,
      Quantite,
      DateDepot

    });
    await article.save();
    res.status(201).json({ status: 201 });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};







module.exports.findstock = async (req, res) => {
   
        try {
          const articles = await art.find();
          res.json({ articles });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Server Error' });
        }
      };




      module.exports.deleteStocks  = async (req, res) => {
      const articleId = req.params.id;

      art.findByIdAndDelete(articleId)
        .then((article) => {
          if (!article) {
            return res.status(404).json({ message: 'Article not found' });
          }
          res.json({ message: 'Article deleted successfully' });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: 'Error deleting article' });
        });
    };


///  Sortie 
module.exports.sortieStock = async (req, res) => {
  try {
    const { Code, Designation, quantite, Motif, DateDeSortie, QuantitySortie, Department } = req.body;

    // get the current article from the database
    const currentArticle = await art.findOne({ Code });
    if (!currentArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // calculate the new quantity and update the article in the database
    const newQuantite = quantite - QuantitySortie;
    const updatedArticle = await art.findOneAndUpdate(
      { Code },
      { Quantite: currentArticle.Quantite - QuantitySortie},
    
      { new: true }
    );

    // reduce the article's quantity in the corresponding department
    switch (Department) {
      case 'TOOLS':
        updatedArticle.TOOLS -= QuantitySortie;
        break;
      case 'Principale':
        updatedArticle.Principale -= QuantitySortie;
        break;
      case 'VIP':
        updatedArticle.VIP -= QuantitySortie;
        break;
      case 'SAFE':
        updatedArticle.SAFE -= QuantitySortie;
        break;
      case 'DOMO':
        updatedArticle.DOMO -= QuantitySortie;
        break;
      case 'support':
        updatedArticle.support -= QuantitySortie;
        break;
      default:
        return res.status(400).json({ error: 'Invalid department' });
    }
    await updatedArticle.save();
    
    // create a new sortie document and save it to the database
    const sortie = new Sortie({
      Code,
      Designation,
      QuantitySortie,
      Quantite: newQuantite,
      Motif,
      DateDeSortie,
      Department,
    });
    await sortie.save();

    return res.status(201).json({ message: 'Sortie added successfully!', updatedArticle });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to add sortie. Please try again later.' });
  }
};


  

  module.exports.findsortiestock = async (req, res) => {
 
    try {
      const articles = await Sortie.find();
      res.json({ articles });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };



module.exports.getArticles = async (req, res) => {
try {
  const articles = await art.find({}, { _id: 0, Code: 1, Designation: 1, Quantite : 1 , QteReste : 1, VIP :1 ,TOOLS :1,Principale :1, DOMO :1 });
  res.status(200).json({ articles });
} catch (err) {
  console.error(err);
  res.status(500).json({ message: 'Server Error' });
}
};

//// transfere 
module.exports.deleteStocks = async (req, res) => {
  try {
    // Find the transfer by Code
    const transfer = await Transfer.findOne({ Code: req.params.code });

    if (!transfer) {
      return res.status(405).json({ message: 'Transfer not found' });
    }
    // Get the quantity and department of the transfer
    const quantity = transfer.QuantityTransfer;
    const department = transfer.Department;
    const todepartment = transfer.ToDepartment;
    // Find the article by Code
    const article = await art.findOne({ Code: req.params.code });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    // Update the department quantity by adding the transferred article quantity
    if (department === 'TOOLS') {
      article.TOOLS += quantity;
    }else if (department === 'Principale') {
      article.Principale += quantity;
    } else if (department === 'VIP') {
      article.VIP += quantity;
    } else if (department === 'SAFE') {
      article.SAFE += quantity;
    } else if (department === 'DOMO') {
      article.DOMO += quantity;
    } else if (department === 'support') {
      article.support += quantity;
    }
    if (todepartment === 'TOOLS') {
      article.TOOLS -= quantity;
    }else if (todepartment === 'Principale') {
      article.Principale -= quantity;
    } else if (todepartment === 'VIP') {
      article.VIP -= quantity;
    } else if (todepartment === 'SAFE') {
      article.SAFE -= quantity;
    } else if (todepartment === 'DOMO') {
      article.DOMO -= quantity;
    } else if (todepartment === 'support') {
      article.support -= quantity;
    }
    await article.save();
    // Update the main stock quantity by adding the transferred article quantity
   
    
   
    // Delete the transfer
    await Transfer.deleteOne({ Code: req.params.code });
    

    // Send a success message to the client
    res.json({ message: 'Transfer canceled successfully' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}





//transfere
module.exports.TransferStock = async (req, res) => {
  try {
    const { Code, Designation, QuantityTransfer, DateTransfer,ToDepartment, Department } = req.body;

    // Get article quantity based on the code
    const article = await art.findOne({ Code });
    const articleQuantity = article.Quantite;

    // Get total quantity transferred based on the code
    const transfers = await Transfer.find({ Code });
    

    // Compare article quantity with total quantity transferred
  
      const add = new Transfer({
        Code,
        Designation,
        QuantityTransfer,
        DateTransfer,
        Department,
        ToDepartment

      });

      // Update the corresponding department field in the article model
      if (Department === 'TOOLS') {
        article.TOOLS -= QuantityTransfer;
      } else if (Department === 'Principale') {
        article.Principale -= QuantityTransfer;
       } else if (Department === 'VIP') {
        article.VIP -= QuantityTransfer;
      } else if (Department === 'SAFE') {
        article.SAFE -= QuantityTransfer;
      } else if (Department === 'DOMO') {
        article.DOMO -= QuantityTransfer;
      } else if (Department === 'support') {
        article.support -= QuantityTransfer;
      }
      if (ToDepartment === 'TOOLS') {
        article.TOOLS += QuantityTransfer;
      } 
      else if (ToDepartment === 'Principale') {
        article.Principale += QuantityTransfer;
       }else if (ToDepartment === 'VIP') {
        article.VIP += QuantityTransfer;
      } else if (ToDepartment === 'SAFE') {
        article.SAFE += QuantityTransfer;
      } else if (ToDepartment === 'DOMO') {
        article.DOMO += QuantityTransfer;
      } else if (ToDepartment === 'support') {
        article.support += QuantityTransfer;
      }

     
      

      
      await Promise.all([add.save(), article.save()]);

      res.status(201).json({ status: 201 });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

//transfere
module.exports.findtransfer = async (req, res) => {

  try {
    const articles = await Transfer.find();
    res.json({ articles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}; 


    
//get bonenter 
module.exports.getAllBonEntrer = async (req, res) => {
  try {
    const bonEntrers = await BonEntrerSchema.find();
    res.json(bonEntrers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

//etat stocks 
module.exports.getCodeQuantityFinal = async (req, res) => {
  const { code, startDate } = req.body;
  try {
    const transferQuantity = await Transfer.aggregate([
      {
        $match: {
          Code: code,
          DateTransfer: { $lte: new Date(startDate) }, // Filter for dates less than or equal to startDate
        },
      },
      {
        $project: {
          _id: 0,
          date: "$DateTransfer",
          qte: "$QuantityTransfer",
          department: "$Department",
          toDepartment: "$ToDepartment",
          k: "$Code",
          d:"$Designation",
        },
      },
    ]);

    const sortieQuantity = await Sortie.aggregate([
      {
        $match: {
          Code: code,
          DateDeSortie: { $lte: new Date(startDate) }, // Filter for dates less than or equal to startDate
        },
      },
      {
        $project: {
          _id: 0,
          date: "$DateDeSortie",
          qte: "$QuantitySortie",
          department: "$Department",
          k: "$Code",
          d:"$Designation",
        },
      },
    ]);

    const bonEntrerQuantity = await BonEntrerSchema.aggregate([
      {
        $unwind: "$articles",
      },
      {
        $match: {
          "articles.codeArticle": code,
        
          "articles.date": { $lte: new Date(startDate) }, // Filter for dates less than or equal to startDate
        },
      },
      {
        $project: {
          _id: 0,
          date: "$articles.date",
          qte: "$articles.qte",
          k: "$articles.codeArticle",
          d:"$articles.designation",
        },
      },
    ]);

    const transferResult = transferQuantity.map(({ k,d, date, qte, department, toDepartment }) => ({ k,d, date, qte, department, toDepartment }));
    const sortieResult = sortieQuantity.map(({k ,d, date, qte, department }) => ({ k, d, date, qte, department }));
    const bonEntrerResult = bonEntrerQuantity.map(({ k,d,date, qte }) => ({ k,d,date, qte }));

    const quantityFinal =
      bonEntrerResult.reduce((acc, entry) => acc + entry.qte, 0) -
      sortieResult.reduce((acc, entry) => acc + entry.qte, 0) -
      transferResult.reduce((acc, entry) => acc + entry.qte, 0);

    res.json({ quantityFinal, transferResult, sortieResult, bonEntrerResult });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



module.exports.getTotalQte = async (req, res) => {
  const { code, startDate, placement } = req.body;

  try {
    const transferQuantity = await Transfer.aggregate([
      {
        $match: {
          Code: code,
          DateTransfer: { $lte: new Date(startDate) },
          $or: [{ Department: placement }, { ToDepartment: placement }],
        },
      },
      {
        $project: {
          _id: 0,
          date: "$DateTransfer",
          qte: "$QuantityTransfer",
          department: "$Department",
          toDepartment: "$ToDepartment",
        },
      },
    ]);

    const sortieQuantity = await Sortie.aggregate([
      {
        $match: {
          Code: code,
          DateDeSortie: { $lte: new Date(startDate) },
          Department: placement,
        },
      },
      {
        $project: {
          _id: 0,
          date: "$DateDeSortie",
          qte: "$QuantitySortie",
          department: "$Department",
        },
      },
    ]);

    const bonEntrerQuantity = await BonEntrerSchema.aggregate([
      {
        $unwind: "$articles",
      },
      {
        $match: {
          "articles.codeArticle": code,
          "articles.date": { $lte: new Date(startDate) },
          Placement: placement,
        },
      },
      {
        $project: {
          _id: 0,
          date: "$articles.date",
          qte: "$articles.qte",
        },
      },
    ]);

    const transferResult = transferQuantity.map(({ date, qte, department, toDepartment }) => ({ date, qte, department, toDepartment }));
    const sortieResult = sortieQuantity.map(({ date, qte ,department }) => ({ date, qte , department}));
    const bonEntrerResult = bonEntrerQuantity.map(({ date, qte }) => ({ date, qte }));

    const quantityFinal =
      bonEntrerResult.reduce((acc, entry) => acc + entry.qte, 0) -
      sortieResult.reduce((acc, entry) => acc + entry.qte, 0) -
      transferResult.reduce((acc, entry) => acc + entry.qte, 0);

    res.json({ quantityFinal, transferResult, sortieResult, bonEntrerResult });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



    
    
    
    



    
    