import React, { useState ,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Table ,Navbar, Nav} from 'react-bootstrap';
function BonEntrer() {
  const [numFacture, setNumFacture] = useState('');
  const [dateFacture, setDateFacture] = useState('');
  const [societe, setSociete] = useState('');
  const [unite, setUnite] = useState('');
  const [coursDeChange, setCoursDeChange] = useState('');
  const [codeArticle, setCodeArticle] = useState('');
  const [designation, setDesignation] = useState('');
  const [qte, setQte] = useState('');
  const [prix, setPrix] = useState('');
  const [coutAchat, setCoutAchat] = useState('');
  const [valeurAchat, setValeurAchat] = useState('');
  const [coutStocks, setCoutStocks] = useState(0);
  const [fraisDouane, setFraisDouane] = useState('');
  const [fraisTransitaire, setFraisTransitaire] = useState('');
  const [fraisTransport, setFraisTransport] = useState('');
  const [fraisCert, setFraisCert] = useState('');
  const [autreCharge1, setAutreCharge1] = useState(0);
  const [autreCharge2, setAutreCharge2] = useState(0);
  const [autreCharge3, setAutreCharge3] = useState(0);
  const [totalFrais, setTotalFrais] = useState(0);
  const [pourcentage, setpourcentage] = useState('');
  const [fraisImporation, setfraisImporation] = useState('');


  const [articles, setArticles] = useState([
    {
      codeArticle: '',
      designation: '',
      qte: '',
      prix: '',
      coutAchat: '',
      valeurAchat: '',
      coutStocks: '',
      fraisImporation : '',
    },
  ]);

  const handleAddRow = () => {
    setArticles([
      ...articles,
      {
        codeArticle: '',
        designation: '',
        qte: '',
        prix: '',
        coutAchat: '',
        valeurAchat: '',
        coutStocks: '',
      },
    ]);
  };

  const handleRemoveRow = () => {
    setArticles(articles.slice(0, -1));
  };
  

  useEffect(() => {
    const newCoutAchat = Number(autreCharge1) + Number(autreCharge2) + Number(autreCharge3) + Number(fraisCert) + Number(fraisTransport) + Number(fraisDouane) + Number(fraisTransitaire);
      
    setTotalFrais(newCoutAchat);
      
  }, [autreCharge1, autreCharge2, autreCharge3, fraisCert, fraisTransport, fraisDouane, fraisTransitaire]);
  




  const totalPrix = articles.reduce((acc, curr) => acc + parseFloat(curr.prix || 0), 0);
  const totalCoutAchat = articles.reduce((total, article) => total + Number(article.coutAchat), 0);
  const totalValeurAchat = articles.reduce((total, article) => total + Number(article.valeurAchat), 0);
  const TotalCoursStocks =articles.reduce((total, article) => total + Number(article.coutStocks), 0)

  const handleSubmit = () => {
  
  
    const newData = {
      numFacture,
      dateFacture,
      societe,
      unite,
      coursDeChange,
      codeArticle,
      designation,
      qte,
      prix,
      coutAchat,
      valeurAchat,
      coutStocks,
      fraisDouane,
      fraisTransitaire,
      fraisTransport,
      fraisCert,
      autreCharge1,
      autreCharge2,
      autreCharge3,
      articles,
      totalFrais,
      pourcentage,
      fraisImporation,
      TotalCoursStocks,
      totalValeurAchat,
      totalCoutAchat,
      totalFrais,
    };
  
    axios
      .post('http://localhost:5000/bonentreradd', newData)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  
    toast.success('Operation Reussi 😃', {
      position: 'top-left',
    });
  
    // clear the form data and reset the articles state
    setNumFacture('');
    setDateFacture('');
    setSociete('');
    setUnite('');
    setCoursDeChange('');
    setCodeArticle('');
    setDesignation('');
    setQte('');
    setPrix('');
    setCoutAchat('');
    setValeurAchat('');
    setCoutStocks('');
    setFraisDouane('');
    setFraisTransitaire('');
    setFraisTransport('');
    setFraisCert('');
    setAutreCharge1('');
    setAutreCharge2('');
    setAutreCharge3('');
    setArticles([
      {
        codeArticle: '',
        designation: '',
        qte: '',
        prix: '',
        coutAchat: '',
        valeurAchat: '',
        coutStocks: '',
      },
    ]);
  };
  




  // 
  useEffect(() => {
    // Loop through all the articles and recalculate their values
    const updatedArticles = articles.map((article, index) => {
      const qte = article.qte;
      const prix = article.prix;
      const newCoutAchat = qte * prix;
      const coursDeChanges = coursDeChange; // you need to set the value of coursDeChange
      const newVAchat = newCoutAchat * coursDeChanges;
      const newPrixDachat = newCoutAchat * (1 + pourcentage / 100) * coursDeChanges;
  
      const coutAchatSum = articles.reduce((acc, cur) => {
        return acc + cur.coutAchat;
      }, 0);
      console.log("Total coutAchat sum:", coutAchatSum);
  
      const newPourcentage = Number(((newCoutAchat / coutAchatSum) * 100).toFixed(2));
      const fraisImp = Number(((newPourcentage / 100) * totalFrais).toFixed(2)); // totalFraisImporation is the total amount of frais d'imporation
  
      const CoutStock = fraisImp + newVAchat; 

      return {
        ...article,
        coutAchat: newCoutAchat,
        valeurAchat: newVAchat,
        pourcentage: newPourcentage,
        fraisImporation: fraisImp,
        prixDachat: newPrixDachat,
        coutStocks : CoutStock,

      };
    });
  
    // Update the articles state with the new values
    setArticles(prevState => {
      if (JSON.stringify(prevState) === JSON.stringify(updatedArticles)) {
        // If the new state is the same as the previous state, don't trigger a re-render
        console.log("State not updated");
        return prevState;
      } else {
        // Otherwise, update the state with the new values
        console.log("State updated");
        return updatedArticles;
      }
    });
  }, [articles, coursDeChange, pourcentage, totalFrais]);
  
  

const handleArticleChange = async (index, key, value) => {
  const newArticles = [...articles];
  newArticles[index][key] = value;

  if (key === 'codeArticle') {
    try {
      const response = await fetch(`http://localhost:5000/designation/${value}`);
      const data = await response.json();
      if (data.designation) {
        newArticles[index]['designation'] = data.designation;
      } else {
        newArticles[index]['designation'] = '';
      }
    } catch (error) {
      console.error(error);
    }
  }

  setArticles(newArticles);
};

  
  


 
// Calculate the total sum of coutAchat values

// Set the updated articles state


  return (
<div>

    <div className="container my-5 py-4">
        <div className="row">
        <Navbar bg="success" variant="light">
       
       <Nav className="mr-auto text-white mx-auto">
         <Nav.Link className='text-white fw-bolder' href="/app/GetBonEnter?mot=STOCK">Liste de bon d'entrée</Nav.Link>
         <Nav.Link className='text-white fw-bolder ' href="/app/BonEnter?mot=STOCK"> Bon d'entrée</Nav.Link>
       </Nav>
     </Navbar>
            <div className="col-12">
              
            <h1 className="display-9 fw-bolder mb-4 text-center  my-5" >Entrée Du Stock</h1>
            <hr className="w-25 mx-auto"/>
      
<table style={{border: "1px solid gray"}}  >
          
          <tbody  >
       
             <tr style={{ border: "1px" }}>
              <td className="thead-info" style={{ fontSize: "1em", padding: "5px 5px",backgroundColor: "#e5ffe5" }}>N° de facture</td>
          <td><input type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}value={numFacture} onChange={(e) => setNumFacture(e.target.value)} /></td>
            </tr>
            <tr style={{ border: "1px " }}>
          <td className="thead-info" style={{ fontSize: "1em", padding: "5px 5px",backgroundColor: "#e5ffe5" }}> Societé</td>
            <td><input type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}value={societe} onChange={(e) => setSociete(e.target.value)} /></td>
         </tr >
         <tr style={{ border: "1px " }}>
            <td className="thead-info" style={{ fontSize: "1em", padding: "5px 5px",backgroundColor: "#e5ffe5" }}>Date</td>
            <td><input type="date" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}} value={dateFacture} onChange={(e) => setDateFacture(e.target.value)} /></td>
            
            </tr>
            <tr style={{ border: "1px " }}>
            <td className="thead-info" style={{ fontSize: "1em", padding: "5px 5px",backgroundColor: "#e5ffe5" }}>unite</td>
             <td>
  <select style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}} value={unite} onChange={(e) => setUnite(e.target.value)}>
    <option value="euro">Euro</option>
    <option value="dollar">Dollar</option>
    <option value="dinar">Dinar</option>
  </select>
</td>
</tr>
<tr> <td className="thead-info" style={{ fontSize: "1em", padding: "5px 5px",backgroundColor: "#e5ffe5" }}>Cours De Changes</td>
            <td><input type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}value={coursDeChange} onChange={(e) => setCoursDeChange(e.target.value)} /></td>
      

           
            </tr>
            
            
          

        </tbody>
        
           
       
      </table >
  

      <br></br>
      <Table responsive striped bordered hover >
  <thead thead className="thead-info" style={{ fontSize: "0.8em", backgroundColor: "#e5ffe5" }}>
    <tr>
      <th>Code article</th>
      <th>Designation</th>
      <th>Quantité</th>
      <th>Prix</th>
      <th>Cout d'achat</th>
      <th>Valeur d'achat en TND</th>
      
    </tr>
    
  </thead>
  <tbody style={{ fontSize: "0.9em" }}>
    {articles.map((article, index) => (
      <tr key={index}>
        <td>
          <input
            type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .5rem","fontSize":".7rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}
            value={article.codeArticle}
            onChange={(e) =>
              handleArticleChange(index, "codeArticle", e.target.value)
            }
          />
        </td>
        <td>
        <input
  type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .5rem","fontSize":".7rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}
  placeholder="Designation"
  value={articles[index].designation}
  onChange={(e) => handleArticleChange(index, 'designation', e.target.value)}
/>

        </td>
        <td>
          <input
            type="number" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .5rem","fontSize":".7rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}
            value={article.qte}
            onChange={(e) => handleArticleChange(index, "qte", e.target.value)}
          />
        </td>
        <td>
          <input
            type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .5rem","fontSize":".7rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}
            value={article.prix}
            onChange={(e) =>
              handleArticleChange(index, "prix", e.target.value)
            }
          />
        </td>
        <td>
          <input
            type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .5rem","fontSize":".7rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}
            value={article.coutAchat}
            onChange={(e) =>
              handleArticleChange(index, "coutAchat", e.target.value)
            }
          readOnly/>
            <input
            type="hidden" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .5rem","fontSize":".7rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}
            value={article.pourcentage}
            onChange={(e) =>
              handleArticleChange(index, "coutAchat", e.target.value)
            }
            
          readOnly/>
            <input
            type="hidden" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .5rem","fontSize":".7rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}
            value={article.fraisImporation}
            onChange={(e) =>
              handleArticleChange(index, "coutAchat", e.target.value)
            }
            
          readOnly/>
        </td>
        <td>
          <input
            type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .5rem","fontSize":".7rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box",color: "#008000", "transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}
            value={article.valeurAchat + " TND"}
            onChange={(e) =>
              handleArticleChange(index, "valeurAchat", e.target.value)
            }
         readOnly />
        </td>
        <td>
          <input
            type="hidden" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .5rem","fontSize":".7rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}
            value={article.coutStocks}
            onChange={(e) =>
              handleArticleChange(index, "coutStocks", e.target.value)
            }
          />
        </td>
      </tr>
    ))}
    <tr> <td className="text-success fw-bold" colSpan="3"  style={{fontWeight: "bold", justifyContent: "center"}}> Total</td>  <td ><input
  type="text" placeholder="Total prix"  value={totalPrix} readOnly style={{ border: "1px solid #ced4da", borderRadius: ".25rem", padding: ".3rem .5rem", fontSize: ".7rem", lineHeight: "1.5", color: "#495057", backgroundColor: "#fff", backgroundClip: "padding-box", transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out" }}
/>
</td> 
<td>
  <input
  type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .5rem","fontSize":".7rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}
  value={totalCoutAchat}
  readOnly
/>
</td>
<td>
<input
  type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .5rem","fontSize":".7rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}
  value={totalValeurAchat + " TND"}
  readOnly
/>

</td>
<td>
<input
  type="hidden" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .5rem","fontSize":".7rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}
  value={TotalCoursStocks}
  readOnly
/>
</td>
</tr>

  </tbody>
<br></br>
  <button className="btn btn-outline-success mb-4 me-2 px-2 py-1" onClick={handleAddRow}> <i className="fa fa-plus text-outline-Success fa-fw"></i></button>
<button className="btn btn-outline-danger  mb-4 me-2 px-2 py-1" onClick={handleRemoveRow}>
  <i className="fa fa-minus text-outline-danger fa-fw"></i>
</button>

</Table>


<Table responsive striped bordered  hover >
          <thead className="thead-info" style={{ fontSize: "0.8em", padding: "5px 5px",backgroundColor: "#e5ffe5"  }}> 
            <tr >
           
      <th >FraisDouane</th>
      <th >frais de transitaire</th>
      <th >frais de transport </th>
      <th >frais de certification CERT</th>
      <th >autre charge1 </th>
      <th >autre charge2 </th>
       <th >autre charge3 </th>

     
            </tr>
            <tr>
             
            </tr>
          </thead>
          <tbody  style={{ fontSize: "0.9em" }}>
       

          
             <tr>
          <td><input type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}value={fraisDouane} onChange={(e) => setFraisDouane(e.target.value)} onKeyPress={(e) => {
      const keyCode = e.keyCode || e.which;
      const keyValue = String.fromCharCode(keyCode);
      if (/\D/.test(keyValue)) {
        e.preventDefault();
      }
    }}
/></td>
            <td><input type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}} value={fraisTransitaire} onChange={(e) => setFraisTransitaire(e.target.value)} /></td>
            <td><input type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}value={fraisTransport} onChange={(e) => setFraisTransport(e.target.value)} /></td>
            <td><input type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}} value={fraisCert} onChange={(e) => setFraisCert(e.target.value)} /></td>
            <td><input type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}value={autreCharge1} onChange={(e) => setAutreCharge1(e.target.value)} /></td>
            <td><input type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}value={autreCharge2} onChange={(e) => setAutreCharge2 (e.target.value)} /></td>

            <td><input type="text" style={{"border":"1px solid #ced4da","borderRadius":".25rem","padding":".3rem .6rem","fontSize":".9rem","lineHeight":"1.5","color":"#495057","backgroundColor":"#fff","backgroundClip":"padding-box","transition":"border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}value={autreCharge3} onChange={(e) => setAutreCharge3 (e.target.value)} /></td>

            </tr>
            <tr>
              
            <td colSpan="7" style={{verticalAlign: "middle"}}>
            <div style={{display: "flex", justifyContent: "left", marginRight: "10px", alignItems: "center"}}>

    <span className='text-success' style={{ fontWeight: "bold",marginRight: "50px"}}>Total :</span>
    <input className='text-success' type="text" style={{ fontWeight: "bold",textAlign: "center", border: "0px solid #ced4da", borderRadius: ".25rem", padding: ".3rem .6rem", fontSize: ".9rem", lineHeight: "1.5",  width: "200px"}} value={totalFrais + " TND"} onChange={(e) => setTotalFrais(e.target.value)}  readOnly/>
  </div>
</td></tr>
           
            
            
            
          

        </tbody>
        
           <br></br>
        <button className="btn btn-outline-success mb-4 me-4 px-3 py-2" onClick={handleSubmit}> <i className="fa fa-plus text-outline-Success fa-fw"></i> Bon Entrer </button>
      </Table>
      <ToastContainer />

      </div>
      </div>
            </div>
    </div>
  )
}

export default BonEntrer