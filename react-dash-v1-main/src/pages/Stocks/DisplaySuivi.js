import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from 'react-bootstrap';
import EditRowModal from './EditRow'; // import the modal component

function MyComponent() {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // keep track of the selected row
  const [showEditModal, setShowEditModal] = useState(false); // keep track of whether to show the edit modal
  const [rows, setRows] = useState([]);
  // fetch the data from the server
  useEffect(() => {
    axios.get("http://localhost:5000/suivaaa")
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);

 // open the edit modal when a row is clicked
// open the edit modal when a row is clicked
const handleRowClick = (row) => {
    setSelectedRow(row);
    setTimeout(() => setShowEditModal(true), 100); // delay the function call by 100ms
  }
  const handleRowDataUpdated = (updatedRowData) => {
    const updatedRows = rows.map(row => {
      if (row.id === updatedRowData.id) {
        return updatedRowData;
      }
      return row;
    });
    setRows(updatedRows);
  }
  const handleCloseModal = () => {
    setShowEditModal(false); // set state to close the modal
  }
  
  
  function handleSaveRowData(updatedRowData) {
    // Make an AJAX request to the server to update the database with the new row data
    fetch(`http://localhost:5000/suivaaarrr/${updatedRowData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedRowData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update row data in the database');
        }
        // If the update was successful, close the modal and update the state in the parent component
        
      })
      .catch(error => {
        console.error(error);
        // Display an error message to the user
        alert('Failed to update row data in the database');
      });
      setShowEditModal(false);
  }
  
  

  return (
    <>
      <Table responsive striped bordered hover>
        <thead className="thead-info" style={{ fontSize: "0.8em", backgroundColor: "#e5ffe5" }}>
          <tr>
            <th>Nom</th>
            <th>Date de demande</th>
            <th>Date de validation</th>
            <th>Date de facturation</th>
            <th>N° de facture</th>
            <th>Date d'expédition</th>
            <th>N° dhl</th>
            <th>Date de réception</th>
            <th>Date de dédouanement</th>
            <th>vide</th>
            <th>Remarque</th>
            <th>Article soumis à la CERT</th>
            <th>L'autorisation de prélèvement</th>
            <th>Attestation de conformité</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "0.9em" }}>
          {data.map(item => (
            <tr key={item._id} onClick={() => handleRowClick(item)}>
              <td>{item.name}</td>
              <td>{item.demandeDate}</td>
              <td>{item.validationDate}</td>
              <td>{item.facturationDate}</td>
              <td>{item.numFacture}</td>
              <td>{item.expeditionDate}</td>
              <td>{item.numDHL}</td>
              <td>{item.receptionDate}</td>
              <td>{item.douanementDate}</td>
              <td>{item.vide}</td>
              <td>{item.remarque}</td>
              <td>{item.articleSoumis}</td>
              <td>{item.autorisationPrelevement}</td>
              <td>{item.attestationConformite}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedRow && showEditModal && (
       <EditRowModal
       show={showEditModal}
       onClose={handleCloseModal}
       onSave={handleSaveRowData}
       row={selectedRow}
       onRowDataUpdated={handleRowDataUpdated}
     
      />
    )}
    </>
  );
}

export default MyComponent;
