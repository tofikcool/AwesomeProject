// store.js
import {createStore} from 'redux';

// Action types
const ADD_ITEM = 'ADD_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const TOGGLE_CART = 'TOGGLE_CART';

// Initial state
const initialState = {
  items: [],
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item,
        ),
      };
    case TOGGLE_CART:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? {...item, inCart: !item.inCart} : item,
        ),
      };
    default:
      return state;
  }
};

// Action creators
export const addItem = item => ({
  type: ADD_ITEM,
  payload: item,
});

export const updateItem = item => ({
  type: UPDATE_ITEM,
  payload: item,
});

export const toggleCart = itemId => ({
  type: TOGGLE_CART,
  payload: itemId,
});

// Store
const store = createStore(reducer);

export default store;
