import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.GET_CART_DETAILS_SUCCESS:
      return {
        ...state,
        cartDetailsSuccess: action.response,
      };

    case CONSTANTS.GET_CART_DETAILS_FAILURE:
      return {
        ...state,
        cartDetailsFalure: action.error,
      };

      case CONSTANTS.RESET_CART_TO_INITIAL_STATE :
        return {
          ...state,
          cartDetailsSuccess: ""
        };
    default:
      return state;
  }
};
