
import React, { useState ,useEffect } from "react";
import { Button, Modal, Table,Form } from "react-bootstrap";
import axios from "axios";

const AddEventButton = () => {

    const [Events, setEvents] = useState([]);

  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");
  const [event, setEvent] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInsert = async () => {
    try {
      const formData = new FormData();
      formData.append("date", date);
      formData.append("event", event);
      formData.append("description", description);
      formData.append("image", image);

      const response = await axios.post("http://localhost:5000/ajoutEvent", formData, {
      });
      console.log({formData})

      if (response.status === 200) {
        console.log("Event added successfully!");
        setShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getAllEvents");
        setEvents(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  return (
<div className="container">
    <div className="container my-2 py-4">
    <div className="row">
            <div className="col-12">
            <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} className="display-6 text-center mb-4">Liste des <b>événements</b></h1>
            <hr className="w-25 mx-auto"/>      <button className=" btn btn-outline-success m-3 col-lg-1"  onClick={handleShow}>
        Ajouter
      </button>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Event</th>
          <th>Date</th>
          <th>Description</th>
          <th>image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {Events.map((job) => (
          <tr key={job._id}>
            <td>{job.event}</td>
            <td>{job.date}</td>
            <td>{job.description}</td>
            <td><img className="avatar rounded-circle" width="20%" heigth ="20%"src={`http://localhost:5000/${job.image}` } ></img></td>
            <td>
              <button className="btn btn-link" >
                <i className="fa fa-trash"></i>
              </button>
              <button className="btn btn-link" >
                <i className="fa fa-edit"></i>
              </button>
              <button className="btn btn-link">
                <i className="fa fa-eye"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un événement </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEvent">
              <Form.Label>événement</Form.Label>
              <Form.Control
                type="text"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-outline-secondary" onClick={handleClose}>
            Fermer
          </button>
          <button  className='btn btn-outline-success' onClick={handleInsert}>
            Ajouter
          </button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
    </div>
    </div>

  );
};

export default AddEventButton;