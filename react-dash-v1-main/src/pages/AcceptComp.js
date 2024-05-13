
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table,Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CurrentUser from '../pages/CurrentUser';

import * as ReactBootStrap from 'react-bootstrap';

function RH() {
  const [comp, setComp] = useState([]);
  const [search, setSearch] = useState('');

  const [user, setUser] = useState(null);
  const currentUser = CurrentUser({ setUser }); // pass setUser function as prop to CurrentUser component


  useEffect(() => {
    if (user && user.role === 'chefdequipe') {
      const queryParam = `${user.Nom} ${user.Prenom}`; // Combine nom and prenom with a space
      console.log('Query parameter:', queryParam); // Log the query parameter
      
      axios.get('http://localhost:5000/compEquipe', {
        params: { nomPrenom: queryParam },
      })
        .then(res => {
          setComp(res.data);
        })
        .catch(err => console.log(err));
    } else {
      axios.get('http://localhost:5000/comp')
        .then(res => {
          setComp(res.data);
        })
        .catch(err => console.log(err));
    }
  }, [user]);
  
  
  
  

  const handleAccept = (id) => {
    axios.put(`http://localhost:5000/acceptcomp/${id}`)
      .then((res) => {
       
       
        alert("compensation request accepted.");
        window.location.reload();
        setComp(comp.map(leaves => {
          if (leaves._id === id) {
            leaves.status = "accepted";
          }
          return leaves;
        }));
      })
      .catch(err => console.log(err));
  }
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this compensation?")) {
      axios.delete(`http://localhost:5000/deleteCC/${id}`)
        .then((res) => {
          alert("Compensation deleted.");
          setComp(comp.filter(leaves => leaves._id !== id));
        })
        .catch(err => console.log(err));
    }
  };
  

  const handleReject = (id) => {
    axios.put(`http://localhost:5000/refusecomp/${id}`, { status: "refused" })
      .then((res) => {
        
        alert("Compensation request rejected.");
        setComp(comp.map(leaves => {
          if (leaves._id === id) {
            leaves.status = "refused";
          }
          return leaves;
        }));
      })
      .catch(err => console.log(err));
  }

  if (!comp) {
    return <div>Loading...</div>;
  }
 //search
 const handleSearchChange = (event) => {
  setSearch(event.target.value);
};

const filteredUsers = comp.filter(leavess =>
  
  leavess.status.toLowerCase().includes(search.toLowerCase()) 
);
  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
            <div className="col-12">
            <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} className="display-6 text-center mb-4">Liste <b>De Compensation</b> </h1>

                <hr className="w-25 mx-auto"/>
        <ReactBootStrap.FormGroup className="mb-6 col-lg-2 text-right">
           <ReactBootStrap.FormControl  size="sm" className=" my-6 " type="text" placeholder="Search..." value={search} onChange={handleSearchChange} />
           </ReactBootStrap.FormGroup>
        </div></div></div>
        {
      filteredUsers && filteredUsers.length > 0 ? 
        <Table responsive striped bordered hover>
          
          <thead>
            <tr>
              <th>Description</th>
              <th>Date Debut</th>
              <th>Date Fin</th>
             <th>Nombre de jour</th>
              <th>Status</th>
              <th>employer</th>
            
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((leaves) => (
              <tr key={leaves._id}>
                <td>{leaves.description}</td>
                <td>{leaves.startDate}</td>
                <td>{leaves.endDate}</td>
                <td>{leaves.nb}</td>
                <td>{leaves.status}</td>
                <td>{leaves.Nom } {leaves.Prenom }</td>
                
                
                <td>
                  {leaves.status === "waiting" &&
                    <>
                      <Button onClick={() => handleAccept(leaves._id)}>Accept</Button>
                      <Button onClick={() => handleReject(leaves._id)}>Reject</Button>
                    </>
                  }
               {(leaves.status === "refused" || leaves.status === "accepted") && (
  <Button variant="danger" className=' m-1' onClick={() => handleDelete(leaves._id)}>
    <FontAwesomeIcon icon={faTrash} />
  </Button>
)}

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
  );
}

export default RH;