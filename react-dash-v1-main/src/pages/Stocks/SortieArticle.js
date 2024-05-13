
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import ArticleList from './ArticleList';

function MyPage() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);




  const [articles, setArticles] = useState([]);
  useEffect(() => {
    // Fetch all articles from the server and update the state
    fetch('http://localhost:5000/stock/sortiestock')
      .then((res) => res.json())
      .then((data) => setArticles(data.articles))
      .catch((err) => console.error(err));
  }, []);





  return (
    <>
        <div className="container my-5 py-5">
        <div className="row">
            <div className="col-12">
            <h1 className="display-7 fw-bolder mb-4 text-center text-black">Liste Des Article à Sortie </h1> 
      <ArticleList show={showModal} onHide={handleCloseModal} />


     <Table striped bordered hover >
        <thead >
          <tr>
            <th>Code</th>
            <th>Designation</th>
            <th>Date Sortie</th>
            <th>Quantite à Sortie</th>
            <th>Motif</th>
            <th>Quantite Restant</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article._id}>
              <td>{article.Code}</td>
              <td>{article.Designation}</td>
              <td>{article.DateDeSortie}</td>
              <td>{article.QuantitySortie}</td>
              <td>{article.Motif}</td>
              <td>{article.Quantite}</td>
                    <td >
                    <button className="btn btn-outline-danger me-2 px-2 py-1" >
  <i className="fa fa-trash text-outline-danger fa-fw"></i>
</button>{' '}

<button className="btn btn-outline-success  px-2 py-1">
  <i className="fa fa-edit text-outline-success fa-fw"></i>
</button>
    
      </td>
            </tr>
          ))}
        </tbody>
      </Table>
</div>
</div>
</div>

    </>
  );
}

export default MyPage;