import { combineReducers } from 'redux';
import { fetchOrders } from '../actions/order';
import shopReducer from './cartReducer';
import { categoryReducer, newCategoryReducer } from './categoryReducer';
import { orderReducer, ordersReducer } from './orderReducer';
import {
  productCRUDReducer,
  productReducer,
  showProductReducer,
} from './productReducer';
import { userReducer } from './user';

export default combineReducers({
  products: productReducer,
  product: showProductReducer,
  cart: shopReducer,
  order: orderReducer,
  orders: ordersReducer,
  user: userReducer,
  categories: categoryReducer,
  newCategory: newCategoryReducer,
  newProduct: productCRUDReducer,
});
