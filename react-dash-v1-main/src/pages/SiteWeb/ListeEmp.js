
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

const JobTable = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getalljobs");
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/deletejob/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
    } catch (err) {
      console.error(`Error deleting job with id ${id}:`, err);
    }
  };
  

  const handleModify = (id) => {
    // Handle modify logic here
    console.log(`Modifying job with id ${id}`);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Profile</th>
          <th>Date</th>
          <th>Location</th>
          <th>Contract</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job._id}>
            <td>{job._id}</td>
            <td>{job.profile}</td>
            <td>{job.date}</td>
            <td>{job.location}</td>
            <td>{job.contract}</td>
            <td>
              <button className="btn btn-link" onClick={() => handleDelete(job._id)}>
                <i className="fa fa-trash"></i>
              </button>
              <button className="btn btn-link" onClick={() => handleModify(job._id)}>
                <i className="fa fa-edit"></i>
              </button>
              <button className="btn btn-link">
                <i className="fa fa-eye"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default JobTable;