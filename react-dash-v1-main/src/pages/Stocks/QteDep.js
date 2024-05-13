import React, { useState, useEffect } from 'react';
import { Modal, Button , Table} from 'react-bootstrap';

const CustomModal = ({ showQte, closeQteModal, saveModal, articleCode }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/qte/${articleCode}`);
        const { Qte } = await response.json();
        setData(Qte);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [articleCode]);

  return (
    <Modal show={showQte} onHide={closeQteModal} size="" >
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data ? (
             <Table striped bordered hover>
             <thead>
               <tr>
                 <th>Department</th>
                 <th>Quantity</th>
               </tr>
             </thead>
             <tbody>
             <tr>
                 <td>Principale</td>
                 <td>{data.Principale || 0}</td>
               </tr>
               
               <tr>
                 <td>VIP</td>
                 <td>{data.VIP || 0}</td>
               </tr>
               <tr>
                 <td>SAFE</td>
                 <td>{data.SAFE || 0}</td>
               </tr>
               <tr>
                 <td>TOOLS</td>
                 <td>{data.TOOLS || 0}</td>
               </tr>
               <tr>
                 <td>DOMO</td>
                 <td>{data.DOMO || 0}</td>
               </tr>
               <tr>
                 <td>Support</td>
                 <td>{data.support || 0}</td>
               </tr>
             </tbody>
           </Table>
        ) : (
          <p>Loading...</p>
        )}
      </Modal.Body>
      <Modal.Footer>

      
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;