
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrentUser from '../pages/CurrentUser';
import { Button, Container, Table, Alert } from "react-bootstrap";

const LeaveRequests = ({ userId }) => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      const res = await axios.get(`http://localhost:5000/specialrequest/${userId}`);
      setLeaveRequests(res.data.leaveRequests);
    };
    fetchLeaveRequests();
  }, [userId]);

  const deleteLeaveRequest = async (leaveId) => {
    try {
      toast.dismiss(); // Dismiss any existing toast

      toast.info(
        <div className="confirm-toast">
          <p>"Êtes-vous sûr(e) d'annuler cette demande de congé ?</p>
          <div className="confirm-buttons">
            <button className="btn btn-primary me-2 px-3" onClick={async () => {
              await axios.delete(`http://localhost:5000/CancelCongeSpecial/${leaveId}`);
              setLeaveRequests(leaveRequests.filter((leave) => leave._id !== leaveId));
              toast.success("L'annulation a été effectuée avec succès");
            }}>
              Oui
            </button>
            <button className="btn btn-danger px-3" onClick={() => toast.dismiss()}>
              Non
            </button>
          </div>
        </div>,
        {
          autoClose: false,
          closeButton: false
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the leave request");
    }
  };

  return (
    <div className="container">
    <div className="container my-2 py-4">
        <div className="row">
            <div className="col-12">
            <h1 className="display-9 fw-bolder mb-4 text-center text-black">Mes congé <b>special</b> </h1>
             <hr className="w-25 mx-auto"/>
            <Table responsive striped bordered>
              <thead>
                <tr>
                  <th>Date Debut</th>
                  <th>Date Fin</th>
                  <th>Motif</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(leaveRequests) && leaveRequests.map((leave) => (
                  <tr key={leave._id}>
               <td>{new Date(leave.date_debut).toLocaleDateString('en-GB')}</td>
<td>{new Date(leave.date_fin).toLocaleDateString('en-GB')}</td>
                    <td>{leave.motifCongeSpecial}</td>
                    <td style={{ color: leave.status === 'accepted' ? 'green' : 'red' }}>{leave.status}</td>
                    <td>
                      {leave.status === "waiting" && (
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