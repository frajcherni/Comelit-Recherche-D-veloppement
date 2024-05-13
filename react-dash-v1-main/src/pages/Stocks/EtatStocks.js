import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuantityFinalForm = () => {
  const [startDate, setStartDate] = useState('');
  const [QteFinal, setQteFinal] = useState(null);
  const [transferResult, setTransferResult] = useState([]);
  const [sortieResult, setSortieResult] = useState([]);
  const [bonEntrerResult, setBonEntrerResult] = useState([]);
  const [Placement, setPlacement] = useState('');
  const [code, setCode] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [articles, setArticles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/GetTotalQte', { code, startDate });
      const { quantityFinal, transferResult, sortieResult, bonEntrerResult } = response.data;
      setQteFinal(quantityFinal);
      setTransferResult(transferResult);
      setSortieResult(sortieResult);
      setBonEntrerResult(bonEntrerResult);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCodeSelectChange = (event) => {
    const selectedCode = event.target.value;
    setCode(selectedCode);
    const selectedArticle = articles.find((article) => article.Code === selectedCode);
    setSelectedDesignation(selectedArticle ? selectedArticle.Designation : '');
  };
  

  useEffect(() => {
    const getArticleListWithDesignations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/selectarticle');
        setArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };
  
    getArticleListWithDesignations();
  }, []);
  

  return (
    <div className="container">
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12">
            <h1 className="display-7 fw-bolder mb-4 text-center">Etat de mouvement</h1>
            <hr className="w-25 mx-auto" />

            <form onSubmit={handleSubmit} className="row g-3 align-items-center">
              <div className="col-lg-4">
                <label htmlFor="code-select" className="form-label fw-bolder">
                  Selectionner un article :
                </label>
                <select id="code-select" className="form-select" value={code} onChange={handleCodeSelectChange}>
                  <option value="">Selectionner un article...</option>
                  <option value="all">Tous les articles</option>
                  {articles.map((article) => (
                    <option key={article._id} value={article.Code}>
                      {article.Code}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-lg-4">
                <label htmlFor="designation-input" className="form-label fw-bolder">
                  Designation:
                </label>
                <input id="designation-input" className="form-control" type="text" value={selectedDesignation} readOnly />
              </div>
              <div className="col-lg-4">
                <label className="form-label fw-bolder">Date :</label>
                <input className="form-control" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
             
              <div className="col-lg-3 me-3 my-4">
                <button className="btn btn-outline-success" type="submit">
                  <i className="text-outline-success fa-fw"></i> Consulter l'etat
                </button>
              </div>
            </form>

            {QteFinal !== null && (
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Article Code</th>
                      <th>Designation</th>
                      <th>Quantity</th>
                      <th>Type</th>
                      <th>De Department</th>
                      <th>Vers Department</th>
                    </tr>
                  </thead>
                  <tbody>
                  {bonEntrerResult.map((bonEntrer) => (
                      <tr key={bonEntrer._id}>
                        <td>{new Date(bonEntrer.date).toLocaleDateString('en-GB')}</td>
                        <td>{bonEntrer.k}</td>
                        <td>{bonEntrer.d}</td>
                        <td>{bonEntrer.qte}</td>
                        <td>
                          <i className="fa fa-arrow-left me-2"></i>Bon Entrer
                        </td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    ))}
                    {sortieResult.map((sortie) => (
                      <tr key={sortie._id}>
                        <td>{new Date(sortie.date).toLocaleDateString('en-GB')}</td>
                        <td>{sortie.k}</td>
                        <td>{sortie.d}</td>
                        <td>- {sortie.qte}</td>
                        <td>
                          <i className="fa fa-arrow-right me-2"></i>Sortie
                        </td>
                        <td>{sortie.department}</td>
                       

                        <td>-</td>
                      </tr>
                    ))}
                    {transferResult.map((transfer) => (
                      <tr key={transfer._id}>
                        <td>{new Date(transfer.date).toLocaleDateString('en-GB')}</td>
                        
                        <td>{transfer.k}</td>
                        <td>{transfer.d}</td>
                        <td> - {transfer.qte}</td>
                        <td>
                          <i className="fa fa-exchange me-2"></i>Transfer
                        </td>
                        <td>{transfer.department}</td>
                        <td>{transfer.toDepartment}</td>
                        

                      </tr>
                    ))}
                    
                  </tbody>
                </table>
                <h2 className="text-success fw-bold">Stock final: {QteFinal}</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantityFinalForm;
