import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  SHOW_PRODUCT_FAIL,
  SHOW_PRODUCT_REQUEST,
  SHOW_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  REMOVE_SELECTED_PRODUCT,
} from '../actions/product';

const initState = {
  products: [],
};

export const productReducer = (state = initState, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: true,
        products: [],
      };
    default:
      return state;
  }
};

export const showProductReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case SHOW_PRODUCT_REQUEST:
      return {
        loading: true,
        product: [],
      };
    case SHOW_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case SHOW_PRODUCT_FAIL:
      return {
        loading: false,
        error: true,
        product: [],
      };
    default:
      return state;
  }
};

export const newProductReducer = (state = { newProduct: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        newProduct: action.payload,
      };
    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export const productCRUDReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_PRODUCT_FAIL:
    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const removeSelectedProductsReducer = (state, action) => {
  console.log('removing');
  switch (action.type) {
    case REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};
