import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import CardContainer from './CardContainer';
import AllCategories from './category/allCategories';
import NewCategory from './category/NewCategory';
import CheckoutPage from './CheckoutPage';
import Details from './Details';
import Footer from './Footer';
import Home from './Home';
import LandingPage from './LandingPage';
import Navbar from './Navbar';
import Orders from './Orders';
import SignIn from './User/SignIn';
import SignUp from './User/SignUp';
import NewProduct from './product/New';
import ManageProducts from './product/ManageProducts';
import PageNotFound from './PageNotFound';

import { useSelector } from 'react-redux';
import Private from '../helpers/Private';
import { isAuthenticated } from '../helpers/auth';
import ForgotPassword from './User/ForgotPassword';
import ResetPassword from './User/ResetPassword';

const AllRoutes = () => {
  let auth = isAuthenticated();

  let user = useSelector((state) => state.user);

  if (auth && !user.email) {
    user = user.user.user;
  }

  let isAdmin = user.role == 'admin' ? true : false;
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route
          path='/signin'
          element={auth ? <Navigate to='/' /> : <SignIn />}
        />
        <Route
          path='/signup'
          element={auth ? <Navigate to='/' /> : <SignUp />}
        />

        <Route
          path='/forgot-password'
          element={auth ? <Navigate to='/' /> : <ForgotPassword />}
        />
        <Route
          path='/resetpassword/:token'
          element={auth ? <Navigate to='/' /> : <ResetPassword />}
        />

        <Route element={<Private isAuthenticated={auth} />}>
          <Route path='/home' element={<Home />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/cart' element={<CardContainer />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/orders' element={<Orders />} />
        </Route>

        <Route
          element={
            <Private
              isAuthenticated={auth}
              adminRoute={true}
              isAdmin={isAdmin}
            />
          }
        >
          <Route path='/category' element={<AllCategories />} />
          <Route path='/category/new' element={<NewCategory />} />
          <Route path='/product/new' element={<NewProduct />} />
          <Route path='/product/manage' element={<ManageProducts />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AllRoutes;
