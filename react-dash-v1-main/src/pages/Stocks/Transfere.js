import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import TransferArticlePage from './AjoutTsansfere';

function TransferList() {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/transfer/transferstock');
        setTransfers(response.data.articles);
      } catch (error) {
        console.error(error);
        toast.error('Error fetching transfers');
      }
    };

    fetchTransfers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delte/articlescc/${id}`);
      setTransfers(transfers.filter((transfer) => transfer._id !== id));
      toast.success('Transfer deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error deleting transfer');
    }
  };

  const confirmDelete = (id) => {
    toast.warn(
      <div>
        <p>Are you sure you want to delete this transfert?</p>
        <Button
          variant="danger"
          className="mx-2"
          onClick={() => {
            handleDelete(id);
            toast.dismiss();
          }}
        >
          Yes
        </Button>
        <Button variant="secondary" onClick={() => toast.dismiss()}>
          No
        </Button>
      </div>,
      {
        position: toast.POSITION.BOTTOM_CENTER,
      }
    );
  };

  return (
    <div>
      <div className="container">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-12">
              <TransferArticlePage />

              <h1 className="display-7 fw-bolder mb-4 text-center">Transfert Du Stock</h1>
              <hr className="w-25 mx-auto" />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Code Article</th>
                    <th>Designation</th>
                    <th>Quantitie transfert</th>
                    <th>Department</th>
                    <th>TO Department</th>
                    <th>Date transfert</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transfers.map((transfer) => (
                    <tr key={transfer._id}>
                      <td>{transfer.Code}</td>
                      <td>{transfer.Designation}</td>
                      <td>{transfer.QuantityTransfer}</td>
                      <td>{transfer.Department}</td>
                      <td>{transfer.ToDepartment}</td>
                      <td>{transfer.DateTransfer}</td>
                      <td>
                        <Button variant="danger" onClick={() => confirmDelete(transfer.Code)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferList;