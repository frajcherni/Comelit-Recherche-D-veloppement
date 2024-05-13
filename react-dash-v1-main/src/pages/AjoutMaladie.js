
import React, { useState , useEffect } from 'react'
import { NavLink } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card , Form , Row , Button } from 'react-bootstrap';
import CurrentUser from '../pages/CurrentUser';
const Register = () => {

    const [inpval, setInpval] = useState({
        date_fin :"",
        date_debut : "",
        option : "" , 
        debut : "",
        fin :""
       
    
      
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
 
    const [days, setDays] = useState('');


  

useEffect(() => {
        const calculateDays = () => {
            const { date_fin, date_debut, debut, fin } = inpval;
            const startDate = new Date(date_debut);
            const endDate = new Date(date_fin);
            const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
            let calculatedDays = 0;

            if (date_debut && date_fin && debut && fin) {
                // If start date is on a weekend, display a toast error
                

                // Calculate the number of weekdays between the start and end date
                while (startDate <= endDate) {
                    const dayOfWeek = startDate.getDay();
                    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

                    if (!isWeekend) {
                        calculatedDays++;
                    }

                    startDate.setTime(startDate.getTime() + ONE_DAY_IN_MS);
                }

                // Adjust days based on debut and fin values
                if (debut === "Après Midi" && fin === "Matin") {
                    calculatedDays -= 1;
                } else if (debut === "Matin" && fin === "Matin") {
                    calculatedDays -= 0.5;
                } else if (debut === "Après Midi" && fin === "Après Midi") {
                    calculatedDays -= 0.5;
                }

                setDays(calculatedDays);
            } else {
                setDays(0);
            }
        };

        calculateDays();

    }, [inpval.date_debut, inpval.date_fin, inpval.debut, inpval.fin]);
    const currentUser = CurrentUser({ setUser }); // pass setUser function as prop to CurrentUser component
    const addUserdata = async (e) => {
        e.preventDefault();
      
        const { date_fin, date_debut, motif , debut , fin   } = inpval;
    
          if (days > user.Smaladie) {
            toast.error("Solde insuffisant pour ce type de congé", {
              position: "top-center"
            });
            return;
          
        }
         // Check if the number of days is greater than the user's available leave days
    
    
      
        console.log(days);
      
        if (days === 0) {
          toast.error("La demande doit être d'au moins un jour", {
            position: "top-center"
          });
        } else if (date_fin === "") {
          toast.warning("La date de fin est requise", {
            position: "top-center"
          });
        } else if (date_debut === "") {
          toast.error("La date de début est requise", {
            position: "top-center"
          });
        } else {
          const data = await fetch("http://localhost:5000/congeMaladieM", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              date_fin,
              date_debut,
              days,
              userid : user._id,
              debut,
              fin,
              motif,
              Smaladie : user.Smaladie ,
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
        }}
    };
    

    if (user) {

    return (
        <>
            
                   
            <div className="container">
    <div className="container my-1 py-1">
        <div className="row">
            <div className="col-12">
            <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} className="display-6 text-center mb-4">Demmande De Congé Maladie</h1>

                <hr className="w-25 mx-auto"/>

                {user.Smaladie > 0 ? (
   <div className="alert alert-success mb-4 p-3 col-lg-3 fa fa-warning" role="alert">
      &nbsp; Solde Maladie : {user.Smaladie}
   </div>
) : (
   <div className="alert alert-danger mb-4 p-3 col-lg-3 fa fa-warning " role="alert">
      &nbsp; Solde Maladie : {user.Smaladie}
   </div>
)}

  <Card className="text-dark">
  <Card.Body>
    <Form onSubmit={addUserdata}>
      <Row>
        <Form.Group className="mb-3 col-lg-6 " controlId="date_debut">
          <Form.Label>Date début</Form.Label>
          <Form.Control type="date" onChange={setVal} value={inpval.date_debut} name="date_debut" />
        </Form.Group>

        <Form.Group className="mb-3 col-lg-6" controlId="date_fin">
          <Form.Label>Date fin</Form.Label>
          <Form.Control type="date" onChange={setVal} value={inpval.date_fin} name="date_fin" />
        </Form.Group>

        <Form.Group className="mb-3 col-lg-6" controlId="debut">
          <Form.Label>Début</Form.Label>
          <Form.Select className="select" onChange={setVal} value={inpval.debut} name="debut">
            <option value="">Select an option</option>
            <option value="Matin">Matin</option>
            <option value="Après Midi">Après Midi</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3 col-lg-6" controlId="fin">
          <Form.Label>Fin</Form.Label>
          <Form.Select className="select" onChange={setVal} value={inpval.fin} name="fin">
            <option value="">Select an option</option>
            <option value="Matin">Matin</option>
            <option value="Après Midi">Après Midi</option>
          </Form.Select>
        </Form.Group>


        <Form.Group className="mb-3 col-lg-6" controlId="motif">
          <Form.Label>Motif</Form.Label>
          <Form.Control type="text" onChange={setVal} value={inpval.motif} name="motif" placeholder="Modif de congé" />
        </Form.Group>
      </Row>

      <div className="m-2">
        <button className="btn btn-outline-success px-4 py-2 me-3" type="submit" onClick={addUserdata}>
          <i className="fa fa-send text-outline-success fa-fw fw-bold"></i> Envoyer
        </button>

        <div className="alert alert-primary mb-4 m-2 col-lg-3 fa fa-info-circle text-black fw-bold" role="alert">
          &nbsp; Nombre de jour: {days}
        </div>
      </div>
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
}

export default Register