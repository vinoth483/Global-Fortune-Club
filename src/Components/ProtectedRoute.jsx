import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isSignedUp = localStorage.getItem('isSignedUp');

  if (!isSignedUp) {
    return <Navigate to="/signup" />;
  }

  return children;
};

export default ProtectedRoute;
