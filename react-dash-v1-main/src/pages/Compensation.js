import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import CurrentUser from '../pages/CurrentUser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCompensationForm() {

  const [user, setUser] = useState(null);

  const currentUser = CurrentUser({ setUser });
  const [formData, setFormData] = useState({
    description: '',
    startDate: '',
    endDate: '',
 
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    let nb = 0;
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
  
    while (startDate < endDate) {
        const dayOfWeek = startDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            nb++;
        }
        startDate.setTime(startDate.getTime() + ONE_DAY_IN_MS);
    }
    console.log('Number of working days:', nb);
    try {
      const response = await fetch('http://localhost:5000/compensation', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'userid': user ? user._id : null // include userid in headers
        },
        body: JSON.stringify({
          Nom: user ? user.Nom : '',
        
          Prenom: user ? user.Prenom : '',
          description: formData.description,
          startDate: formData.startDate,
          endDate: formData.endDate,
          nb:nb,
          debutmission : formData.debutmission,
          finmission : formData.finmission
        }),
      });
      const data = await response.json();
      console.log('Compensation added:', data);
      // Show success toast message
      toast.success('Compensation added successfully', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
      // TODO: Update UI with success message or redirect to another page
    } catch (err) {
      console.error('Error adding compensation:', err);
      // TODO: Update UI with error message
    }
  };

  
  return (
   <> 
   <ToastContainer /><br></br>
   <div className="container">
  <div className="container my-1 py-1">
    <div className="d-flex justify-content-center">
      <div className="col-lg-9">
      <h1  className="display-9 text-center m-3">Demande De Compensation</h1>
      <Card >
        <Card.Body>
          <Form onSubmit={handleSubmit}>
          <Form.Group controlId="description" className="mb-3 col-lg-6">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Form.Group  controlId="startDate" className="mb-3 col-lg-6 me-3">
                <Form.Label >Debut Compensation:</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="endDate" className="mb-3 col-lg-6">
                <Form.Label>Fin Compensation:</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-between">
              <Form.Group controlId="debutmission" className="mb-3 col-lg-6 me-3">
                <Form.Label>Debut Mission:</Form.Label>
                <Form.Control
                  type="date"
                  name="debutmission"
                  value={formData.debutmission}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="finmission" className="mb-3 col-lg-6 ">
                <Form.Label>Fin Mission:</Form.Label>
                <Form.Control
                  type="date"
                  name="finmission"
                  value={formData.finmission}
                  onChange={handleInputChange}
                />
              </Form.Group>
           
            </div>
            <div className="d-flex justify-content-left ">
              <button className='btn btn-outline-success px-4 py-2 me-3'  type="submit">
              <i className="fa fa-send text-outline-success fa-fw fw-bold"></i> Envoyer
              </button>
    
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
    </div>

  </div>
</div>

  </>
);
}
  

export default AddCompensationForm;