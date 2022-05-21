import axios from 'axios';
export const CREATE_ORDER = 'CREATE_ORDER';
export const CLEAR_CART = 'CLEAR_CART';
export const CLEAR_ORDER = 'CLEAR_ORDER';
export const FETCH_ORDERS = 'FETCH_ORDERS';

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

export const fetchOrders = () => async (dispatch) => {
  let orders = await axios.get(
    `http://localhost:8080/api/payment/62863f91cf03550aca62cd4e`
  );

  console.log('order data', orders);
  let data = await orders.data;

  dispatch({ type: FETCH_ORDERS, payload: data });
};
