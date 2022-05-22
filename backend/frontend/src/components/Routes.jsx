import React from 'react';
import { Route, Routes } from 'react-router-dom';
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

import { useSelector } from 'react-redux';
import Private from '../helpers/Private';

const AllRoutes = () => {
  let { loading, error, user, isAuth, isReg, email, role } = useSelector(
    (state) => state.user
  );

  if (!user?.email) {
    user = useSelector((state) => state.user);
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />

        <Route element={<Private isUser={user} />}>
          <Route path='/home' element={<Home />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/cart' element={<CardContainer />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/orders' element={<Orders />} />
        </Route>

        <Route path='/category' element={<AllCategories />} />
        <Route path='/category/new' element={<NewCategory />} />
        <Route path='/product/new' element={<NewProduct />} />
        <Route path='/product/manage' element={<ManageProducts />} />

        <Route path='*' element={<div>Page Not Found 404</div>} />
      </Routes>
      <Footer />
    </>
  );
};

export default AllRoutes;
