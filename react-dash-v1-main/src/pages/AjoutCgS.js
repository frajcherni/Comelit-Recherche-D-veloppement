import { Card , Form , Row , Button } from 'react-bootstrap';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrentUser from '../pages/CurrentUser';
const Register = () => {

    const [inpval, setInpval] = useState({
        date_fin :"",
        date_debut : "",
        option : "" , 
        motifCongeSpecial : "",
    
      
    });


    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };
    const [user, setUser] = useState(null);

   
    const currentUser = CurrentUser({ setUser }); // pass setUser function as prop to CurrentUser component
    const addUserdata = async (e) => {
        e.preventDefault();
      
  
        const { date_fin, date_debut, motifCongeSpecial } = inpval;

        const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
        const startDate = new Date(date_debut);
        const endDate = new Date(date_fin);
        
        // Check if the first day of leave is on a weekend
       
        
        let days = 0;
        
        while (startDate <= endDate) {
          const dayOfWeek = startDate.getDay();
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            days++;
          }
          startDate.setTime(startDate.getTime() + ONE_DAY_IN_MS);
        }
        
       

        console.log(days)
        if (date_fin === "") {
            toast.warning("date_fin is required!", {
                position: "top-center"
            });
        } 
         else if (date_debut === "") {
            toast.error("date_debut is required!", {
                position: "top-center"
            });
        } else {
       

     
           const data = await fetch("http://localhost:5000/leave", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              date_fin , date_debut , motifCongeSpecial , days , userid : user._id 
            })
          });
          
          const res = await data.json();
          
          if (res.status === 403 && res.message === 'You already have a pending leave request') {
            toast.error("Vous avez déjà une demande de congé en attente", {
              position: "top-center"
            });
          } else if (res.status === 201) {
            toast.success("Demande Enregistrée 😃", {
              position: "top-center"
            });
            // Reset the form fields
            setInpval({ ...inpval,   date_fin :"",
              date_debut : "",
              motifCongeSpecial : "",
              days : ""
              });
          } else if (res.status === 401 && res.message === 'Insufficient special leave days available') {
            toast.error("Solde insuffisant pour ce type de congé", {
              position: "top-center"
            });
          } else {
            toast.error("Une erreur s'est produite. Veuillez réessayer plus tard", {
              position: "top-center"
            });
          }
           }
        }
    


    return (
        <>
       
       <div className="container">
    <div className="container my-5 py-5">
        <div className="row">
            <div className="col-12">
            <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} className="display-6 text-center mb-4">Demmande <b>De Congé</b> Special</h1>

                <hr className="w-25 mx-auto"/>
            <Card className="card p-3">
      <Card.Body>
   
        <Form  onSubmit={addUserdata}>
        <br></br>
          <Row>
           
            <Form.Group  controlId="formDateAutorisation" className="mb-3 col-lg-4">
              <Form.Label className='fw-bolder '>Date Debut</Form.Label>
              <Form.Control
                type="date"
                onChange={setVal} value={inpval.date_debut} name="date_debut" id="date_debut"
              />
            </Form.Group>

            <Form.Group controlId="formTempsDu" className="mb-3 col-lg-4">
              <Form.Label className='fw-bolder '>Date Fin</Form.Label>
              <Form.Control
                 type="date" onChange={setVal} value={inpval.date_fin} name="date_fin" id="date_fin"
              />
            </Form.Group>

            <Form.Group controlId="formTempsFin" className="mb-3 col-lg-4">
              <Form.Label className='fw-bolder '>Motif De Conge</Form.Label>
              <Form.Select
                className="select" onChange={setVal} value={inpval.motifCongeSpecial} name="motifCongeSpecial" id="motifCongeSpecial"
              >
  <option value="">Select an option</option> 
  <option value="conge special naissance enfant 2 jours">
    <div className="left">conge special naissance d'un enfant 2 jours</div>
    <div className="right"></div>
  </option>
  <option value="conge special deces (frere ou soeur) 2 jours">
    <div className="left">conge special deces (frere ou soeur) 2 jour</div>
   
  </option>
  <option value="conge special deces (pere , mere ou fils) 3 jours">
    <div className="left">conge special deces (pere , mere ou fils) 3 jour</div>

  </option>
  <option value="conge special mariage 3 jours">
    <div className="left">conge special mariage 3 jours</div>
  
  </option>
  <option value="conge special mariage enfants 1 jour">
    <div className="left">conge special mariage enfants 1 jour</div>

  </option>
  <option value="conge special circoncision enfant 1 jour">
    <div className="left">circoncision d'un enfant 1 jour</div>
  </option>
  <option value="conge special deces de conjoint 3 jours">
    <div className="left">deces de conjoint 3 jours</div>
  </option>
  <option value="conge special deces d un grand-pere ou grand-mere 2 jours">
    <div className="left">deces d'un grand-pere ou grand-mere 2 jours</div>
  </option>
  <option value="conge special deces d un petit-fils ou d une petitr-fille 2 jours">
    <div className="left">deces d'un petit-fils ou d'une petite-fille 2 jours</div>
  </option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-6 col-lg-4">
                <Form.Label className='fw-bolder '>Motif </Form.Label>
                <Form.Control type="text" onChange={setVal} value={inpval.motif} name="motif" id="motif" placeholder='Modif de congé'></Form.Control>
            </Form.Group>
            

           
         
          </Row>
          <br></br>
          <button className="btn btn-outline-success px-4 py-2" type="submit" onClick={addUserdata}>
  <i className="fa fa-send text-outline-success fa-fw"></i> Envoyer
</button>

        </Form>
      </Card.Body>
    </Card>
                    <ToastContainer />

       </div>
          </div>
             </div>
  
</div>
        </>
      
    
    )
    }


export default Register