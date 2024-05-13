import React, { useState, useEffect } from "react";
import {Modal,Form,Row,Button,Table} from 'react-bootstrap';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faEye } from "@fortawesome/free-solid-svg-icons";
import BarChart from "./BarChart";
import { set } from "mongoose";

function UserForm() {
  const [selectedSalaire,setSelectedSalaire ] = useState({});

    const [salaires, setSalaires] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [salaireemb, setSalaireemb] = useState("");
  const [dersalaire, setDersalaire] = useState("");
  const [Newsalaireemb, setNewsalaireemb] = useState("");
  const [dateemb, setDateemb] = useState("");
  const [dernierdate, setDernierdate] = useState("");
  const [Newdateemb, setNewDateemb] = useState("");


  const [showdetail, setShowDetail ] = useState(false);
  const onClosedetail = () => setShowDetail(false);

  const fetchSalairedetail = async(id) => {
    try {
      const response = await fetch(`http://localhost:5000/SalairebYid/${id}`);
      const salairex = await response.json();
    
      console.log(salairex);
      setSelectedSalaire(salairex);
      
     
      setShowDetail(true);
    } catch (error) {
      console.error(error);
    }
  }
  

  useEffect(() => {
    axios.get("http://localhost:5000/userssalaire").then((response) => {
      setUsers(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:5000/Allsalaires").then((response) => {
      setSalaires(response.data);
    });
  }, []);
  
  
  const handleChange = (event) => {
    const selectedId = event.target.value;
    const selected = users.find((user) => user._id === selectedId);
    setSelectedUser(selected);
    setSalaireemb(selected.salaireemb);
    setDateemb(selected.dateemb);
   axios.get(`http://localhost:5000/salairrereesid/${selected._id}`)

   .then((response) => {
    const lastSalaire = response.data;
    const latestSalary = lastSalaire.salaires[lastSalaire.salaires.length - 1];
    setDersalaire(latestSalary.new_salary);
    setDernierdate(latestSalary.change_date);
  }).catch((error) => {
    console.log(error);
  });
  
  };
  
  const handleSave = () => {
    let taux;
    if (dersalaire === "") {
      taux = Newsalaireemb - salaireemb;
    } else {
      taux = Newsalaireemb - dersalaire;
    }
    axios
      .post("http://localhost:5000/ajoutsal", {
        nom: selectedUser.Nom,
        prenom: selectedUser.Prenom,
        salaireemb: salaireemb,
        dateemb: dateemb,
        newsalaire: Newsalaireemb,
        newdate: Newdateemb,
        taux :  taux,
        iduser: selectedUser._id,
        
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let totalSalary = 0;
if (selectedSalaire && selectedSalaire.salaires) {
  selectedSalaire.salaires.forEach((item) => {
    totalSalary += parseInt(item.taux);
  });
}

  return (
    <div className="container">
      <div className="container my-3 py-5">
      <h2>Liste de salaire:</h2>
      <Form onSubmit={handleSave} >
        <Row>
      <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
      <Form.Label>Nom et Prenom</Form.Label>
      <Form.Select value={selectedUser._id} onChange={handleChange}>
        <option value="">Employé</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.Nom} {user.Prenom}
          </option>
        ))}
      </Form.Select>
      </Form.Group>
     
      <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
      <Form.Label>Salaire D'embauche</Form.Label>
      <Form.Control
          type="text"
          name="salaireemb"
          value={salaireemb}
          onChange={(e) => setSalaireemb(e.target.value)}
        readOnly/>
     </Form.Group>
     <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
     <Form.Label>Date d'embauche</Form.Label>
     <Form.Control
          type="date"
          name="dateemb"
          value={dateemb}
          onChange={(e) => setDateemb(e.target.value)}
         readOnly/>
        
      </Form.Group>
      
      <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
      <Form.Label> le dernier salaire</Form.Label>
      <Form.Control
          type="text"
          name="salaireemb"
          value={dersalaire}
          onChange={(e) => setDersalaire(e.target.value)}
        readOnly />
     </Form.Group>
   
     <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
     <Form.Label>dernier date d'augmentation</Form.Label>
     <Form.Control
          type="month"
          name="dateemb"
          value={dernierdate}
          onChange={(e) => setDernierdate(e.target.value)}
         readOnly />
      </Form.Group>
      <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
      <Form.Label>New Salaire</Form.Label>
      <Form.Control
          type="text"
          name="salaireemb"
          value={Newsalaireemb}
          onChange={(e) => setNewsalaireemb(e.target.value)}
        />
     </Form.Group>

     <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
     <Form.Label>Date d'augmentation</Form.Label>
     <Form.Control
          type="month"
          name="dateemb"
          value={Newdateemb}
          onChange={(e) => setNewDateemb(e.target.value)}
        />
      </Form.Group>
      </Row>
      <Button variant="success" className="m-l" type="submit">Ajout</Button>
      </Form>
      <hr></hr>
      <Table striped bordered hover>
  <thead>
    <tr>
      <th>Nom</th>
      <th>Prénom</th>
      <th>Salaire d'embauche</th>
      <th>Date d'embauche</th>
      <th>Action</th>
     
    </tr>
  </thead>
  <tbody>
  {salaires.map((salaire, index) => (
    <React.Fragment key={salaire._id}>
     
        <tr>
          <td>{salaire.nom}</td>
          <td>{salaire.prenom}</td>
          <td>{salaire.salaireemb}</td>
          <td>{salaire.dateemb}</td>
        <td><Button style={{backgroundColor: '#0FA66D'}} className=' m-1' onClick={() => fetchSalairedetail(salaire._id)}>
          <FontAwesomeIcon icon={faEye}  />
          </Button>
         
          </td>
        </tr>
     
     
    </React.Fragment>
  ))}
</tbody>

</Table>
<Modal show={showdetail} onHide={onClosedetail}  size="lg" >
      <Modal.Header closeButton>
        <Modal.Title ><img src="/img/comelitnoir.png" alt="comelit" className='comelit' />
        <div className="left">
       </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
    
      <table className="table table-bordered">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Salaire de base</th>
        <th>Date d'embauche</th>
        <th colSpan="4">Historique des salaires</th>
      </tr>
    </thead>
    <tbody>
      {selectedSalaire && selectedSalaire.salaires && (
        <tr>
          <td>{selectedSalaire.nom}</td>
          <td>{selectedSalaire.prenom}</td>
          <td>{selectedSalaire.salaireemb} TND</td>
          <td>{selectedSalaire.dateemb}</td>
          <td>
            <Table className="table table-bordered">
              <thead>
                <tr>
                <th>augmentation</th>
                  <th>salaire</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                {selectedSalaire.salaires.map((item) => (
                  <tr key={item._id}>
                    <td>{item.taux} TND</td>
                    <td>{item.new_salary} TND</td>
                    <td>{item.change_date}</td>
                    
                  </tr>
                ))}
                <tr>
                  <td colSpan="2" style={{"backgroundColor":"yellow","fontWeight":"bold"}}>Total augmentation: {totalSalary} TND</td>
                </tr>
                
              </tbody>
            </Table>
          </td>
        </tr>
      )}
    </tbody>
  </table>
 




        
  <BarChart salaire={selectedSalaire} />
    
      </Modal.Body>
      <Modal.Footer>
  <Button variant="secondary" onClick={onClosedetail}>Close</Button>
  
</Modal.Footer>
    </Modal>
    
    </div>
    </div>
  );
}

export default UserForm;
