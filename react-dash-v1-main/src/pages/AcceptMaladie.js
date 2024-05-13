import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table,Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


import * as ReactBootStrap from 'react-bootstrap';

function RH() {
  const [leave, setLeave] = useState([]);

const [search, setSearch] = useState('');
  useEffect(() => {
    axios.get('http://localhost:5000/findcongeM')
      .then(res => setLeave(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleAccept = (id) => {
    axios.put(`http://localhost:5000/acceptM/accepteM/${id}`)
      .then((res) => {
    
       
        alert("Leave request accepted.");
        window.location.reload();
        setLeave(leave.map(leaves => {
          if (leaves._id === id) {
            leaves.status = "accepted";
          }
          return leaves;
        }));
      })
      .catch(err => console.log(err));
  }


  const handleReject = (id) => {
    axios.put(`http://localhost:5000/rejectmaladie/${id}`, { status: "rejected" })
      .then((res) => {
        
        alert("Leave request rejected.");
        
        setLeave(leave.map(leaves => {
          if (leaves._id === id) {
            leaves.status = "rejected";
          }
          return leaves;
        }));
      })
      .catch(err => console.log(err));
  }

  if (!leave) {
    return <div>Loading...</div>;
  }
 //search
 const handleSearchChange = (event) => {
  setSearch(event.target.value);
};

const filteredUsers = leave.filter(leavess =>
  
  leavess.status.toLowerCase().includes(search.toLowerCase()) 
);
  return (
    <div className="py-4">
      <Container>
      <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} className="display-6 text-center mb-4">Traitement des congés</h1>
        <br></br>
        <br></br>
        <ReactBootStrap.FormGroup className="mb-6 col-lg-2 text-right">
           <ReactBootStrap.FormControl  size="sm" className=" my-6 " type="text" placeholder="Search..." value={search} onChange={handleSearchChange} />
           </ReactBootStrap.FormGroup>
        <br></br>
        
        {
      filteredUsers && filteredUsers.length > 0 ? 
        <Table responsive striped bordered hover>
          
          <thead>
            <tr>
            <th>Nom et prenom</th>
              
              <th>Date Debut</th>
              <th>Date Fin</th>
             
             
              <th>motif</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((leaves) => (
              <tr key={leaves._id}>
               <td>{leaves.userid.Nom} {leaves.userid.Prenom}</td>
                <td>{leaves.date_debut}</td>
                <td>{leaves.date_fin}</td>
                
                <td>{leaves.motif}</td>
                <td style={{ color: leaves.status === 'accepted' ? 'green' : 'red' }}>{leaves.status}</td>
                <td>
                  {leaves.status === "waiting" &&
                    <>
                      <Button  className="me-3" onClick={() => handleAccept(leaves._id)}>Accepter</Button>
                      <Button onClick={() => handleReject(leaves._id)}>refuser</Button>
                    </>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
          : <Alert  variant='info'>
          Aucun users...
       
      </Alert>
        
             
            }
      </Container>
    
    </div>
  );
}

export default RH;