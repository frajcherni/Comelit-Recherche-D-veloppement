
import React, { useState , useEffect } from 'react'
import { Form, Button, Card, Row } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CurrentUser from '../pages/CurrentUser';
const Register = () => {

    const [inpval, setInpval] = useState({
        date_fin :"",
        date_debut : "",
        option : "" , 
        debut : "",
    
      
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
      
        const { date_fin, date_debut, motif, debut, fin, plan } = inpval;
      
        if (days > user.solde) {
          toast.error("Solde insuffisant pour ce type de congé", {
            position: "top-center",
          });
          return;
        
      }
        
        
        if (date_fin === "") {
            toast.warning("date_fin is required!", {
                position: "top-center"
            });
        } else if (date_debut === "") {
            toast.error("date_debut is required!", {
                position: "top-center"
            });
        } else if (date_debut > date_fin) {
          toast.error("La date de début ne peut pas être après la date de fin", { position: "top-center" });
          return;
        }else {
            
            
            const data = await fetch("http://localhost:5000/congeannuel", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    date_fin,
                    date_debut,
                    days,
                    userid : user._id,
                    email: user.email ,
                    debut,
                    fin,
                    motif,
                    solde : user.solde ,
                    plan 
                })
            });
            
            const res = await data.json();
            
            if (res.status === 201) {
                toast.success("Demande Enregistrée ", {
                    position: "top-center",
                    autoClose: 3900, // Time in milliseconds for the toast to automatically close
                    hideProgressBar: true, // Hide the progress bar
                    onClose: () => window.location.reload()
                });
                // Reset the form fields
                setInpval({ ...inpval, date_fin: "", date_debut: "", motifCongeSpecial: "", days: "" });
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
    };


    

    if (user) {

    return (
        <>
           <br></br>
           <ToastContainer />
           <div className="container">
    <div className="container my-1 px-1 py-1">
        <div className="row">
            <div className="col-12">
            <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} className="display-6 text-center mb-4">Demande De congé annuel</h1>
                <hr className="w-25 mx-auto"/>

                {user.solde > 0 ? (
   <div className="alert alert-success mb-4 p-3 col-lg-3 fa fa-warning" role="alert">
      &nbsp; Solde annuel : {user.solde}
   </div>
) : (
   <div className="alert alert-danger mb-4 p-3 col-lg-3 fa fa-warning " role="alert">
      &nbsp; Solde annuel : {user.solde}
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

        <Form.Group className="mb-3 col-lg-6 " controlId="plan">
          <Form.Label>Planification</Form.Label>
          <Form.Select className="select" onChange={setVal} value={inpval.plan} name="plan">
            <option value="">Select an option</option>
            <option value="oui">Oui</option>
            <option value="non">Non</option>
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

    </div>
    </div>
    </div>

    </div>

        </>
    )
    }
}

export default Register
