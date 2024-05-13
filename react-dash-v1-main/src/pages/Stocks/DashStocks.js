import React, { useState, useEffect } from 'react';
import { Button, Table,Badge,Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomModal from './QteDep';
import AddArticleModal from './AjoutStocks';
const MyPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [showQte, setshowQte] = useState(false);

  const handleAddArticle = (article) => {
    // Handle adding the article here
    console.log(article);
  };

  const [articles, setArticles] = useState([]);


  useEffect(() => {
    // Fetch all articles from the server and update the state
    fetch('http://localhost:5000/stock/articles')
      .then((res) => res.json())
      .then((data) => setArticles(data.articles))
      .catch((err) => console.error(err));
  }, []);



  //delete 
  const handleDeleteArticle = async (articleId) => {
    try {
      // Show a confirmation toast
      const result = await new Promise((resolve) => {
        const confirmToast = toast.info(
          <div className="confirm-toast">
            <p>Are you sure you want to delete this article?</p>
            <div className="confirm-buttons">
              <button className="btn btn-primary" onClick={() => resolve(true)}>Yes</button>
              &nbsp;
              <button className="btn btn-danger" onClick={() => resolve(false)}>No</button>
            </div>
          </div>,
          {
            autoClose: false,
            closeButton: false,
          }
        );
      });
  
      // If user confirmed deletion, send a DELETE request to the server
      if (result) {
        const res = await fetch(`http://localhost:5000/delte/articles/${articleId}`, {
          method: 'DELETE',
        });
  
        if (!res.ok) {
          throw new Error('Failed to delete article');
        }
  
        // Remove the deleted article from the state
        setArticles(articles.filter((article) => article._id !== articleId));
  
        // Show a success toast
        toast.success(
          <div className="success-toast">
            <p>The article has been deleted successfully.</p>
          </div>
        );
      }
    } catch (err) {
      console.error(err);
      // Show an error toast
      toast.error(
        <div className="error-toast">
          <p>Failed to delete article.</p>
        </div>
      );
    }
  };

  const handleViewDetails = (articleCode) => {
    setSelectedArticle(articleCode);
    setshowQte(true);
  };

  
  
  

  return (
    <div className='container'>
    <br></br>
<Card className="mb-4" style={{ width: '250px', height: '90px' }}>
  <Card.Body>
    <Card.Title>
      <i className="fa fa-shopping-cart text-success  fa-fw me-4"></i>
      <span className="fw-bolder">Articles</span>
      <Badge bg="success" className="ms-2 ">{articles.length}</Badge>
    </Card.Title>
  </Card.Body>
</Card>


<div className="container">
    <div className="container my-2 py-2">
        <div className="row">
            <div className="col-12">
            <h1 className="display-9 fw-bolder mb-4 text-center text-black">Liste Des Article Dans Le Stock </h1>                <hr className="w-25 mx-auto"/>
            <button className="btn btn-outline-success px-4 py-2 mb-4" onClick={handleShowModal}>
            <i className="fa fa-plus text-outline-success fa-fw"></i> Ajouter un article
      </button>
   

      <CustomModal
        showQte={showQte}
        closeQteModal={() => setshowQte(false)}
        saveModal={() => console.log('Saving modal')}
        articleCode={selectedArticle}
      />
      
      <AddArticleModal
        show={showModal}
        handleClose={handleCloseModal}
        addArticle={handleAddArticle}
      />


  

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Code</th>
            <th>Designation</th>
            <th>Date depot</th>
        
            <th width="200px">Action</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article._id}>
              <td>{article.Code}</td>
              <td>{article.Designation}</td>
              <td>{article.DateDepot}</td>
             
                    <td >
                   

<button className="btn btn-outline-success me-3  px-2 py-1">
  <i className="fa fa-edit text-outline-success fa-fw"></i>
</button>

<button className="btn btn-outline-primary  px-2 py-1" onClick={() => handleViewDetails(article.Code)}>
  <i className="fa fa-eye text-outline-success fa-fw"></i>
</button>

               
      </td>
            </tr>
          ))}
        </tbody>
      </Table>

      </div>
  
      </div>
        </div>
        </div>
  
    </div>
  );
};

export default MyPage;