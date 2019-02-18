import * as actions from '../actions/actions';

const initState = {
  ingredients: {
    Салат: 0,
    Сыр: 0,
    Мясо: 0,
    Бекон: 0,
  },
  totalPrice: 60,
};

const INGREDIENTS_PRICES = {
  Салат: 30,
  Сыр: 70.99,
  Мясо: 100.5,
  Бекон: 110.4,
};

const reducer = (state = initState, action) => {
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
      };
    default:
      return state;
  }
};

export default reducer;
