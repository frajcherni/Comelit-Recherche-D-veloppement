import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table,Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from 'react-bootstrap';

import CurrentUser from '../pages/CurrentUser';


function RH() {

  const [user, setUser] = useState(null);
  const currentUser = CurrentUser({ setUser }); // pass setUser function as prop to CurrentUser component

const [leave, setLeave] = useState([]);
const [ email , setEmail] = useState([]);
const [search, setSearch] = useState('');


useEffect(() => {
  if (user && user.role === 'chefdequipe') {
    const queryParam = `${user.Nom} ${user.Prenom}`; // Combine nom and prenom with a space
    console.log('Query parameter:', queryParam); // Log the query parameter
    
    axios.get('http://localhost:5000/findcongeannuelEquipe', {
      params: { nomPrenom: queryParam },
    })
      .then(res => {
        setLeave(res.data);
    })
      .catch(err => console.log(err));
  } else {
    axios.get('http://localhost:5000/findcongeannuel')
      .then(res => {
        setLeave(res.data);
      })
      .catch(err => console.log(err));
  }
}, [user]);



  const handleAccept = (id) => {
    axios.put(`http://localhost:5000/accept/accepte/${id}`)
      .then((res) => {
    
       
        alert("Leave request accepted.");

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
    axios.put(`http://localhost:5000/congeArejecte/${id}`, { status: "rejected" })
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
    <div>
      <Container>
        <h1 className="text-center">Gestion des congé</h1>
        <br></br>
        <br></br>
        <ReactBootStrap.FormGroup className="mb-6 col-lg-2 text-right">
           <ReactBootStrap.FormControl  size="sm" className=" my-6 " type="text" placeholder="Search..." value={search} onChange={handleSearchChange} />
           </ReactBootStrap.FormGroup>
        <br></br>
        <br></br>
        {
      filteredUsers && filteredUsers.length > 0 ? 
        <Table responsive striped bordered hover>
          
          <thead>
            <tr>
              <th>Description</th>
              <th>Date Debut</th>
              <th>Date Fin</th>
              <th>Email</th>
              <th>solde</th>
              <th>motif</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((leaves) => (
              <tr key={leaves._id}>
                <td>{leaves.planification}</td>
                <td>{leaves.date_debut}</td>
                <td>{leaves.date_fin}</td>
                <td>{leaves.email}</td>
                <td>{leaves.solde}</td>
                <td>{leaves.motif}</td>
                <td>{leaves.status}</td>
                <td>
                  {leaves.status === "waiting" &&
                    <>
                      <Button onClick={() => handleAccept(leaves._id)}>Accept</Button>
                      <Button onClick={() => handleReject(leaves._id)}>Reject</Button>
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