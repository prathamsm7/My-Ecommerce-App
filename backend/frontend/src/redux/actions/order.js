import axios from 'axios';
export const CREATE_ORDER = 'CREATE_ORDER';
export const CLEAR_CART = 'CLEAR_CART';
export const CLEAR_ORDER = 'CLEAR_ORDER';
export const FETCH_ORDERS = 'FETCH_ORDERS';
import clientApi from '../../api';

export const createOrder = (payload) => async (dispatch) => {
  let order = await axios.post(
    `https://maroon-jolly-spike.glitch.me/orders`,
    payload
  );

  let data = await order.data;
  dispatch({ type: CREATE_ORDER, payload: data });

  localStorage.clear('cart');
};

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};

export const fetchOrders = (id) => async (dispatch) => {
  let orders;
  if (!id) {
    orders = await clientApi(`/api/payment`);
  } else {
    orders = await clientApi(`/api/payment/${id}`);
  }
  let data = await orders.data;

  dispatch({ type: FETCH_ORDERS, payload: data });
};
