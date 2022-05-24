import {
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  LOGOUT_USER,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from '../actions/user';

let obj = JSON.parse(localStorage.getItem('loginUser')) || {
  user: { loading: false, error: false, isAuth: false },
};

export const userReducer = (state = obj, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        loading: true,
        error: false,
        isAuth: false,
      };
    case REGISTER_USER_REQUEST:
      return {
        loading: true,
        error: false,
        isAuth: false,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isAuth: true,
        user: action.payload,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isAuth: false,
        isReg: true,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        isAuth: false,
        user: null,
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        isAuth: false,
        isReg: false,
      };
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload,
      };
    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
