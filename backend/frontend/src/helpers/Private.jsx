import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const Private = ({
  isAuthenticated,
  isLoggedIn,
  children,
  adminRoute,
  isAdmin,
  redirect = '/signin',
  redirectAdmin = '/cart',
  redirectUser = '/home',
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }

  if (adminRoute && !isAdmin) {
    return <Navigate to={redirectAdmin} />;
  }

  return children ? children : <Outlet />;
};

export default Private;
