import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated, 'hereeeee');

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return children;
};

export default PrivateRoute;
