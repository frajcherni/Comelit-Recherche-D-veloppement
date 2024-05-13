import {Alert,Container,Modal,Form} from 'react-bootstrap';
import {Button,ButtonGroup }from 'react-bootstrap'
import * as ReactBootStrap from 'react-bootstrap';
import axios from 'axios'
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faEdit,faUserPlus,faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Document, Page, Text, View, Image, PDFDownloadLink, StyleSheet, PageFooter  } from '@react-pdf/renderer';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import jsPDF from 'jspdf';
import 'jspdf-autotable';


function BasicExample() {
 
  const [ fin, setFin] = useState('');
  const [ periodedess2, setPeriodedess2] = useState('');
  const [ dateemb, setDateemb] = useState('');
  const [ periodedess, setPeriodedess] = useState('');
  const [ salaire, setSalair] = useState('');
  const currentDate = new Date().toLocaleDateString();
  const [selectedUser, setSelectedUser] = useState(null);
  const [preview, setPreview] = useState(null);
  const [User, setUser] = useState([]);
  const [search, setSearch] = useState('');
  const [ id, setId] = useState('');
  const [ Matricule, setMatricule] = useState('');
  const [ Nom, setNom] = useState('');
  const [ Prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [sexe, setsexe] = useState('');
 const [Situation, setSituation] = useState('');
 const [Cin, setCin] = useState('');
  const [Datenaissence, setDatenaissece] = useState('');
  const [role, setrole] = useState('');
  const [Nbenfants, setNbenfants] = useState('');
 const [Ntell, setNtell] = useState('');
 const [Npassport, setNpassport] = useState('');
 const [Rib, setRib] = useState('');
 const [Equipe, setEquipe] = useState('');
 const [SousEquipe, setSousEquipe] = useState('');
 const [Cheffamille, setCheffamille] = useState('');
 const [Daf, setDaf] = useState('');
 const [ChefDequipe, setChefDequipe] = useState('');
 const [Activite, setActivite] = useState('');
 const [Teletravail, setTeletravail] = useState('');
 const [solde, setSolde] = useState('');
 const [Sdautorisation, setSdautorisation] = useState('');
 const [Scomposition, setScomposition] = useState('');
 const [Smaladie, setSmaladie] = useState('');
 const [Souverture, setSouverture] = useState('');
 const [Dateoverture, setDateoverture] = useState('');
 const [Validatepassport, setValidatepassport] = useState('');
 const [Comentaire, setComentaire] = useState('');
 const [image, setImage] = useState(null);
 const [selectedOption, setSelectedOption] = useState('');
 const [dateOption1, setDateOption1] = useState('');
 const [dateOption2, setDateOption2] = useState('');

 const handleOptionChange = (event) => {
   setSelectedOption(event.target.value);
 };

 const handleDateOption1Change = (event) => {
   setDateOption1(event.target.value);
 };

 const handleDateOption2Change = (event) => {
   setDateOption2(event.target.value);
 };

 const [errors, setErrors] = useState({
   email: '',
   password: '',
   Matricule: '',
   Nom: '',
   Prenom: '',
   sexe: '',
   Situation: '',
   Cin: '',
   Datenaissence: '',
   role: '',
   Nbenfants: '',
   Ntell: '',
   Npassport: '',
   Rib: '',
   Equipe: '',
   Smaladie: '',
   Scomposition: '',
   Sdautorisation: '',
   solde: '',
   Teletravail: '',
   Activite: '',
   Daf: '',
   Cheffamille: '',
   
   

   
})
const [ Upid ,setUpid] = useState('');
const [ UpMatricule, setUpMatricule] = useState('');
const [ UpNom, setUpNom] = useState('');
const [ UpPrenom, setUpPrenom] = useState('');
const [Upemail, setUpEmail] = useState('');
const [Uppassword, setUpPassword] = useState('');
const [Upsexe, setUpsexe] = useState('');
const [UpSituation, setUpSituation] = useState('');
const [UpCin, setUpCin] = useState('');
const [UpDatenaissence, setUpDatenaissece] = useState('');
const [Uprole, setUprole] = useState('');
const [UpNbenfants, setUpNbenfants] = useState('');
const [UpNtell, setUpNtell] = useState('');
const [UpNpassport, setUpNpassport] = useState('');
const [UpRib, setUpRib] = useState('');
const [UpEquipe, setUpEquipe] = useState('');
const [UpSousEquipe, setUpSousEquipe] = useState('');
const [UpCheffamille, setUpCheffamille] = useState('');
const [UpDaf, setUpDaf] = useState('');
const [UpChefDequipe, setUpChefDequipe] = useState('');
const [UpActivite, setUpActivite] = useState('');
const [UpTeletravail, setUpTeletravail] = useState('');
const [Upsolde, setUpSolde] = useState('');
const [UpSdautorisation, setUpSdautorisation] = useState('');
const [UpScomposition, setUpScomposition] = useState('');
const [UpSmaladie, setUpSmaladie] = useState('');
const [UpSouverture, setUpSouverture] = useState('');
const [UpDateoverture, setUpDateoverture] = useState('');
const [UpValidatepassport, setUpValidatepassport] = useState('');
const [UpComentaire, setUpComentaire] = useState('');
const [UpselectedOption, setUpSelectedOption] = useState('');
  const [UpdateOption1, setUpDateOption1] = useState('');
  const [UpdateOption2, setUpDateOption2] = useState('');
  const [ Upperiodedess2, setUpPeriodedess2] = useState('');
  const [ Updateemb, setUpDateemb] = useState('');
  const [ Upperiodedess, setUpPeriodedess] = useState('');
  const [ Upsalaire, setUpSalair] = useState('');



  useEffect(() => {
    axios.get('http://localhost:5000/allluser')
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setPreview(null);
    }
  };

  const DeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user ?")) {
    axios.delete(`http://localhost:5000/deleteUser/${id}`)
      .then((response) => {
        
        alert("user deleted.");
     
        window.location.reload();
          // handle error
      
      })
      .catch((error) => {
        // handle error
      });
    }
  }

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);
  
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/allluser');
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const [show, setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showdetail, setShowDetail ] = useState(false);
  const onClosedetail = () => setShowDetail(false);
  
  const UphandleOptionChange = (event) => {
    setUpSelectedOption(event.target.value);
  };

  const UphandleDateOption1Change = (event) => {
    setUpDateOption1(event.target.value);
  };

  const UphandleDateOption2Change = (event) => {
    setUpDateOption2(event.target.value);
  };
  const [edit, setEdit ] = useState(false);
  const handleCloseEdit = () => setEdit(false);
  const handleShowEdit = (id) => {
    User.forEach( c => {
      if ( c._id === id ){
        setUpid(c._id)
        setUpMatricule(c.Matricule)
        setUpNom(c.Nom)
        setUpPrenom(c.Prenom)
        setUpEmail(c.email);
        setUpPassword(c.password);
        setUpCin(c.Cin);
        setUpsexe(c.sexe);
        setUpDatenaissece(c.Datenaissence);
        setUprole(c.role);
        setUpSituation(c.Situation);
        setUpActivite(c.Activite)
        setUpTeletravail(c.Teletravail);
        setUpSolde(c.solde);
        setUpSdautorisation(c.Sdautorisation);
        setUpScomposition(c.Scomposition);
        setUpSmaladie(c.Smaladie);
        setUpSouverture(c.Souverture);
        setUpCheffamille(c.Cheffamille);
        setUpDaf(c.Daf);
        setUpEquipe(c.Equipe);
        setUpSousEquipe(c.SousEquipe);
        setUpRib(c.Rib);
        setUpNpassport(c.Npassport);
        setUpNtell(c.Ntell);
       
        setUpSalair(c.salaireemb);

        console.log(id);




      }
    });
    setEdit(true);
  }
  
 //PDF
 const exportToPdf = (data) => {
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "landscape"; // portrait or landscape
  const marginLeft = 30;
  const doc =  new jsPDF();

  
  const headers = [
    ["Mat", "Nom ",  "Prenom ","Tell", "Cin", "Email",  "role", "Sexe","Date de naissance","Passport"],
  ];

  const dataToPrint = data.map((user, index) => [
    user.Matricule,
    user.Nom,
    user.Prenom,
    user.Ntell,
    user.Cin,
    user.email,
    
    user.role,
    user.sexe,
    user.Datedenaissance,
    user.Npassport
  ]);

  let content = {
    startY: 10,
    head: headers,
    body: dataToPrint,
  };

  doc.autoTable(content);
  doc.save("users.pdf");
};


//csv form 
const exportToCsv = (data) => {
  const csvRows = [];
  // Get headers
  const headers = Object.keys(data[1]);
  csvRows.push(headers.join(','));

  // Loop over data
  for (const row of data) {
    const values = headers.map(header => {
      const escaped = (''+row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  // Create file
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'users.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

//

   //ajout
  

  const formValidation = () => {
    let status = true;
    const localErrors = {
        ...errors
    }
   /*
    if (password === "" || password.length < 8) {
        localErrors.password = 'Password is required and must be at least 8 characters';
        status = false;
    }
    if (Matricule === "") {
        localErrors.Matricule = 'Matricule is required';
        status = false;
    }
    if (Nom === "") {
        localErrors.Nom = 'Nom is required';
        status = false;
    }
    if (Prenom === "") {
        localErrors.Prenom = 'Prenom is required';
        status = false;
    }
    if (sexe === "") {
        localErrors.sexe = 'sexe is required';
        status = false;
    }
    if (Situation === "") {
        localErrors.Situation = 'Situation is required';
        status = false;
    }
    if (Cin === "" ) {
        localErrors.Cin = 'Cin is required';
        status = false;
    }
   
    if (role === "") {
        localErrors.role = 'role is required';
        status = false;
    }
   
    if (Ntell === "" ) {
        localErrors.Ntell = 'Numéro de téléphone is required';
        status = false;
    }
    if (Npassport === "") {
        localErrors.Npassport = 'Numéro de passport is required';
        status = false;
    }
    if (Rib === "") {
        localErrors.Rib = 'RIB is required';
        status = false;
    }
    if (Equipe === "") {
        localErrors.Equipe = 'Équipe is required';
        status = false;
    }
    if (Cheffamille === "") {
        localErrors.Cheffamille = 'Chef de famille is required';
        status = false;
    }
    if (Daf === "") {
        localErrors.Daf = 'DAF is required';
        status = false;
    }
    if (ChefDequipe === "") {
        localErrors.ChefDequipe = 'Chef d\'équipe is required';
        status = false;
    }
    if (Activite === "") {
        localErrors.Activite = 'Activité is required';
        status = false;
    }
    if (Teletravail === "") {
        localErrors.Teletravail = 'Télétravail is required';
        status = false;
    }
    if (solde === "") {
        localErrors.solde = 'Solde is required';
        status = false;
    }
    if (Sdautorisation === "") {
        localErrors.Sdautorisation = 'Solde d\'autorisation is required';
        status = false;
    }
    if (Scomposition === "") {
        localErrors.Scomposition = 'Solde de composition is required';
        status = false;
    }
    if (Smaladie === "") {
        localErrors.Smaladie = 'Solde de maladie is required';
    }
    setErrors(localErrors)*/
    return status ;
  }
//edit
const editUser = (e) => {
  e.preventDefault();
  let adateToSave;
      if (UpselectedOption === 'option1') {
        adateToSave = new Date(UpdateOption1);
      } else if (UpselectedOption === 'option2') {
        adateToSave = new Date(UpdateOption2);
      }
  const updatedUser = {
    email: Upemail,
    password: Uppassword,
    Matricule: UpMatricule,
    Nom: UpNom,
    Prenom: UpPrenom,
    Cin: UpCin,
    sexe: Upsexe,
    SituationFamille: UpSituation,
    Datedenaissance: UpDatenaissence,
    Nbenfants: UpNbenfants,
    Ntell: UpNtell,
    Npassport: UpNpassport,
    Rib: UpRib,
    Equipe: UpEquipe,
    SousEquipe: UpSousEquipe,
    role: Uprole,
    ChefFamille: UpCheffamille,
    Daf: UpDaf,
    Chefdequipe: UpChefDequipe,
    Activite: UpActivite,
    Teletravail: UpTeletravail,
    solde: Upsolde,
    Sdautorisation: UpSdautorisation,
    Scomposition: UpScomposition,
    Smaladie: UpSmaladie,
    Souverture: UpSouverture,
    DateOverture: UpDateoverture,
    ValidatePassport: UpValidatepassport,
    Commentaire: UpComentaire,
    fin:adateToSave,
    period:Upperiodedess2,
    periode :Upperiodedess,
    salaireemb :Upsalaire,
    dateemb : Updateemb,
  };

  axios.put(`http://localhost:5000/edituser/${Upid}`, updatedUser)
    .then((res) => {
      // handle success
      console.log(res.data.message);
      
      handleCloseEdit();
    })
    .catch((err) => {
      // handle error
      console.log(err);
    });

    handleCloseEdit();
};

const handleChefDequipeChange = (e) => {
  setChefDequipe(e.target.value);
};

const chefDequipeEmployees = employees.filter((employee) => employee.role === 'chefdequipe');

const [departments, setDepartments] = useState([]);
useEffect(() => {
  fetchDepartments();
}, []);

const fetchDepartments = async () => {
  try {
    const response = await axios.get('http://localhost:5000/getDepartments');
    setDepartments(response.data);
  } catch (error) {
    console.error(error);
  }
};


const handleDepartmentChange = (e) => {
  setSousEquipe(e.target.value);
};



//ajout
  const handleSubmit = (e) => {
    e.preventDefault();

    if(formValidation()) {

    const formData = new FormData();
    formData.append("Matricule",Matricule);
    formData.append("Nom",Nom);
    formData.append("Prenom",Prenom);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image);
    formData.append("Cin",Cin);
      formData.append("role",role);
      formData.append(" sexe", sexe);
      formData.append("Datenaissence",Datenaissence);
      formData.append("Situation",Situation);
      formData.append("Nbenfants",Nbenfants);
      formData.append("Rib",Rib);
      formData.append("Equipe",Equipe);
      formData.append("SousEquipe",SousEquipe);
      formData.append("Cheffamille",Cheffamille);
      formData.append("Daf",Daf);
      formData.append("ChefDequipe",ChefDequipe);
      formData.append("Ntell",Ntell);
      formData.append("Activite",Activite);
      formData.append("Teletravail",Teletravail);
      formData.append("solde",solde);
      formData.append("Sdautorisation",Sdautorisation);
      formData.append("Scomposition",Scomposition);
      formData.append("Smaladie",Smaladie);
      formData.append("Souverture",Souverture);
      formData.append("Dateoverture",Dateoverture);
      formData.append("Validatepassport",Validatepassport);
      formData.append("Comentaire",Comentaire);
      formData.append("Npassport",Npassport);
      formData.append("option",selectedOption);
      formData.append( "period",periodedess2);
      formData.append("periode" ,periodedess);
      formData.append("salaireemb" ,salaire);
      formData.append("dateemb" , dateemb);
      let dateToSave;
      if (selectedOption === 'option1') {
        dateToSave = new Date(dateOption1);
      } else if (selectedOption === 'option2') {
        dateToSave = new Date(dateOption2);
      }
      formData.append("fin",dateToSave) 
    axios.post('http://localhost:5000/signup', formData).then((res) => {
    
      
      // do something with the response (e.g. show a success message)
    }).catch((err) => {
      console.log(err);
      // handle error
    });
    handleClose()
 
  } else{
    console.log("form invalide")
}
  };
   //affiche

  

 
 //search
const handleSearchChange = (event) => {
  setSearch(event.target.value);
};

const faa = User.filter(ahmed =>
  ahmed.email.toLowerCase().includes(search.toLowerCase()) ||
  ahmed.Nom.toLowerCase().includes(search.toLowerCase()) ||
  ahmed.Prenom.toLowerCase().includes(search.toLowerCase()) ||
  ahmed.role.toLowerCase().includes(search.toLowerCase()) 
 
);
//get user detail
const fetchUserDetails = async(id) => {
  try {
    const response = await fetch(`http://localhost:5000/userid/${id}`);
    const user = await response.json();

    setSelectedUser(user);
    setShowDetail(true);
  } catch (error) {
    console.error(error);
  }
}
//document pdf
const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    fontSize: 10,
    justifyContent: 'left',
   
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'left',
    flexGrow: 1,
   
  },
  footerText: {
    textAlign: 'left',
   
  },
  footerTextCenter: {
    textAlign: 'center',
    
  },
  footerTextRight: {
    textAlign: 'right',
    
  },
});
const MyDocument = ({ employer }) => (
  <Document>
  <Page>
   <View>
     
        <Image src="/img/comelitnoir.png" style={{ paddingLeft:40, paddingTop:2 ,height: 130, width: 250 }} />
      
    
        <View >
          <Text style={{  paddingTop:0 ,paddingLeft:400, fontSize: 15 }}>Tunis , Le: {currentDate}</Text>
        </View>
        <View> </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight:'bold', paddingTop:30, textAlign: 'center' }}>Attestation de Travail  </Text>
        </View>
        </View>
        <View>
    
        <View style={{ paddingTop: "110px", paddingLeft: "30px", paddingRight: "30px", justifyContent: "space-between", fontSize: 12 }}>
  <Text>Je soussigné,Madame Basly Olfa , agissant en qualité de Responsable administratif et financier de la Sociéte Comelit Recherche & Développement au capital de six mille dinars tunisien (6000 DNT) ,dont le siège social se trouve à Pole El Gazela des Technologies de la Communication Batiment E1 RDC route de Roaued 2088 Ariana , immatriculée au Registre du Commerce et des Sociétés de Tunis et identifiée sous le numéro : B01247692014,</Text>
  <Text>Certifie et atteste par la présente que :</Text>

      <View> 
      
      </View>
      
       
        
      <Text style={{fontFamily: 'Helvetica',fontSize: 13 }}>(Meme/Mr) {employer.Nom}{employer.Prenom} , titulaire de carte d'idente national N {employer.Cin} est 
      salarié de la Sociéte Comelit Recherche & Développement en tant que : " " , depuis le {employer.Dateoverture}</Text>
      
    <Text  style={{}}>Cette Attestation est délivrée à l'intéressé pour servir et valoir ce que de droit.</Text>
    </View>
    <Text style={ {"position":"absolute","height":"56px","left":"250px","top":"350px"} }>Le Responsable administratif et financier </Text>
    <Text style={{ position: 'absolute', left: '331px', top: '390px' }}> </Text>
    </View>
    <Text style={{position: "absolute",
    bottom: 110,
    left: 20,
    right: 20,
    fontSize: 10,color:'#0FA66D'
    }}> COMELIT RECHERCHE ET DEVLOPPEMENT  ................................................................................................................ </Text>
    <View style={styles.footer}>
    <View style={styles.footerContainer}>
    
    <View style={{ flexDirection: 'column', alignItems: 'left' }}>
      <Text style={[styles.footerText, styles.footerTextLeft]}>SARL au capital de 6000 TND Siege </Text>
      <Text style={[styles.footerText, styles.footerTextLeft]}>social Pole Technologie El Ghazela Bloque E1</Text>
      <Text style={[styles.footerText, styles.footerTextLeft]}>RDC Route de Raoud 2088 Ariana| Tunisie </Text>
       </View>
       <View style={{ flexDirection: 'column', alignItems: 'left' }}>
      <Text style={[styles.footerText, styles.footerTextCenter]}>MF : 1378354 A/A/M/00</Text>
      <Text style={[styles.footerText, styles.footerTextCenter]}>RC : B01247692014 </Text>
      <Text style={[styles.footerText, styles.footerTextCenter]}>T + 216 70 834 125 </Text>
      <Text style={[styles.footerText, styles.footerTextCenter]}>F + 216 70 834 126 </Text>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'left' }}>
      <Text style={[styles.footerText, styles.footerTextRight]}>CCB:Agence UBCI Raoud</Text>
      <Text style={[styles.footerText, styles.footerTextRight]}>RIB:11 053 0050028 034 978 55</Text>
      <Text style={[styles.footerText, styles.footerTextRight]}>web:www.comelitgroupe.comelit</Text>
      <Text style={[styles.footerText, styles.footerTextRight]}>E-mail:cred@comelit.it</Text>
    </View>
    
    </View>
   
  </View>
  <Text style={{position: "absolute",
    bottom: 35,
    left: 25,
    right: 20,
    fontSize: 12,color:'#0FA66D'
    }}> www.comelitgroupe.com  ........................................................................................................................ </Text>
  </Page>
  
</Document>



);



 return(
  <div >
     <div className="container my-3 py-5">
       <div className="row">
 
       <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} 
      className="display-6 text-center mb-4">Gestion Des <b> Employées</b> </h1>    <hr className="w-25 mx-auto"/>
    <div className="row">
    <div className="row">
  <div className="col-md-6">
    <button onClick={handleShow} className="btn btn-outline-success px-4 py-2 mb-4">
      <FontAwesomeIcon icon={faUserPlus} /> Ajout Employé
      <span style={{ marginLeft: "5px" }}></span>
    </button>
  </div>
  <div className="col-md-6 text-end">
  <button className='btn btn-dark ' onClick={() => exportToCsv(User)}>
            <FontAwesomeIcon icon={faDownload} /> Export CSV
            </button> 
            <span> <button className='btn btn-dark ' onClick={() => exportToPdf(faa)}>
                <FontAwesomeIcon icon={faDownload} /> Export PDF
            </button></span>   
  </div>
</div>

      
  
    <div className="col-md-3 text-left">
        <ReactBootStrap.FormGroup className="mb-4">
           <ReactBootStrap.FormControl  size="sm" className=" my-6 " type="text" placeholder="Search..." value={search} onChange={handleSearchChange} />
           </ReactBootStrap.FormGroup>
      </div>
   
    
    {
      faa && faa.length > 0 ? 
       <Container>
      
      <ReactBootStrap.Table responsive striped bordered hover className='bg-green' >
        
        <thead className='table-dark'>
          <tr className='table-dark'>
          <th>Id</th>
          <th>Nom & Prenom</th>
          <th>Num </th>
          <th>Cin</th>
          <th>Email</th>
          <th>Solde</th>
          
          <th>role</th>
          <th>image</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
          faa.map((Users,index) => 
            <tr key={index}>
              <td>{index+1}</td>
              <td>{Users.Nom}  {Users.Prenom}</td>
              <td>{Users.Ntell}</td>
              <td>{Users.Cin}</td>
              <td>{Users.email}</td>
              <td>{Users.solde}</td>
              
              <td>{Users.role}</td>
      
      <td><img className="avatar rounded-circle" width="20%" heigth ="20%"src={`http://localhost:5000/${Users.Image}` }  /></td>
              
              <td>
              <ButtonGroup>
              <button className="btn btn-outline-primary me-2 px-2 py-1  m-1" onClick={ ()=> handleShowEdit(Users._id) }>    <FontAwesomeIcon icon={faEdit} /></button>
              <button className="btn btn-outline-danger me-2 px-2 py-1  m-1" onClick={ ()=> DeleteUser(Users._id)} >   <i className="fa fa-trash text-outline-danger fa-fw"></i></button>
              <button className="btn btn-outline-success me-2 px-2 py-1  m-1" onClick={() => fetchUserDetails(Users._id)}><FontAwesomeIcon icon={faEye}  /></button>
             
              </ButtonGroup>
              </td>
              
             
            </tr>
            
          )
          }
         
        </tbody>
      </ReactBootStrap.Table>
        
    </Container>
    : <Alert  variant='info'>
      Aucun users...
   
  </Alert>
    
         
        }


    
  </div>

 <Modal size="lg" show={show} onHide={handleClose} >
 
  <Modal.Header  closeButton className='bg-success text-white'  >
 
    <Modal.Title> Ajout d'employer</Modal.Title>
  </Modal.Header>
  <Modal.Body >
  
    <div className="container">
          
         
            <div className="profile_div text-center">
            
            </div>

            <Form onSubmit={handleSubmit}  >
            
              <Row>
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Matricule</Form.Label>
                  <Form.Control type="number" name='matricule'   value={Matricule} onChange={(e)=>{setMatricule(e.target.value)}} placeholder='Entrez Matricule' />
                  {
    errors.Matricule !== "" ? 
    <div style={{textAlign:'left' , color : 'orangered'}}>
        {errors.Matricule}
     </div>: ''
}
                </Form.Group>

                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>role</Form.Label>
                  <Form.Select className="mb-3" value={ role} onChange={(e)=>{setrole(e.target.value)}}> 
                  <option value="">--Aucun--select-</option>
                    <option value="colaborateur">colaborateur</option>
                    
                    <option value="chefdequipe">Chef d'equipe</option>
                    <option value="Administrateur"> Administrateur</option>
                    
                  </Form.Select> 
                </Form.Group>


                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control type="text" name='fname'  value={Nom} onChange={(e)=>{setNom(e.target.value)}} placeholder='Nom' />
                  {
    errors.Nom !== "" ? 
    <div style={{textAlign:'left' , color : 'orangered'}}>
        {errors.Nom}
     </div>: ''
}
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control type="text" name='lname' value={ Prenom} onChange={(e)=>{setPrenom(e.target.value)}}  placeholder='Prenom' />
                  {
    errors.Prenom !== "" ? 
    <div style={{textAlign:'left' , color : 'orangered'}}>
        {errors.Prenom}
     </div>: ''
}
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label> addresse Email</Form.Label>
                  <Form.Control type="email" name='email'  placeholder='entrez Email'
                  value={email} onChange={(e) => setEmail(e.target.value)} />
                  {
    errors.email !== "" ? 
    <div style={{textAlign:'left' , color : 'orangered'}}>
        {errors.email}
    </div>: ''
}
                  
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>mot de passe </Form.Label>
                  <Form.Control type="email" name='password'  placeholder='Mot de passe'
                  value={password} onChange={(e) => setPassword(e.target.value)} />
                  {
    errors.password !== "" ? 
    <div style={{textAlign:'left' , color : 'orangered'}}>
        {errors.password}
     </div>: ''
}
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Cin</Form.Label>
                  <Form.Control type="Number" name='cin'  value={ Cin} onChange={(e)=>{setCin(e.target.value)}} placeholder='Entrez cin' />
                  {
    errors.Cin !== "" ? 
    <div style={{textAlign:'left' , color : 'orangered'}}>
        {errors.Cin}
     </div>: ''
}
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>N° Tell</Form.Label>
                  <Form.Control type="text" name='mobile'value={ Ntell} onChange={(e)=>{setNtell(e.target.value)}}  placeholder='entrez Mobile' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Gender  </Form.Label>
                <Form.Select className="mb-3"  value={ sexe} onChange={(e)=>{setsexe(e.target.value)}}>
                <option value="">--Aucun--select-</option>
                <option value="Homme">Homme</option>
                <option value="femme">Femme</option>
              
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Situation Famille </Form.Label>
                  <Form.Select className="mb-3"  value={ Situation} onChange={(e)=>{setSituation(e.target.value)}}>
                  <option value="">--Aucun--select-</option>
                  <option value="Celibataire">Celibataire</option>
                  <option value="Marie">Marie(e)</option>
                  <option value="Divorce">Divorce(e)</option>
                  <option value="Veuf">Veuf(ve)</option>
                  {
    errors.Situation !== "" ? 
    <div style={{textAlign:'left' , color : 'orangered'}}>
        {errors.Situation}
     </div>: ''
}
                  </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Nombres d'enfants</Form.Label>
                  <Form.Control type="number" name='mobile'value={ Nbenfants} onChange={(e)=>{setNbenfants(e.target.value)}}  placeholder='entrez nombre enfant' />
                </Form.Group>
               
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
        <Form.Label>Choisir une image</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
      </Form.Group>
<div  style={{ width: '200px' }}>
{image && <img src={URL.createObjectURL(image)} alt="preview" style={{ width: '100%' }} />}</div>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Date de naissance</Form.Label>
                  <Form.Control type="Date" name='dateness' value={ Datenaissence} onChange={(e)=>{setDatenaissece(e.target.value)}} />
                  {
    errors.Datenaissence !== "" ? 
    <div style={{textAlign:'left' , color : 'orangered'}}>
        {errors.Datenaissence}
     </div>: ''
}
                </Form.Group>
                
                  <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Passport</Form.Label>
                  <Form.Control type="text" name='passport' value={ Npassport} onChange={(e)=>{setNpassport(e.target.value)}}  placeholder='entrez Num Passport' />
                </Form.Group>  
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Validité Passport</Form.Label>
                  <Form.Control type="Date" name='valpassport' value={ Validatepassport} onChange={(e)=>{setValidatepassport(e.target.value)}}  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Rib</Form.Label>
                  <Form.Control type="Number" name='rib'value={ Rib} onChange={(e)=>{setRib(e.target.value)}}  placeholder='entrez Rib' />
                </Form.Group>  

                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>  Département</Form.Label>
                  <Form.Select className="mb-3" value={ Equipe} onChange={(e)=>{setEquipe(e.target.value)}}> 
                  <option value="">--Aucun--select-</option>
                    <option value="Administration">Administration</option>
                    <option value="R&D">R & D </option>
                    <option value="Support">Support Technique</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label> Sous Département</Form.Label>
                  <Form.Select className="mb-3" value={SousEquipe} onChange={handleDepartmentChange}>
      <option value="">-- Select Department --</option>
      {departments.map((department) => (
        <option key={department._id} value={department.department}>
          {department.department}
        </option>
      ))}
    </Form.Select>
                </Form.Group>
               
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Chef famille</Form.Label>
                  <Form.Select className="mb-3"value={ Cheffamille} onChange={(e)=>{setCheffamille(e.target.value)}}> 
                  <option value="">--Aucun--select-</option>
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Daf</Form.Label>
                  <Form.Select className="mb-3" value={ Daf} onChange={(e)=>{setDaf(e.target.value)}}> 
                  <option value="">--Aucun--select-</option>
                    
                      <option value="OlfaBasly">Olfa Basly</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Chef D'equipe</Form.Label>
                  <Form.Select className="mb-3" value={ChefDequipe} onChange={handleChefDequipeChange}>
      <option value="">-- Select Chef d'Equipe --</option>
      {chefDequipeEmployees.map((employee) => (
         <option key={employee.id} value={`${employee.Nom} ${employee.Prenom}`}>
         {`${employee.Nom} ${employee.Prenom}`}
       </option>
      ))}
    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Fonction</Form.Label>
                  <Form.Control type='Text' className="mb-3" value={ Activite}onChange={(e)=>{setActivite(e.target.value)}}> 
                 
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Téle travail</Form.Label>
                  <Form.Select className="mb-3" value={ Teletravail} onChange={(e)=>{setTeletravail(e.target.value)}}> 
                  <option value="">--Aucun--select-</option>
                    <option value="oui">Oui</option>
                    <option value="non">Non</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>solde de congé</Form.Label>
                  <Form.Control type="Number" name='solde'  value={ solde} onChange={(e)=>{setSolde(e.target.value)}} placeholder='entrez Solde' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Solde de d'autorisation</Form.Label>
                  <Form.Control type="number" name='soldauth'  value={ Sdautorisation}onChange={(e)=>{setSdautorisation(e.target.value)}} placeholder='entrez solde' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Solde de compensation</Form.Label>
                  <Form.Control type="number" name='soldcom' value={ Scomposition} onChange={(e)=>{setScomposition(e.target.value)}} placeholder='entrez solde' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Solde de ouverture</Form.Label>
                  <Form.Control type="number" name='soldouv'  value={ Souverture} onChange={(e)=>{setSouverture(e.target.value)}} placeholder='entrez solde' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Solde de maladie</Form.Label>
                  <Form.Control type="number" name='Smaladie' value={ Smaladie} onChange={(e)=>{setSmaladie(e.target.value)}} placeholder='entrez solde' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Date ouverture</Form.Label>
                  <Form.Control type="Date" name='dateouv'  value={ Dateoverture}  onChange={(e)=>{setDateoverture(e.target.value)}}  />
                </Form.Group>
               
                <Form.Group className="mb-6 col-lg-9" controlId="formBasicEmail">
                  <Form.Label>Commentaire</Form.Label>
                  <Form.Control type="textarea"  name='commentaire' value={ Comentaire} onChange={(e)=>{setComentaire(e.target.value)}} placeholder='Comment' />
                </Form.Group>

              </Row>
              <Row>
              <br></br>
          <hr></hr>
          <h3>Contrat</h3>
          <br></br>
          <Form.Group className="mb-6 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Date  d'embauche</Form.Label>
                  <Form.Control type="Date"  name='date' value={ dateemb} onChange={(e)=>{setDateemb(e.target.value)}}  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Salaire  d'embauche</Form.Label>
                  <Form.Control type="number" name='salaire' value={ salaire} onChange={(e)=>{setSalair(e.target.value)}} placeholder='entrez salaire' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Periode d'essai</Form.Label>
                  <Form.Control type="Date" name='periode1'  value={ periodedess}  onChange={(e)=>{setPeriodedess(e.target.value)}}  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label> 2éme Periode d'essai</Form.Label>
                  <Form.Control type="Date" name='periode2'  value={ periodedess2}  onChange={(e)=>{setPeriodedess2(e.target.value)}}  />
                </Form.Group>
                
               
                

          </Row>
            </Form>
         
          </div>
    </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Annuler
    </Button>
    <Button variant="success" type="submit" onClick={handleSubmit} >
      Ajouter

    </Button>
  </Modal.Footer>
 </Modal>
 
 
 <Modal size="lg" show={edit} onHide={handleCloseEdit} >
 
  <Modal.Header  closeButton className='bg-success text-white'  >
 
    <Modal.Title> Edit d'employer</Modal.Title>
  </Modal.Header>
  <Modal.Body >
  <div className="container">
          
         
          <div className="profile_div text-center">
          
          </div>

          <Form onSubmit={editUser}  >
          
            <Row>
            <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Matricule</Form.Label>
                <Form.Control type="number" name='matricule'   value={UpMatricule} onChange={(e)=>{setUpMatricule(e.target.value)}} placeholder='entrez Matricule' />
               
              </Form.Group>
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Role</Form.Label>
                <Form.Select className="mb-3" value={ Uprole} onChange={(e)=>{setUprole(e.target.value)}}> 
                <option value="">--Aucun--select-</option>
                    <option value="colaborateur">colaborateur</option>
                    
                    <option value="chefdequipe">Chef d'equipe</option>
                    <option value="Administrateur"> Administrateur</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Nom</Form.Label>
                <Form.Control type="text" name='fname'  value={UpNom} onChange={(e)=>{setUpNom(e.target.value)}} placeholder=' Nom' />
                
              </Form.Group>
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Prénom</Form.Label>
                <Form.Control type="text" name='lname' value={ UpPrenom} onChange={(e)=>{setUpPrenom(e.target.value)}}  placeholder=' Prenom' />
                
              </Form.Group>
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label> addresse Email</Form.Label>
                <Form.Control type="email" name='email'  placeholder='entrez Email'
                value={Upemail} onChange={(e) => setUpEmail(e.target.value)} />
                           
              </Form.Group>
            
              
             
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Cin</Form.Label>
                <Form.Control type="text" name='cin'  value={ UpCin} onChange={(e)=>{setUpCin(e.target.value)}} placeholder='entrez cin' />
             
              </Form.Group>
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>N° Tell</Form.Label>
                <Form.Control type="text" name='mobile'value={ UpNtell} onChange={(e)=>{setUpNtell(e.target.value)}}  placeholder='entrez Mobile' />
              </Form.Group>
             
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Gender  </Form.Label>
                <Form.Select className="mb-3"  value={ Upsexe} onChange={(e)=>{setUpsexe(e.target.value)}}>
                <option value="">--Aucun--select-</option>
                <option value="Homme">Homme</option>
                <option value="femme">Femme</option>
                
              
                </Form.Select>
                </Form.Group>
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Situation Famille </Form.Label>
                <Form.Select className="mb-3"  value={ UpSituation} onChange={(e)=>{setUpSituation(e.target.value)}}>
                <option value="">--Aucun--select-</option>
                <option value="Celibataire">Celibataire</option>
                <option value="Marie">Marie(e)</option>
                <option value="Divorce">Divorce(e)</option>
                <option value="Veuf">Veuf(ve)</option>
              
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Nombres d'enfants</Form.Label>
                <Form.Control type="number" name='mobile'value={ UpNbenfants} onChange={(e)=>{setUpNbenfants(e.target.value)}}  placeholder='entrez nombre enfant' />
              </Form.Group>
             
              
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Date de naissance</Form.Label>
                <Form.Control type="Date" name='dateness' value={ UpDatenaissence} onChange={(e)=>{setUpDatenaissece(e.target.value)}} />
             
              </Form.Group>
              
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Passport</Form.Label>
                <Form.Control type="text" name='passport' value={ UpNpassport} onChange={(e)=>{setUpNpassport(e.target.value)}}  placeholder='entrez Num Passport' />
              </Form.Group> 
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Validité Passport</Form.Label>
                <Form.Control type="Date" name='valpassport' value={ UpValidatepassport} onChange={(e)=>{setUpValidatepassport(e.target.value)}}  />
              </Form.Group> 

              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Rib</Form.Label>
                <Form.Control type="Number" name='rib'value={ UpRib} onChange={(e)=>{setUpRib(e.target.value)}}  placeholder='entrez Rib' />
              </Form.Group>  

              
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>  Département</Form.Label>
                  <Form.Select className="mb-3" value={ UpEquipe} onChange={(e)=>{setUpEquipe(e.target.value)}}> 
                  <option value="">--Aucun--select-</option>
                    <option value="Administration">Administration</option>
                    <option value="R&D">R & D </option>
                    <option value="Support">Support Technique</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label> Sous Département</Form.Label>
                  <Form.Select className="mb-3" value={ UpSousEquipe} onChange={(e)=>{setUpSousEquipe(e.target.value)}}> 
                  <option value="">--Aucun--select-</option>
                    <option value="VIP">VIP</option>
                    <option value="SAFE">SAFE</option>
                    <option value="Tools">Tools</option>
                    <option value="Domo">Domo</option>
                    <option value="Support">Support France</option>
                    <option value="Support">Support Angletraire</option>
                    
                    
                  </Form.Select>
                </Form.Group>
             
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Chef famille</Form.Label>
                <Form.Select className="mb-3"value={ UpCheffamille} onChange={(e)=>{setUpCheffamille(e.target.value)}}> 
                <option value="">--Aucun--select-</option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Daf</Form.Label>
                <Form.Select className="mb-3" value={ UpDaf} onChange={(e)=>{setUpDaf(e.target.value)}}> 
                <option value="">--Aucun--select-</option>
                <option value="BaslyOlfa">Basly Olfa</option>
                  </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Chef D'equipe</Form.Label>
                  <Form.Select className="mb-3" value={ UpChefDequipe} onChange={(e)=>{setUpChefDequipe(e.target.value)}}>
      <option value="">-- Select Chef d'Equipe --</option>
      {chefDequipeEmployees.map((employee) => (
         <option key={employee.id} value={`${employee.Nom} ${employee.Prenom}`}>
         {`${employee.Nom} ${employee.Prenom}`}
       </option>
      ))}
    </Form.Select>
                </Form.Group>
              
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Fonction</Form.Label>
                  <Form.Control type='Text' placeholder='Fonctionalité' className="mb-3" value={ Activite}onChange={(e)=>{setActivite(e.target.value)}}> 
                 
                  </Form.Control>
                </Form.Group>
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Téle travail</Form.Label>
                <Form.Select className="mb-3" value={ UpTeletravail} onChange={(e)=>{setUpTeletravail(e.target.value)}}> 
                <option value="">--Aucun--select-</option>
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Sold de congé</Form.Label>
                <Form.Control type="Number" name='solde'  value={ Upsolde} onChange={(e)=>{setUpSolde(e.target.value)}} placeholder='entrez Solde' />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Sold de d'autorisation</Form.Label>
                <Form.Control type="number" name='soldauth'  value={ UpSdautorisation}onChange={(e)=>{setUpSdautorisation(e.target.value)}} placeholder='entrez solde' />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Sold de compensation</Form.Label>
                <Form.Control type="number" name='soldcom' value={ UpScomposition} onChange={(e)=>{setUpScomposition(e.target.value)}} placeholder='entrez solde' />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Sold de ouverture</Form.Label>
                <Form.Control type="number" name='soldouv'  value={ UpSouverture} onChange={(e)=>{setUpSouverture(e.target.value)}} placeholder='entrez solde' />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Sold de maladie</Form.Label>
                <Form.Control type="number" name='Smaladie' value={ UpSmaladie} onChange={(e)=>{setUpSmaladie(e.target.value)}} placeholder='entrez solde' />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                <Form.Label>Date ouverture</Form.Label>
                <Form.Control type="Date" name='dateouv'  value={ UpDateoverture}  onChange={(e)=>{setUpDateoverture(e.target.value)}}  />
              </Form.Group>
             
              <Form.Group className="mb-6 col-lg-9" controlId="formBasicEmail">
                <Form.Label>Commentaire</Form.Label>
                <Form.Control type="textarea"  name='comment' value={ UpComentaire} onChange={(e)=>{setUpComentaire(e.target.value)}} placeholder='Comment' />
              </Form.Group>

        
            </Row>
            <Row>
              <br></br>
          <hr></hr>
          <h3>Contrat</h3>
          <br></br>
          <Form.Group className="mb-6 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Date  d'embauche</Form.Label>
                  <Form.Control type="Date"  name='date' value={ Updateemb} onChange={(e)=>{setUpDateemb(e.target.value)}}  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Salaire  d'embauche</Form.Label>
                  <Form.Control type="number" name='salaire' value={ Upsalaire} onChange={(e)=>{setUpSalair(e.target.value)}} placeholder='entrez salaire' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label>Periode d'essai</Form.Label>
                  <Form.Control type="Date" name='periode1'  value={ Upperiodedess}  onChange={(e)=>{setUpPeriodedess(e.target.value)}}  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                  <Form.Label> 2éme Periode d'essai</Form.Label>
                  <Form.Control type="Date" name='periode2'  value={ Upperiodedess2}  onChange={(e)=>{setUpPeriodedess2(e.target.value)}}  />
                </Form.Group>
               
                <label>
        <input type="radio" name="options" value="option1" checked={selectedOption === 'option1'} onChange={handleOptionChange} />
       OK
      </label>

      {selectedOption === 'option1' && (
        <div>
          <label>
            Date fin:
            <input type="date" name="dateFinOption1" value={dateOption1} onChange={handleDateOption1Change} />
          </label>
        </div>
      )}

      <br />

      <label>
        <input type="radio" name="options" value="option2" checked={selectedOption === 'option2'} onChange={handleOptionChange} />
        NON
      </label>

      {selectedOption === 'option2' && (
        <div>
          <label>
            Date fin:
            <input type="date" name="dateFinOption2" value={dateOption2} onChange={handleDateOption2Change} />
          </label>
        </div>
      )}

          </Row>
          </Form>
       
        </div>

    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseEdit}>
      Annuler
    </Button>
    <Button variant="success" type="submit" onClick={editUser} >
      Save Changes
    </Button>
  </Modal.Footer>
 </Modal>

 <Modal show={showdetail} onHide={onClosedetail}  size="lg" >
      <Modal.Header closeButton>
        <Modal.Title><img src="/img/comelitnoir.png" alt="comelit" className='comelit' />
        <div className="left">
        <p>Tunis, le {currentDate}</p> </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
    
        
        {selectedUser && (
    <div>
      <p>Matricule: {selectedUser.Matricule}</p>
      <p> Role : {selectedUser.role}</p>
      <p>Nom: {selectedUser.Nom}</p>
      <p> Prénom: {selectedUser.Prenom} </p>
      <p> Date de naissance: {selectedUser.Datedenaissance} </p>
      <p>Cin: {selectedUser.Cin}  </p>
      
      
      <p>Gender  :{selectedUser.sexe}</p>
      <p>Email: {selectedUser.email}  </p>
      <p>N° tell : {selectedUser.Ntell}  </p>
   
       
        </div>
    )}
      </Modal.Body>
      <Modal.Footer>
  <Button variant="secondary" onClick={onClosedetail}>Close</Button>
  {selectedUser && (
    <PDFDownloadLink document={<MyDocument employer={selectedUser} />} fileName="employer-details.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Export to PDF'
      }
    </PDFDownloadLink>
  )}
</Modal.Footer>
    </Modal>

</div>
</div>
    </div>
   );   
  
}

export default BasicExample;