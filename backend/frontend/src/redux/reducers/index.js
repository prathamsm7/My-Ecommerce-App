import { combineReducers } from 'redux';
import { fetchOrders } from '../actions/order';
import shopReducer from './cartReducer';
import { categoryReducer, newCategoryReducer } from './categoryReducer';
import {
  orderReducer,
  ordersReducer,
  updateOrderReducer,
} from './orderReducer';
import {
  productCRUDReducer,
  productReducer,
  showProductReducer,
} from './productReducer';
import { forgotPasswordReducer, userReducer } from './user';

export default combineReducers({
  products: productReducer,
  product: showProductReducer,
  cart: shopReducer,
  order: orderReducer,
  orders: ordersReducer,
  updateOrder: updateOrderReducer,
  user: userReducer,
  categories: categoryReducer,
  newCategory: newCategoryReducer,
  newProduct: productCRUDReducer,
  forgotPassword: forgotPasswordReducer,
});
