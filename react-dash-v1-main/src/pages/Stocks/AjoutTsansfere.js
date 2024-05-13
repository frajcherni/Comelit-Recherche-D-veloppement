import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Form, Button, Row , Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransferArticlePage = () => {
    const [articles, setArticles] = useState([]);
    const [selectedCode, setSelectedCode] = useState('');
    const [selectedDesignation, setSelectedDesignation] = useState('');
    const [selectQte, setSelectedQte] = useState('');
    const [DateTransfer, setDateTransfer] = useState('');
    const [QuantityTransfer, setQuantityTransfer] = useState('');
    const [Department, setDepartment] = useState('');
    const [ToDepartment, setToDepartment] = useState('');
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
      setSelectedQte(selectedArticle ? selectedArticle.QteReste : '');
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



    function handleQuantityTransfer(event) {
      const QuantityTransfer = parseInt(event.target.value);
      setQuantityTransfer(QuantityTransfer);
    }
    // Handle the input change for the motif
  
  
   
    function handleToDepartmentSelectChange(event) {
        const toDepartment = event.target.value;
        setToDepartment(toDepartment);
      }
  
    // Handle the input change for the date de sortie
    function handleDateTransferInputChange(event) {
      const DateTransfer = event.target.value;
      setDateTransfer(DateTransfer);
    }
  
  
    async function handleSubmit(event) {
        event.preventDefault();
      
        // Check if any of the required fields are empty
        if (!selectedCode || !selectedDesignation || !DateTransfer || !QuantityTransfer || !Department || !ToDepartment) {
          toast.warning('tout les champs sont obligatoires !.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000, // Duration in milliseconds
          });
          return;
        }
      
        if (QuantityTransfer <= AA) {
          try {
            const res = await axios.post('http://localhost:5000/TransferStock', {
              Code: selectedCode,
              Designation: selectedDesignation,
              DateTransfer: DateTransfer,
              QuantityTransfer: QuantityTransfer,
              Department: Department,
              ToDepartment: ToDepartment
            });
      
            if (res.status === 201) {
              toast.success("Transféré avec succès", {
                position: "top-right"
              });
              setShow(false);
              setSelectedCode('');
              setSelectedDesignation('');
              setDepartment('');
              setToDepartment('');
              setDateTransfer('');
              setSelectedQte('');
              setQuantityTransfer('');
            } else if (res.status === 202) {
              toast.error("La quantité d'article est insuffisante ", {
                position: "top-right"
              });
            }
          } catch (error) {
            console.error(error);
            alert('Failed to add sortie. Please try again later.');
            return;
          }
        }
      }
    
    
  
    return (
      <div>
  <Modal show={show} onHide={() => setShow(false)} size="m">
    <Modal.Header closeButton>
      <Modal.Title>Ajouter Transfert </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={handleSubmit}>
        
            <div className="mb-4">
              <label htmlFor="code-select" className="form-label fw-bolder">code article :</label>
              <select id="code-select" className="form-select" value={selectedCode} onChange={handleCodeSelectChange}>
                <option value="">code article ...</option>
                {articles.map((article) => (
                  <option key={article._id} value={article.Code}>{article.Code}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="designation-input" className="form-label fw-bolder">Designation:</label>
              <input id="designation-input" className="form-control" type="text" value={selectedDesignation} readOnly />
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
        
            <div className="mb-2">
              <label htmlFor="department-select" className="form-label fw-bolder"> à Department:</label>
              <select id="department-select" className="form-select" value={ToDepartment} onChange={handleToDepartmentSelectChange}>
                <option value="">Select a department...</option>
                <option value="Principale">Principale</option>
                <option value="VIP">VIP</option>
                <option value="SAFE">SAFE</option>
                <option value="TOOLS">TOOLS</option>
                <option value="DOMO">DOMO</option>
                <option value="support">support</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="designation-input" className="form-label fw-bolder">Quantité Restant:</label>
              <input id="designation-input" className="form-control" type="text" value={AA} readOnly />
            </div>
         
            <div className="mb-4">
              <label htmlFor="QuantityTransfer-input" className="form-label fw-bolder">Quantité à transférés :</label>
              <input id="QuantityTransfer-input" className="form-control" type="number" value={QuantityTransfer} onChange={handleQuantityTransfer} />
            </div>
            <div className="mb-4">
              <label htmlFor="DateSortie-input" className="form-label fw-bolder">Date du Transfért :</label>
              <input id="DateSortie-input" className="form-control" type="date" value={DateTransfer} onChange={handleDateTransferInputChange} />
            </div>
          
     
            
         
        <div className="mb-4">
          <button className="btn btn-outline-success px-3 py-2" type="submit" >
            <i className="fa fa-send text-outline-success fa-fw"></i> Envoyer
          </button>
        </div>
      </form>
    </Modal.Body>
  </Modal>
  
  
  
  <ToastContainer />
  
  
  <button className="btn btn-outline-success px-4 py-2 mb-4" onClick={() => setShow(true)} type="submit" >
    <i className="fa fa-exchange text-outline-success fa-fw"></i> Transfert d'un Article
  </button>
  
                 </div>
    );
  
  
  }
  

export default TransferArticlePage;
