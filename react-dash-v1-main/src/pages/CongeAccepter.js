import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table,Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as ReactBootStrap from 'react-bootstrap';

function RH() {
  const [auth, setAuth] = useState([]);
const [ email , setEmail] = useState([]);
const [search, setSearch] = useState('');
  useEffect(() => {
    axios.get('http://localhost:5000/Reshum')
      .then(res => setAuth(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleAccept = (id) => {
    axios.put(`http://localhost:5000/accepteAuthor/${id}`)
      .then((res) => {
       setEmail(email)
       
        alert("Leave request accepted.");
        window.location.reload();
        setAuth(auth.map(auths => {
          if (auths._id === id) {
            auths.status = "accepted";
          }
          return auths;
        }));
      })
      .catch(err => console.log(err));
  }
 

  const handleReject = (id) => {
    axios.put(`http://localhost:5000/refuseeauthor/${id}`, { status: "rejected" })
      .then((res) => {
        
        alert("Auth request rejected.");
        setAuth(auth.map(auths => {
          if (auths._id === id) {
            auths.status = "rejected";
          }
          return auths;
        }));
      })
      .catch(err => console.log(err));
  }

  if (!auth) {
    return <div>Loading...</div>; 
  }
 //search
 const handleSearchChange = (event) => {
  setSearch(event.target.value);
};

const filteredUsers = auth.filter(auths =>
  
  auths.status.toLowerCase().includes(search.toLowerCase()) ||
  auths.email.toLowerCase().includes(search.toLowerCase()) 
);
  return (
    <div className="container">
    <div className="container my-2 py-4">
    <div className="row">
            <div className="col-12">
            <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} className="display-6 text-center mb-4">Liste de demande d'authorisation</h1>
            <hr className="w-25 mx-auto"/>
        <ReactBootStrap.FormGroup className="mb-6 col-lg-2 text-right">
           <ReactBootStrap.FormControl  size="sm" className=" my-3 " type="text" placeholder="Search..." value={search} onChange={handleSearchChange} />
           </ReactBootStrap.FormGroup>
           </div></div>
     
        {
      filteredUsers && filteredUsers.length > 0 ? 
        <Table responsive striped bordered hover>
          
          <thead>
            <tr>
              <th>Date d'authorisation</th>
              <th>Date</th>
              <th>Date </th>
              
              <th>motif</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((auths) => (
              <tr key={auths._id}>
                <td>{auths.dateAutorisation}</td>
                <td>{auths.tempsDu}</td>
                <td>{auths.tempsFin}</td>
                
                <td>{auths.natureMotif}</td>
                <td>{auths.status}</td>
                <td>
                  {auths.status === "waiting" &&
                    <>
                      <button className="btn btn-outline-success me-2"  onClick={() => handleAccept(auths._id)}>Accepter</button >
                      <button className="btn btn-outline-danger" onClick={() => handleReject(auths._id)}>Refuser </button>
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
     
    
    </div>
    </div>

  );
}

export default RH;