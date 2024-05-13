import React, { useState } from "react";
import { Form, Button, Card, Row } from "react-bootstrap";
import axios from "axios";
import CurrentUser from '../pages/CurrentUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ExampleForm = () => {
 const [tempsDu,setTempsDu] = useState('')
 const [tempsFin,setTempsFin] = useState('')
 const [dateAutorisation,setDateAutorisation] = useState('')
 const [user, setUser] = useState(null);
 const currentUser = CurrentUser({ setUser }); // pass setUser function as prop to CurrentUser component
 const [natureMotif,setNatureMotif] = useState('')

  

 const handleSubmit = (e) => {
  e.preventDefault();
  if (tempsDu >= tempsFin) {
    toast.error("Temps debut doit etre superieur au temps fin", {
      position: "top-center"
    });
    return;
  }
   // Calculer la durée en heures
   const tempsDuDate = new Date(`1970-01-01T${tempsDu}`);
   const tempsFinDate = new Date(`1970-01-01T${tempsFin}`);
   const dureeEnHeures = Math.abs(tempsFinDate - tempsDuDate) / 36e5;

   // Vérifier si la durée dépasse le maximum autorisé
   if (dureeEnHeures > 2) {
     toast.error("La durée maximale autorisée est de 2 heures", {
       position: "top-center"
     });
     return;
   }
  if(user.Sdautorisation === 0) {
    toast.error("Solde d'autorisation est fini", {
      position: "top-center"
    });
    return;
  }
  axios
  .post("http://localhost:5000/auth", {
    natureMotif: natureMotif,
    tempsDu: tempsDu,
    tempsFin: tempsFin,
    userid: user._id,
    dateAutorisation: dateAutorisation,
  })
  .then((res) => {
    console.log(res.data);
    if (res.status === 200) {
      toast.success("Demande d'authorisation envoyée avec succès", {
        position: "top-center"
      });
    }
   else if (res.status === 201) {
      toast.error("vous avez deja une demande dons cette jour", {
        position: "top-center"
      });
    } else {
      
      console.log("Error.");
    }
  })
  .catch((err) => {
    console.log(err);
  });
}


if (user){
  return (
    
     <div className="container">



    <div className="container my-5 py-5">
        <div className="row">
            <div className="col-12">
            <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} className="display-6 text-center mb-4">Demmande <b>D'authorisation</b> </h1>

           
                <hr className="w-25 mx-auto"/>
                {user.Sdautorisation > 0 ? (
   <div className="alert alert-success mb-4 p-3 col-lg-3 fa fa-warning" role="alert">
      &nbsp; Solde autorisation : {user.Sdautorisation}
   </div>
) : (
   <div className="alert alert-danger mb-4 p-3 col-lg-3 fa fa-warning" role="alert">
      &nbsp; Solde autorisation : {user.Sdautorisation}
   </div>
)}
    
    <Card className="text-darck bg-transparent">
      <Card.Body>
        <Card.Title className="text-success"></Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group controlId="formDateAutorisation" className="mb-3 col-lg-4">
              <Form.Label>Date d'autorisation</Form.Label>
              <Form.Control
                type="date"
                name="dateAutorisation"
                value={dateAutorisation}
                onChange={(e) => setDateAutorisation(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTempsDu" className="mb-3 col-lg-4">
              <Form.Label>Début</Form.Label>
              <Form.Control
                type="time"
                name="tempsDu"
                value={tempsDu}
                onChange={(e) => setTempsDu(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTempsFin" className="mb-3 col-lg-4">
              <Form.Label>Fin</Form.Label>
              <Form.Control
                type="time"
                name="tempsFin"
                value={tempsFin}
                onChange={(e) => setTempsFin(e.target.value)}
                required
              />
            </Form.Group>

          

            <Form.Group controlId="formNatureMotif" className="mb-3 col-lg-4">
              <Form.Label>Nature et motif</Form.Label>
              <Form.Control
                type="text"
                name="natureMotif"
                value={natureMotif}
                onChange={(e) => setNatureMotif(e.target.value)}
                required
              />
            </Form.Group>
           
          </Row>
          <button className="btn btn-outline-success px-4 py-2" type="submit" onClick={handleSubmit}>
  <i className="fa fa-send text-outline-success fa-fw"></i> Envoyer
</button>
        </Form>
      </Card.Body>
    </Card>

    <ToastContainer />
 
    </div></div></div></div>
  );
};
}
export default ExampleForm;
