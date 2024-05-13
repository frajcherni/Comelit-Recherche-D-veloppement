const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const SiteController = require('./controller/SiteController')
const cors = require('cors')
const userController = require('./controller/user')
const authorisation = require('./controller/authorization')
const rolePermissionsRoutes = require("./Routes/rolePermissionsRoutes");
const messionController = require("./controller/mession")
const compController = require("./controller/compensationCont")
const app = express()
const authController = require('./controller/authController')
const authenticate = req-uire("./middleware/authenticate"); 
const congeannuel = require ('./controller/CongeController')
const Stocks = require('./controller/Stocks')
mongoose.set('strictQuery', true);
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//connection
const PORT = process.env.PORT || 5000

mongoose.connect('mongodb+srv://fraj:' + encodeURIComponent('fraj@123') + '@cluster0.jzho85f.mongodb.net/m?retryWrites=true&w=majority', {
    useNewUrlParser: true ,
    useUnifiedTopology:true
}).then(()=> {
    app.listen(PORT,()=>console.log(`Server run on port : ${PORT}`))
}).catch((error)=> console.log(`${error} did not connect`))



//RH SETTINGS conge
app.put('/accept/:id',userController.accept)
app.put('/refuse/:id',userController.refuse)
app.get('/RH',userController.findAllLeave)
// rh setting authorisation
app.put('/accepteAuthor/:id',authorisation.accepteauth)
app.put('/refuseeauthor/:id',authorisation.refuseeauthoriz)
app.get('/Reshum',authorisation.findAuth)
app.delete('/deleteCA/:id',authorisation.deleteAuth)
app.get('/leaverequestsauthor/:id', authorisation.getauthid)
//usrs
app.get('/allluser',userController.findAllUser)  
app.get('/finduser/:email',userController.finduser) 
app.post('/signup', userController.signup)
app.post('/login', authController.login)
app.put('/update/:email',userController.updateUser) //verification needed !
app.delete('/delete/:id',userController.delete)
//modifier employer
app.put('/edituser/:id',userController.modifierUser)
app.get('/finduserbyids/:id',userController.Finduserbyid)
app.delete('/deleteUser/:id',userController.DeleteUsers)
//conge user

app.get('/findleave/:email', userController.findleave)
app.get('/soldecongeuser/:email', userController.findsoldeconge)
app.use("/rolePermissions", rolePermissionsRoutes);
app.get('/role/:email',userController.role)
app.get('/sidebar/:role',userController.permission)
app.get('/sidebar',userController.page)
app.put('/pages/:id',userController.updatepermission)
app.get('/userid/:id', userController.getUserById);

app.post('/auth',authorisation.createayth)

app.delete('/deleteauth/:id',authorisation.deleteauth)
// mession 
app.get('/fullname', messionController.getAllNomsAndPrenoms);
app.post('/ajout/missions', messionController.createMission);
app.get('/allmession', messionController.findAllMession);
app.delete('/delete/mission/:id',messionController.deletemession);
app.get('/messionid/:id', messionController.getMissionById);
app.get('/passport', userController.getPassportByUser);
app.put('/missions/:id',messionController.updateMission);

app.get('/validuser',authenticate , authController.valid)
//Compensation  : 
app.post('/compensation', compController.createCompensation);
app.put('/acceptcomp/:id',compController.acceptecomp)
app.put('/refusecomp/:id',compController.refusecomp)
app.get('/comp',compController.findcomp)
app.get('/getCompNonconge/:id',compController.getCompensation)
app.delete('/deleteCC/:id',compController.deletecomp);
//chefdequipeaccept 
app.get('/compEquipe',compController.compensationEquipe)
/// conge annuelle : 
app.put('/congeArejecte/:id',congeannuel.reject)
app.put('/accept/accepte/:id',congeannuel.accepted)
app.post('/congeannuel', congeannuel.CongeAnuel)
app.get('/findcongeannuel',congeannuel.findCongeAnuel)
app.get('/leaverequests/:id',congeannuel.getLeaveRequests)
app.get('/findcongeannuelEquipe',congeannuel.findcongeannuelEquipe)

app.delete('/CancelCongeAnnuel/:id',congeannuel.CancelCongeAnnuel)
/////conge special :
app.post('/leave', congeannuel.Leave)
app.put('/refuse/:id',congeannuel.refuse)
app.put('/acc/:id',congeannuel.accepteS)
app.get('/rah',congeannuel.findAllLeave)
app.delete('/deleteCS/:id',congeannuel.deletespec);
app.get('/specialrequest/:id',congeannuel.speacialrequset);
/// maladie :
app.put('/rejectmaladie/:id',congeannuel.rejectMaladie);
app.put('/acceptM/accepteM/:id',congeannuel.acceptedMaladie);
app.post('/congeMaladieM', congeannuel.CongeMaladie);
app.get('/findcongeM',congeannuel.findCongeMaladie);
app.get('/getcalandermaladie',congeannuel.getmaladiecalander);
app.get('/leaverequestsM/:id',congeannuel.getMaladie);
app.get('/leave',congeannuel.getLeavePlanning);
///// salaire
app.get('/userssalaire', userController.getUserssalaire);
app.post('/ajoutsal', userController.createSalaire);
app.get('/Allsalaires', userController.getAllSalaires);
app.get("/salairrereesid/:iduser", userController.getLastSalaire);
app.get('/SalairebYid/:id', userController.getSalaryById);
// forget password 
app.post('/ForgetPassword',userController.forgotPassword);
app.post('/reset-password/:resetToken', userController.resetPassword)
//// CONGE COMPENSATION 
app.get('/getCompensationRequests/:id',compController.getCompensationRequests)
app.put('/rejectCompensation/:id',compController.rejectCompensation)
app.put('/acceptedCompensation/:id',compController.acceptedCompensation)
app.post('/compensationRequest', compController.compensationRequest)
app.get('/FindCongeCompensation',compController.FindCongeCompensation)

/// Stocks 
app.get('/qte/:Code',Stocks.getDepartmentQuantities)
app.post('/articleadd', Stocks.addArticle);
app.get('/selectarticle',Stocks.getArticles)
app.get('/stock/articles',Stocks.findstock);
app.delete('/delte/articles/:id',Stocks.deleteStocks);
//sortie
app.post('/sortiestock', Stocks.sortieStock);
app.get('/stock/sortiestock',Stocks.findsortiestock)


//etat stocks 
app.post('/GetTotalQte', Stocks.getCodeQuantityFinal);
app.post('/GetTotalQteee', Stocks.getTotalQte);

//suivie 

app.post('/scvbar', Stocks.addData);
app.get('/suivaaa', Stocks.getAllData);
app.put('/suivaaarrr/:id', Stocks.editSuivie);
// bon entrer 
app.post('/bonentreradd', Stocks.addBonEntrer);
app.get('/designation/:code', Stocks.getDesignationByCode);
app.get('/getAllBonEntrer',Stocks.getAllBonEntrer);
/// transfere 
app.delete('/delte/articlescc/:code', Stocks.deleteStocks);
app.post('/TransferStock',Stocks.TransferStock)
app.get('/transfer/transferstock', Stocks.findtransfer)
//sidebar 
app.put('/pages/:id/options/:value',userController.updateDropdownOptionPermission)

app.post('/ajouter',SiteController.AddJob)
app.put('/updateoffreemploi/:id',SiteController.UpdateOFFREdemploi)

app.post('/condidature',SiteController.condidature)
app.get('/getalljobs',SiteController.getJob)
app.get('/getJobById/:id',SiteController.getJobById)
app.delete('/deletejob/:id',SiteController.DeleteJob)
app.post('/ajoutEvent',SiteController.ajoutEvent)
app.get('/getAllEvents',SiteController.getAllEvents)


// spontane 
app.post('/condidatureSpontane',SiteController.conditatureSpontane)
app.get('/GetcondidatureSpontane',SiteController.getSpontane)
app.put('/refuseSpontane/:id',SiteController.refuseSpontane)
app.put('/accSpontane/:id',SiteController.accepteSpontane)
app.delete('/deleteSpontane/:id',SiteController.deleteSpontane)

// Candidature doffre demploi 
app.get('/GetcondidatureDoffre',SiteController.getCandidatureDoffre)
app.put('/refuseDoffre/:id',SiteController.refuseCondidatureDoffre)
app.put('/accDoffre/:id',SiteController.accepteCandidaturedoffre)
app.delete('/deleteDoffre/:id',SiteController.deleteCandidaturedoffre)

//contact 
app.post('/ContactInern',SiteController.ContactInern)
app.get('/getContacts',SiteController.getContact)
app.delete('/deleteContact/:id',SiteController.deleteContact)
//stage 
app.post('/ajouterstage',SiteController.AddStage)
app.get('/getallstage',SiteController.getStage)
app.get('/getstageById/:id',SiteController.getStageById)
app.delete('/deletestagess/:id',SiteController.DeleteStage)
app.post('/condidatureStage',SiteController.candidatureStages)
app.put('/updateoffrestage/:id',SiteController.UpdateOFFREStage)
//condidature stage 
app.get('/getinformation',SiteController.getCandidatureStage)
app.put('/refuseDoffreStage/:id',SiteController.refuseCondidatureStage)
app.put('/accstage/:id',SiteController.accepteCandidatureStage)
app.delete('/deletestage/:id',SiteController.deleteCandidatureStage)

// event 
app.post('/ajoutEvent',SiteController.ajoutEvent)
app.get('/getAllEvents',SiteController.getAllEvents)


// jour frier 
app.post('/ajouteJourFrier',SiteController.createData)
app.get('/getJourFrier',SiteController.getJourFrier)
app.delete('/deletejourfrier/:id',SiteController.deletejourfrier)


// departement 
app.put('/updateDepartment/:id', SiteController.updatedDepartment);

app.post('/createDepartment',SiteController.createDepartment)
app.get('/getDepartments',SiteController.getDepartments)
app.delete('/deletedepartement/:id',SiteController.deletedepartement)


app.get('/getEquipe', userController.GetEquipe)

//annulation des conges 

app.delete('/CancelCongeAnnuel/:id',congeannuel.CancelCongeAnnuel)
app.delete('/CancelCongeSpecial/:id',congeannuel.CancelCongeSpecial)

app.delete('/CancelCongeCompensation/:id',compController.CancelCongeCompensation)

app.delete('/CancelCongeMaladie/:id',congeannuel.CancelCongeMaladie)


app.delete('/CancelCompensation/:id',compController.CancelCompensation)