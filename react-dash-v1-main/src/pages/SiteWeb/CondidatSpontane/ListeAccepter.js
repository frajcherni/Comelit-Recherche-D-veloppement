import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Table,Form } from "react-bootstrap";

const SpontaneApplications = () => {
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    getSpontaneApplications();
  }, []);

  const getSpontaneApplications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/GetcondidatureSpontane"); // Update the endpoint based on your backend setup
      setApplications(response.data);
    } catch (error) {
      console.log("Error retrieving spontaneous applications:", error);
    }
  };

 
  
   

  return (
    <div>
      <h1> condidature spontane Accepter</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Email</th>
            <th>N° Tell</th>
            <th>Date de naissance</th>
            <th>Deplacement</th>
            <th>situation Famille</th>


           
          </tr>
        </thead>
        <tbody>
        {applications.map((application) => (
            application.status === "accepted" && (
              <tr key={application._id}>
                <td>{application.Nom}</td>
                <td>{application.Prenom}</td>
                <td>{application.email}</td>
                <td>{application.Numtell}</td>
                <td>{application.DateNess}</td>
                <td>{application.Deplacement}</td>
                <td>{application.Famille}</td>



              </tr>
            )
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SpontaneApplications;
