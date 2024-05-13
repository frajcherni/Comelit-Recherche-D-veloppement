import { useState, useEffect } from 'react';

const CurrentUser = ({ setUser }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const token = localStorage.getItem('usersdatatoken');
    try {
      const response = await fetch('http://localhost:5000/validuser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const data = await response.json();
      setCurrentUser(data.ValidUserOne);
      setUser(data.ValidUserOne); // set user state in Nav component
    } catch (error) {
      console.log(error);
    }
  };

  return currentUser;
};

export default CurrentUser;