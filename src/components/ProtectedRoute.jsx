import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false, requireCompanyRep = false }) => {
  const { user, isAdmin, isCompanyRepresentative } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin()) {
    // Redirect to dashboard if not admin but trying to access admin-only routes
    return <Navigate to="/dashboard" replace />;
  }

  if (requireCompanyRep && !isCompanyRepresentative()) {
    // Redirect to dashboard if not company rep but trying to access company rep-only routes
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;