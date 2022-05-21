import clientApi from '../../api';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = ' REGISTER_USER_FAIL';
export const LOGOUT_USER = ' LOGOUT_USER';

export const loginUser = (payload) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    let data = await clientApi.post(`/api/user/login`, payload);

    if (data.data.user) {
      localStorage.setItem('loginUser', JSON.stringify(data.data.user));
    }

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: { user: data.data.user },
    });
  } catch (error) {
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

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem('loginUser');
  dispatch({ type: LOGOUT_USER, payload: { user: {} } });
};
