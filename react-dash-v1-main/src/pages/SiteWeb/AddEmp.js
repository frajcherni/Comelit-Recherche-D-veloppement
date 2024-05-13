import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import axios from "axios";

function JobForm() {
  const [show, setShow] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const [jobDescription, setJobDescription] = useState("");
  const [contract, setContract] = useState("");
  const [profile, setProfile] = useState("");
  const [date, setDate] = useState("");
  const [nbPost, setNbPost] = useState("");
  const [Experience, setExperience] = useState("");
  const [Netude, setNetude] = useState("");
  const [Langue, setLangue] = useState("");
  const [Genre, setGenre] = useState("");
  const [dateExp, setDateExp] = useState("");
  const [Exigence, setExigence] = useState("");

  const handleClose = () => {
    setShow(false);
    setSelectedJob(null);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getalljobs");
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/deletejob/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);

      }
      alert('offre supprimée avec succès!');
            // Update the jobs list after deleting the job
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error(`Error deleting job with id ${id}:`, err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      jobDescription,
      contract,
      profile,
      date,
      Exigence,
      nbPost,
      Experience,
      Netude,
      Langue,
      Genre,
      dateExp,
    };

    try {
      const response = await fetch("/ajouter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Job added successfully!");

      // Update the jobs list after adding a new job
      setJobs([...jobs, data]);

      handleClose();
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Error adding job. Please try again later.");
    }
  };

  const handleEdit = (job) => {
    setProfile(job.profile);
    setNbPost(job.nbPost);
    setContract(job.contract);
    setJobDescription(job.jobDescription);
    setDate(job.date);
    setNetude(job.Netude);
    setExperience(job.Experience);
    setLangue(job.Langue);
    setGenre(job.Genre);
    setExigence(job.Exigence);
    setDateExp(job.dateExp);
  
    setSelectedJob(job);
    handleShow();
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      _id: selectedJob._id,
      jobDescription,
      contract,
      profile,
      date,
      Exigence,
      nbPost,
      Experience,
      Netude,
      Langue,
      Genre,
      dateExp,
    };

    try {
      const response = await fetch(`http://localhost:5000/updateoffreemploi/${selectedJob._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Job updated successfully!");

      // Update the jobs list after updating the job
      setJobs(
        jobs.map((job) =>
          job._id === selectedJob._id ? { ...job, ...updatedData } : job
        )
      );

      handleClose();
    } catch (error) {
      console.error(`Error updating job with id ${selectedJob._id}:`, error);
      alert("Error updating job. Please try again later.");
    }
  };

  return (
    <div className="container">
    <div className="container my-2 py-4">
    <div className="row">
            <div className="col-12">
            <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} className="display-6 text-center mb-4">Les offres d'emplois </h1>
            <hr className="w-25 mx-auto"/>      <Button className="m-3" variant="primary" onClick={handleShow}>
        Ajouter une offre
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Profile</th>
            <th>Date</th>
            <th>Nombre de poste</th>
            <th>Contract</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>{job.profile}</td>
              <td>{job.date}</td>
              <td>{job.nbPost}</td>
              <td>{job.contract}</td>
              <td>
                <button
                  className="btn btn-link"
                  onClick={() => handleDelete(job._id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
                <button
                  className="btn btn-link"
                  onClick={() => handleEdit(job)}
                >
                  <i className="fa fa-edit"></i>
                </button>
              
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedJob ? "Modifier une offre" : "Ajouter une offre"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={selectedJob ? handleUpdate : handleSubmit}>
            <Form.Group controlId="profile">
              <Form.Label>Titre d'emploi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Titre d'emploi"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Nombre de postes vacants</Form.Label>
              <Form.Control
                type="number"
                value={nbPost}
                onChange={(e) => setNbPost(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="contract">
              <Form.Label>Type de contrat</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type de contrat"
                value={contract}
                onChange={(e) => setContract(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="jobDescription">
              <Form.Label>Description de l'offre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description de l'offre"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="Expr">
              <Form.Label>Niveau d'étude</Form.Label>
              <Form.Control
                type="text"
                placeholder="Niveau d'étude"
                value={Netude}
                onChange={(e) => setNetude(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="Expr">
              <Form.Label>Expérience de l'emploi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Expérience de l'emploi"
                value={Experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="Expr">
              <Form.Label>Langue</Form.Label>
              <Form.Control
                type="text"
                placeholder="Langue"
                value={Langue}
                onChange={(e) => setLangue(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="Expr">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Genre"
                value={Genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="Expr">
              <Form.Label>Exigence</Form.Label>
              <Form.Control
                type="text"
                placeholder="Exigence"
                value={Exigence}
                onChange={(e) => setExigence(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date d'expiration</Form.Label>
              <Form.Control
                type="date"
                value={dateExp}
                onChange={(e) => setDateExp(e.target.value)}
              />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
            <Button variant="primary" type="submit">
              {selectedJob ? "Modifier" : "Apperçu"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
    </div>
    </div>
    </div>

  );
}

export default JobForm;
