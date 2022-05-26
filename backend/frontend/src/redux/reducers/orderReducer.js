import {
  CREATE_ORDER,
  CLEAR_ORDER,
  FETCH_ORDERS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_REQUEST,
} from '../actions/order';

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return { order: action.payload };
    case CLEAR_ORDER:
      return { order: null };
    default:
      return state;
  }
};

const ordersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return { orders: action.payload };
    default:
      return state;
  }
};

const updateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { orderReducer, ordersReducer, updateOrderReducer };
