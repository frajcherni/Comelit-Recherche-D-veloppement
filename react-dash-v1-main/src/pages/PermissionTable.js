import React, { useState, useEffect } from 'react';
import CurrentUser from '../pages/CurrentUser';
import axios from 'axios';

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  const currentUser = CurrentUser({ setUser });

  

  return (
    <div>
      <br />
      <div className="profile-card center">
        <div className="profile-card-header">
          <h2>Mon profile</h2>
          {user ? (
            <div>
              
                <div className="profile-picture">
                  <img
                    width="50%"
                    height="50%"
                    src={`http://localhost:5000/${user.Image}`}
                    alt="avatar"
                    style={{
                      overflow: 'hidden',
                      objectFit: 'cover',
                      backgroundColor: '#ddd',
                      borderRadius: '10%',
                      height: '150px',
                      width: '100px'
                    }}
                  />
                
                </div>
              
              <h3>
                {user.Nom} {user.Prenom}
              </h3>
              <p>Date de Naissance: {user.Datedenaissance}</p>
              <p>Email: {user.email}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
