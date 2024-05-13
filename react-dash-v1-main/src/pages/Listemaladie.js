

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentUser from '../pages/CurrentUser';
import { Table, Button } from 'react-bootstrap';
import { toast , ToastContainer} from 'react-toastify';

const LeaveRequests = ({ userId }) => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      const res = await axios.get(`http://localhost:5000/leaverequestsM/${userId}`);
      setLeaveRequests(res.data.leaveRequests);
    };
    fetchLeaveRequests();
  }, [userId]);

  const deleteLeaveRequest = async (leaveId) => {
    try {
      toast.dismiss(); // Dismiss any existing toast

      toast.info(
        <div className="confirm-toast">
          <p>Êtes-vous sûr(e) d'annuler cette demande de congé ?</p>
          <div className="confirm-buttons">
            <Button
            className='me-2'
              variant="primary"
              onClick={async () => {
                await axios.delete(`http://localhost:5000/CancelCongeMaladie/${leaveId}`);
                setLeaveRequests(leaveRequests.filter((leave) => leave._id !== leaveId));
                toast.success("L'annulation a été effectuée avec succès");
              }}
            >
              Oui
            </Button>
            <Button variant="danger" onClick={() => toast.dismiss()}>
              Non
            </Button>
          </div>
        </div>,
        {
          autoClose: false,
          closeButton: false,
        }
      );
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while deleting the leave request');
    }
  };

  return (
<div className="container">
    <div className="container my-2 px-2 py-4">
        <div className="row">
            <div className="col-12">
            <h1 className="display-7 fw-bolder mb-4 text-center text-black">Mes congé <b>Maladie</b></h1> 
               <hr className="w-25 mx-auto"/>     
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Date Debut</th>
            <th>Date Fin</th>
            <th>Motif</th>
            <th>Status</th>
            <th>Jours</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(leaveRequests) &&
            leaveRequests.map((leave) => (
              <tr key={leave._id}>
               <td>{leave.userid.Nom}</td>
                <td>{leave.userid.Prenom}</td>
                <td>{leave.userid.email}</td>
                <td>{new Date(leave.date_debut).toLocaleDateString('en-GB')}</td>
                <td>{new Date(leave.date_fin).toLocaleDateString('en-GB')}</td>
                <td>{leave.motif}</td>
                <td>{leave.status}</td>
              
                <td>{leave.days}</td>

                <td>
                  {leave.status === 'waiting' && (
                    <button className='btn btn-outline-danger' onClick={() => deleteLeaveRequest(leave._id)}>
                      Annuler
                    </button>
                  )}
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
  );
};

const LeaveRequestsWrapper = () => {
  const [user, setUser] = useState(null);
  const currentUser = CurrentUser({ setUser });

  return user ? <LeaveRequests userId={user._id} /> : null;
};

export default LeaveRequestsWrapper;