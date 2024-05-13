import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = ({ userId }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/finduserbyids/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <p>Address: {user.address}</p>
    </div>
  );
};

export default UserDetails;
