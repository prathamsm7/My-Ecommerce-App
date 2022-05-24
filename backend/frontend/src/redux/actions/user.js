import clientApi from '../../api';
import { toast } from 'react-toastify';
import axios from 'axios';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = ' REGISTER_USER_FAIL';
export const LOGOUT_USER = ' LOGOUT_USER';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';

export const loginUser = (payload) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    let data = await clientApi.post(`/api/user/login`, payload);

    if (data.data.user) {
      localStorage.setItem('loginUser', JSON.stringify(data.data.user));
      localStorage.setItem('token', JSON.stringify(data.data.token));
    }

    setTimeout(() => {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user: data.data.user },
      });
    }, 2000);
    toast.success('Sign In Successfully');
  } catch (error) {
    toast.error(
      error.response.data.message ? error.response.data.message : error.message
    );

    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const signupUser = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const data = await clientApi.post(`/api/user`, payload);

    setTimeout(() => {
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.data.user });
    }, 2000);

    toast.info('Sign Up Successfully. Please Log In !');
  } catch (error) {
    if (error.response.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error(
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }

    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const forgotPassword = (formData) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const { data } = await clientApi.put('/api/user/forgot-password', formData);

    setTimeout(() => {
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data.message,
      });
    }, 2000);
    toast.success(data);
  } catch (error) {
    toast.error(
      error.response.data.message ? error.response.data.message : error.message
    );

    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (formData) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const { data } = await clientApi.put('/api/user/reset-password', formData);

    // console.log(data);
    setTimeout(() => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data.success,
      });
      toast.success(data.message);
    }, 2000);
  } catch (error) {
    toast.error(
      error.response.data.message
        ? error.response.data.message
        : error.response.data.error
    );
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.response.data.error,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem('loginUser');
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT_USER });
};
