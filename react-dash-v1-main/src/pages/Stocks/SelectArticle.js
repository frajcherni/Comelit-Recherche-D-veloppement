import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [selectedCode, setSelectedCode] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');

  // Retrieve the list of articles and their corresponding designations from the backend
  useEffect(() => {
    async function getArticleListWithDesignations() {
      try {
        const response = await axios.get('http://localhost:5000/selectarticle');
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
  }

  return (
    <div>
      <label htmlFor="code-select">Select an article code:</label>
      <select id="code-select" value={selectedCode} onChange={handleCodeSelectChange}>
        <option value="">Select an article code...</option>
        {articles.map((article) => (
          <option key={article._id} value={article.Code}>{article.Code}</option>
        ))}
      </select>
      <br />
      <label htmlFor="designation-input">Designation:</label>
      <input id="designation-input" type="text" value={selectedDesignation} readOnly />
    </div>
  );
}

export default ArticleList;