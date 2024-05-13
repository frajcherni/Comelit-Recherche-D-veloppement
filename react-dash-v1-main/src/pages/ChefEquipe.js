import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentUser from '../pages/CurrentUser';

import Table from 'react-bootstrap/Table';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);



  const [user, setUser] = useState(null);

  const currentUser = CurrentUser({ setUser }); // pass setUser function as prop to CurrentUser component

  useEffect(() => {
    if (user) {
      fetchEmployees();
    }
  }, [user]);

  const fetchEmployees = async () => {
    try {
      const queryParam = `${user.Nom} ${user.Prenom}`; // Combine Nom and Prenom with a space
      console.log('Query parameter:', queryParam); // Log the query parameter
      const response = await axios.get('http://localhost:5000/getEquipe', {
        params: { nomPrenom: queryParam },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };
  

  return (
    <div className="container">
    <div className="container my-2 py-2">
        <div className="row">
            <div className="col-12">
            <h1 className="display-9 fw-bolder mb-4 text-center text-black">Liste D'equipe </h1>                <hr className="w-25 mx-auto"/>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nom de L'employer</th>
          <th>Prenom de l'employer</th>
          <th>Email de l'employer</th>
          <th>N° telephone de l'employer</th>
          <th>Chef d'equipe</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.Nom}</td>
            <td>{employee.Prenom}</td>
            <td>{employee.email}</td>
            <td>{employee.Ntell}</td>
            <td>{employee.Chefdequipe}</td>

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

export default EmployeeTable;
