

import React, { useState } from 'react';
import { Modal, Form, Button, Row ,Badge,Card} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddArticleModal = ({ show, handleClose, addArticle }) => {
  const [inpval, setInpval] = useState({
    Code: '',
    Designation: '',
    Quantite: 0,
    DateDepot: new Date().toISOString()
  });
  

  const setVal = (e) => {
    setInpval({
      ...inpval,
      [e.target.name]: e.target.value
    });
  };

  const [articles, setArticles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inpval.Code || !inpval.Designation ) {
      // Display an error message or perform any necessary actions
      toast.warning('tout les champs sont obligatoires !.', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000, // Duration in milliseconds
      });
      return;
    }

    try {
      const data = await fetch("http://localhost:5000/articleadd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Code: inpval.Code,
          Designation: inpval.Designation,
          Quantite: inpval.Quantite,
          DateDepot: inpval.DateDepot
        })
      });
  
      const res = await data.json();
      console.log(res);
      if (res.status === 403 && res.message === 'You already have a pending leave request') {
        toast.error("Vous avez déjà une demande de congé en attente", {
          position: "top-center"
        });
      } else if (res.status === 201) {
        // Add the new article to the state
        setArticles([...articles, res.article]);
        toast.success("Article Enregistrée ", {
          position: "top-right"
        });
      }
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue lors de l'ajout de l'article. Veuillez réessayer plus tard.", {
        position: "top-center"
      });
    }
  };
  
  

  return (
    <>
    
    <div>
     

    <Modal show={show} onHide={handleClose} size="sm">
      <Modal.Header closeButton>
        <Modal.Title className="display-9 fw-bolder mb-4 text-center text-black">Ajouter un article</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
         
            <Form.Group >
              <Form.Label className='fw-bolder'>Code</Form.Label>
              <Form.Control
                type="text"
                onChange={setVal}
                value={inpval.Code}
                name="Code"
                id="Code"
              />
            </Form.Group>

            <Form.Group c>
              <Form.Label className='fw-bolder'>designation</Form.Label>
              <Form.Control
                type="text"
                onChange={setVal}
                value={inpval.Designation}
                name="Designation"
                id="Designation"
              />
            </Form.Group>

          
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-outline-secondary px-3 py-2" type="reset" onClick={handleClose}>
          <i className="fa fa-times text-outline-success fa-fw"></i>   Fermer
          </button>
          
          <button className="btn btn-outline-success px-3 py-2" type="submit" >
  <i className="fa fa-plus text-outline-success fa-fw"></i> Ajouter
</button>

        </Modal.Footer>
      </Form>
    </Modal>
    <ToastContainer />

</div>
</>
  );
};

export default AddArticleModal;