export const ALL_CATEGORIES_FAIL = 'ALL_CATEGORIES_FAIL';
export const ALL_CATEGORIES_REQUEST = 'ALL_CATEGORIES_REQUEST';
export const ALL_CATEGORIES_SUCCESS = 'ALL_CATEGORIES_SUCCESS';

export const UPDATE_CATEGORY_REQUEST = 'UPDATE_CATEGORY_REQUEST';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAIL = 'UPDATE_CATEGORY_FAIL';

export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAIL = ' DELETE_CATEGORY_FAIL';

export const NEW_CATEGORY_REQUEST = 'NEW_CATEGORY_REQUEST';
export const NEW_CATEGORY_SUCCESS = 'NEW_CATEGORY_SUCCESS';
export const NEW_CATEGORY_FAIL = ' NEW_CATEGORY_FAIL';

import clientApi from '../../api';

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORIES_REQUEST });

    let data = await clientApi.get('/api/category');

    dispatch({
      type: ALL_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCategory = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });

    let data = await clientApi.patch(`/api/category/${id}`, formData);
    console.log('update data', data);

    let newData = await clientApi.get('/api/category');
    console.log('new data', newData.data);

    dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: newData.data });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newCategory = (formData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CATEGORY_REQUEST });

    const { data } = await clientApi.post(`/api/category`, formData);

    dispatch({
      type: NEW_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    const data = await clientApi.delete(`api/category/${id}`);

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.message,
    });
  }
};
