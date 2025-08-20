// src/routes/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

const ProtectedRoute = ({ children, fallback = null }) => {
  const { user, loading, initialized, initialize } = useAuthStore();

  useEffect(() => {
    if (!initialized) initialize();
  }, [initialized, initialize]);

  if (loading || !initialized) return fallback;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
