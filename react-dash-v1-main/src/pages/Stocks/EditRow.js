import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function EditRowModal(props) {
  const [rowData, setRowData] = useState(props.row);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setRowData({...rowData, [name]: value});
  }

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Row</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <table>
  <tbody>
    <tr>
      <td>Name:</td>
      <td>
        <input type="text" name="name" value={rowData.name} onChange={handleInputChange} />
      </td>
    </tr>
    <tr>
      <td>Demande Date:</td>
      <td>
        <input type="text" name="demandeDate" value={rowData.demandeDate} onChange={handleInputChange} />
      </td>
    </tr>
    <tr>
      <td>Validation Date:</td>
      <td>
        <input type="text" name="validationDate" value={rowData.validationDate} onChange={handleInputChange} />
      </td>
    </tr>
    <tr>
      <td>Facturation Date:</td>
      <td>
        <input type="text" name="facturationDate" value={rowData.facturationDate} onChange={handleInputChange} />
      </td>
    </tr>
    <tr>
      <td>Num Facture:</td>
      <td>
        <input type="text" name="numFacture" value={rowData.numFacture} onChange={handleInputChange} />
      </td>
    </tr>
    <tr>
      <td>Expedition Date:</td>
      <td>
        <input type="text" name="expeditionDate" value={rowData.expeditionDate} onChange={handleInputChange} />
      </td>
    </tr>
    <tr>
      <td>Num DHL:</td>
      <td>
        <input type="text" name="numDHL" value={rowData.numDHL} onChange={handleInputChange} />
      </td>
    </tr>
    <tr>
      <td>Reception Date:</td>
      <td>
        <input type="text" name="receptionDate" value={rowData.receptionDate} onChange={handleInputChange} />
      </td>
    </tr>
    <tr>
      <td>Douanement Date:</td>
      <td>
        <input type="text" name="douanementDate" value={rowData.douanementDate} onChange={handleInputChange} />
      </td>
    </tr>
    <tr>
      <td>Vide:</td>
      <td>
        <input type="text" name="vide" value={rowData.vide} onChange={handleInputChange} />
      </td>
    </tr>
    <tr>
      <td>Remarque:</td>
      <td>
        <input type="text" name="remarque" value={rowData.remarque} onChange={handleInputChange} />
      </td>
    </tr>
    <tr>
      <td>Article Soumis:</td>
      <td>
        <input type="text" name="articleSoumis" value={rowData.articleSoumis} onChange={handleInputChange} />
      </td>
    </tr>
    <tr>
      <td>Autorisation Prelevement:</td>
      <td>
        <input type="text" name="autorisationPrelevement" value={rowData.autorisationPrelevement} onChange={handleInputChange} />
      </td>
    </tr>
    <tr>
      <td>Attestation Conformite:</td>
      <td>
        <input type="text" name="attestationConformite" value={rowData.attestationConformite} onChange={handleInputChange} />
      </td>
    </tr>
  </tbody>
</table>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => props.onSave(rowData)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditRowModal;
