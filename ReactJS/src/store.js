import { createStore } from 'redux';

// Initial state
const initialState = {
  isMenuVisible: true,
};

// Action types
const TOGGLE_MENU = 'TOGGLE_MENU';

// Action creator
export const toggleMenu = () => ({
  type: TOGGLE_MENU,
});

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        isMenuVisible: !state.isMenuVisible,
      };
    default:
      return state;
  }
};

// Create store
const store = createStore(reducer);

export default store;
