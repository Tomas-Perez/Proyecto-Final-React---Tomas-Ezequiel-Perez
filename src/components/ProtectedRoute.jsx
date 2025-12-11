import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Si no tiene token, redirigir a Login
    return <Navigate to="/login" replace />;
  }

  // Si tiene token, dejarlo pasar
  return children;
};

export default ProtectedRoute;