import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import CurrentUser from './CurrentUser';
import offre from "./gESTIONsTOCKSS.jpeg"
import grhs from "./gRHGESTION.jpg"
import site from "./gSITEWEb.jpeg"
const Dashboard = () => {
  const [mot, setMot] = useState("");
  const [user, setUser] = useState(null);
  const handleClick = () => {
    setMot("RH");
  };

  const handleClickED = () => {
    setMot("STOCK");
  };
  const handleClickEr = () => {
    setMot("SITE");
  };
  const currentUser = CurrentUser({ setUser });


  if (user) {
  return (
    <div className="container " style={{backround :"black"}}>
         <Card className="mb-4" style={{ width: '280px', height: '50px' }}>
         <Card.Title>
      <span className="fw-bolder text-green">Bonjour</span><span className=" text-blue"> {user.Nom} {user.Prenom}</span>
      
    </Card.Title>
</Card> 
      <div className="row justify-content-center">
       
   
      <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Card className="card me-2" style={{ flex: "0 0 30%", marginBottom: "20px", backgroundColor: "#ffffff", border: "1px solid #eaeaea", borderRadius: "4px", padding: "20px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <Card.Header style={{ position: "relative", overflow: "hidden", borderRadius: "4px", height: "220px" }}>
              <img src={grhs} alt="Offres d'emploi" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }} />
            </Card.Header>
            <Card.Body>
              <Card.Title style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}></Card.Title>
              <Card.Text className="card-text">
                Pour accéder à votre espace de gestion, veuillez cliquer sur le bouton ci-dessous.
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{ display: "flex", justifyContent: "center" }}>
            <Link
              to={{ pathname: "/app/Accueil", search: "?mot=RH" }}
              className="text-white text-decoration-none"
            >  <button
            className="card-button"
            onClick={handleClick}
            style={{
              backgroundColor: '#000',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              margin: '0 auto',
              display: 'block',
              width: '100%',
              marginTop: '10px'
            }}
          >
              Gestion des R.H
              </button> </Link>
            </Card.Footer>
          </Card>
       
          <Card className="card me-2" style={{ flex: "0 0 30%", marginBottom: "20px", backgroundColor: "#ffffff", border: "1px solid #eaeaea", borderRadius: "4px", padding: "20px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <Card.Header style={{ position: "relative", overflow: "hidden", borderRadius: "4px", height: "220px" }}>
              <img src={offre} alt="Offres d'emploi" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }} />
            </Card.Header>
            <Card.Body>
              <Card.Title style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}></Card.Title>
              <Card.Text className="card-text">
                Pour accéder à votre espace de gestion, veuillez cliquer sur le bouton ci-dessous.
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{ display: "flex", justifyContent: "center" }}>
            
            <Link
              to={{ pathname: "/app", search: "?mot=STOCK" }}
              className="text-white text-decoration-none"
            ><button className="card-button" onClick={handleClickED} style={{
              backgroundColor: '#000',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              margin: '0 auto',
              display: 'block',
              width: '100%',
              marginTop: '10px'
            }}>
              Gestion de Stocks
              </button> </Link>

            </Card.Footer>
          </Card>
     
          <Card className="card me-2" style={{ flex: "0 0 30%", marginBottom: "20px", backgroundColor: "#ffffff", border: "1px solid #eaeaea", borderRadius: "4px", padding: "20px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <Card.Header style={{ position: "relative", overflow: "hidden", borderRadius: "4px", height: "220px" }}>
              <img src={site} alt="Offres d'emploi" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }} />
            </Card.Header>
            <Card.Body>
              <Card.Title style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}></Card.Title>
              <Card.Text className="card-text">
                Pour accéder à votre espace de gestion, veuillez cliquer sur le bouton ci-dessous.
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{ display: "flex", justifyContent: "center" }}>
           
            <Link
              to={{ pathname: "/app", search: "?mot=SITE" }}
              className="text-white text-decoration-none"
            > <button className="card-button"  onClick={handleClickEr}  style={{
              backgroundColor: '#000',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              margin: '0 auto',
              display: 'block',
              width: '100%',
              marginTop: '10px'
            }}>
              Gestion de Site web
            </button></Link>

            </Card.Footer>
          </Card>
         

        </div>
      </div>
    </div>
  );
};
}
export default Dashboard;
