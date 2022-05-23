import axios from 'axios';
import { toast } from 'react-toastify';

export const ALL_PRODUCTS_FAIL = 'ALL_PRODUCTS_FAIL';
export const ALL_PRODUCTS_REQUEST = 'ALL_PRODUCTS_REQUEST';
export const ALL_PRODUCTS_SUCCESS = 'ALL_PRODUCTS_SUCCESS';

export const SHOW_PRODUCT_FAIL = 'SHOW_PRODUCT_FAIL';
export const SHOW_PRODUCT_SUCCESS = 'SHOW_PRODUCT_SUCCESS';
export const SHOW_PRODUCT_REQUEST = 'SHOW_PRODUCT_REQUEST';

export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAIL = 'UPDATE_PRODUCT_FAIL';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAIL = ' DELETE_PRODUCT_FAIL';

export const NEW_PRODUCT_REQUEST = 'NEW_PRODUCT_REQUEST';
export const NEW_PRODUCT_SUCCESS = 'NEW_PRODUCT_SUCCESS';
export const NEW_PRODUCT_FAIL = ' NEW_PRODUCT_FAIL';

export const REMOVE_SELECTED_PRODUCT = 'REMOVE_SELECTED_PRODUCT';

import clientApi from '../../api';

export const getProducts = (sort, arr) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });

    let res;
    if (arr.length > 0 && sort) {
      res = await clientApi(`/api/product?${arr}&order=${sort}`);
    } else {
      res = await clientApi(`/api/product?order=${sort}`);
    }

    dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.message,
    });
  }
};

export const showProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: SHOW_PRODUCT_REQUEST });

    let result = await clientApi(`/api/product/${id}`);
    console.log('show prod', result);

    dispatch({ type: SHOW_PRODUCT_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: SHOW_PRODUCT_FAIL,
      payload: error.message,
    });
  }
};

export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    console.log(formData);
    const { data } = await clientApi.post('/api/product', formData);

    setTimeout(() => {
      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    }, 2000);
    toast.success('Product Created !');
  } catch (error) {
    setTimeout(() => {
      toast.info('Product Creation Failed');
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }, 2000);
  }
};

export const updateProduct = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const { data } = await clientApi.patch(`/api/product/${id}`, formData);

    setTimeout(() => {
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data,
      });
    }, 2000);
    toast.info('Product Updated');
  } catch (error) {
    toast.erroe('Product Updation Failed');
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await clientApi.delete(`/api/product/${id}`);
    setTimeout(() => {
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data,
      });
    }, 2000);

    toast.info('Product Deleted Successfully');
  } catch (error) {
    toast.error('Something Went Wrong');
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const removeSelectedProducts = () => (dispatch) => {
  dispatch({ type: REMOVE_SELECTED_PRODUCT, payload: [] });
};
