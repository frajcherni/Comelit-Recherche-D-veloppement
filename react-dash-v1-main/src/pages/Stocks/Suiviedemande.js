import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import DataDisplayTable from './DisplaySuivi';

function MyTable() {
  const [name, setName] = useState("");
  const [demandDate, setDemandDate] = useState("");
  const [validationDate, setValidationDate] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceNum, setInvoiceNum] = useState("");
  const [shippingDate, setShippingDate] = useState("");
  const [dhlNum, setDhlNum] = useState("");
  const [receiptDate, setReceiptDate] = useState("");
  const [customsDate, setCustomsDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [vide, setVide] = useState("");
  const [certArticle, setCertArticle] = useState("");
  const [authorization, setAuthorization] = useState("");
  const [conformity, setConformity] = useState("");
    const [showTable, setShowTable] = useState("");

  const toggleTableVisibility = () => {
    setShowTable((prevShowTable) => !prevShowTable);
  };

  
  const handleSubmit = () => {
    const newData = {
      name: name,
      demandeDate: demandDate,
      validationDate: validationDate,
      facturationDate: invoiceDate,
      numFacture: invoiceNum,
      expeditionDate: shippingDate,
      numDHL: dhlNum,
      receptionDate: receiptDate,
      douanementDate: customsDate,
      remarque: remarks,
      articleSoumis: certArticle,
      autorisationPrelevement: authorization,
      attestationConformite: conformity,
      vide : vide
    };
    axios.post("http://localhost:5000/scvbar", newData)
      .then(response => console.log(response))
      .catch(error => console.log(error));
    setName("");
    setDemandDate("");
    setValidationDate("");
    setInvoiceDate("");
    setInvoiceNum("");
    setShippingDate("");
    setDhlNum("");
    setReceiptDate("");
    setCustomsDate("");
    setRemarks("");
    setVide("");
    setCertArticle("");
    setAuthorization("");
    setConformity("");
    setVide("");
  };

  return (

    <div className=' py-5 my-5 container'>
      <h1>Suivie Commande </h1>
      <button onClick={toggleTableVisibility} className="btn btn-outline-success px-5 py-2 mb-4 btn-sm btn-block">
        {showTable ? (
          <>
            <FontAwesomeIcon icon={faTimes} /> Annuler
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faUserPlus} /> Crée Suivi
          </>
        )}
      </button>

      {showTable && (
        <>
        <Table responsive striped bordered  hover >
          <thead className="thead-info" style={{ fontSize: "0.8em", padding: "5px 5px" }}>
            <tr >
            <th >Name</th>
      <th >Date de demande</th>
      <th >Date de validation</th>
      <th >Date de facturation</th>
      <th >N° de facture</th>
      <th >Date d'expédition</th>
      <th >N° dhl</th>
      <th >Date de réception</th>
      <th >Date de dédouanement</th>
      <th ></th>
      <th >Remarque</th>
      <th >Article soumis à la CERT</th>
      <th >L'autorisation de prélèvement</th>
      <th >Attestation de conformité</th>
            </tr>
          </thead>
          <tbody  style={{ fontSize: "0.9em" }}>
       

          
             <tr>
          <td><input type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}value={name} onChange={(e) => setName(e.target.value)} /></td>
            <td><input type="date" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}} value={demandDate} onChange={(e) => setDemandDate(e.target.value)} /></td>
            <td><input type="date" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}value={validationDate} onChange={(e) => setValidationDate(e.target.value)} /></td>
            <td><input type="date" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}} value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} /></td>
            <td><input type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}value={invoiceNum} onChange={(e) => setInvoiceNum(e.target.value)} /></td>
            <td><input type="date" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}value={shippingDate} onChange={(e) => setShippingDate(e.target.value)} /></td>

         
            <td><input type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}} value={dhlNum} onChange={(e) => setDhlNum(e.target.value)} /></td>
            <td><input type="date"style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}} value={receiptDate} onChange={(e) => setReceiptDate(e.target.value)} /></td>
            <td><input type="date"style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}} value={customsDate} onChange={(e) => setCustomsDate(e.target.value)} /></td>
            <td><input type="text"style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}} value={vide} onChange={(e) => setVide(e.target.value)} /></td>
            <td><input type="text"style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}} value={remarks} onChange={(e) => setRemarks(e.target.value)} /></td>

            <td><input type="date" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}value={certArticle} onChange={(e) => setCertArticle(e.target.value)} /></td>
            <td><input type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}value={authorization} onChange={(e) => setAuthorization(e.target.value)} /></td>
            <td><input type="date" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}value={conformity} onChange={(e) => setConformity(e.target.value)} /></td>
         
           
            </tr>
            
            

        </tbody>
        
            <button className="btn btn-outline-success  px-5 py-2 mb-4 btn-sm btn-block"  onClick={handleSubmit}>
      <FontAwesomeIcon icon={faUserPlus} /> Ajouter
    </button>
       
      </Table>
      <br></br>
      
    </>
      )}
    <DataDisplayTable></DataDisplayTable>
    </div>
  );
}

export default MyTable;    