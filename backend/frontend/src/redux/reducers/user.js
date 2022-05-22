import {
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  LOGOUT_USER,
} from '../actions/user';

let obj = JSON.parse(localStorage.getItem('loginUser')) || {
  user: {},
};

export const userReducer = (state = obj, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
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
