import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const baseURL = import.meta.env.VITE_APP_URL;

function Callback() {
  const location = useLocation();
  const navigaton = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if (token) {
      verifyToken(token);
    }
  }, [location]);

  const verifyToken = async (token) => {
    try {
      console.log('hello');
      const responsefromauth = await fetch(`https://auth-service.phongph.io.vn/auth/verify/${token}`);
      const data = await responsefromauth.json();

      const response = await fetch(`${baseURL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          googleid: data.id
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigaton('/fonts');
      } else {
        throw new Error('Error verifying token');
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  };

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

export default Callback;
