import { toast } from 'react-toastify';
import {
  ADD_PRODUCT_TO_CART,
  DECREMENT_CART_ITEM_QUANTITY,
  INCREMENT_CART_ITEM_QUANTITY,
  REMOVE_PRODUCT_FROM_CART,
  CLEAR_CART,
} from '../actions/cart';

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const initialState = {
  cart: cart,
};

export default function (state = initialState, action) {
  let updatedCart;
  let updatedItemIndex;

  switch (action.type) {
    case INCREMENT_CART_ITEM_QUANTITY:
      updatedCart = [...state.cart];
      updatedItemIndex = updatedCart.findIndex(
        (item) => item._id === action.payload
      );

      const incrementedItem = {
        ...updatedCart[updatedItemIndex],
      };

      incrementedItem.quantity++;
      updatedCart[updatedItemIndex] = incrementedItem;
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };

    case DECREMENT_CART_ITEM_QUANTITY:
      updatedCart = [...state.cart];
      updatedItemIndex = updatedCart.findIndex(
        (item) => item._id === action.payload
      );

      const decrementedItem = {
        ...updatedCart[updatedItemIndex],
      };

      decrementedItem.quantity--;

      updatedCart[updatedItemIndex] = decrementedItem;
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };

    case ADD_PRODUCT_TO_CART:
      updatedCart = [...state.cart];
      updatedItemIndex = updatedCart.findIndex(
        (item) => item._id === action.payload.product._id
      );

      if (updatedItemIndex < 0) {
        updatedCart.push({
          ...action.payload.product,
          quantity: action.payload.quantity,
        });
        toast.info('Item added into the cart');
      } else {
        toast.error('Item already into your cart');
        const updatedItem = {
          ...updatedCart[updatedItemIndex],
        };

        updatedItem.quantity++;
        updatedCart[updatedItemIndex] = updatedItem;
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };

    case REMOVE_PRODUCT_FROM_CART:
      updatedCart = [...state.cart];
      updatedItemIndex = updatedCart.findIndex(
        (item) => item._id === action.payload
      );

      updatedCart.splice(updatedItemIndex, 1);

      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return { ...state, cart: updatedCart };

    case CLEAR_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
}
