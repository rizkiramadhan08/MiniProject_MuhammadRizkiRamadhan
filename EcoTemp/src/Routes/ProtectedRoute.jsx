import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (!isAuthenticated) {
    // Jika pengguna belum login, arahkan ke halaman login
    return <Navigate to="/login" />;
  }

  // Jika sudah login, render halaman yang diminta
  return children;
};

export default ProtectedRoute;
