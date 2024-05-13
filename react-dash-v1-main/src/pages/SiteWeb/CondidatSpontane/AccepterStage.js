import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SpontaneApplications = () => {
  const [applications, setApplications] = useState([]);
    const [demande , setDemande]= useState([]);
  useEffect(() => {
    getSpontaneApplications();
  }, []);

   const getSpontaneApplications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getinformation");
      setApplications(response.data);
      console.log(applications);
    } catch (error) {
      console.log("Error retrieving spontaneous applications:", error);
    }
  };

 
    const handleAccept = (id) => {
        axios.put(`http://localhost:5000/accstage/${id}`)
          .then((res) => {
           
           
            alert("demande acceptée.");
            window.location.reload();
            setApplications(applications.map(leaves => {
              if (leaves._id === id) {
                leaves.status = "accepted";
              }
              return leaves;
            }));
          })
          .catch(err => console.log(err));
      
  };

    const handleRefuse = (id) => {
        axios.put(`http://localhost:5000/refuseDoffreStage/${id}`, { status: "refused" })
          .then((res) => {
            
            alert(" Demande refusée.");
            setApplications(applications.map(leaves => {
              if (leaves._id === id) {
                leaves.status = "refused";
              }
              return leaves;
            }));
          })
          .catch(err => console.log(err));
      
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Demande?")) {
      axios.delete(`http://localhost:5000/deletestage/${id}`)
        .then((res) => {
          alert("Demande deleted.");

          setApplications(applications.filter(leaves => leaves._id !== id));
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="container">
    <div className="container my-2 py-4">
    <div >
            <div className="col-12">
            <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} className="display-6 text-center mb-4">Les demandes de Stage </h1>
            <hr className="w-25 mx-auto"/>

      <Table striped bordered hover >
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>CV</th>
            <th>Email</th>
            <th>N° Tell</th>
            <th>Date de naissance</th>
            <th>Deplacement</th>
            <th>profile</th>
            <th>description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {applications.map(({ application, job }) => (
            <tr key={application._id}>
              <td>{application.Nom}</td>
              <td>{application.Prenom}</td>
              <td>
              <a href={`http://localhost:5000/uploads/images/${application.Cv}`} target="_blank" rel="noopener noreferrer">
            View CV
          </a>

              </td>
              <td>{application.email}</td>
              <td>{application.Numtell}</td>
              <td>{application.DateNess}</td>
              <td>{application.Deplacement}</td>
             
              <td>{job && job.profile}</td>
              <td>{job && job.jobDescription}</td>
            
          

              <td style={{ color: application.status === 'accepted' ? 'green' : 'red' }}>{application.status}</td>
              {/* Render other application details in respective table cells */}
              <td>
              {application.status === "waiting" &&
              <>
                <button className='btn btn-outline-success' onClick={() => handleAccept(application._id)}>Accept</button>
                <button className='btn btn-outline-danger' onClick={() => handleRefuse(application._id)}>Refuse</button>
                </>
          }
             {(application.status === "refused" || application.status === "accepted") && (
  <Button variant="danger" className=' m-1' onClick={() => handleDelete(application._id)}>
    <FontAwesomeIcon icon={faTrash} />
  </Button>
)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>

    </div>

    </div>


  );
};

export default SpontaneApplications;
