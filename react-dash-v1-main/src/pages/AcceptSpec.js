
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table,Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as ReactBootStrap from 'react-bootstrap';

function RH() {
  const [leave, setLeave] = useState([]);
const [ email , setEmail] = useState([]);
const [search, setSearch] = useState('');
  useEffect(() => {
    axios.get('http://localhost:5000/rah')
      .then(res => setLeave(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleAccept = (id) => {
    axios.put(`http://localhost:5000/acc/${id}`)
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
    axios.put(`http://localhost:5000/refuse/${id}`, { status: "rejected" })
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

const handleDelete = (id) => {
  axios.delete(`http://localhost:5000/deleteCS/${id}`)
    .then((res) => {
      alert("Leave request deleted.");
      setLeave(leave.filter(leaves => leaves._id !== id));
    })
    .catch(err => console.log(err));
}
  return (
   
       
   <div className="container">
    <div className="container my-3 py-3">
        
            <div className="col-12">
            <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} className="display-6 text-center mb-4">Liste de demande de Congé Speciale</h1>

                <hr className="w-32 mx-auto"/>
               </div></div>
        <ReactBootStrap.FormGroup className="mb-6 col-lg-2 text-left">
           <ReactBootStrap.FormControl  size="sm" className=" my-6 " type="text" placeholder="Search..." value={search} onChange={handleSearchChange} />
           </ReactBootStrap.FormGroup>
        <br></br>
       
        {
      filteredUsers && filteredUsers.length > 0 ? 
        <Table responsive striped bordered hover>
          
          <thead>
            <tr>
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
                
                <td>{leaves.date_debut}</td>
                <td>{leaves.date_fin}</td>
                <td>{leaves.email}</td>
                <td>{leaves.sold}</td>
                <td>{leaves.motifCongeSpecial}</td>
                <td>{leaves.status}</td>
                <td>
                  {leaves.status === "waiting" &&
                    <>
                      <Button onClick={() => handleAccept(leaves._id)}>Accept</Button>
                      <Button onClick={() => handleReject(leaves._id)}>Reject</Button>
                    </>
                  }
                   {(leaves.status === "refused" || leaves.status === "accepted") &&
                    <>
                       <Button variant="danger" className=' m-0' onClick={() => handleDelete(leaves._id)}><FontAwesomeIcon icon={faTrash}  /></Button>
                      
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
    
  );
}

export default RH;

