import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Private = ({ isUser, redirectPath = '/', isAllow, children }) => {
  let { user, email, role } = useSelector((state) => state.user);

  if (isUser.isAuth) {
    user = user.user;
  } else {
    user = isUser;
  }

  if (!user.email) {
    console.log('pr', user);
    // return navigate(redirectPath, { replace });
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default Private;
