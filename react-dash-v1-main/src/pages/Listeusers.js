import {Alert,Container } from 'react-bootstrap';
import * as ReactBootStrap from 'react-bootstrap';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import '../pages/Login.css'

function BasicExample() {



   //affiche
  const [User, setUser] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/allluser')
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, []);

//csv form 
const exportToCsv = (data) => {
  const csvRows = [];
  // Get headers
  const headers = Object.keys(data[1]);
  csvRows.push(headers.join(','));

  // Loop over data
  for (const row of data) {
    const values = headers.map(header => {
      const escaped = (''+row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  // Create file
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'users.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

//
//search
const handleSearchChange = (event) => {
  setSearch(event.target.value);
};

const filteredUsers = User.filter(user =>
  user.email.toLowerCase().includes(search.toLowerCase()) 
);
//
 
 //PDF
 const exportToPdf = (data) => {
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "landscape"; // portrait or landscape
  const marginLeft = 30;
  const doc =  new jsPDF();

  
  const headers = [
    ["Mat", "Nom ",  "Prenom ","Tell", "Cin", "Email",  "role", "Sexe","Date de naissance","Passport"],
  ];

  const dataToPrint = data.map((user, index) => [
    user.Matricule,
    user.Nom,
    user.Prenom,
    user.Ntell,
    user.Cin,
    user.email,
    
    user.role,
    user.sexe,
    user.Datedenaissance,
    user.Npassport
  ]);

  let content = {
    startY: 10,
    head: headers,
    body: dataToPrint,
  };

  doc.autoTable(content);
  doc.save("users.pdf");
};


 return(
  <div className='p-4'>
    <h1 className='m-2 text-center'><span
     style={ {"fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif","fontWeight":"bold","fontSize":"30px"}}>

                  liste des employes</span></h1>
  
   <div className='row'>
            <div className='col-md-6 mr-6 m-6'>
            <button style={{backgroundColor: '#0FA66D'}} onClick={() => exportToCsv(User)}>
            <FontAwesomeIcon icon={faDownload} /> Export CSV
            </button>
          
            <span style={{" marginLeft":"10px",}}> <button style={{backgroundColor: '#0FA66D',}} onClick={() => exportToPdf(filteredUsers)}>
                <FontAwesomeIcon icon={faDownload} /> Export PDF
            </button></span>
             </div>
   </div>
         
          <br></br>
            <ReactBootStrap.FormGroup className="mb-6 col-lg-3 text-right">
           <ReactBootStrap.FormControl  size="sm" className=" my-6 " type="text" placeholder="Search..." value={search} onChange={handleSearchChange} />
           </ReactBootStrap.FormGroup>
          
          

   <br></br>
   <div >
    {
       filteredUsers.length > 0? (
       <Container>
      
      <ReactBootStrap.Table responsive striped bordered hover >
        
        <thead className='table-dark'>
          <tr className='table-dark'>
          <th>Id</th>
          <th>Nom &amp; Prenom</th>
          <th>Num </th>
          <th>Cin</th>
          <th>Email</th>
          <th>Solde</th>
          
          <th>Roles</th>
          <th>Gender</th>
          <th>image</th>
          <th>Action</th>
          
          </tr>
        </thead>
        <tbody>
          {
          filteredUsers.map((Users,index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{Users.Nom}  {Users.Prenom}</td>
              <td>{Users.Ntell}</td>
              <td>{Users.Cin}</td>
              <td>{Users.email}</td>
              <td>{Users.solde}</td>
              
              <td>{Users.role}</td>
              <td>
              {Users.sexe}
              </td>
      
      <td><img width="20%" className="avatar rounded" heigth ="20%"src={`http://localhost:5000/${Users.Image}`}  /></td>
              
              
              
             
            </tr>
            
          ))
          }
         
        </tbody>
      </ReactBootStrap.Table>
     
    </Container>
    ): ( <Alert  variant='info'>
      Aucun users...
   
  </Alert>
    
         
        )}


    
  </div>

</div>
   );   
  
}

export default BasicExample;