import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ isUser, redirectPath = '/', children }) => {
  let navigate = useNavigate();
  let { user, isAuth, isReg, email, role } = useSelector((state) => state.user);
  console.log('admin', user);

  if (isUser.isAuth) {
    user = user.user;
  } else {
    user = isUser;
  }

  if (user.role != 'admin' && user.email) {
    // return navigate(redirectPath, { replace });
    <Navigate to={redirectPath} replace />;
  } else if (!user.email) {
    <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default AdminRoute;
