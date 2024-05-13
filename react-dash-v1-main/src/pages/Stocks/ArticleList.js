import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Form, Button, Row , Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [selectedCode, setSelectedCode] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [motif, setMotif] = useState('');
  const [dateDeSortie, setDateDeSortie] = useState('');
  const [QuantitySortie, setQuantitySortie] = useState('');

  const [Department, setDepartment] = useState('');
  const [Vip, setVip] = useState('');
  const [Tools, setTools] = useState('');
  const [Domo, setDomo] = useState('');
  const [Princ, setPrinc] = useState('');
  const [AA, setAA] = useState('');

  const [show, setShow] = useState(false);


  // Retrieve the list of articles and their corresponding designations from the backend
  useEffect(() => {
    async function getArticleListWithDesignations() {
      try {
        const response = await axios.get('/selectarticle');
        setArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    }
    getArticleListWithDesignations();
  }, []);


  // Handle the selection of a code from the select element
  function handleCodeSelectChange(event) {
    const selectedCode = event.target.value;
    setSelectedCode(selectedCode);
    const selectedArticle = articles.find((article) => article.Code === selectedCode);
    setSelectedDesignation(selectedArticle ? selectedArticle.Designation : '');
    
    setVip(selectedArticle ? selectedArticle.VIP : '');
    setTools(selectedArticle ? selectedArticle.TOOLS : '');
    setDomo(selectedArticle ? selectedArticle.DOMO : '');
    setPrinc(selectedArticle ? selectedArticle.Principale : '');
  
  }




  function handleDepartmentSelectChange(event) {
    const Department = event.target.value;
    setDepartment(Department);
  }
  
  useEffect(() => {
    switch (Department) {
      case "VIP":
        setAA(Vip);
        break;
      case "TOOLS":
        setAA(Tools);
        break;
      case "Principale":
        setAA(Princ);
        break;
        
        case "DOMO":
            setAA(Domo);
          break;
      default:
        // handle default case if needed
        break;
    }
  }, [Department, Vip, Tools, Princ,Domo]); 
  // Handle the input change for the quantity
 

  function handleQuantitySortie(event) {
    const QuantitySortie = parseInt(event.target.value);
    setQuantitySortie(QuantitySortie);
  }
  // Handle the input change for the motif
  function handleMotifInputChange(event) {
    const motif = event.target.value;
    setMotif(motif);
  }

  // Handle the input change for the date de sortie
  function handleDateDeSortieInputChange(event) {
    const dateDeSortie = event.target.value;
    setDateDeSortie(dateDeSortie);
  }


  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedCode || !selectedDesignation || !QuantitySortie || !Department || !dateDeSortie || !motif) {
      toast.warning('tout les champs sont obligatoires !.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Duration in milliseconds
      });
      return;
    }
  
      if (AA >= QuantitySortie) {
        try {
        await axios.post('http://localhost:5000/sortiestock', {
          Code: selectedCode,
          Designation: selectedDesignation,
          quantite: AA ,
          Department: Department,
          Motif: motif,
          DateDeSortie: dateDeSortie ,
          QuantitySortie : QuantitySortie
        });
        setSelectedCode('');
        setSelectedDesignation('');
        setSelectedQuantity('');
        setMotif('');
        setDateDeSortie('');
        setQuantitySortie('');
        toast.success("Sortie Ajouteé avec Succeés😃", {
          position: "top-right"
        });   
      } catch (error) {
        console.error(error);
        alert('Failed to add sortie. Please try again later.');
        return;
      }
    
      } else {
        toast.error('Selected quantity is less than quantity sortie.');
      }
   
  }
  

  return (
    <div>
<Modal show={show} onHide={() => setShow(false)} size="lg">
  <Modal.Header closeButton>
    <Modal.Title className="display-9 fw-bolder mb-4 text-center text-black">Ajouter un article</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <div className="mb-4">
            <label htmlFor="code-select" className="form-label fw-bolder">Select an article code:</label>
            <select id="code-select" className="form-select" value={selectedCode} onChange={handleCodeSelectChange}>
              <option value="">Select an article code...</option>
              {articles.map((article) => (
                <option key={article._id} value={article.Code}>{article.Code}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="designation-input" className="form-label fw-bolder">Designation:</label>
            <input id="designation-input" className="form-control" type="text" value={selectedDesignation} readOnly />
          </div>
          <div className="mb-4">
              <label htmlFor="designation-input" className="form-label fw-bolder">Quantite Restant:</label>
              <input id="designation-input" className="form-control" type="text" value={AA} readOnly />
            </div>
          
            <div className="mb-2">
              <label htmlFor="department-select" className="form-label fw-bolder"> De Department:</label>
              <select id="department-select" className="form-select" value={Department} onChange={handleDepartmentSelectChange}>
                <option value="">Select a department...</option>
                <option value="Principale">Principale</option>
                <option value="VIP">VIP</option>
                <option value="SAFE">SAFE</option>
                <option value="TOOLS">TOOLS</option>
                <option value="DOMO">DOMO</option>
                <option value="support">support</option>
              </select>
            </div>
        </Col>
        <Col md={6}>
          <div className="mb-4">
            <label htmlFor="quantitySortie-input" className="form-label fw-bolder">Quantity à retirer :</label>
            <input id="quantitySortie-input" className="form-control" type="number" value={QuantitySortie} onChange={handleQuantitySortie} />
          </div>
          <div className="mb-4">
            <label htmlFor="DateSortie-input" className="form-label fw-bolder">Date De Sortie :</label>
            <input id="DateSortie-input" className="form-control" type="date" value={dateDeSortie} onChange={handleDateDeSortieInputChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="motif-input" className="form-label fw-bolder">Motif:</label>
            <input id="motif-input" className="form-control" type="text" value={motif} onChange={handleMotifInputChange} />
          </div>
        </Col>
      </Row>
      <div className="mb-4">
      <button className="btn btn-outline-success px-3 py-2" type="submit" >
  <i className="fa fa-plus text-outline-success fa-fw"></i> Ajouter
</button>
</div>
    </form>
  </Modal.Body>
</Modal>

<ToastContainer />


<button className="btn btn-outline-success px-4 py-2 mb-4" onClick={() => setShow(true)} type="submit" >
  <i className="fa fa-plus text-outline-success fa-fw"></i> Bon De Sortie
</button>

               </div>
  );


}

export default ArticleList;