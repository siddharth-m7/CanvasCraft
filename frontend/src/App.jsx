// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import AuthSuccess from './pages/AuthSuccess';
import Homepage from './pages/homepage/Homepage';
import Navbar from './Components/Navbar';

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin h-8 w-8 border-2 border-gray-300 border-t-transparent rounded-full" />
  </div>
);

const Shell = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <main>{children}</main>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage - Now default route */}
        <Route
          path="/"
          element={<Homepage />}
        />
        
        {/* Public */}
        <Route
          path="/login"
          element={
            <PublicRoute fallback={<Loader />}>
              <Shell>
                <Login />
              </Shell>
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute fallback={<Loader />}>
              <Shell>
                <Signup />
              </Shell>
            </PublicRoute>
          }
        />
        
        {/* OAuth success passthrough */}
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/auth/callback" element={<AuthSuccess />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute fallback={<Loader />}>
              <Shell>
                <Dashboard />
              </Shell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor"
          element={
            <ProtectedRoute fallback={<Loader />}>
              <Editor />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
