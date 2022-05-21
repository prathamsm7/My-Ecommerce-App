import axios from 'axios';
import clientApi from '../api';

export const SHOW_ALL_PRODUCTS = 'SHOW_ALL_PRODUCTS';
export const SHOW_PRODUCT = 'SHOW_PRODUCT';
export const ADD_NEW = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const REMOVE_SELECTED_PRODUCT = 'REMOVE_SELECTED_PRODUCT';

export const AllProducts = (sort, arr) => async (dispatch) => {
  console.log(arr, sort);
  let res = await clientApi(`/api/product?order=${sort}`);
  // phones?brandId=2&brandId=1&_sort=price&_order=asc
  if (arr.length > 0 && sort) {
    res = await clientApi(`/api/product?${arr}&order=${sort}`);
  }

  console.log(res);

  dispatch({
    type: SHOW_ALL_PRODUCTS,
    payload: res.data,
  });
};

export const showProduct = (id) => async (dispatch) => {
  let result = await clientApi(`/api/product/${id}`);
  console.log('show prod', result);

  dispatch({ type: SHOW_PRODUCT, payload: result.data });
};

// export const removeSelectedProducts = () => {
//   return {
//     type: REMOVE_SELECTED_PRODUCT,
//   };
// };
