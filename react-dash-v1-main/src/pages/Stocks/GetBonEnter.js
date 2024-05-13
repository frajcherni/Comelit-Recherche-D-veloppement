import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap';
import { Table, Button , Modal} from 'react-bootstrap';
import ArticlePdf from './PrintBonEnter';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBonEntree, setSelectedBonEntree] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/getAllBonEntrer');
      setArticles(result.data);
    };
    fetchData();
  }, []);

  const handleShowModal = (bonEntree) => {
    setSelectedBonEntree(bonEntree);
    setSelectedArticle(bonEntree.articles);
    setShowModal(true);
  };
  
  
  


  const handleCloseModal = () => {
    setSelectedBonEntree(null);
    setShowModal(false);
  };

  return (
    <div className="container">
     <div className="container my-3 py-4">
  <Navbar bg="success" variant="light">
    <Nav className="mr-auto text-white mx-auto ">
      <NavLink className='nav-link text-white size-12 fw-bolder' activeClassName='active' exact to="/app/GetBonEnter">Liste de bon d'entrées</NavLink>
      <NavLink className='nav-link text-white fw-bolder' activeClassName='active' exact to="/app/BonEnter">Bon d'entrée</NavLink>
    </Nav>
  </Navbar>
</div>
      <h1>List Des Bons d'entrées </h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Num Bon Entrées</th>
            <th>Date Facture</th>
            <th>Num Facture</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {articles?.map((bonEntree) => (
            <tr key={bonEntree.NumBonEntrer}>
              <td>{bonEntree.NumBonEntrer}</td>
              <td>{bonEntree.dateFacture}</td>
              <td>{bonEntree.numFacture}</td>
              <td>
                <button className='btn btn-outline-success'
                  onClick={() => handleShowModal(bonEntree)}
                >
                 Details
                </button >
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} size='lg'>
        <Modal.Header closeButton>
        <Modal.Title className="text-center" style={{  fontSize: '24px', fontWeight: 'bold' }}>
Bon d'entrée Details
         
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h5 style={{color:"green"}}>Num Bon d'entrée:     {selectedBonEntree?.NumBonEntrer}</h5>
          <h5>Date Facture: {selectedBonEntree?.dateFacture}</h5>
          <h5>Num Facture: {selectedBonEntree?.numFacture}</h5>
          <Table striped bordered hover>
          <thead className="thead-info" style={{ fontSize: "0.8em", padding: "5px 5px",backgroundColor: "#fff" }}>
  <tr>
    <th>Code Article</th>
    <th>Designation</th>
    <th>Quantité</th>
    <th>Prix</th>
    <th>T.d'Achat  EURO</th>
    <th>Pourcentage</th>
    <th> PRIX DE REVIEN </th>
    <th>Frais d'Importation</th>
    <th>T.d'Achat TND</th>
  </tr>
</thead>

            <tbody>
  {selectedArticle && selectedArticle.map((article) => (
    <tr key={article.codeArticle}>
      <td>{article.codeArticle}</td>
      <td>{article.designation}</td>
      <td>{article.qte}</td>
      <td>{article.prix}</td>
      <td>{article.coutAchat}</td>
      <td>{article.pourcentage} %</td>
      <td>{article.coutStocks}</td>
      <td>{article.fraisImporation}</td>
      <td>{article.valeurAchat} </td>
    </tr>
  ))}
</tbody>

          </Table>
          <h4>Frais D'imporation</h4>
          <Table style={{width: "40%", height: "50px"}}>
            <tbody className="thead-info" style={{ fontSize: "0.8em", padding: "2px 2px" }}>
              <tr>
                <td style={{ color:"green" }}>Frais Douane </td> <td> {selectedBonEntree?.fraisDouane}</td>
                </tr>
                <tr>
                <td> frais  Transitaire</td> <td>{selectedBonEntree?.fraisTransitaire}</td>
                </tr>
                <tr>
                <td>frais Transport</td><td>{selectedBonEntree?.fraisTransport}</td>
                </tr>
                <tr>
                <td>frais certification</td><td>{selectedBonEntree?.fraisCert}</td>
                </tr>
                <tr>
                <td>autre Charge 1 :</td><td>{selectedBonEntree?.autreCharge1}</td>
                </tr>
                <tr>
                <td> autre Charge2:</td><td>{selectedBonEntree?.autreCharge2}</td>
                </tr>
                <tr>
                <td colSpan='2' style={{background:"white"}}> <p >Total {selectedBonEntree?.totalFrais}</p></td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
        <button className='btn btn-outline-secondary' onClick={handleCloseModal}>Fermer</button>
        
        {selectedBonEntree && (
  <PDFDownloadLink
    document={<ArticlePdf bonEntree={selectedBonEntree} />}
    fileName={`${selectedBonEntree.NumBonEntrer}.pdf`}
    className="btn btn-outline-success"
  >
    {({ blob, url, loading, error }) => (
      <>
        <FontAwesomeIcon icon={faPrint} className="mr-2 me-1" />
        {loading ? "Generating PDF..." : "Telecharger PDF"}
      </>
    )}
  </PDFDownloadLink>
      )}

        </Modal.Footer>
      </Modal>

<ToastContainer/>
    </div>

  );
};

export default ArticleList;