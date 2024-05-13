import React from 'react';
import { Table, Card, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';

export default function Facture() {
   
    
  return (
    <div>
        <h1>Comelit</h1>
      <h2 style={{textAlign: 'right'}}>Facture</h2>
      <hr style={{border: '2px solid black'}}/>
      <div style={{ position: 'relative' }}>
      <div style={{ width: "50%" }}>
        <Table bordered width="50%">
          <tbody>
            <tr>
              <td>Num Facture:</td>
              <td>001</td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>01/01/2022</td>
            </tr>
            <tr>
              <td>Code Client:</td>
              <td>123</td>
            </tr>
            <tr>
              <td>N TVA:</td>
              <td>456</td>
            </tr>
          </tbody>
        </Table>
        </div>
        <Card className="bg-transparent"
          style={{
            width: '300px',
            height: '120px',
            position: 'absolute',
            top: '0px',
            right: '0px',
            boxShadow:'none'
            
            
          }}
        >
          <Card.Body>
            Societe Name
          
              Livre A:
            
            Address Line 1
            
          </Card.Body>
        </Card>
        <Card className="bg-transparent"
          style={{
            width: '300px',
            height: '100px',
            position: 'absolute',
            top: '125px',
            right: '0px',
            boxShadow:'none'
            
            
          }}
        >
          <Card.Body>
           Societe Name
           
              Livre A:
         
            <Card.Text>Address Line 1</Card.Text>
            
          </Card.Body>
        </Card>
      </div>
      
      <br />
      <br></br>
      <Table bordered>
        <thead>
          <tr>
            <th>Article</th>
            <th>Description</th>
          
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Article 1</td>
            <td>Description 1</td>
           
          </tr>
         
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4"></td>
            <td>50</td>
            <td></td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
