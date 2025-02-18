import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}
    >
      <h1 style={{ fontSize: '3em', color: '#333' }}>401</h1>
      <p style={{ fontSize: '1.5em', color: '#666' }}>Unauthorized</p>
      <p style={{ color: '#999' }}>You do not have permission to access this page.</p>
      <button
        onClick={goBack}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '1em',
          cursor: 'pointer',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default UnauthorizedPage;
