import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading  } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>; // Tampilkan loading sementara
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect ke halaman awal jika belum login
  }

  return children;
};

export default ProtectedRoute;
