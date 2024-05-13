import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Listedepartment = () => {
  const [departments, setDepartments] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    departmentId: '',
    department: '',
    lieu: '',
  });

  const openModal = (department) => {
    setFormData({
      departmentId: department._id,
      department: department.department,
      lieu: department.lieu,
    });
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/updateDepartment/${formData.departmentId}`, {
        department: formData.department,
        lieu: formData.lieu,
      });

      closeModal();
    } catch (error) {
      console.error(error);
    }
  };




  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getDepartments');
      setDepartments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (departmentId) => {
    try {
      await axios.delete(`http://localhost:5000/deletedepartement/${departmentId}`);
      fetchDepartments();
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
    
<Table striped bordered responsive >
  <thead >
    <tr>
      <th>Departement</th>
      <th>Location</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {departments.map((department) => (
      <tr key={department._id}>
        <td>{department.department}</td>
        <td >{department.lieu}</td>
        <td style={{ width: '100px' }}>
          <button className="btn btn-link" onClick={() => handleDelete(department._id)}>
            <i className="fa fa-trash"></i>
          </button>
          <button className="btn btn-link" onClick={() => openModal(department)}>
            <i className="fa fa-edit"></i>
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>


    
    <Modal show={showModal} onHide={closeModal}>
    <Modal.Header closeButton>
      <Modal.Title>Modifier Department</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleUpdate}>
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
          Modifier
        </Button>
      </Form>
    </Modal.Body>
  </Modal>
  </>
  );
};

export default Listedepartment;
