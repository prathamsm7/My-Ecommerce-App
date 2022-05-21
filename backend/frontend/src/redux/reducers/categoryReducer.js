import {
  ALL_CATEGORIES_FAIL,
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
} from '../actions/category';

export const categoryReducer = (
  state = { categories: [] },
  { type, payload }
) => {
  switch (type) {
    case ALL_CATEGORIES_REQUEST:
      return {
        loading: true,
        categories: [],
      };
    case ALL_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: payload.data,
      };
    case ALL_CATEGORIES_FAIL:
      return {
        loading: false,
        categories: [],
      };
    default:
      return state;
  }
};

export const newCategoryReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case NEW_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_CATEGORY_SUCCESS:
      return {
        loading: false,
        error: false,
        category: action.payload,
      };
    case NEW_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        category: {},
      };
    default:
      return state;
  }
};

export const updateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        loading: false,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        deleted: action.payload,
      };
    case UPDATE_CATEGORY_FAIL:
    case DELETE_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
