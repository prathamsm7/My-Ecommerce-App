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

const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/cart' element={<CardContainer />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/category' element={<AllCategories />} />
        <Route path='/category/new' element={<NewCategory />} />
        <Route path='/product/new' element={<NewProduct />} />
        <Route path='/product/manage' element={<ManageProducts />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AllRoutes;
