import * as CONSTANTS from "./constant";

export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        getAllCategoriesSuccess: action.response,
      };

    case CONSTANTS.GET_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        getAllCategoriesFailure: action.error,
      };

    default:
      return state;
  }
};
