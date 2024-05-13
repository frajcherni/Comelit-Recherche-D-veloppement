import React, { useState, useEffect } from 'react';
import { Modal, Button, Form  ,Alert,Table,ButtonGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faEye,faEdit, faPlus  } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as ReactBootStrap from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import { Document, Page, Text, View, Image, PDFDownloadLink, StyleSheet, PageFooter  } from '@react-pdf/renderer';
import axios from 'axios';

function MissionFormModal() {
  const logo = require( './cred.png');
    const [missions, setMissions] = useState([]);
    const currentDate = new Date().toLocaleDateString();
    useEffect(() => {
      axios.get('http://localhost:5000/allmession')
        .then(response => {
          setMissions(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, [missions]);

    const location = useLocation();
    const mot = new URLSearchParams(location.search).get('mot');
    console.log(mot); // will output 'RH'
  const [user, setUser] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [nomsEtPrenoms, setNomsEtPrenoms] = useState([]);
  const [dateFin, setDateFin] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [destination, setDestination] = useState('');
  const [villeDestination, setvilleDestination] = useState('');
  const [objetMission, setObjetMission] = useState('');
  const [adresseEtrange, setadresseEtrange] = useState('');
  const [personneAContacter, setpersonneAContacter] = useState('');
  const [selectedMission, setSelectedMission] = useState(null);
  const [frais, setFrais] = useState();
  const [devise, setDevise] = useState("");
  const [search, setSearch] = useState('');
  const [show, setShow ] = useState(false);
  const onClose = () => setShow(false);
  const handleShow = () => setShow(true);
 

  const [missionToUpdate, setMissionToUpdate] = useState(null);
  
  const [updatedNom, setUpdatedNom] = useState("");
  const [updatedPrenom, setUpdatedPrenom] = useState("");
  const [updatedDateDebut, setUpdatedDateDebut] = useState("");
  const [updatedDateFin, setUpdatedDateFin] = useState("");
  const [updatedObjetMission, setUpdatedObjetMission] = useState('');
const [updatedAdresseEtrange, setUpdatedAdresseEtrange] = useState('');
const [updatedPersonneAContacter, setUpdatedPersonneAContacter] = useState('');
const [updatedDestination, setupdatedDestination] = useState('');
const [updatedDevise, setUpdatedDevise] = useState('');
const [updatedFrais, setUpdatedFrais] = useState('');
  const [showdetail, setShowDetail ] = useState(false);
  const onClosedetail = () => setShowDetail(false);

  const [showedit, setShowedit ] = useState(false);
  const onCloseedit = () => setShowedit(false);
  
  useEffect(() => {
    if (user) {
      const selected = nomsEtPrenoms.find(nomEtPrenom => nomEtPrenom.id === user);
      setSelectedUser(selected);
    }
  }, [user, nomsEtPrenoms]);


  useEffect(() => {
    axios.get('http://localhost:5000/fullname')
      .then(response => {
        setNomsEtPrenoms(response.data.nomsEtPrenoms);
       
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

 
  
 //search
 const handleSearchChange = (event) => {
  setSearch(event.target.value);
};
const filteredMession = missions.filter(mission =>
  
  mission.nom.toLowerCase().includes(search.toLowerCase()) ||
  mission.dateDebut.includes(search) ||
  mission.dateFin.includes(search) ||
  mission.destination.toLowerCase().includes(search.toLowerCase()) ||
  mission.adresseEtrange.toLowerCase().includes(search.toLowerCase())
);
  

  const fetchMissionDetails = async(id) => {
    try {
      const response = await fetch(`http://localhost:5000/messionid/${id}`);
      const mission = await response.json();
    
      setSelectedMission(mission);
     
      setShowDetail(true);
    } catch (error) {
      console.error(error);
    }
  }
  




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
    table: {
      display: "table",
      width: "auto",
      marginLeft: "auto",
      marginRight: "auto",
    },
    tableRow: {
      flexDirection: "row"
    },
    tableCol1: {
      width: "30%",
      
      padding: "5px"
    },
    tableCol2: {
      width: "70%",
      padding: "5px"
    },
  });
  
 
  const MyDocument = ({ mission }) => (
    <Document>
    <Page>
     <View>
       
          <Image src="/img/comelitnoir.png" style={{ paddingLeft:40, paddingTop:2 ,height: 130, width: 250 }} />
         <View >
            <Text style={{  paddingTop:0 ,paddingLeft:400, fontSize: 15 }}>Tunis , Le: {currentDate}</Text>
          </View>
          <View> </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight:'bold', paddingTop:30, textAlign: 'center' }}>ORDRE DE MISSION </Text>
          </View>
          </View>
          <View>
      
          <View style={{"paddingTop":"90px","paddingLeft":"30px" ,"justifyContent": "space-between","fontSize": "13" ,}}>
        <Text >Le directeur de la société Comelit Recherche & Dévloppement (CRED) atteste que :</Text>
       
        
         
        <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>Nom Et Prénom :</Text>
          </View>
          <View style={styles.tableCol2}>
            <Text> {mission.nom}  {mission.prenom}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>Nationalité</Text>
          </View>
          <View style={styles.tableCol2}>
            <Text> Tunisien</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>Passport N° :</Text>
          </View>
          <View style={styles.tableCol2}>
          <Text> {mission.passport}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>validation passport: </Text>
          </View>
          <View style={styles.tableCol2}>
          <Text> {mission.vpassport}</Text>
          </View>
        </View>

       

        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>Date de début : </Text>
          </View>
          <View style={styles.tableCol2}>
          <Text> {mission.dateDebut}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>Date de fin   :  </Text>
          </View>
          <View style={styles.tableCol2}>
          <Text>{mission.dateFin}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>Duré de séjours:  </Text>
          </View>
          <View style={styles.tableCol2}>
          <Text> {selectedMission.nb} jours</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>Destination   : </Text>
          </View>
          <View style={styles.tableCol2}>
          <Text> {mission.destination}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>Ville de destination :</Text>
          </View>
          <View style={styles.tableCol2}>
          <Text> {mission.villeDestination}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>Frais de mission:</Text>
          </View>
          <View style={styles.tableCol2}>
          <Text> {selectedMission.totalFrais}   {selectedMission.devise}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>Objet de mission :</Text>
          </View>
          <View style={styles.tableCol2}>
          <Text> {mission.objetMission}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>Adresse </Text>
          </View>
          <View style={styles.tableCol2}>
          <Text> {mission.adresseEtrange}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text>Personne </Text>
          </View>
          <View style={styles.tableCol2}>
          <Text> {mission.personneAContacter}</Text>
          </View>
        </View>

      </View>
        </View>
        <View style={{ "paddingLeft":"30px","fontSize": "12" }}>
      <Text  >Les frais de séjour et les frais de voyage sont pris en charge par la société Comelit group SPA durant sa mission en italie.</Text>
      </View>
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

 
  const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
  const startDate = new Date(dateDebut);
  const endDate = new Date(dateFin);
  let nb = 0;
  
  while (startDate < endDate) { // Use < instead of <=
      const dayOfWeek = startDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          nb++;
      }
      startDate.setTime(startDate.getTime() + ONE_DAY_IN_MS);
  }
        
  let totalFrais = frais;
  
  // round to 2 decimal places


  const handleSubmit = (event) => {
    event.preventDefault();
    
    const data = {
      nom: selectedUser.nom,
      prenom: selectedUser.prenom,
      id: selectedUser.id,
      passport: selectedUser.passport,
      vpassport :selectedUser.vpassport,
      dateDebut,
      dateFin,
      destination,
      villeDestination,
      nb,
      objetMission,
      adresseEtrange,
      personneAContacter,
      frais,
      devise,
      totalFrais: totalFrais * nb
    };
    axios.post('http://localhost:5000/ajout/missions', data)
    .then((res) => {
      if (res.status === 201) {
        console.log(res.data);
        toast.success("Mission ajoutée avec succès !", {
          position: "top-center"
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  const handleToastClose = () => {
    setTimeout(function() {
  }, 3000);
  };
  const Delete = (id) => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette mission ?");
    if (confirmed) {
    axios.delete(`http://localhost:5000/delete/mission/${id}`)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        toast.success("Mission supprimée avec succès !", {
          position: "top-center",
           autoClose: 5000 
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
}
  }
 

   
  //update 
  const handleCloseModal = () => {
    setShowedit(false);
    setMissionToUpdate(null);
    setUser("");
    setUpdatedNom("");
    setUpdatedPrenom("");
    setUpdatedDateDebut("");
    setUpdatedDateFin("");
    setUpdatedObjetMission("");
    setUpdatedAdresseEtrange("");
    setUpdatedPersonneAContacter("");
    setupdatedDestination("");
    setUpdatedDevise("");
    setUpdatedFrais("");
  };
  const handleShowedit = (mission) => {
    setShowedit(true);
    setMissionToUpdate(mission);
    setUpdatedNom(mission.nom);
    setUpdatedPrenom(mission.prenom);
    setUpdatedObjetMission(mission.objetMission);
    setUpdatedAdresseEtrange(mission.adresseEtrange);
    setUpdatedPersonneAContacter(mission.personneAContacter);
    setupdatedDestination(mission.destination);
    const dateDebut = new Date(mission.dateDebut);
    setUpdatedDateDebut(dateDebut);
    const dateFin = new Date(mission.dateFin);
    setUpdatedDateFin(dateFin);
    setUpdatedDevise(mission.devise);
    setUpdatedFrais(mission.frais);
  };
  const handleUpdateMission = (e) => {
    e.preventDefault();
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
  const startDate = new Date(updatedDateDebut);
  const endDate = new Date(updatedDateFin);
  let nb = 0;
  
  while (startDate < endDate) {
    const dayOfWeek = startDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      nb++;
    }
    startDate.setTime(startDate.getTime() + ONE_DAY_IN_MS);
  }
  
  let totalFrais = updatedFrais;
  
    const updatedMission = {
      id: missionToUpdate._id,
      nom: updatedNom,
      prenom: updatedPrenom,
      dateDebut: updatedDateDebut,
      dateFin: updatedDateFin,
      objetMission:updatedObjetMission,
       adresseEtrange: updatedAdresseEtrange,
       personneAContacter:updatedPersonneAContacter,
       destination : updatedDestination,
       nb: nb,
       frais : updatedFrais,
      devise : updatedDevise,
      totalFrais: frais * nb
    };
    axios
      .put(`http://localhost:5000/missions/${missionToUpdate._id}`, updatedMission)
      .then((response) => {
        const updatedMissions = missions.map((mission) =>
          mission._id === missionToUpdate._id ? response.data : mission
        );
        setMissions(updatedMissions);
        handleCloseModal();
        toast.success("Mission Modifier avec succès ",{
          position: "top-center",
          autoClose: 5000 
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  
  return (
    <div>
       <ToastContainer onClose={handleToastClose} />
       <div className="container my-3 py-5">
       <div className="row">
 
    <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} 
      className="display-6 text-center mb-4">Gestion <b>Des Missions </b> </h1>
    <hr className="w-25 mx-auto"/>
    <div className="row">
      <div className="col-md-6">
        <Button onClick={handleShow} variant="secondary">
          <FontAwesomeIcon icon={faPlus} /> Ajouter une mission
        </Button>
      </div>
      <div className="col-md-3 text-left">
        <ReactBootStrap.FormGroup className="mb-6">
          <ReactBootStrap.FormControl size="sm" className="my-6" type="text" placeholder="Search..." value={search} onChange={handleSearchChange} />
        </ReactBootStrap.FormGroup>
      </div>
    </div>
    </div>

         
         {
      filteredMession && filteredMession.length > 0 ? 
         <Table  responsive striped bordered hover  style={{ marginTop: '20px' ,width:'100%' }}>
        <thead >
          <tr>
            <th>id</th>
            <th>Nom</th>
            <th> départ</th>
            <th>retour</th>
            <th>Destination</th>
            <th>Passport</th>
            <th>Objet </th>
            <th>Adresse</th>
            <th>Nb jours</th>
            <th>contacter</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMession.map((mission,index) => (
            <tr key={mission._id}>
                <td>{index + 1}</td>
              <td>{mission.nom} {mission.prenom}</td>
              <td>{mission.dateDebut}</td>
              <td>{mission.dateFin}</td>
              <td>{mission.destination}</td>
              <td>{mission.passport}</td>
              <td>{mission.objetMission}</td>
              <td>{mission.adresseEtrange}</td>
              <td>{mission.nb}</td>
              <td>{mission.personneAContacter}</td>
              <td>
                 <ButtonGroup>
              
                 <button className="btn btn-outline-danger me-2 px-2 py-1  m-1" onClick={ ()=> Delete(mission._id)}>   <i className="fa fa-trash text-outline-danger fa-fw"></i></button>
                 <button className="btn btn-outline-success me-2 px-2 py-1  m-1" onClick={() => fetchMissionDetails(mission._id)}><FontAwesomeIcon icon={faEye}  /></button>
              
              <button className="btn btn-outline-primary me-2 px-2 py-1  m-1" onClick={() => handleShowedit(mission)}>    <FontAwesomeIcon icon={faEdit} /></button>
             
       
              </ButtonGroup></td>
            </tr>
          ))}
        </tbody>
      </Table>
      : <Alert  variant='info'>
      Aucun users...
   
  </Alert>
    
         
        }


    <Modal show={show} onHide={onClose} >
      <Modal.Header closeButton>
        <Modal.Title>Mission</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="user">
  <Form.Label>Nom et Prenom</Form.Label>
  <Form.Select className="mb-3" value={user} onChange={(e) => { setUser(e.target.value) }}>
    <option value="">--Aucun--select-</option>
    {nomsEtPrenoms.map(nomEtPrenom => (
      <option key={nomEtPrenom.id} value={nomEtPrenom.id}>
        {nomEtPrenom.nom} {nomEtPrenom.prenom}
      </option>
    ))}
  </Form.Select>
</Form.Group>
<Form.Group controlId="userId">
 
  <Form.Control type="hidden" value={selectedUser?.id || ''} readOnly />
</Form.Group>
<Form.Group controlId="userId">
  <Form.Label>passport</Form.Label>
  <Form.Control className="mb-3" type="text" value={selectedUser?.passport || ''} readOnly />
</Form.Group>
<Form.Group controlId="userId">
  <Form.Label>Validation passport</Form.Label>
  <Form.Control  className="mb-3" type="text" value={selectedUser?.vpassport || ''} readOnly />
</Form.Group>
               <div style={{ display: 'flex' }}>
               <Form.Group controlId="frais">
            <Form.Label>Frais</Form.Label>
            <Form.Control type="number" value={frais} onChange={(event) => setFrais(event.target.value)} />
          </Form.Group>
               <Form.Group controlId="devise">
            <Form.Label>Devise:</Form.Label>
            <Form.Select className="mb-3"  value={devise} onChange={(e) => {setDevise(e.target.value)}}>
                  <option value="">--Aucun--select-</option>
                  <option value="TND">TND</option>
                  <option value="USD">USD</option>
                   <option value="EUR">EUR</option>
         
                
               </Form.Select>

          </Form.Group>
         
          </div>
          <Form.Group controlId="DateDebut">
            <Form.Label>Date de départ</Form.Label>
            <Form.Control type="Date" value={dateDebut} onChange={(event) => setDateDebut(event.target.value)} />
          </Form.Group>
          <Form.Group controlId="DateFin">
            <Form.Label>Date de retours</Form.Label>
            <Form.Control type="Date" value={dateFin} onChange={(event) => setDateFin(event.target.value)} />
          </Form.Group>
          
          <Form.Group controlId="destination">
            <Form.Label>Destination</Form.Label>
            <Form.Control type="text" value={destination} onChange={(event) => setDestination(event.target.value)} />
          </Form.Group>
          <Form.Group controlId="villeDestination">
            <Form.Label>Ville de Destination </Form.Label>
            <Form.Control type="text" value={villeDestination} onChange={(event) => setvilleDestination(event.target.value)} />
          </Form.Group>
          <Form.Group controlId="objetMission">
            <Form.Label> Objet de Mission</Form.Label>
            <Form.Control type="text" value={objetMission} onChange={(event) => setObjetMission(event.target.value)} />
          </Form.Group>
          <Form.Group controlId="adresseEtrange">
            <Form.Label> Addresse a l'étranger</Form.Label>
            <Form.Control type="text" value={adresseEtrange} onChange={(event) => setadresseEtrange(event.target.value)} />
          </Form.Group>
          <Form.Group controlId="personneAContacter">
            <Form.Label>Personne à contacté</Form.Label>
            <Form.Control type="text" value={personneAContacter} onChange={(event) => setpersonneAContacter(event.target.value)} />
          </Form.Group>
          <br></br>
          <button className="btn btn-outline-success px-4 py-2" type="submit" >
  <i className="fa fa-send text-outline-success fa-fw"></i> Envoyer
</button>
        </Form>
      </Modal.Body>
    </Modal>
    <Modal show={showdetail} onHide={onClosedetail}  size="lg" >
      <Modal.Header closeButton>
        <Modal.Title><img src="/img/cred.png" alt="comelit" className='comelit' />
        <div className="left">
        <p >Tunis, le {currentDate}</p> </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
    
        
        {selectedMission && (
    <div style={{ fontSize: "18px", display: "flex", justifyContent: "left", alignItems: "center" }}>
    <table>
      <tbody>
        <tr>
          <th>Nom et Prénom </th>
          <td>{selectedMission.nom} {selectedMission.prenom}</td>
        </tr>
        <tr>
          <th>Date de départ </th>
          <td>{selectedMission.dateDebut}</td>
        </tr>
        <tr>
          <th>Date de retour </th>
          <td>{selectedMission.dateFin}</td>
        </tr>
        <tr>
          <th>Durée de séjour </th>
          <td>{selectedMission.nb} jours</td>
        </tr>
        <tr>
          <th>total frais </th>
          <td> {selectedMission.totalFrais} {selectedMission.devise}</td>
        </tr>
        <tr>
          <th>Destination</th>
          <td>{selectedMission.destination}</td>
        </tr>
        <tr>
          <th>Ville de destination</th>
          <td>{selectedMission.villeDestination}</td>
        </tr>
        <tr>
          <th>Objet de mission</th>
          <td>{selectedMission.objetMission}</td>
        </tr>
        <tr>
          <th>Adresse à l'étranger</th>
          <td>{selectedMission.adresseEtrange}</td>
        </tr>
        <tr>
          <th>Personne à contacter </th>
          <td> {selectedMission.personneAContacter}</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  
    )}
      </Modal.Body>
      <Modal.Footer>
  <Button variant="secondary" onClick={onClosedetail}>Close</Button>
  {selectedMission && (
    <PDFDownloadLink document={<MyDocument mission={selectedMission} />} fileName="mission-details.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Export to PDF'
      }
    </PDFDownloadLink>
  )}
</Modal.Footer>
    </Modal>
    
    <Modal show={showedit} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Modifier la mission</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleUpdateMission}>
      <Form.Group controlId="nomEtPrenom">
        <Form.Label>Nom et Prenom</Form.Label>
        <Form.Control className="mb-3" value={`${updatedNom} ${updatedPrenom}`} onChange={(e) => {
          const [updatedNom, updatedPrenom] = e.target.value.split(' ');
          setUpdatedNom(updatedNom);
          setUpdatedPrenom(updatedPrenom); 
        }} readOnly>
          
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="dateDebut">
  <Form.Label>Date debut</Form.Label>
  <Form.Control type="Date" value={updatedDateDebut} onChange={(e) => setUpdatedDateDebut(e.target.value)} />
</Form.Group>

<Form.Group controlId="dateFin">
  <Form.Label>Date fin</Form.Label>
  <Form.Control type="Date" value={updatedDateFin} onChange={(e) => setUpdatedDateFin(e.target.value)} />
</Form.Group>
<div style={{ display: 'flex' }}>
               <Form.Group className=" me-3" controlId="frais">
            <Form.Label className=" me-3"> Frais</Form.Label>
            <Form.Control className=" me-3"  type="number" value={updatedFrais} onChange={(event) => setUpdatedFrais(event.target.value)} />
          </Form.Group>
               <Form.Group className=" me-3" controlId="devise">
            <Form.Label className=" me-3">Devise:</Form.Label>
            <Form.Select className="mb-3 me-3"  value={updatedDevise} onChange={(e) => {setUpdatedDevise(e.target.value)}}>
                  <option value="">--Aucun--select-</option>
                  <option value="TND">TND</option>
                  <option value="USD">USD</option>
                   <option value="EUR">EUR</option>
         
                
               </Form.Select>

          </Form.Group>
         
          </div>
<Form.Group controlId="objetMission">
  <Form.Label>Objet de la mission</Form.Label>
  <Form.Control type="text" value={updatedObjetMission} onChange={(e) => setUpdatedObjetMission(e.target.value)} />
</Form.Group>

<Form.Group controlId="adresseEtrange">
  <Form.Label>Adresse étrangère</Form.Label>
  <Form.Control type="text" value={updatedAdresseEtrange} onChange={(e) => setUpdatedAdresseEtrange(e.target.value)} />

</Form.Group>
<Form.Group controlId="personneAContacter">
            <Form.Label>Personne à contacté</Form.Label>
            <Form.Control type="text" value={updatedPersonneAContacter} onChange={(event) => setUpdatedPersonneAContacter(event.target.value)} />
          </Form.Group>
    
    <Form.Group controlId="personneAContacter">
            <Form.Label>Personne à contacté</Form.Label>
            <Form.Control type="text" value={updatedDestination} onChange={(event) => setupdatedDestination(event.target.value)} />
          </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>

  <Button variant="secondary" onClick={handleCloseModal}>Annuler</Button>
  <button className="btn btn-outline-success px-4 py-2" type="submit" onClick={handleUpdateMission}>
  <i className="fa fa-send text-outline-success fa-fw"></i> Modifier
</button>
    
  </Modal.Footer>
</Modal>


</div>
    </div>
  );
}

export default MissionFormModal