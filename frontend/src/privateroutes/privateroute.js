import React from 'react';
import {  Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../component/auth/AuthContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { authState } = useAuth();
  const location = useLocation();

  if (!authState.success) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Element {...rest} />;
};

export default PrivateRoute;
