import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth';

const RoleRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    // You can create a dedicated "Unauthorized" page or redirect to a general page
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RoleRoute;
