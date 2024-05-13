import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getcontacts");
        setContacts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteContact/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id)); // Remove the deleted contact from the state
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container my-5 py-5">
      <div className="col-12">
            <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} className="display-6 text-center mb-4">Liste <b>De Contacts</b> </h1>
</div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom et prenom</th>
              <th>Email</th>
              <th>Date</th>
              <th>Sujet</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.createdAt}</td>
                <td>{contact.subject}</td>
                <td>{contact.description}</td>
                <td>
                  <button
                    className="btn btn-link"
                    onClick={() => handleDelete(contact._id)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Contact;
