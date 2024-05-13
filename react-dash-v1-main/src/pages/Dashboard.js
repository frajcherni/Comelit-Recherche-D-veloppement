
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrentUser from '../pages/CurrentUser';
import { Button, Container, Table, Alert } from "react-bootstrap";

const LeaveRequests = ({ userId }) => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      const res = await axios.get(`http://localhost:5000/leaverequests/${userId}`);
      setLeaveRequests(res.data.leaveRequests);
    };
    fetchLeaveRequests();
  }, [userId]);

  const deleteLeaveRequest = async (leaveId) => {
    try {
      toast.dismiss(); // Dismiss any existing toast
      toast.info(
        <div className="confirm-toast">
          <p>Are you sure you want to delete this leave request?</p>
          <div className="confirm-buttons">
            <button className="btn btn-primary me-3" onClick={async () => {
              await axios.delete(`http://localhost:5000/CancelCongeAnnuel/${leaveId}`);
              setLeaveRequests(leaveRequests.filter((leave) => leave._id !== leaveId));
              toast.success("Leave request deleted successfully");
            }}>
              Yes
            </button>
            <button className="btn btn-danger" onClick={() => toast.dismiss()}>
              No
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
            <h1 className="display-9 fw-bolder mb-4 text-center text-black">mes congé <b>annuel</b> </h1>
            <hr className="w-25 mx-auto"/>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>NOM</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Date Debut</th>
            <th>Date Fin</th>
            <th>Motif</th>
            <th>Status</th>
            <th>Jour(s)</th>
            <th>Planification</th>
            <th>Actions</th> {/* Add the Actions column */}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(leaveRequests) && leaveRequests.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.userid.Nom}</td>
              <td>{leave.userid.Prenom}</td>
              <td>{leave.userid.email}</td>
              <td>{leave.date_debut}</td>
              <td>{leave.date_fin}</td>
              <td>{leave.motif}</td>
              <td>{leave.days}</td>
              <td>{leave.planification}</td>
              <td>{leave.status}</td>
              <td>
                {leave.status === "waiting" && (
                  <button className='btn btn-outline-danger' onClick={() => deleteLeaveRequest(leave._id)}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer className="confirm-toast" />
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
