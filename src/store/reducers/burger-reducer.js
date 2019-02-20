import * as actions from '../actions/actions';

const initState = {
  ingredients: null,
  totalPrice: 60,
  error: false,
  building: false,
};

const INGREDIENTS_PRICES = {
  Салат: 30,
  Сыр: 70.99,
  Мясо: 100.5,
  Бекон: 110.4,
};

const burgerReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice:
          state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
        building: true,
      };
    case actions.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice:
          state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
        building: true,
      };
    case actions.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 60,
        building: false,
      };
    case actions.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default burgerReducer;
