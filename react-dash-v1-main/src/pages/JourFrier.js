import React, { useState , useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DataList from './afficherJourFrier'

const ModalForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    designation: '',
    startDate: '',
    department: '',
    duration: '',
    location: '', // Updated to include 'location' field
  });
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departmentLocation, setDepartmentLocation] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataWithLocation = { ...formData, departmentLocation };
  
      const response = await axios.post('http://localhost:5000/ajouteJourFrier', formDataWithLocation);
      console.log('Form data submitted successfully!', response.data);
  
      // Reset the form data and close the modal
      setFormData({
        designation: '',
        startDate: '',
        department: '',
        duration: '',
        location: '',
      });
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting form data:', error);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    if (name === 'department') {
      setSelectedDepartment(value);
      const selectedDepartmentData = departments.find((department) => department.department === value);
      setDepartmentLocation(selectedDepartmentData?.lieu || '');
    }
  };
  

  return (
    <div className="container">
    <div className="container my-2 py-2">
        <div className="row">
            <div className="col-12">
            <h1 className="display-9 fw-bolder mb-4 text-center text-black">Liste des jours frier  </h1>                <hr className="w-25 mx-auto"/>

      <button className='m-3 btn btn-outline-success' onClick={() => setShowModal(true)}>Ajouter Un Jour Frier </button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Jour Frier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <Form onSubmit={handleSubmit}>
  <Form.Group controlId="designation">
    <Form.Label>Designation:</Form.Label>
    <Form.Control
      type="text"
      name="designation"
      value={formData.designation}
      onChange={handleChange}
    />
  </Form.Group>
  <Form.Group controlId="debut">
    <Form.Label>Debut Le:</Form.Label>
    <Form.Control
      type="date"
      name="startDate"
      value={formData.startDate}
      onChange={handleChange}
    />
  </Form.Group>
  <Form.Group controlId="department">
    <Form.Label>Department:</Form.Label>
    <Form.Control
      as="select"
      name="department"
      value={formData.department}
      onChange={handleChange}
    >
      <option value="">Select Department</option>
      {departments.map((department) => (
       <option key={department._id} value={department.department}>
       {department.department}
     </option>
     
      ))}
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="duration">
    <Form.Label>Fin Le:</Form.Label>
    <Form.Control
      type="date"
      name="duration"
      value={formData.duration}
      onChange={handleChange}
    />
  </Form.Group>
  <Form.Group controlId="location">
    <Form.Label>Location:</Form.Label>
    <Form.Control
      type="text"
      name="location"
      value={departmentLocation} // Updated to use the departmentLocation state
      readOnly // Make the location field read-only
    />
  </Form.Group>
  <button className='btn btn-outline-success m-1' type="submit">
    Ajouter
  </button>
</Form>

        </Modal.Body>
      </Modal>

      <DataList />
    </div>
    </div>
    </div>
    </div>

  );
};

export default ModalForm;
