// src/routes/PublicRoute.jsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

const PublicRoute = ({ children, fallback = null }) => {
  const { user, loading, initialized, initialize } = useAuthStore();

  useEffect(() => {
    if (!initialized) initialize();
  }, [initialized, initialize]);

  if (loading || !initialized) return fallback;
  if (user) return <Navigate to="/editor" replace />;

  return children;
};

export default PublicRoute;
