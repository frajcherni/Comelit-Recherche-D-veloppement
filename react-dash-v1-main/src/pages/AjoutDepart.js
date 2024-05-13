import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Listedepartment from './Listedepartment';

const AjoutDepart = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    department: '',
    lieu: '',
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/createDepartment', formData);

      setFormData({
        department: '',
        lieu: '',
      });

      closeModal();
    } catch (error) {
      console.error(error);
    }
  };


  
  return (
<div className="container">
    <div className="container my-2 py-4">
    <div className="row">
            <div className="col-12">
            <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} className="display-6 text-center mb-4">Liste des departements</h1>
            <hr className="w-25 mx-auto"/>      
      <Button className='m-3' variant="primary" onClick={openModal}>
Ajouter un Departement      </Button>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un departement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="department">
              <Form.Label>Department :</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={formData.department}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="lieu">
              <Form.Label>Location:</Form.Label>
              <Form.Control
                type="text"
                name="lieu"
                value={formData.lieu}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Listedepartment />
    </div>
    </div>
  </div>
  </div>
  
  );
};

export default AjoutDepart;
